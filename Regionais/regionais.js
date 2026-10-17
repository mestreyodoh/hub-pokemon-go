(function () {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const overlay = document.getElementById('pageTransition');
  const homeLink = document.getElementById('homeLink');
  const stored = localStorage.getItem('yodoh-theme');
  if (stored) root.setAttribute('data-theme', stored);
  else if (window.matchMedia('(prefers-color-scheme: light)').matches) root.setAttribute('data-theme', 'light');
  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('yodoh-theme', next);
  });
  if (homeLink && overlay) {
    homeLink.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
      setTimeout(() => { window.location.href = homeLink.getAttribute('href'); }, 380);
    });
  }
  function clearTransitionOverlay() {
    if (!overlay) return;
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
  }
  window.addEventListener('pageshow', clearTransitionOverlay);
  window.addEventListener('pagehide', clearTransitionOverlay);
  window.addEventListener('popstate', clearTransitionOverlay);

  function esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function imgSrc(fn) {
    return '/regionais/img/' + encodeURIComponent(fn).replace(/%2F/g, '/');
  }

  const data = window.REGIONAIS_DATA || [];
  const toc = document.getElementById('toc');
  const wrap = document.getElementById('sections');

  data.forEach((sec) => {
    const a = document.createElement('a');
    a.href = '#' + sec.id;
    a.textContent = sec.title;
    toc.appendChild(a);

    const section = document.createElement('section');
    section.className = 'region-section';
    section.id = sec.id;
    section.innerHTML = '<h2>' + esc(sec.title) + '</h2><p class="sec-desc">' + esc(sec.desc) + '</p>';
    const grid = document.createElement('div');
    grid.className = 'poke-grid';

    (sec.items || []).forEach((it) => {
      const name = it[0], where = it[1], fn = it[2], flag = it[3];
      const card = document.createElement('article');
      card.className = 'poke-card';
      const art = document.createElement('div');
      art.className = 'poke-art';
      art.innerHTML = '<div class="sprite"><img src="' + imgSrc(fn) + '" alt="' + esc(name) + '" loading="lazy"></div>' +
        (flag === 'solsticio' ? '<span class="badge-sol">Solstício</span>' : '');
      const body = document.createElement('div');
      body.className = 'poke-body';
      body.innerHTML = '<h3>' + esc(name) + '</h3><p>' + esc(where) +
        (flag === 'solsticio' ? ' <em class="note-sol">(Inverte no solstício de verão e de inverno.)</em>' : '') + '</p>';
      card.appendChild(art);
      card.appendChild(body);
      grid.appendChild(card);
    });

    section.appendChild(grid);
    wrap.appendChild(section);
  });
})();
