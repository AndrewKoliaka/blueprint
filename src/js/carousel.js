 var carousel = (function () {
     var owl, index = 0,
         last = 0;
     var iconNamesWhite = ['icon-cube-w', 'icon-speedometer-w', 'icon-line-chart-w'],
         iconNamesBlack = ['icon-cube', 'icon-speedometer', 'icon-line-chart'];
     var isScrollAllowed = true;

     return {
         init: function () {
             var self = this;
             owl = $('.owl-carousel');
             owl.owlCarousel({
                 items: 1,
                 loop: true,
                 autoplay: true,
                 autoplayTimeout: 5000
             });
             owl.on('changed.owl.carousel', function (event) {
                 var index = (event.item.index - 2) < 0 ? 2 : event.item.index - 2;
                 var icon = $('.icon').get(index);

                 $($('.icon').get(last)).children().removeClass().addClass(iconNamesBlack[last]);
                 $('.icon').removeClass('is-icon-active');
                 $(icon).addClass('is-icon-active');
                 $(icon).children().addClass(iconNamesWhite[index]);
                 last = index;
             });
             $('#prev-btn').click(this.prevSlide);
             $('#next-btn').click(this.nextSlide);
             $('.expand_btn').click(this.expand);

            //  if slide in full screen - disable scrolling
             $('body').on('mousewheel', function (event) {
                 if (!isScrollAllowed) {
                     event.preventDefault();
                 }
             });
         },
         nextSlide: function () {
             owl.trigger('next.owl.carousel');
         },
         prevSlide: function () {
             owl.trigger('prev.owl.carousel');
         },
         expand: function (event) {
             if ($('#expaded_slide').length === 1) {
                 return false;
             }
             isScrollAllowed = false;
             var slide = $(this).parent();
             var img = $(slide.children().get(0));
             var caption = $(slide.children().get(1));

             var expaded_slide = $(`
            <div id="expanded_slide">
                <span id="close_btn">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </span>
                <figure>
                    <img src="${img.attr('src')}" alt="${img.attr('alt')}">
                    <figcaption>
                        ${caption.html()}
                    </figcaption>
                </figure>
            </div>`).appendTo(document.body);
             $('#close_btn').click(() => {
                 $('#expanded_slide').remove();
                 owl.trigger('play.owl.autoplay', [1000]);
                 isScrollAllowed = true;
             });
             owl.trigger('stop.owl.autoplay');
         }
     }
 })();