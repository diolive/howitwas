$(function () {
    $('.ui.menu > a.item').each(function (index, item) {
        var $item = $(item);
        if ($item.attr('href') === document.location.pathname) {
            $item.addClass('active');
        }
    });
});
