(function () {
  const data = window.QUIZT_DATA || {};
  const brand = data.brand || {};
  const events = (data.events || []).slice().sort((a, b) => (a.dateISO || '').localeCompare(b.dateISO || ''));
  const results = data.results || [];

  function localDateOnly(date = new Date()) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
  function parseLocalDate(dateISO) {
    const parts = String(dateISO || '').split('-').map(Number);
    if (parts.length !== 3 || parts.some(Number.isNaN)) return null;
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
  function isPastEvent(event) {
    const eventDate = parseLocalDate(event.dateISO);
    if (!eventDate) return false;
    return eventDate < localDateOnly();
  }

  function $(selector, root = document) { return root.querySelector(selector); }
  function $all(selector, root = document) { return Array.from(root.querySelectorAll(selector)); }
  function asset(path) {
    const prefix = document.body.dataset.assetPrefix || '';
    if (!path) return '';
    if (/^https?:/.test(path)) return path;
    return prefix + path;
  }
  function page(path) {
    const prefix = document.body.dataset.pagePrefix || '';
    return prefix + path;
  }
  function scoreboardUrl(code) {
    if (!code) return '';
    return `${brand.scoreboardBaseUrl || 'https://chief-baliman.github.io/quizt-scoreboard/'}?code=${encodeURIComponent(code)}`;
  }
  function upcomingEvents() {
    return events.filter(e => !isPastEvent(e));
  }
  function pastEvents() {
    return events.filter(e => isPastEvent(e)).sort((a, b) => (b.dateISO || '').localeCompare(a.dateISO || ''));
  }
  function featuredEvent() {
    return upcomingEvents()[0] || null;
  }
  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
  }

  function renderHeader() {
    const logo = $('.js-logo');
    if (logo) logo.src = asset('quizt-logo-color.png');
    $all('[data-link="home"]').forEach(a => a.href = page('index.html'));
    $all('[data-link="termine"]').forEach(a => a.href = page('termine.html'));
    $all('[data-link="punkte"]').forEach(a => a.href = page('punkte.html'));
    $all('[data-link="ergebnisse"]').forEach(a => a.href = page('ergebnisse.html'));
    $all('[data-link="buchen"]').forEach(a => a.href = page('quiz-buchen.html'));
    $all('[data-link="laura"]').forEach(a => a.href = page('ueber-laura.html'));
    $all('[data-link="impressum"]').forEach(a => a.href = page('impressum.html'));
    $all('[data-link="datenschutz"]').forEach(a => a.href = page('datenschutz.html'));
    $all('[data-link="instagram"]').forEach(a => a.href = brand.instagramUrl || '#');
    $all('[data-link="linktree"]').forEach(a => a.href = brand.linktreeUrl || '#');
    $all('[data-email]').forEach(a => a.href = `mailto:${brand.email || 'laura.quizt@gmail.com'}`);
  }

  function eventDetails(e) {
    return `
      <div class="meta">
        <div><span>📍</span><span><strong>${escapeHtml(e.location)}</strong><br>${escapeHtml(e.address)}</span></div>
        <div><span>📅</span><span><strong>${escapeHtml(e.dateLabel)}</strong><br>${escapeHtml(e.time)}</span></div>
        <div><span>🎯</span><span>${escapeHtml(e.category)}</span></div>
      </div>`;
  }

  function eventButtons(e) {
    const board = scoreboardUrl(e.scoreboardCode);
    const ticket = !isPastEvent(e) && e.ticketUrl ? `<a class="btn btn-primary btn-small" href="${escapeHtml(e.ticketUrl || brand.linktreeUrl || '#')}" target="_blank" rel="noopener">Tickets sichern</a>` : '';
    const points = board ? `<a class="btn btn-small" href="${escapeHtml(board)}" target="_blank" rel="noopener">Punkteübersicht</a>` : '';
    if (!ticket && !points) return '';
    return `<div class="card-actions">${ticket}${points}</div>`;
  }

  function renderFeatured() {
    const target = $('.js-featured-event');
    if (!target) return;
    const e = featuredEvent();
    if (!e) {
      target.innerHTML = '<div class="empty-state">Aktuell sind neue Termine in Planung.</div>';
      return;
    }
    target.innerHTML = `
      <div class="label">⚡ Nächstes Quizt Event</div>
      <h2><span class="accent">${escapeHtml(e.category)}</span><br>${escapeHtml(e.location)}</h2>
      <div class="event-list-mini">
        <div class="event-line"><span>📍</span><div><strong>${escapeHtml(e.location)}</strong><br>${escapeHtml(e.address)}</div></div>
        <div class="event-line"><span>📅</span><div><strong>${escapeHtml(e.dateLabel)}</strong><br>${escapeHtml(e.time)}</div></div>
        <div class="event-line"><span>🏆</span><div><strong>Live-Punkte</strong><br>Am Quizabend über Code oder Direktlink abrufbar.</div></div>
      </div>
      ${eventButtons(e)}
    `;
  }

  function eventCard(e) {
    const past = isPastEvent(e);
    return `
      <article class="event-card ${past ? 'is-past' : ''}">
        <div class="event-card-media">
          <img src="${escapeHtml(asset(e.flyerImage || 'quizt-hero-wide.png'))}" alt="Flyer ${escapeHtml(e.title)}" loading="lazy">
        </div>
        <div class="event-card-body">
          <span class="badge ${past ? 'badge-muted' : ''}">${past ? 'Vergangen' : escapeHtml(e.category)}</span>
          <h3 style="margin-top:14px">${escapeHtml(e.title)}</h3>
          ${eventDetails(e)}
          ${eventButtons(e)}
        </div>
      </article>`;
  }

  function renderEvents() {
    const target = $('.js-events');
    if (!target) return;
    const list = upcomingEvents();
    target.innerHTML = list.length ? list.map(eventCard).join('') : '<div class="empty-state">Neue Termine folgen bald.</div>';
  }

  function renderPastEvents() {
    const target = $('.js-past-events');
    if (!target) return;
    const list = pastEvents();
    target.innerHTML = list.length ? list.map(eventCard).join('') : '<div class="empty-state">Vergangene Termine erscheinen hier automatisch am Tag nach dem Event.</div>';
  }

  function renderResults() {
    const target = $('.js-results');
    if (!target) return;
    if (!results.length) {
      target.innerHTML = '<div class="empty-state">Noch sind keine vergangenen Scoreboards hinterlegt. Nach den ersten Events erscheinen hier die Ergebnisse.</div>';
      return;
    }
    target.innerHTML = results.map(r => {
      const url = scoreboardUrl(r.scoreboardCode);
      return `<article class="panel">
        <span class="badge">Vergangenes Event</span>
        <h3 style="margin-top:14px">${escapeHtml(r.title)}</h3>
        <div class="meta">
          <div><span>📍</span><span>${escapeHtml(r.location || '')}</span></div>
          <div><span>📅</span><span>${escapeHtml(r.dateLabel || '')}</span></div>
        </div>
        ${url ? `<a class="btn btn-primary btn-small" href="${escapeHtml(url)}" target="_blank" rel="noopener">Scoreboard ansehen</a>` : ''}
      </article>`;
    }).join('');
  }

  function renderScoreEvents() {
    const target = $('.js-score-events');
    if (!target) return;
    const withCodes = events.filter(e => e.scoreboardCode);
    if (!withCodes.length) {
      target.innerHTML = '<div class="empty-state">Sobald ein Event-Code hinterlegt ist, erscheint hier ein Direktlink zum Scoreboard.</div>';
      return;
    }
    target.innerHTML = withCodes.map(e => `
      <article class="panel">
        <span class="badge">Scoreboard</span>
        <h3 style="margin-top:14px">${escapeHtml(e.title)}</h3>
        ${eventDetails(e)}
        <a class="btn btn-primary btn-small" href="${escapeHtml(scoreboardUrl(e.scoreboardCode))}" target="_blank" rel="noopener">Punkteübersicht</a>
      </article>
    `).join('');
  }

  function setupScoreForm() {
    const form = $('.js-score-form');
    if (!form) return;
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const input = form.querySelector('input[name="code"]');
      const code = (input.value || '').trim();
      if (!code) return;
      window.open(scoreboardUrl(code), '_blank', 'noopener');
    });
  }

  function renderOffers() {
    const target = $('.js-offers');
    if (!target) return;
    target.innerHTML = (data.locationOffers || []).map((offer, index) => `
      <div class="icon-card">
        <div class="icon-bubble ${index === 1 ? 'gold' : ''}">${index === 0 ? '🍻' : index === 1 ? '💡' : '🎤'}</div>
        <h3>${escapeHtml(offer.title)}</h3>
        <p>${escapeHtml(offer.text)}</p>
      </div>`).join('');
  }

  function setupFormReturn() {
    const form = $('.js-booking-form');
    if (!form) return;
    const next = form.querySelector('input[name="_next"]');
    if (next && location.hostname !== 'localhost') {
      next.value = new URL(page('danke.html'), window.location.href).href;
    }
  }

  renderHeader();
  renderFeatured();
  renderEvents();
  renderPastEvents();
  renderResults();
  renderScoreEvents();
  renderOffers();
  setupScoreForm();
  setupFormReturn();
})();
