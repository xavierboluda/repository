(function () {
  'use strict';

  var STORAGE_PREFIX = 'dgp:'; // Disneyland Guide Paris

  function storageGet(key) {
    try { return localStorage.getItem(STORAGE_PREFIX + key); } catch (e) { return null; }
  }
  function storageSet(key, value) {
    try { localStorage.setItem(STORAGE_PREFIX + key, value); } catch (e) { /* private mode, ignore */ }
  }

  /* -------------------------------------------------------------
     Navegacio principal (bottom nav)
     ------------------------------------------------------------- */
  var navButtons = document.querySelectorAll('.nav-btn');
  var views = document.querySelectorAll('.view');

  function showView(name) {
    views.forEach(function (v) { v.classList.toggle('active', v.id === 'view-' + name); });
    navButtons.forEach(function (b) { b.classList.toggle('active', b.dataset.view === name); });
    storageSet('last-view', name);
    var root = document.querySelector('.view-root');
    if (root) root.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  navButtons.forEach(function (btn) {
    btn.addEventListener('click', function () { showView(btn.dataset.view); });
  });

  var lastView = storageGet('last-view');
  if (lastView && document.getElementById('view-' + lastView)) {
    showView(lastView);
  }

  /* -------------------------------------------------------------
     Selector de dies
     ------------------------------------------------------------- */
  var dayPills = document.querySelectorAll('#day-pills .pill');
  var dayPanels = document.querySelectorAll('.day-panel');

  dayPills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      var day = pill.dataset.day;
      dayPills.forEach(function (p) { p.classList.toggle('active', p === pill); });
      dayPanels.forEach(function (p) { p.classList.toggle('active', p.id === 'day-' + day); });
      storageSet('last-day', day);
    });
  });

  var lastDay = storageGet('last-day');
  if (lastDay) {
    var targetPill = document.querySelector('#day-pills .pill[data-day="' + lastDay + '"]');
    if (targetPill) targetPill.click();
  }

  /* -------------------------------------------------------------
     Sub-pestanyes de la Guia
     ------------------------------------------------------------- */
  var guidePills = document.querySelectorAll('#guide-pills .pill');
  var subPanels = document.querySelectorAll('.subtab-panel');

  guidePills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      var sub = pill.dataset.sub;
      guidePills.forEach(function (p) { p.classList.toggle('active', p === pill); });
      subPanels.forEach(function (p) { p.classList.toggle('active', p.id === 'sub-' + sub); });
      storageSet('last-sub', sub);
    });
  });

  var lastSub = storageGet('last-sub');
  if (lastSub) {
    var targetSubPill = document.querySelector('#guide-pills .pill[data-sub="' + lastSub + '"]');
    if (targetSubPill) targetSubPill.click();
  }

  /* -------------------------------------------------------------
     Checkboxes persistents (checklists)
     ------------------------------------------------------------- */
  document.querySelectorAll('input[type=checkbox][data-key]').forEach(function (box) {
    var key = 'check:' + box.dataset.key;
    var saved = storageGet(key);
    if (saved === '1') {
      box.checked = true;
      box.closest('li').classList.add('done');
    }
    box.addEventListener('change', function () {
      storageSet(key, box.checked ? '1' : '0');
      box.closest('li').classList.toggle('done', box.checked);
    });
  });

  /* -------------------------------------------------------------
     Kit Bruna & Joana (toggle "fet")
     ------------------------------------------------------------- */
  document.querySelectorAll('#kit-grid .kit-item').forEach(function (item) {
    var key = 'kit:' + item.dataset.key;
    if (storageGet(key) === '1') item.classList.add('done');
    item.addEventListener('click', function () {
      item.classList.toggle('done');
      storageSet(key, item.classList.contains('done') ? '1' : '0');
    });
  });

  /* -------------------------------------------------------------
     Passaport: personatges trobats
     ------------------------------------------------------------- */
  document.querySelectorAll('#char-grid .char-card').forEach(function (card) {
    var key = 'char:' + card.dataset.key;
    if (storageGet(key) === '1') card.classList.add('met');
    var btn = card.querySelector('.met-btn');
    btn.addEventListener('click', function () {
      card.classList.toggle('met');
      var met = card.classList.contains('met');
      storageSet(key, met ? '1' : '0');
      btn.textContent = met ? 'Trobat! ✓' : 'Trobat!';
    });
    if (card.classList.contains('met')) btn.textContent = 'Trobat! ✓';
  });

  /* -------------------------------------------------------------
     Passaport: segells de les terres
     ------------------------------------------------------------- */
  document.querySelectorAll('#stamp-grid .stamp-slot').forEach(function (slot) {
    var key = 'stamp:' + slot.dataset.key;
    if (storageGet(key) === '1') slot.classList.add('stamped');
    slot.addEventListener('click', function () {
      slot.classList.toggle('stamped');
      storageSet(key, slot.classList.contains('stamped') ? '1' : '0');
    });
  });

  /* -------------------------------------------------------------
     Lightbox per als mapes
     ------------------------------------------------------------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxClose = document.getElementById('lightbox-close');

  document.querySelectorAll('img[data-zoom]').forEach(function (img) {
    img.addEventListener('click', function () {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
    });
  });
  function closeLightbox() { lightbox.classList.remove('open'); lightboxImg.src = ''; }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });

  /* -------------------------------------------------------------
     Service worker (us offline durant el viatge)
     ------------------------------------------------------------- */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {
        /* entorn sense suport (p.ex. previsualitzacio en iframe): sense problema */
      });
    });
  }
})();
