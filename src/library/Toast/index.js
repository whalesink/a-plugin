/**
 * @constructor
 * @param {string} title[required]: 要提示的文本内容；如渲染html，需要手动设置dangerouslyUseHTML为true
 * @param {number} duration:  持续时间，默认2s;若为 0 不会自动关闭； type为loading时需要手动关闭
 * @param {string} type:  提示的图标类型，可选success，error，info，warn，loading；默认无图标
 * @param {string} theme:  主题类型,可选'light', 'dark'
 * @param {function} onHide:  关闭后执行的操作
 * @param {boolean} dangerouslyUseHTML:  指定是否以危险方式将内容渲染为HTML
 * @param {string} iconClass: 自定义图标的类名, 将覆盖type的图标
 *
 * 待实现的API
 * @param {boolean} singleton:  指定组件是否以单一实例展示
 */
import "./index.scss";

class Toast {
	constructor(opts) {
		if (!opts?.title) throw new Error("param title is required.");

		this.title = opts.title;
		this.duration = opts.duration ?? 2000;
		this.position = opts.position || "top";
		this.type = opts.type;
		this.theme = opts.theme || "dark";
		this.onHide = opts.onHide ?? null;
		this.isSingle = opts.isSingle ?? false;
		this.dangerouslyUseHTML = opts.dangerouslyUseHTML ?? false;
		this.iconClass = opts.iconClass ?? "";

		this.init();
	}

	init() {
		this.el = document.createElement("div");
		this.el.className = "a-toast";

		let icon = "",
			iconwrap = "";
		if (this.iconClass) {
			icon = `<i class="${this.iconClass}"></i>`;
		} else {
			icon = this.getIcon(this.type);
		}

		if (icon) {
			iconwrap = `<span class="a-toast__iconwrap">${icon}</span>`;
		}

		let content = document.createElement("span");
		content.className = "a-toast__inner";

		if (this.dangerouslyUseHTML) {
			content.innerHTML = this.title;
		} else {
			content.innerText = this.title;
		}

		switch (this.theme) {
			case "light":
				this.el.classList.add("light");
				break;

			default:
				break;
		}
		this.el.innerHTML = iconwrap;
		this.el.appendChild(content);
		document.body.appendChild(this.el);

		this.el.classList.add("fadeMoveIn");
		if (this.duration !== 0) {
			setTimeout(() => {
				this.hide();
			}, this.duration);
		}
	}

	hide() {
		this.el.classList.remove("fadeMoveIn");
		this.el.classList.add("fadeMoveOut");
		this.el.addEventListener("animationend", () => {
			this.onHide?.();
			this.el.remove();
		});
	}

	getIcon(type) {
		const map = {
			success: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="a-toast__icon success">
					<path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/>
					</svg>`,
			info: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="a-toast__icon info">
					<path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z" />
					</svg>`,
			warn: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="a-toast__icon warn">
					<path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"/>
					</svg>`,
			error: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="a-toast__icon error">
					<path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"/>
					</svg>`,
			loading: `<svg viewBox="0 0 1024 1024" version="1.1"  class="a-toast__icon loading" xmlns="http://www.w3.org/2000/svg">
					<path d="M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333z m0 128a298.666667 298.666667 0 1 0 0 597.333334 298.666667 298.666667 0 0 0 0-597.333334z" fill="#000000" fill-opacity=".2" />
					<path d="M813.696 813.696c166.613333-166.613333 166.613333-436.778667 0-603.392-166.613333-166.613333-436.778667-166.613333-603.392 0A64 64 0 0 0 300.8 300.8a298.666667 298.666667 0 1 1 422.4 422.4 64 64 0 0 0 90.496 90.496z" fill="#000000" />
					</svg>`,
		};
		return map[type];
	}

	get title() {
		return this._title;
	}

	set title(val) {
		this._title = val;
		if (this.el) {
			this.el.querySelector(".a-toast__inner").innerText = val;
		}
	}

	static show(title, args) {
		return new this({ title, ...args });
	}

	static success(title, args) {
		return new this({ title, type: "success", ...args });
	}

	static error(title, args) {
		return new this({ title, type: "error", ...args });
	}

	static info(title, args) {
		return new this({ title, type: "info", ...args });
	}

	static warn(title, args) {
		return new this({ title, type: "warn", ...args });
	}

	static loading(title, args) {
		return new this({ title, type: "loading", ...args, duration: 0 });
	}
}

export default Toast;
