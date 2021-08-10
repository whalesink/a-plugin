// import temp from "./tooltip.art";
import "./index.scss";

class ToolTip {
	constructor(args) {
		if (!args.target) throw new Error("tooltip need a target to triggered");
		this.target = args.target;
		this.context = args.context ?? temp({});
		// this.trigger = args.trigger ?? "hover";

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
		el.innerText = this.context;
		el.appendChild(angle);
		document.body.appendChild(el);
		this.el = el;
		console.table(tarPosition);
		this.trigger();
	}

	trigger() {
		this.target.addEventListener(
			"click",
			(e) => {
				this.el.style.display = "block";
				console.log(this.el);
			},
			false
		);
	}

	show() {}

	hide() {}
}

export default ToolTip;
