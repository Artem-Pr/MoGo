$(function () {

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
	let galleryFunc = function () {

		let worksGallery = document.querySelector('.works'),
			modal = document.querySelector('.modal'),
			btn = modal.querySelectorAll('.modal__btn'),
			modalBody = modal.querySelector('.modal__body'),
			modalImg = modalBody.querySelector('img'),
			heightIndent = 100,
			target,
			timerId;


		// show modal window
		worksGallery.addEventListener('click', evt => {
			evt.preventDefault();
			target = evt.target;
			while (target !== worksGallery) {
				if (target.classList.contains('works__img')) {
					showPicture();
					return;
				}
				if (target.classList.contains('works__item')) target = target.querySelector('.works__img');
				else target = target.parentNode;
			}
		});


		// close the modal window if you click outside
		modal.addEventListener('click', (evt) => {
			let target = evt.target;
			if (target !== modal) return;
			modal.style.display = "none";
			modalImg.src = '#';
			modal.style.opacity = "0";
		});

		// close the modal window if you press Esc
		document.addEventListener('keydown', (evt) => {
			if (evt.key === "Escape") {
				modal.style.display = "none";
				modalImg.src = '#';
				modal.style.opacity = "0";
			}
		});


		btn.forEach(item => {
			let direction;
			if (item.classList.contains('modal__btn--left')) direction = 'left';
			else direction = 'right';

			item.addEventListener('click', evt => {
				evt.preventDefault();
				imgLoad(direction);
			});
		});


		function showPicture() {

			modal.style.display = "block";
			clearTimeout(timerId);

			let maxHeight = modal.clientHeight - heightIndent,
				modalBodyHeight = modalBody.clientWidth / 1.5;

			if (modalBodyHeight > maxHeight) {
				modalBody.style.height = `${maxHeight}px`;
				modalBody.style.width = `${maxHeight * 1.5}px`;
			} else modalBody.style.height = `${modalBodyHeight}px`;

			timerId = setTimeout(() => {
				imgLoad();
				modal.style.opacity = "1";
			}, 0);
		}


		function imgLoad(direction) {
			if (direction) {
				let parent = target.parentElement;
				switch (direction) {
					case 'left':
						if (parent.previousElementSibling) {
							target = parent.previousElementSibling.querySelector('.works__img');
						} else {
							parent = parent.parentElement;
							target = parent.lastElementChild.querySelector('.works__img');
						}
						break;
					case 'right':
						if (parent.nextElementSibling) {
							target = parent.nextElementSibling.querySelector('.works__img');
						} else {
							parent = parent.parentElement;
							target = parent.firstElementChild.querySelector('.works__img');
						}
				}
			}

			modalImg.src = target.getAttribute('data-url');

			let imgProportion = modalImg.naturalWidth / modalImg.naturalHeight,
				modalProportion = modalBody.clientWidth / modalBody.clientHeight;

			if (imgProportion > modalProportion) {
				modalImg.style.width = `${modalBody.clientWidth}px`;
				modalImg.style.height = `auto`;
			} else {
				modalImg.style.height = `${modalBody.clientHeight}px`;
				modalImg.style.width = `auto`;
			}
		}


	}();


	/* Sliders */
	multiItemSlider('.miniSlider1', {
		dots: true,
		dotsExist: true,
		isCycling: true,
		interval: 3000,
		pause: false,
		dotsPause: true
	});

	multiItemSlider('.miniSlider2', {
		slidesCount: 3
	});

	multiItemSlider('.miniSlider3', {
		slidesCount: 3
	});


});