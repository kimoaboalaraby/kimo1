// Preloader
$(window).on('load', function() {
    $('.preloader').fadeOut('slow');
  });
  
  // Mobile Menu Toggle
  $(document).ready(function() {
    $('.mobile-menu-btn').click(function() {
      $(this).find('i').toggleClass('fa-times');
      $('.nav-menu').toggleClass('active');
    });
    
    // Close mobile menu when clicking on a link
    $('.nav-link').click(function() {
      $('.nav-menu').removeClass('active');
      $('.mobile-menu-btn i').removeClass('fa-times');
    });
    
    // Header Scroll Effect
    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $('.header').addClass('scrolled');
      } else {
        $('.header').removeClass('scrolled');
      }
      
      // Back to Top Button
      if ($(this).scrollTop() > 300) {
        $('.back-to-top').addClass('active');
      } else {
        $('.back-to-top').removeClass('active');
      }
    });
    
    // Smooth Scrolling
    $('a[href*="#"]').on('click', function(e) {
      e.preventDefault();
      
      $('html, body').animate(
        {
          scrollTop: $($(this).attr('href')).offset().top - 80,
        },
        500,
        'linear'
      );
    });
    
    // Back to Top Button
    $('.back-to-top').click(function(e) {
      e.preventDefault();
      $('html, body').animate({scrollTop: 0}, 500);
    });
    
    // Testimonials Slider
    $('.testimonial-slider').owlCarousel({
      loop: true,
      margin: 30,
      nav: false,
      dots: true,
      autoplay: true,
      autoplayTimeout: 5000,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 1
        },
        992: {
          items: 1
        }
      }
    });
    
    // Designs Slider
    $('.design-slider').owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      dots: false,
      autoplay: true,
      autoplayTimeout: 4000,
      rtl: true,
      navText: ["<i class='fas fa-chevron-right'></i>","<i class='fas fa-chevron-left'></i>"],
      responsive: {
        0: {
          items: 1
        },
        576: {
          items: 2
        },
        768: {
          items: 3
        },
        992: {
          items: 4
        }
      }
    });
    
    // Design Popup
    $('.view-design').click(function(e) {
      e.preventDefault();
      var designId = $(this).data('id');
      // Here you would typically fetch the design details based on the ID
      // For demo purposes, we'll just show the popup with sample data
      $('#design-popup').addClass('show');
      $('body').css('overflow', 'hidden');
    });
    
    $('.popup-close').click(function() {
      $('#design-popup').removeClass('show');
      $('body').css('overflow', 'auto');
    });
    
    // Close popup when clicking outside
    $(document).mouseup(function(e) {
      var popup = $('.popup-container');
      if (!popup.is(e.target) && popup.has(e.target).length === 0) {
        $('#design-popup').removeClass('show');
        $('body').css('overflow', 'auto');
      }
    });
    
    // Thumbnail Click
    $('.popup-thumbnail').click(function() {
      $('.popup-thumbnail').removeClass('active');
      $(this).addClass('active');
      var newSrc = $(this).attr('src').replace('-thumb', '-large');
      $('.popup-main-image').attr('src', newSrc);
    });
    
    // Video Popup
    $('.video-play').click(function() {
      var videoUrl = 'https://www.youtube.com/watch?v=VIDEO_ID';
      $.magnificPopup.open({
        items: {
          src: videoUrl
        },
        type: 'iframe',
        iframe: {
          patterns: {
            youtube: {
              index: 'youtube.com/',
              id: 'v=',
              src: 'https://www.youtube.com/embed/%id%?autoplay=1'
            }
          }
        }
      });
    });
    
    // Counter Up
    $('.counter').counterUp({
      delay: 10,
      time: 1000
    });
    
    // Animation on Scroll
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
    
    // Particles.js
    particlesJS.load('particles-js', 'assets/particles.json', function() {
      console.log('Particles.js loaded');
    });
    
    // Ripple Effect
    $('.btn, .design-btn, .popup-btn').on('click', function(e) {
      var x = e.pageX - $(this).offset().left;
      var y = e.pageY - $(this).offset().top;
      
      var ripple = $('<span class="ripple"></span>').css({
        top: y,
        left: x
      });
      
      $(this).append(ripple);
      
      setTimeout(function() {
        ripple.remove();
      }, 1000);
    });
    
    // Add New Design Functionality (for Blogger dashboard)
    function addNewDesign() {
      var designTitle = prompt('أدخل عنوان التصميم:');
      if (!designTitle) return;
      
      var designCategory = prompt('أدخل فئة التصميم (دعوات زفاف، ستوري، فيديوهات، إلخ):');
      if (!designCategory) return;
      
      var designCode = prompt('أدخل كود التصميم:');
      if (!designCode) return;
      
      var designImage = prompt('أدخل رابط صورة التصميم:');
      if (!designImage) return;
      
      var designDescription = prompt('أدخل وصف التصميم:');
      var designPrice = prompt('أدخل سعر التصميم:') || '150 ر.س';
      
      // Create new design HTML
      var newDesign = `
        <div class='design-item'>
          <div class='design-image'>
            <img src='${designImage}' alt='${designTitle}'/>
          </div>
          <div class='design-info'>
            <h4 class='design-title'>${designTitle}</h4>
            <p class='design-code'><i class='fas fa-hashtag'></i> كود: ${designCode}</p>
            <div class='design-meta'>
              <div class='design-rating'>
                <i class='fas fa-star'></i>
                <i class='fas fa-star'></i>
                <i class='fas fa-star'></i>
                <i class='fas fa-star'></i>
                <i class='fas fa-star'></i>
              </div>
              <p class='design-sales'><i class='fas fa-shopping-cart'></i> تم بيع 0 نسخة</p>
            </div>
            <p class='design-price'>السعر: ${designPrice}</p>
            <a href='#' class='design-btn view-design'>عرض التفاصيل</a>
          </div>
        </div>
      `;
      
      // Find the appropriate category and append the new design
      var categories = $('.design-category');
      var categoryFound = false;
      
      categories.each(function() {
        var categoryTitle = $(this).find('.category-title').text().trim();
        if (categoryTitle.includes(designCategory)) {
          $(this).find('.design-slider .owl-stage').append(newDesign);
          $(this).find('.design-slider').trigger('refresh.owl.carousel');
          categoryFound = true;
          return false; // break the loop
        }
      });
      
      if (!categoryFound) {
        // If category doesn't exist, create a new one
        var newCategory = `
          <div class='design-category'>
            <h3 class='category-title'>${designCategory}</h3>
            <div class='design-slider owl-carousel'>
              ${newDesign}
            </div>
          </div>
        `;
        
        $('.designs .container').append(newCategory);
        $('.design-slider').owlCarousel({
          loop: true,
          margin: 30,
          nav: true,
          dots: false,
          autoplay: true,
          autoplayTimeout: 4000,
          rtl: true,
          navText: ["<i class='fas fa-chevron-right'></i>","<i class='fas fa-chevron-left'></i>"],
          responsive: {
            0: { items: 1 },
            576: { items: 2 },
            768: { items: 3 },
            992: { items: 4 }
          }
        });
      }
      
      alert('تمت إضافة التصميم بنجاح!');
    }
  });