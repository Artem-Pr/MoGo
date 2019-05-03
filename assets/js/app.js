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
	let accordionItem = document.querySelectorAll('.accordion__item');

	accordionItem.forEach((item) => {
		let content = item.querySelector('.accordion__content'),
			text = content.querySelector('p'),
			active = false;

		if (item.classList.contains('active')) active = true;

		item.addEventListener('click', (evt) => {
			evt.preventDefault();
			if (active) {
				active = false;
				content.style.paddingBottom = content.style.paddingTop = '0';
				content.style.height = '0';
				item.classList.remove('active');
			} else {
				active = true;
				content.style.paddingBottom = content.style.paddingTop = '15px';
				content.style.height = `${text.clientHeight + 30}px`;
				item.classList.add('active');
			}
		});
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