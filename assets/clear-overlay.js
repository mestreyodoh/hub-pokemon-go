(function () {
  function clearTransitionOverlay() {
    var overlay = document.getElementById('pageTransition');
    if (!overlay) return;
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
  }
  window.addEventListener('pageshow', clearTransitionOverlay);
  window.addEventListener('pagehide', clearTransitionOverlay);
  window.addEventListener('popstate', clearTransitionOverlay);
})();
