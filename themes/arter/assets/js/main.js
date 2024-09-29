
const sheetId = '1hXbfDk-nwaFAxenn8Z1zIqS4lofcAVXEj00lh6GkNFY';
const apiKey = 'AIzaSyCEu8JhFZyvVjgI1S9eRiJWKxog9a4tCIs';
const range = 'Post2!A1:L15'; // Ajusta el rango según tu hoja
const cacheKey = 'googleSheetData'; // Clave para el almacenamiento en localStorage
const cacheDuration = 3600000; // 1 hora en milisegundos
let containerBlogList = "";
let homeSlider = "";

const templeteBlogCardHome = (row) => {
  return `
  <!-- slide -->
<div class="swiper-slide">
	<!-- blog post card -->
	<div class="art-a art-blog-card">
		<div id="post-662"
			class="post-662 post type-post status-publish format-standard has-post-thumbnail hentry category-design category-web-development tag-figma tag-vite tag-vue">
			<!-- post cover -->
			<a class="art-port-cover post-thumbnail"
				href="${row.link}">
				<img fetchpriority="high"
					decoding="async"
					width="1280" height="768"
					src="${row.tumb_image}"
					class="attachment-arter_1280x768 size-arter_1280x768 wp-post-image"
					alt="${row.title}" />
			</a>
			<!-- post cover end -->
			<!-- post description -->
			<div class="art-post-description">
				<div
					class="art-project-category mb-15">
					<a href="${row.link}">
						<span
							class="art-el-date">${row.date_publish}</span>
					</a>
					/ <span
						class="art-el-category">${row.categorie}</span>
				</div>
				<!-- title -->
				<a href="${row.link}">
					<h5 class="mb-15">${row.title}</h5>
				</a>
				<!-- text -->
				<div class="art-el-description">
					<p>${row.short_description}</p>
				</div>
			</div>
			<!-- post description end -->
		</div>
	</div>
	<!-- blog post card end -->
</div>
<!-- slide end -->
`}

function templateBlogPost(row) {
  return `
      <!-- col -->
      <div class="col-lg-6">


        <!-- blog post card -->
        <div class="art-a art-blog-card">
          <div id="post-662"
            class="post-662 post type-post status-publish format-standard has-post-thumbnail hentry category-design category-web-development tag-figma tag-vite tag-vue">
            <!-- post cover -->
            <a class="art-port-cover post-thumbnail"
              href="${row.link}">
              <img fetchpriority="high"
                decoding="async" width="1280"
                height="768"
                src="${row.tumb_image}"
                class="attachment-arter_1280x768 size-arter_1280x768 wp-post-image"
                alt="${row.title}" />
            </a>

            <!-- post cover end -->
            <!-- post description -->
            <div class="art-post-description">
              <div
                class="art-project-category mb-15">
                <a href="${row.link}">
                  <span class="art-el-date">${row.date_publish}</span>
              </a>
              / <span
                class="art-el-category">${row.categorie}</span>
            </div>
            <!-- title -->
            <a href="${row.link}">
              <h5 class="mb-15">${row.title}</h5>
            </a>
            <!-- text -->
            <div class="art-el-description">
              <p>${row.short_description}</p>
            </div>
          </div>
          <!-- post description end -->
        </div>
      </div>
      <!-- blog post card end -->
    </div>
    <!-- col end -->
    <!-- col -->
    `;
}

function arrayToObjects(dataArray) {
  const [keys, ...rows] = dataArray; // Separar el primer array como claves y el resto como valores
  const result = [];

  // Recorrer las filas de valores
  rows.forEach(row => {
    let obj = {};
    keys.forEach((key, index) => {
      obj[key] = row[index] || ''; // Si el valor no existe, asignar una cadena vacía
    });
    result.push(obj);
  });

  return result;
}


