$(() => {
    $('.ui.menu > a.item').each((index: number, item: Element) => {
        var $item = $(item);

        if ($item.attr('href') === document.location.pathname) {
            $item.addClass('active');
        }
    });
});