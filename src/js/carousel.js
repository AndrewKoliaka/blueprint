var carousel = (function () {
    var owl,
        index = 0,
        last = 0;
    var iconNamesWhite = [
            'icon-cube-w', 'icon-speedometer-w', 'icon-line-chart-w'
        ],
        iconNamesBlack = ['icon-cube', 'icon-speedometer', 'icon-line-chart'];
    var isScrollAllowed = true;

    return {
        init: function () {
            var self = this;
            owl = $('.owl-carousel');
            owl.owlCarousel({items: 1, loop: true, autoplay: true, autoplayTimeout: 5000});
            owl.on('changed.owl.carousel', function (event) {
                var index = (event.item.index - 2) < 0
                    ? 2
                    : event.item.index - 2;
                var icon = $('.card__icon-wrapper').get(index);

                $($('.card__icon-wrapper').get(last))
                    .children()
                    .removeClass(iconNamesWhite[last])
                    .addClass(iconNamesBlack[last]);
                $('.card__icon-wrapper').removeClass('card__icon-wrapper--active');
                $(icon).addClass('card__icon-wrapper--active');
                $(icon)
                    .children()
                    .addClass(iconNamesWhite[index]);
                last = index;
            });
            $('.carousel-btn--prev').click(this.prevSlide);
            $('.carousel-btn--next').click(this.nextSlide);
            $('.btn--expand').click(this.expand);

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
            if ($('.slide--expanded').length === 1) {
                return false;
            }
            isScrollAllowed = false;
            var slide = $(this)
                .parent()
                .parent();
            var img = $(slide.children().get(0));
            var caption = $(slide.children().get(1));

            var expadedSlide = $(`
            <div class="slide slide--expanded">
                <span class="btn btn--close">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </span>
                <figure>
                    <img class="slide__img" src="${img.attr('src')}" alt="${img.attr('alt')}">
                    <figcaption class="slide__caption">
                        ${caption.html()}
                    </figcaption>
                </figure>
            </div>`).appendTo(document.body);
            $('.btn--close').click(() => {
                $('.slide--expanded').remove();
                owl.trigger('play.owl.autoplay', [1000]);
                isScrollAllowed = true;
            });
            owl.trigger('stop.owl.autoplay');
        }
    }
})();