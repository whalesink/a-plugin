/**
 * @constructor
 * @param {string} title:  提示框标题
 * @param {string} message[required]:  提示框消息正文，可以是HTML
 * @param {string} type:  提示框类型，用于渲染图标 success info error warn
 * @param {string} cancelBtnText: 取消按钮的文案
 * @param {string} confirmBtnText: 确认按钮的文案
 * @param {function} onCancel:  点击取消按钮时的回调函数 默认close
 * @param {function} onConfirm:  点击确定按钮时的回调函数 默认close
 * @param {number} zIndex: 手动设置提示框组件的定位层级 2000
 * @param {boolean} dangerouslyUseHTML:  指定是否以危险方式将消息正文渲染为HTML
 * @param {string} cancelBtnClass: 取消按钮的自定义类名
 * @param {string} confirmBtnClass: 确认按钮的自定义类名
 * @param {string} iconClass: 自定义图标的类名, 将覆盖type的图标
 * @param {boolean} showClose: 是否展示右上角close图标 true
 * @param {boolean} closeOnClickMask: 是否可通过点击遮罩关闭弹窗 false
 * @param {boolean} closeOnPressEscape: 是否可通过按下Esc关闭弹窗 true
 * @param {boolean} showConfirmBtn: 是否显示确认按钮
 * @param {boolean} showCancelBtn: 是否显示取消按钮
 *
 * @function
 * close 手动关闭当前弹框
 */
import "./index.scss";

class MessageBox {
	constructor(opts) {
		if (!opts) throw new Error("param message is required.");
		this.title = opts.title ?? "提示";
		this.message = opts.message || "消息";
		this.type = opts.type;
		this.cancelBtnText = opts.cancelBtnText || "取消";
		this.confirmBtnText = opts.confirmBtnText || "确认";
		this.onCancel = opts.onCancel || this.close.bind(this);
		this.onConfirm = opts.onConfirm || this.close.bind(this);
		this.zIndex = opts.zIndex || 2000;
		this.dangerouslyUseHTML = opts.dangerouslyUseHTML ?? false;
		this.cancelBtnClass = opts.cancelBtnClass || "";
		this.confirmBtnClass = opts.confirmBtnClass || "";
		this.iconClass = opts.iconClass || "";
		this.showClose = opts.showClose ?? true;
		this.closeOnClickMask = opts.closeOnClickMask ?? false;
		this.closeOnPressEscape = opts.closeOnPressEscape ?? true;
		this.showConfirmBtn = opts.showConfirmBtn ?? true;
		this.showCancelBtn = opts.showCancelBtn ?? true;

		this.init();
	}

	init() {
		let el = document.createElement("div");
		let elInner = document.createElement("div");

		this.el = el;
		this.elInner = elInner;

		el.setAttribute("class", "a-message-box__wrapper fadeIn");
		el.style.zIndex = this.zIndex;
		elInner.setAttribute("class", "a-message-box scaleIn");

		if (this.closeOnClickMask) {
			this.el.onclick = this.close.bind(this);
		}

		if (this.closeOnPressEscape) {
			window.addEventListener(
				"keyup",
				(e) => {
					if (e.keyCode === 27) {
						this.close();
					}
				},
				false
			);
		}

		let icon;

		if (this.iconClass) {
			icon = `<i class="${this.iconClass}"></i>`;
		} else {
			icon = this.getIcon(this.type) || "";
		}

		let header = `<div class="a-message-box__header">
			<div class="a-message-box__title">
				<span class="a-message-box__titleicon">
					${icon}
				</span>
				<span class="a-message-box__titletext">${this.title}</span>
			</div>
		</div>`;

		header = this.parseString2Dom(header);

		if (this.showClose) {
			let headerBtn = document.createElement("button");
			headerBtn.className = "a-message-box__headerbtn";
			headerBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" 
			class="a-message-box__headerclose">
				<path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
			</svg>`;

			headerBtn.onclick = this.close.bind(this);
			header.appendChild(headerBtn);
		}

		let content = document.createElement("div");
		content.className = "a-message-box__content";
		let contentInner = document.createElement("div");
		contentInner.className = "a-message-box__container";

		content.appendChild(contentInner);

		this.dangerouslyUseHTML
			? (contentInner.innerHTML = this.message)
			: (contentInner.innerText = this.message);

		let footer;
		if (this.showConfirmBtn || this.showCancelBtn) {
			footer = document.createElement("div");
			footer.className = "a-message-box__footer";

			if (this.showCancelBtn) {
				let cancelBtn = document.createElement("button");
				cancelBtn.className =
					"a-message-box__btns cancel " + this.cancelBtnClass;
				cancelBtn.innerText = this.cancelBtnText;
				cancelBtn.onclick = this.onCancel;
				footer.appendChild(cancelBtn);
			}

			if (this.showConfirmBtn) {
				let confirmBtn = document.createElement("button");
				confirmBtn.className =
					"a-message-box__btns confirm " + this.confirmBtnClass;
				confirmBtn.innerText = this.confirmBtnText;
				confirmBtn.onclick = this.onConfirm;
				footer.appendChild(confirmBtn);
			}
		}

		this.elInner.appendChild(header);
		this.elInner.appendChild(content);
		footer && this.elInner.appendChild(footer);
		this.el.appendChild(elInner);
		document.body.appendChild(el);
	}

	close() {
		this.el.className = "a-message-box__wrapper fadeOut";
		this.elInner.className = "a-message-box scaleOut";
		this.el.addEventListener("animationend", () => {
			this.el.remove();
		});
	}

	getIcon(type) {
		const map = {
			success: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="a-message-box__titleicon success">
					<path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/>
					</svg>`,
			info: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="a-message-box__titleicon info">
					<path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z" />
					</svg>`,
			warn: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="a-message-box__titleicon warn">
					<path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"/>
					</svg>`,
			error: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="a-message-box__titleicon error">
					<path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"/>
					</svg>`,
		};
		return map[type];
	}

	static success(message, args) {
		return new this({
			message,
			title: "成功",
			type: "success",
			...args,
		});
	}

	static error(message, args) {
		return new this({
			message,
			title: "错误",
			type: "error",
			...args,
		});
	}

	static info(message, args) {
		return new this({
			message,
			title: "信息",
			type: "info",
			...args,
		});
	}

	static warn(message, args) {
		return new this({
			message,
			title: "警告",
			type: "warn",
			...args,
		});
	}

	selector(selector, all = false) {
		return all
			? this.el.querySelectorAll(selector)
			: this.el.querySelector(selector);
	}

	parseString2Dom(html) {
		return document.createRange().createContextualFragment(html)
			.children[0];
	}
}

export default MessageBox;
