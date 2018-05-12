$(document).ready(function() {
    var $menu = $('.header_navigation'),
        $scroll = $('.cover-scroll-down'),
        $menu_toggle = $('.header_navigation-toggle');

    $menu_toggle.click(function() {
        if ($menu_toggle.hasClass("fa-bars")) {
            // Открытие меню
            $menu_toggle.removeClass("fa-bars");
            $menu_toggle.addClass("fa-times");
            $menu_toggle.addClass("header_navigation-toggle__open");

            $menu.addClass("header_navigation__open");

        } else {
            // Закрытие меню
            $menu_toggle.removeClass("fa-times");
            $menu_toggle.removeClass("header_navigation-toggle__open");
            $menu_toggle.addClass("fa-bars");

            $menu.removeClass("header_navigation__open");
        }
    });


    $scroll.click(function(e) {
        // По нажатью скролл до статьи
        e.preventDefault();
        $bar = $(".post-meta-bar");
        var r = $bar.offset().top + $bar.outerHeight();
        $("html, body").animate({ scrollTop: r }, 600);
    });
});
