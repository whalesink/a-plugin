import "./index.scss";
/**
 * @constructor
 * @param {HTMLElement} target: 要触发tooltip的靶向元素
 * @param {String|HTMLElement} content: tooltip内容
 * @param {Boolean} arrowVisible: 是否显示提示框气泡的尖角
 * @param {String} trigger: 触发方式(click, hover, focus, manual)。默认click
 * @param {String} placement: 与靶向元素的相对位置(top, bottom, left, right)。默认bottom
 *
 */
class ToolTip {
	constructor(args) {
		if (!args?.target)
			throw new Error("tooltip need a target to triggered.");
		this.target = args.target;
		this.content = args.content;
		this.trigger = args.trigger;
		this.arrowVisible = args.arrowVisible ?? true;
		this.placement = args.placement ?? "bottom";
		this.rander();
	}

	rander() {
		const el = document.createElement("div");
		const angle = document.createElement("div");
		el.setAttribute("class", "a-tooltip");
		angle.setAttribute("class", "a-tooltip__angle");
		el.innerHTML = this.content;
		el.appendChild(angle);

		const { style, angleStyle } = this.getStyle();
		el.style.cssText = style;
		angle.style.cssText = angleStyle;

		this.el = el;
		document.body.appendChild(el);
		this.setTrigger(this.trigger)();
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
		console.table(rect);
		const angleDirMap = {
			top: `
			background-color: ${theme.bgColor};
			border-right-color: ${theme.borderColor};
			border-bottom-color: ${theme.borderColor};
			bottom: -5px;
			left: ${(rect.right - rect.left) / 2}px;`,

			bottom: `
			background-color: ${theme.bgColor};
			border-left-color: ${theme.borderColor};
			border-top-color: ${theme.borderColor};
			top: -5px;
			left: ${(rect.right - rect.left) / 2}px;`,
		};

		const dirMap = {
			top: `
			background-color: ${theme.bgColor};
			border: 1px solid ${theme.borderColor};
			left: ${rect.left}px;
			top: ${rect.top}px;
			transform: translateY(calc(-100% - 16px));`,

			bottom: `
			background-color: ${theme.bgColor};
			border: 1px solid ${theme.borderColor};
			left: ${rect.left}px;
			top: ${rect.bottom + 16}px`,
		};

		return {
			style: dirMap[placement],
			angleStyle: angleDirMap[placement],
		};
	}

	setTrigger(trigger = "click") {
		const _this = this;
		const eventMap = {
			click() {
				_this.target.addEventListener(
					"click",
					_this.show.bind(_this),
					false
				);
				_this.target.addEventListener(
					"blur",
					_this.hide.bind(_this),
					false
				);
			},
			hover() {
				_this.target.addEventListener(
					"click",
					_this.show.bind(_this),
					false
				);
			},
			focus() {},
			manual() {},
		};

		return eventMap[trigger];
	}

	show() {
		this.el.style.display = "block";
	}

	hide() {
		this.el.style.display = "none";
	}
}

export default ToolTip;
