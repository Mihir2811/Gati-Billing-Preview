/* 3-second splash/loading screen.
   This is a static, front-end-only DEMO BUILD for portfolio / demo purposes.
   Contact the owner for access to the original (full Django) application. */
(function (global) {
  global.initLoader = function () {
    if (sessionStorage.getItem('gati_demo_seen')) return;

    const overlay = document.createElement('div');
    overlay.id = 'demo-loader';
    overlay.innerHTML =
      '<div class="demo-spinner"></div>' +
      '<div class="demo-loader-title">Gati Billing</div>' +
      '<div class="demo-loader-text">Loading your demo workspace&hellip;</div>' +
      '<div class="demo-loader-note">' +
        'This is a static demo build, for demo purposes only.<br>' +
        'Contact the owner for a walkthrough of the original live application.' +
      '</div>';

    document.documentElement.style.overflow = 'hidden';
    document.body.appendChild(overlay);

    setTimeout(function () {
      overlay.style.transition = 'opacity .4s ease';
      overlay.style.opacity = '0';
      setTimeout(function () {
        overlay.remove();
        document.documentElement.style.overflow = '';
      }, 400);
      sessionStorage.setItem('gati_demo_seen', '1');
    }, 3000);
  };
})(window);
