var app = new Vue({
	el: "#app",
	data: {
		newTitle: "",
		newCount: "10",
		source: [
			{ title: "Menu 1", count: 100 },
			{ title: "Menu 2", count: 40 },
			{ title: "Menu 6", count: 20 },
			{ title: "Špeciál", count: 30 },
			{ title: "Dezert", count: 50 },
		],
		items: [],
	},
	methods: {
		countUp(item) {
			item.count++;
			save();
		},

		countDown(item) {
			if (item.count > 0) {
				item.count--;
				save();
			}
		},

		reset() {
			if (window.confirm("Naozaj chcete vymazať všetky?")) {
				this.items = this.source;
				save();
			}
		},
	},
	created() {
		Storage.prototype.setStuff = function (key, value) {
			this.setItem(key, JSON.stringify(value));
		};

		Storage.prototype.getStuff = function (key) {
			const value = this.getItem(key);
			return value && JSON.parse(value);
		};

		// element which needs to enter full-screen mode
		var element = document.querySelector("body");

		// make the element go to full-screen mode
		element.requestFullscreen()
			.then(function() {
				// element has entered fullscreen mode successfully
			})
			.catch(function(error) {
				// element could not enter fullscreen mode
			});

		save = () => {
			localStorage.setStuff("zaznamy", this.items);
		};

		if (!localStorage.getStuff("zaznamy")) {
			localStorage.setStuff("zaznamy", this.source);
		}

		this.items = localStorage.getStuff("zaznamy");
	},
});