async function fetchSheetData() {
  const cachedData = getCachedData();
  if (cachedData) {
    displayData(arrayToObjects(cachedData.values).filter(row => row.status === "Published"));
  } else {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`);
    const data = await response.json();
    setCachedData(data); // Guardar en cache
    displayData(arrayToObjects(data.values).filter(row => row.status === "Published"));
  }
}

function getCachedData() {
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    const parsedCache = JSON.parse(cached);
    const now = new Date().getTime();
    // Verificar si los datos han expirado
    if (now - parsedCache.timestamp < cacheDuration) {
      return parsedCache.data;
    } else {
      localStorage.removeItem(cacheKey); // Borrar datos si han expirado
    }
  }
  return null;
}

function setCachedData(data) {
  const now = new Date().getTime();
  const cacheData = {
    timestamp: now,
    data: data
  };
  localStorage.setItem(cacheKey, JSON.stringify(cacheData));
}

function parseDate(dateString) {
  const [day, month, year] = dateString.split('/');
  return new Date(year, month - 1, day); // El mes se resta por 1 ya que en JavaScript los meses empiezan en 0 (enero es 0).
}

// Ordenar el array por date_publish

function displayData(rows) {

  console.log({
    containerBlogList,
    homeSlider
  });

  if (containerBlogList) {
    containerBlogList.innerHTML = "";
    rows.sort((a, b) => {
      const dateA = parseDate(a.date_publish);
      const dateB = parseDate(b.date_publish);
      return dateB - dateA;
    }).forEach(row => {
      containerBlogList.innerHTML += templateBlogPost(row);
    });
  }

  if (homeSlider) {
    homeSlider.innerHTML = ''; // Limpiar contenedor antes de mostrar datos
    console.log(rows);

    rows.sort((a, b) => {
      const dateA = parseDate(a.date_publish);
      const dateB = parseDate(b.date_publish);
      return dateB - dateA;
    }).forEach(row => {
      homeSlider.innerHTML += templeteBlogCardHome(row);
    });

    initHomeBlogSlider();
  }
}


(async function ($) {
  'use strict';
  setTimeout(() => {  
    initPlugins($);
    containerBlogList = document.getElementById('blog-content');
    homeSlider = document.getElementById('swiper-wrapper');

  (containerBlogList || homeSlider) && fetchSheetData();
  }, 2000);



})(jQuery);


function initPlugins($) {
  $('.menu-item-type-custom').each(function () {
    $(this).find('> a').attr('data-no-swup', '');
  });

  if (!$('body').hasClass('default--scrolling')) {
    // scrollbar
    Scrollbar.use(OverscrollPlugin);
    if ($('#scrollbar').length) {
      var scrollbar = Scrollbar.init(document.querySelector('#scrollbar'), {
        damping: 0.05,
        renderByPixel: true,
        continuousScrolling: true,
      });
    }
    if ($('#scrollbar2').length) {
      var scrollbar2 = Scrollbar.init(document.querySelector('#scrollbar2'), {
        damping: 0.05,
        renderByPixel: true,
        continuousScrolling: true,
      });
    }
  }

  /**
    Header Fixed
  **/
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 40) {
      $('body').addClass('fixed');
    }
    else {
      $('body').removeClass('fixed');
    }
  });

  // page loading
  $(window).on("load", function () {
    anime({
      targets: '.art-preloader',
      opacity: [1, 0],
      delay: 2200,
      duration: 400,
      easing: 'linear',
      complete: function (anim) {
        $('.art-preloader').css('display', 'none');
      }
    });
    // counters
    anime({
      targets: '.art-counter-frame',
      opacity: [0, 1],
      duration: 800,
      delay: 2300,
      easing: 'linear',
    });

    anime({
      targets: '.art-counter',
      delay: 1300,
      opacity: [1, 1],
      complete: function (anim) {
        $('.art-counter').each(function () {
          $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
          }, {
            duration: 2000,
            easing: 'linear',
            step: function (now) {
              $(this).text(Math.ceil(now));
            }
          });
        });
      }
    });

    // progressbars
    var bar_delay = 2500;
    $('.art-skills-progress').each(function () {
      var bar_id = $(this).attr('id');
      var bar_val = parseInt($(this).attr('data-value')) / 100;
      var bar_type = $(this).attr('data-type');
      bar_delay = bar_delay + 100;

      if (bar_type == 'circles') {
        var bar = new ProgressBar.Circle('#' + bar_id, {
          strokeWidth: 7,
          easing: 'easeInOut',
          duration: 1400,
          delay: bar_delay,
          trailWidth: 7,
          step: function (state, circle) {
            var value = Math.round(circle.value() * 100);
            if (value === 0) {
              circle.setText('');
            } else {
              circle.setText(value);
            }
          }
        });
        bar.animate(bar_val);
      }
      if (bar_type == 'progress') {
        var bar = new ProgressBar.Line('#' + bar_id, {
          strokeWidth: 1.72,
          easing: 'easeInOut',
          duration: 1400,
          delay: bar_delay,
          trailWidth: 1.72,
          svgStyle: {
            width: '100%',
            height: '100%'
          },
          step: (state, bar) => {
            bar.setText(Math.round(bar.value() * 100) + ' %');
          }
        });
        bar.animate(bar_val);
      }
    });
  });
  $('.art-preloader-load-first').hide();
  var bar = new ProgressBar.Line(preloader, {
    strokeWidth: 1.7,
    easing: 'easeInOut',
    duration: 1400,
    delay: 750,
    trailWidth: 1.7,
    svgStyle: {
      width: '100%',
      height: '100%'
    },
    step: (state, bar) => {
      bar.setText(Math.round(bar.value() * 100) + ' %');
    }
  });

  bar.animate(1);

  // Contact form
  $('.art-input').keyup(function () {
    if ($(this).val()) {
      $(this).addClass('art-active');
    } else {
      $(this).removeClass('art-active');
    }
  });

  // Selecciona el formulario por su clase
  const form = document.querySelector('.wpcf7-form');
  let nombre = "";
  let email = "";
  let mensaje = "";

  if (form) {
    // Agrega un listener al evento submit del formulario
    form.addEventListener('submit', function (event) {
      // Prevenir el comportamiento predeterminado del submit
      nombre = document.querySelector('input[name="your-name"]').value;
      email = document.querySelector('input[name="your-email"]').value;
      mensaje = document.querySelector('textarea[name="your-message"]').value;
      event.preventDefault();

      // Tu función personalizada
      customSubmitFunction(event);

      // Si deseas continuar con el envío predeterminado después de tu lógica personalizada,
      // puedes llamar a form.submit() o eliminar el preventDefault() si no lo necesitas.
    });
  }

  // Definición de la función personalizada
  const customSubmitFunction = (event) => {

    setTimeout(() => {
      console.log($(form).hasClass('invalid'));
      if (!$(form).hasClass('invalid')) {
        // Aquí va tu lógica personalizada
        console.log('Formulario enviado. Realizando lógica personalizada.');
        console.log({
          nombre,
          email,
          mensaje
        });

        // Formato de mailto
        const mailtoLink = `mailto:gervisbermudez@outlook.com?subject=Mensaje de ${nombre}&body=Nombre: ${nombre}%0AEmail: ${email}%0AMensaje: ${mensaje}`;
        window.location.href = mailtoLink;
      }
    }, 500);

  };

  // portfolio filter
  $('.art-filter a').on('click', function () {
    $('.art-filter .art-current').removeClass('art-current');
    $(this).addClass('art-current');

    var selector = $(this).data('filter');
    $('.art-grid').isotope({
      filter: selector
    });
    return false;
  });

  /*
    Initialize portfolio items
  */
  if ($('.art-grid').length) {
    var $container = $('.art-grid');
    $container.imagesLoaded(function () {
      $container.isotope({
        filter: '*',
        itemSelector: '.art-grid-item',
        transitionDuration: '.6s',
      });
      $(document).on('lazyloaded', function (e) {
        $container.isotope('reloadItems').isotope();
      });
    });
  }

  // slider testimonials
  var swiper = new Swiper('.art-testimonial-slider', {
    slidesPerView: 3,
    spaceBetween: 30,
    speed: 1400,
    autoplay: false,
    autoplaySpeed: 5000,
    pagination: {
      el: '.art-testi-swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.art-testi-swiper-next',
      prevEl: '.art-testi-swiper-prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      720: {
        slidesPerView: 1,
      },
      1200: {
        slidesPerView: 2,
      },
      1500: {
        slidesPerView: 2,
      },
    },
  });

  // slider clients
  var swiper = new Swiper('.art-clients-slider', {
    slidesPerView: 4,
    spaceBetween: 30,
    speed: 1400,
    autoplay: false,
    autoplaySpeed: 5000,
    pagination: {
      el: '.art-clients-swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.art-clients-swiper-next',
      prevEl: '.art-clients-swiper-prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      720: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 4,
      },
      1500: {
        slidesPerView: 4,
      },
    },
  });

  // slider works
  var swiper = new Swiper('.art-works-slider', {
    slidesPerView: 3,
    spaceBetween: 30,
    speed: 1400,
    autoplay: {
      delay: 4000,
    },
    autoplaySpeed: 5000,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.art-works-swiper-next',
      prevEl: '.art-works-swiper-prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      720: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 2,
      },
      1500: {
        slidesPerView: 2,
      },
    },
  });

  /*
    Magnific Popups
  */
  if (/\.(?:jpg|jpeg|gif|png)$/i.test($('.wp-block-gallery .blocks-gallery-item:first a').attr('href'))) {
    $('.wp-block-gallery a').magnificPopup({
      gallery: {
        enabled: true
      },
      type: 'image',
      closeOnContentClick: false,
      fixedContentPos: false,
      closeBtnInside: false,
      callbacks: {
        beforeOpen: function () {
          // just a hack that adds mfp-anim class to markup
          this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
          this.st.mainClass = 'mfp-zoom-in';
        }
      },
    });
  }
  $('[data-magnific-inline]').magnificPopup({
    type: 'inline',
    overflowY: 'auto',
    preloader: false,
    callbacks: {
      beforeOpen: function () {
        this.st.mainClass = 'mfp-zoom-in';
      }
    },
  });
  $('[data-magnific-image]').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    fixedContentPos: false,
    closeBtnInside: false,
    callbacks: {
      beforeOpen: function () {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
        this.st.mainClass = 'mfp-zoom-in';
      }
    },
  });
  if (!$('body').hasClass('elementor-page')) {
    $("a").each(function (i, el) {
      var href_value = el.href;
      if (/\.(jpg|png|gif)$/.test(href_value)) {
        $(el).magnificPopup({
          type: 'image',
          closeOnContentClick: true,
          fixedContentPos: false,
          closeBtnInside: false,
          callbacks: {
            beforeOpen: function () {
              // just a hack that adds mfp-anim class to markup
              this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
              this.st.mainClass = 'mfp-zoom-in';
            }
          },
        });
      }
    });
  }
  $('[data-magnific-video]').magnificPopup({
    type: 'iframe',
    iframe: {
      patterns: {
        youtube_short: {
          index: 'youtu.be/',
          id: 'youtu.be/',
          src: 'https://www.youtube.com/embed/%id%?autoplay=1'
        }
      }
    },
    preloader: false,
    fixedContentPos: false,
    callbacks: {
      markupParse: function (template, values, item) {
        template.find('iframe').attr('allow', 'autoplay');
      },
      beforeOpen: function () {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
        this.st.mainClass = 'mfp-zoom-in';
      }
    },
  });
  $('[data-magnific-music]').magnificPopup({
    type: 'iframe',
    preloader: false,
    fixedContentPos: false,
    closeBtnInside: true,
    callbacks: {
      beforeOpen: function () {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
        this.st.mainClass = 'mfp-zoom-in';
      }
    },
  });
  $('[data-magnific-gallery]').magnificPopup({
    gallery: {
      enabled: true
    },
    type: 'image',
    closeOnContentClick: false,
    fixedContentPos: false,
    closeBtnInside: false,
    callbacks: {
      beforeOpen: function () {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
        this.st.mainClass = 'mfp-zoom-in';
      }
    },
  });

  $('.current-menu-item a').clone().appendTo('.art-current-page');

  $('.art-map-overlay').on('click', function () {
    $(this).addClass('art-active');
  });

  $('.art-info-bar-btn').on('click', function () {
    $('.art-info-bar').toggleClass('art-active');
    $('.art-menu-bar-btn').toggleClass('art-disabled');
  });

  $('.art-menu-bar-btn').on('click', function () {
    $('.art-menu-bar-btn , .art-menu-bar').toggleClass("art-active");
    $('.art-info-bar-btn').toggleClass('art-disabled');
  });

  $('.art-info-bar-btn , .art-menu-bar-btn').on('click', function () {
    $('.art-content').toggleClass('art-active');
  });

  $('.art-curtain , .art-mobile-top-bar').on('click', function () {
    $('.art-menu-bar-btn , .art-menu-bar , .art-info-bar , .art-content , .art-menu-bar-btn , .art-info-bar-btn').removeClass('art-active , art-disabled');
  });

  $('.menu-item a').on('click', function () {
    if ($(this).parent().hasClass('menu-item-has-children')) {
      $(this).parent().children('.sub-menu').toggleClass('art-active');
      if ($(this).attr('href') != '' && $(this).attr('href') != '#' && $(this).attr('href') != '#.') {
        if ($(this).parent().hasClass('opened')) {
          $(this).parent().removeClass('opened');
        } else {
          $(this).parent().addClass('opened');
          return false;
        }
      } else {
        return false;
      }
    } else {
      $('.art-menu-bar-btn , .art-menu-bar , .art-info-bar , .art-content , .art-menu-bar-btn , .art-info-bar-btn').removeClass('art-active , art-disabled');
    }

    if ($(this).attr('href') != '' && $(this).attr('href') != undefined) {
      if ($(this).attr('href').charAt(0) == "#") {
        var section_id = $(this).attr('href');

        if ($(section_id).length && !$('body').hasClass('default--scrolling')) {
          var section_top = scrollbar.scrollTop + $(section_id).offset().top - 30;
          scrollbar.scrollTo(0, section_top, 500);
        }
      }
    }
  });

  $('.art-price-list li').each(function () {
    if ($(this).find('del').text()) {
      $(this).addClass('art-empty-item');
      $(this).html($(this).find('del').text());
    }
  });

  $('.art-input').on('focusin', function () {
    $(this).parent().next('label').addClass('focused');
  });
  $('.art-input').on('focusout', function () {
    $(this).parent().next('label').removeClass('focused');
  });

  /* Cart Popup */
  $('.cart-btn .cart-icon').on('click', function () {
    if ($(this).closest('.cart-btn').hasClass('opened')) {
      $(this).closest('.cart-btn').removeClass('opened');
    } else {
      $(this).closest('.cart-btn').addClass('opened');
    }
    return false;
  });
}

function initHomeBlogSlider() {
  return new Swiper('.art-blog-slider', {
    slidesPerView: 3,
    spaceBetween: 30,
    speed: 1400,
    autoplay: {
      delay: 4000,
    },
    autoplaySpeed: 5000,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.art-blog-swiper-next',
      prevEl: '.art-blog-swiper-prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      720: {
        slidesPerView: 1,
      },
      1200: {
        slidesPerView: 2,
      },
      1500: {
        slidesPerView: 3,
      },
    },
  });
}

