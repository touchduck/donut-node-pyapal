$(document).ready(function () {
    $('li').each(function(){
            $(this).removeClass('active');
    });
    $('ul.nav.navbar-nav').find('a[href="' + location.pathname + '"]').closest('li').addClass('active');
});