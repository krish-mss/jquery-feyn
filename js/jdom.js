/* "Manipulation for DOM", Date: 2013/05/05
 * copyright by Zan Pan under GNU GPL3
*/

(function() {
'use strict';

var url = window.location.href,
  html = $('html').attr('id'),
  menu = html.split('/')[0],
  host = url.replace(html + '.html', ''),
  path = (html.indexOf('/') != -1) ? '../' : '';

// Set favicon viewport for mobile phones
$('head').append('<link rel="icon" type="image/png" href="' +
  path + 'favicon.png"/>');
$('head').append('<meta name="viewport" content="width=device-width,' +
  'initial-scale=1.0,minimum-scale=0.25,user-scalable=yes"/>');

$(document).ready(function() {
  var width = $(window).width(),
    font = 10 * width / 1024;
  $('body').css('font-size', font.toString() + 'px');

  $('[data-width]').each(function() {
    $(this).css({
      'width': $(this).data('width') + 'em',
      'height': $(this).data('height') + 'em'
    });
  });

  if(html != 'index') {
    $('header').load(path + 'index.html #index_header', function() {
      $('h2 a').attr('href', path + 'index.html');
    });
    $('nav').load(path + 'index.html #index_nav', function() {
      if(path == '../') {
        $('nav a').each(function() {
          var href = $(this).attr('href'),
            anchor = href.split('/');
          if(anchor[0] == menu) {
            href = anchor[anchor.length - 1];
          } else {
            href = '../' + href;
          }
          $(this).attr('href', href);
        });
      }
    });
    $('footer').load(path + 'index.html #index_footer');
  }

  $(this).on('click', 'a[href^="http"]', function() {
    if(!RegExp(host).test(this.href)) {
      window.open(this.href); 
      return false;
    }
    return true;
  });

});

})();
