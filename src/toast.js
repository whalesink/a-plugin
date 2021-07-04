/**
 * @constructor
 * @param {string} title[required]: 要提示的文本内容；如渲染html，需要手动设置dangerouslyUseHTML为true
 * @param {number} duration:  持续时间，默认2s;若为 0 不会自动关闭； type为loading时需要手动关闭
 * @param {string} position:  出现的位置，可选top（默认）, middle, bottom
 * @param {string} type:  提示的图标类型，可选success，error，info，warn，loading；默认 none 无图标
 * @param {string} theme:  主题类型,可选'light', 'dark'
 * @param {function} onHide:  关闭后执行的操作
 * @param {boolean} isSingle:  指定组件是否以单一实例展示
 * @param {boolean} dangerouslyUseHTML:  指定是否以危险方式将内容渲染为HTML
 */

class Toast {
	constructor(opts) {
		if (!opts) throw new Error("param title is required");
		if (!opts.title) throw new Error("param title is required");

		this.title = opts.title;
		this.duration = opts.duration ?? 2000;
		this.position = opts.position || "top";
		this.type = opts.type;
		this.theme = opts.theme || "light";
		this.onHide = opts.onHide || null;
		this.isSingle = opts.isSingle || false;
		this.dangerouslyUseHTML = opts.dangerouslyUseHTML || false;

		this.init();
	}

	init() {
		this.el = document.createElement("div");
		this.el.setAttribute("class", "a-toast");

		if (this.dangerouslyUseHTML) {
			this.el.innerHTML = this.title;
		} else {
			this.el.innerText = this.title;
		}

		switch (this.type) {
			case "success":
				break;

			case "error":
				break;

			case "warn":
				break;

			case "info":
				break;

			case "loading":
				this.duration = 0;
				break;

			default:
				break;
		}

		switch (this.theme) {
			case "dark":
				this.el.classList.add("dark");
				break;

			default:
				break;
		}

		document.body.appendChild(this.el);

		this.el.classList.add("show");

		if (this.duration !== 0) {
			setTimeout(() => {
				this.hide();
			}, this.duration);
		}
	}

	hide() {
		this.el.classList.remove("show");
		this.el.classList.add("hide");
		this.el.addEventListener("animationend", () => {
			this.onHide && this.onHide();
			this.el.remove();
		});
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
		return new this({ title, type: "loading", ...args });
	}
}
