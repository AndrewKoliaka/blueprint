var ClassName = {
    MENU_PANEL: 'menu-panel',
    MENU_PANEL__COMPRESSED: 'menu-panel--compressed',
    MENU_EL: 'menu-el',
    NAV_MENU_LIST: 'nav-menu-list',
    BTN__SHOW_MENU: 'btn--show-menu',
    BTN__HIDE_MENU: 'btn--hide-menu',
    BTN__SHOW_INFO: 'btn--show-info',
    NONE: 'none'
}

function selector(className) {
    return '.' + className;
}

function showHideWorkerInit() {
    var z_coord = 1; //z-index value for worker description
    $(selector(ClassName.BTN__SHOW_INFO)).click(function (event) {
        event.stopPropagation();
        var target = $(event.target);
        var index = 0; //worker serial number
        var desc = null; //target description
        if (event.target.tagName === 'I') {
            target
                .toggleClass('fa-plus')
                .toggleClass('fa-minus');
            index = target
                .parent()
                .index();
        } else {
            $(target.children().get(0))
                .toggleClass('fa-plus')
                .toggleClass('fa-minus');
            index = target.index();
        }
        desc = $($('.worker-desc').get(index));
        desc
            .css('z-index', ++z_coord)
            .toggleClass('table')
            .toggleClass(ClassName.NONE);
    });
}

function countUp() {
    $('.number').counterUp();
}

function navigation() {
    var windowWidth = $(window).width(),
        menuPanel = $(selector(ClassName.MENU_PANEL)),
        showMenuBtn = $(selector(ClassName.BTN__SHOW_MENU)),
        hideMenuBtn = $(selector(ClassName.BTN__HIDE_MENU)),
        navMenuList = $(selector(ClassName.NAV_MENU_LIST)),
        menuEl = $(selector(ClassName.MENU_EL));

    var timerObj = null;

    windowWidth <= 1200
        ? menuForSmallScreen()
        : menuForLargeScreen();

    $(window).resize(function () {
        showMenuBtn.unbind();
        hideMenuBtn.unbind();
        menuPanel.unbind();
        menuEl.unbind();
        clearInterval(timerObj);
        menuPanel.removeClass(ClassName.MENU_PANEL__COMPRESSED);
        $(window).width() <= 1200
            ? menuForSmallScreen()
            : menuForLargeScreen();
    });

    function toggleButtons() {
        hideMenuBtn.toggleClass(ClassName.NONE);
        showMenuBtn.toggleClass(ClassName.NONE);
    }

    // screen width <= 1200
    function menuForSmallScreen() {
        navMenuList.hide();

        hideMenuBtn.addClass(ClassName.NONE);
        showMenuBtn.removeClass(ClassName.NONE);

        function toggleSmallMenu() {
            navMenuList.fadeToggle();
            toggleButtons();
        }

        function toggleMenuEventHandler(event) {
            event.preventDefault();
            toggleSmallMenu();
        }

        hideMenuBtn.click(toggleMenuEventHandler);
        showMenuBtn.click(toggleMenuEventHandler);
        menuEl.click(function () {
            setTimeout(toggleSmallMenu, 600);
        });
    }

    // screen width > 1200
    function menuForLargeScreen() {
        navMenuList.show();

        timerObj = setTimeout(function () {
            menuPanel.addClass(ClassName.MENU_PANEL__COMPRESSED);
            hideMenuBtn.addClass(ClassName.NONE);
            showMenuBtn.removeClass(ClassName.NONE);
        }, 5000);

        function toggleMenuEventHandler(event) {
            event.preventDefault();
            toggleButtons();
            menuPanel.toggleClass(ClassName.MENU_PANEL__COMPRESSED);
        }

        hideMenuBtn.click(toggleMenuEventHandler);
        showMenuBtn.click(toggleMenuEventHandler);

        menuPanel.mouseenter(function () {
            clearTimeout(timerObj);
            menuPanel.removeClass(ClassName.MENU_PANEL__COMPRESSED);
            hideMenuBtn.removeClass(ClassName.NONE);
            showMenuBtn.addClass(ClassName.NONE);
        });
        menuPanel.mouseleave(function () {
            if (!menuPanel.hasClass(ClassName.MENU_PANEL__COMPRESSED)) {
                timerObj = setTimeout(function () {
                    menuPanel.addClass(ClassName.MENU_PANEL__COMPRESSED);
                    toggleButtons();
                }, 2000);
            }
        });
    }
}

function mapOverlay() {
    var overlay = $('.map-area__overlay'),
        map = $('.map-area__map');

    overlay.click(function () {
        $(this).addClass(ClassName.NONE);
        map.focus();
    })

    map.blur(function () {
        overlay.removeClass(ClassName.NONE);
    });

    map.mouseout(function () {
        if (overlay.is(':hidden')) {
            overlay.removeClass(ClassName.NONE);
        }
    });
}

$(document)
    .ready(function () {
        carousel.init();
        showHideWorkerInit();
        countUp();
        navigation();
        mapOverlay();

        $("a").on('click', function (event) {
            if (this.hash !== "") {
                event.preventDefault();
                var hash = this.hash;
                $('html, body').animate({
                    scrollTop: $(hash)
                        .offset()
                        .top
                }, 700, function () {
                    window.location.hash = hash;
                });
            }
        });
    });