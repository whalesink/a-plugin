import "./index.scss";
/**
 * @constructor
 * @param {HTMLElement} target: 要触发tooltip的靶向元素
 * @param {String|HTMLElement} content: tooltip内容; 如果是元素实体，则该元素必须是display:none的
 * @param {Boolean} arrowVisible: 是否显示提示框气泡的尖角
 * @param {String} trigger: 触发方式(click, hover, focus, manual)。默认click
 * @param {Number} width: tooltip宽度
 * @param {String} placement: 与靶向元素的相对位置(top, bottom, left, right)。默认bottom
 */
class Tooltip {
	constructor(args) {
		if (!args?.target)
			throw new Error("tooltip need a target to triggered.");
		this.target = args.target;
		this.content = args.content;
		this.trigger = args.trigger;
		this.width = args.width ?? 200;
		this.arrowVisible = args.arrowVisible ?? true;
		this.placement = args.placement ?? "bottom";
		this.rander();
	}

	set show(val) {
		this._show = val;
		this.el.style.display = val ? "block" : "none";
	}

	get show() {
		return this._show;
	}

	rander() {
		const el = document.createElement("div");
		const angle = document.createElement("div");
		el.setAttribute("class", "a-tooltip");
		el.setAttribute("tabindex", "-1");
		this.target.setAttribute("tabindex", "0");
		angle.setAttribute("class", "a-tooltip__angle");
		if (this._isHTMLElement(this.content)) {
			el.append(this.content);
		} else {
			el.innerHTML = this.content;
		}

		el.appendChild(angle);
		const { style, angleStyle } = this.getStyle();
		el.style.cssText = style;
		angle.style.cssText = angleStyle;

		window.addEventListener("resize", () => {
			const { style, angleStyle } = this.getStyle();
			el.style.cssText = style;
			angle.style.cssText = angleStyle;
		});

		this.el = el;
		document.body.appendChild(el);
		this.getEvent(this.trigger)();
	}

	getTheme() {
		const theme = {
			borderColor: "#e8e8e8",
			bgColor: "#fff",
			textColor: "#888",
		};
		return theme;
	}

	getStyle() {
		const theme = this.getTheme();
		const placement = this.placement;
		const rect = this.target.getBoundingClientRect();

		const customStyle = `width: ${this.width}px;`;
		// console.table(rect);
		const angleDirMap = {
			top: `
			background-color: ${theme.bgColor};
			border-right-color: ${theme.borderColor};
			border-bottom-color: ${theme.borderColor};
			bottom: -5px;
			left: ${(rect.right - rect.left) / 2 - 4}px;`,

			bottom: `
			background-color: ${theme.bgColor};
			border-left-color: ${theme.borderColor};
			border-top-color: ${theme.borderColor};
			top: -5px;
			left: ${(rect.right - rect.left) / 2 - 4}px;`,

			left: `
			background-color: ${theme.bgColor};
			border-right-color: ${theme.borderColor};
			border-top-color: ${theme.borderColor};
			top: ${(rect.bottom - rect.top) / 2 - 4}px;
			right: -5px;`,

			right: `
			background-color: ${theme.bgColor};
			border-left-color: ${theme.borderColor};
			border-bottom-color: ${theme.borderColor};
			top: ${(rect.bottom - rect.top) / 2 - 4}px;
			left: -5px;`,
		};

		const dirMap = {
			top: `
			background-color: ${theme.bgColor};
			border: 1px solid ${theme.borderColor};
			left: ${rect.left}px;
			top: ${rect.top - 12}px;
			transform: translateY(-100%);`,

			bottom: `
			background-color: ${theme.bgColor};
			border: 1px solid ${theme.borderColor};
			left: ${rect.left}px;
			top: ${rect.bottom + 12}px;`,

			left: `
			background-color: ${theme.bgColor};
			border: 1px solid ${theme.borderColor};
			top: ${rect.top}px;
			left: ${rect.left - 12}px;
			transform: translateX(-100%);`,

			right: `
			background-color: ${theme.bgColor};
			border: 1px solid ${theme.borderColor};
			left: ${rect.right + 12}px;
			top: ${rect.top}px;`,
		};

		return {
			style: dirMap[placement] + customStyle,
			angleStyle: angleDirMap[placement],
		};
	}

	getEvent(trigger = "click") {
		const _this = this;
		const eventMap = {
			click() {
				_this.target.addEventListener(
					"click",
					() => {
						_this.show = !_this.show;
					},
					false
				);
				_this.target.addEventListener(
					"blur",
					() => {
						if (!_this.focus) _this.show = false;
					},
					false
				);
				_this.el.addEventListener(
					"blur",
					() => {
						_this.show = false;
					},
					false
				);
				_this.el.addEventListener(
					"mouseenter",
					() => {
						_this.focus = true;
					},
					false
				);
				_this.el.addEventListener(
					"mouseleave",
					() => {
						_this.focus = false;
					},
					false
				);
			},
			hover() {
				_this.target.addEventListener(
					"mouseenter",
					() => {
						_this.show = true;
					},
					false
				);
				_this.target.addEventListener(
					"mouseleave",
					() => {
						setTimeout(() => {
							if (!_this.focus) {
								_this.show = false;
							}
						}, 300);
					},
					false
				);
				_this.el.addEventListener(
					"mouseenter",
					() => {
						_this.focus = true;
					},
					false
				);
				_this.el.addEventListener(
					"mouseleave",
					() => {
						_this.focus = false;
						_this.show = false;
					},
					false
				);
			},
			focus() {},
			manual() {},
		};

		return eventMap[trigger];
	}

	_isHTMLElement(obj) {
		if (typeof HTMLElement === "object") {
			//Using W3 DOM2 (works for FF, Opera and Chrome)
			return obj instanceof HTMLElement;
		} else {
			// Browsers not supporting W3 DOM2 don't have HTMLElement
			// or type of HTMLElement is function
			// works on FF3, IE7, Chrome 1 and Opera 9
			return (
				obj &&
				typeof obj === "object" &&
				obj !== null &&
				obj.nodeType === 1 &&
				typeof obj.nodeName === "string"
			);
		}
	}
}

export default Tooltip;
