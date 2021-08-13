// import temp from "./tooltip.art";
import "./index.scss";

class ToolTip {
	constructor(args) {
		if (!args?.target)
			throw new Error("tooltip need a target to triggered");
		this.target = args.target;
		this.content = args.content ?? temp({});
		this.trigger = args.trigger;
		this.arrowVisible = args.arrowVisible ?? true;
		this.init();
	}

	init() {
		const el = document.createElement("div");
		const angle = document.createElement("div");
		el.setAttribute("class", "a-tooltip");
		angle.setAttribute("class", "a-tooltip__angle");
		const tarPosition = {
			offsetLeft: this.target.offsetLeft,
			offsetTop: this.target.offsetTop,
			offsetWidth: this.target.offsetWidth,
			offsetHeight: this.target.offsetHeight,
		};
		console.table(tarPosition);
		el.innerText = this.content;
		el.appendChild(angle);
		document.body.appendChild(el);
		this.el = el;
		this.setTrigger(this.trigger)();
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

	rander() {
		const { offsetLeft, offsetTop, offsetWidth, offsetHeight } =
			this.target;
	}

	show() {
		this.el.style.display = "block";
	}

	hide() {
		this.el.style.display = "none";
	}
}


export default ToolTip;
