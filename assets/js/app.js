$(function () {

	let _timerId;

	let header = $(".header"),
		introH = $(".intro").innerHeight(),
		scrolloffset = $(window).scrollTop();


	/* Fixed header */
	checkScroll(scrolloffset);

	$(window).on("scroll", function () {
		scrolloffset = $(this).scrollTop();

		checkScroll(scrolloffset);
	});

	function checkScroll(scrolloffset) {
		if (scrolloffset >= introH) {
			header.addClass("fixed");
		} else {
			header.removeClass("fixed");
		}
	}


	/* Smooth scroll */
	$("[data-scroll]").on("click", function (event) {
		event.preventDefault();

		let $this = $(this),
			blockId = $this.data("scroll");  // get id of select element
		blockOffset = $(blockId).offset().top;

		console.log($this);

		$(".nav a").removeClass("active");
		$this.addClass("active");

		$("html, body").animate({
			scrollTop: blockOffset
		}, 500);
	});


	/* Menu nav toggle */
	$(".nav-toggle").on("click", function (event) {
		event.preventDefault();

		$(this).toggleClass("active");
		$(".nav").toggleClass("active");

	});


	/* Collapse */
	let accordion = function () {
		let accordionItem = document.querySelectorAll('.accordion__item'),
			active = {},
			content = {},
			contentText = {};

		accordionItem.forEach((item, i) => {
			content[i] = item.querySelector('.accordion__content');
			contentText[i] = content[i].querySelector('p');
			active[i] = item.classList.contains('active');

			item.addEventListener('click', (evt) => {
				evt.preventDefault();

				for (let key in active) {
					if (active[key]) {
						content[key].style.paddingBottom = content[key].style.paddingTop = '0';
						content[key].style.height = '0';
						content[key].parentElement.classList.remove('active');
						active[key] = false;
					} else if (key == i) {
						content[key].style.paddingBottom = content[key].style.paddingTop = '15px';
						content[key].style.height = `${contentText[key].clientHeight + 30}px`;
						content[key].parentElement.classList.add('active');
						active[key] = true;
					}
				}
			});

			// deselect of item
			item.onmousedown = item.onselectstart = function () {
				return false;
			};

		});
	}();


	/* Gallery */
	let gallery = document.querySelectorAll('.works__item'),
		modal = document.querySelector('.modal'),
		modalBody = modal.querySelector('.modal__body'),
		modalImg = modalBody.querySelector('img');

	gallery.forEach((item) => {
		item.addEventListener('click', (evt) => {
			evt.preventDefault();
			modal.style.display = "block";
			clearTimeout(_timerId);

			const img = item.querySelector('.works__img');

			modalImg.src = img.getAttribute('data-url');

			_timerId = setTimeout(() => {
				let imgProportion = modalImg.naturalWidth / modalImg.naturalHeight,
					modalProportion = modalBody.clientWidth / modalBody.clientHeight;

				if (imgProportion > modalProportion) {
					modalImg.style.width = `${modalBody.clientWidth}px`;
					modalImg.style.height = `auto`;
				} else {
					modalImg.style.height = `${modalBody.clientHeight}px`;
					modalImg.style.width = `auto`;
				}
			}, 10);
		})
	});

	// close the modal window if you click outside
	modal.addEventListener('click', (evt) => {
		if (!evt.target.classList.contains('modal__body')) {
			modal.style.display = "none";
		}
	});

	// close the modal window if you press Esc
	document.addEventListener('keydown', (evt) => {
		if (evt.key === "Escape") {
			modal.style.display = "none";
		}
	});

	/* Slider */
	multiItemSlider('.miniSlider1', {
		dots: true,
		dotsExist: true,
		isCycling: true,
		interval: 3000,
		pause: false
	});

	multiItemSlider('.miniSlider2', {
		slidesCount: 3
	});

	multiItemSlider('.miniSlider3', {
		slidesCount: 3
	});


});