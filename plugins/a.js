// new Toast({opts})
// Toast.show(msg, {...opts})
// Toast.success(...)

class Toast {
	constructor(opts) {
		this.title = opts.title;
		this.durations = opts.durations || 2000;

		this.el = document.createElement("div");
		this.el.setAttribute("class", "a-toast");
		this.el.innerHTML = this.title;
		document.body.appendChild(this.el);

		this.show();
	}

	show() {
		this.el.classList.add("show");
		setTimeout(() => {
			this.el.classList.remove("show");
			this.el.classList.add("hide");
			this.el.addEventListener("animationend", () => {
				this.el.remove();
			});
		}, this.durations);
	}

	// hide() {}

	success() {}

	error() {}

	info() {}

	warn() {}
}
