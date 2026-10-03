(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const eur = n => (Number.isInteger(n) ? n.toLocaleString('fr-FR') : n.toFixed(2).replace('.', ',')) + ' €';
  const icon = (id, cls = 'ico') => `<svg class="${cls}"><use href="#i-${id}"/></svg>`;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  // Catalogue : prix relevés sur japonennoiretblanc.com et lejaponpourtous.podia.com (octobre 2026)
  const PODIA = 'https://lejaponpourtous.podia.com/';
  const SHOP = 'https://japonennoiretblanc.com/products/';
  const O = {
    expat: { t: "L'expatriation au Japon pour tous", tag: '78 leçons', d: 'Visa, travail, logement, démarches : tout pour réussir ton installation.', p: 349, url: PODIA, img: 'img/castle.jpg', hot: true },
    jp: { t: 'Le japonais en autodidacte', tag: '29 leçons', d: "La méthode qui m'a mené au JLPT N1, et la préparation à l'examen.", p: 129, url: PODIA + '6884c81a-9815-4bdd-8a31-80b3f862f6e9', img: 'img/eb-3mois.jpg', pos: 'center 80%', hot: true },
    travel: { t: 'Voyager pas cher au Japon', tag: '24 leçons', d: 'Organiser ton voyage à partir de 1 000 €, vol et logement compris.', p: 69, url: PODIA + 'voyager-pas-cher-au-japon', img: 'img/glico.jpg' },
    orga: { t: 'Organisation de ton voyage', d: 'Itinéraire sur mesure, hébergements, activités, suivi sur WhatsApp.', p: 500, url: SHOP + 'service-d-aide-a-l-organisation-de-voyage-au-japon', img: 'img/castle.jpg' },
    eb3m: { t: 'Apprendre à parler japonais en 3 mois', p: 15.99, url: SHOP + 'mon-e-book-apprendre-a-parler-japonais-en-3-mois', img: 'img/eb-3mois.jpg' },
    ebdire: { t: 'Tout dire en japonais sans effort', p: 15.99, url: SHOP + 'tout-dire-en-japonais-sans-effort', img: 'img/eb-toutdire.jpg' },
    ebvoy: { t: 'Voyager au Japon sans se ruiner', p: 12.99, url: SHOP + 'voyager-au-japon-sans-se-ruiner', img: 'img/eb-voyage.jpg' },
    eben: { t: "L'anglais sans prise de tête", p: 15.99, old: 19.99, url: SHOP + 'langlais-sans-prise-de-tete', img: 'img/eb-anglais.jpg' }
  };

  // Bandeau
  const tk = ['1 M sur Facebook', '167,8 K sur Instagram', '147,8 K sur TikTok', '130 K sur YouTube', 'Au Japon depuis 2015', 'JLPT N1', 'Visites Tokyo et Kansai', '3,1 M de vues sur un Reel'];
  $('#ticker').innerHTML = [...tk, ...tk].map(t => `<span>${t}</span>`).join('');

  // Livres
  $('#books').innerHTML = ['eb3m', 'ebdire', 'ebvoy', 'eben'].map((k, i) => {
    const o = O[k];
    return `<a class="book rise" style="--d:${i * 0.1}s" href="${o.url}" target="_blank" rel="noopener">
      <div class="cover">${o.old ? '<span class="promo">PROMO</span>' : ''}<img src="${o.img}" alt="Couverture du livre ${o.t}" width="360" height="510"></div>
      <div class="meta"><b>${o.t}</b><div class="pp"><strong>${o.old ? `<s>${eur(o.old)}</s>` : ''}${eur(o.p)}</strong><span>Acheter ${icon('arrow')}</span></div></div></a>`;
  }).join('');

  // Formations
  $('#courses').innerHTML = ['expat', 'jp', 'travel'].map((k, i) => {
    const o = O[k];
    return `<a class="course rise" style="--d:${i * 0.1}s" href="${o.url}" target="_blank" rel="noopener">
      <img src="${o.img}" alt="" ${o.pos ? `style="object-position:${o.pos}"` : ''}>
      <div class="body"><span class="tag ${o.hot ? 'hot' : ''}">${o.hot ? 'Le plus pris · ' : ''}${o.tag}</span><h3>${o.t}</h3><p>${o.d}</p>
      <div class="bottom"><span class="p">${eur(o.p)}</span><span class="go" aria-hidden="true">${icon('arrow')}</span></div></div></a>`;
  }).join('');

  // Vidéos (vues relevées le 3 octobre 2026)
  const YT = [
    ['e0rDb1QrWlQ', 'La fin du visa permanent ? Le Japon pousse les étrangers à partir', 26396, 'yt-visa'],
    ['34sb80q4VGg', 'Rencontre avec une Marocaine installée depuis 10 ans au Japon', 31554, 'yt-maroc'],
    ['ZPuFrmb1Nac', 'Je vais vivre à vie au Japon : comment immigrer', 23967, 'yt-vie'],
    ['wiGlHHFeJE0', 'Je retourne en France après dix ans au Japon', 18859, 'yt-retour'],
    ['kheNlozBeRY', "Le Japon n'est pas un pays pour les faibles", 15700, 'yt-faibles'],
    ['bWjc3FBEDMc', 'Le tourisme rend les Japonais méchants', 12750, 'yt-tourisme']
  ];
  $('#rail').innerHTML = YT.map(([id, t, v, img], i) => `<a class="vid rise" style="--d:${i * 0.07}s" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">
    <div class="th"><img src="img/${img}.jpg" alt="" width="640" height="360"><span class="play"><span>${icon('play')}</span></span></div>
    <b>${t}</b><small>${v.toLocaleString('fr-FR')} vues sur YouTube</small></a>`).join('');
  const short = n => n >= 1e6 ? (n / 1e6).toFixed(1).replace('.', ',') + ' M' : n >= 1e3 ? Math.round(n / 1e3) + ' K' : String(n);
  const RL = [['C8tolcKynXd', 3144716, 'r-quitter'], ['C8je4gvSI3i', 291219, 'r-decouvrez'], ['DGpo9Dtywyk', 228548, 'r-aide'], ['DdWBhYzP6i3', 78857, 'r-parc'], ['DdGTjmBPkEm', 36509, 'r-sacs'], ['DdvcbDgPO9I', 32978, 'r-touristes'], ['Dd3SHXlPOBz', 19102, 'r-pluie'], ['Dd3sPCbzTNG', 10574, 'r-nuit']];
  $('#reels').innerHTML = RL.map(([id, v, img], i) => `<a class="reel rise" style="--d:${i * 0.05}s" href="https://www.instagram.com/reel/${id}/" target="_blank" rel="noopener" aria-label="Reel Instagram, ${short(v)} vues">
    <img src="img/${img}.jpg" alt="" width="203" height="360"><span>${icon('play')}${short(v)}</span></a>`).join('');

  // Questionnaire
  const Q = [
    { k: 'goal', q: 'Ton projet Japon ?', o: [['voyage', 'Voyager', 'Premier ou prochain séjour', 'img/glico.jpg'], ['langue', 'Parler japonais', 'Du zéro au JLPT', 'img/eb-toutdire.jpg'], ['expat', 'Vivre au Japon', 'Étudier, travailler, rester', 'img/castle.jpg'], ['visite', 'Être guidé', 'Tokyo ou Kansai avec Kevin', 'img/r-decouvrez.jpg']] },
    { k: 'when', q: "C'est pour quand ?", o: [['soon', 'Dans moins de 3 mois', 'Il faut aller vite'], ['year', "Dans l'année", 'Je prépare sérieusement'], ['dream', 'Je ne sais pas encore', 'Je me renseigne'], ['there', "J'y suis déjà", 'Je veux aller plus loin']] },
    { k: 'style', q: 'Tu préfères…', o: [['diy', 'Faire seul', 'Avec une bonne méthode'], ['guided', 'Être accompagné', "Que quelqu'un s'en occupe"], ['small', 'Commencer petit', 'Un premier pas pas cher'], ['all', 'Tout prendre', "Ce qu'il me faut, d'un coup"]] }
  ];
  const quiz = $('#quiz');
  let step = 0, ans = {};
  const pick = () => {
    const g = ans.goal, s = ans.style;
    if (g === 'visite') return { tour: true, side: 'ebvoy' };
    if (g === 'voyage') {
      if (s === 'guided' || s === 'all') return { main: 'orga', side: 'ebvoy', why: 'Tu me donnes tes dates et tes envies, je prépare tout le trajet.' };
      if (s === 'small') return { main: 'ebvoy', side: 'travel', why: 'Les bases pour voyager sans exploser ton budget.' };
      return { main: 'travel', side: 'ebdire', why: 'La méthode complète pour organiser ton voyage seul.' };
    }
    if (g === 'langue') {
      if (s === 'small') return { main: 'eb3m', side: 'ebdire', why: "Un premier pas concret avant de t'engager." };
      return { main: 'jp', side: 'ebdire', why: "La méthode qui m'a mené du zéro au JLPT N1." };
    }
    if (s === 'small' || ans.when === 'dream') return { main: 'jp', side: 'expat', why: 'Avant de partir, la langue change tout.' };
    return { main: 'expat', side: 'jp', why: '78 leçons pour éviter les erreurs qui coûtent cher.' };
  };
  const steps = () => `<div class="steps">${Q.map((_, i) => `<i class="${i <= step ? 'on' : ''}"></i>`).join('')}</div>`;
  const render = () => {
    if (step >= Q.length) {
      const r = pick(), side = O[r.side];
      const top = r.tour
        ? `<div class="pick"><img src="img/r-decouvrez.jpg" alt=""><div><span class="eyebrow" style="color:#fff">Pour toi</span><h4>Une visite avec Kevin</h4><div class="p">dès 200 €</div><p class="why">Une journée avec un résident t'épargne des heures de recherche.</p></div></div>
           <div class="row" style="margin-top:14px"><a class="btn btn-main" href="#visites">Choisir ma date ${icon('arrow')}</a></div>`
        : `<div class="pick"><img src="${O[r.main].img}" alt=""><div><span class="eyebrow" style="color:#fff">Pour toi</span><h4>${O[r.main].t}</h4><div class="p">${eur(O[r.main].p)}</div><p class="why">${r.why}</p></div></div>
           <div class="row" style="margin-top:14px"><a class="btn btn-main" href="${O[r.main].url}" target="_blank" rel="noopener">Je commence ${icon('arrow')}</a><a class="btn btn-line" href="#livres">Voir les livres</a></div>`;
      quiz.innerHTML = `${steps()}<h3>Ton plan Japon</h3>${top}
        <div class="more"><span>Souvent pris avec : <b>${side.t}</b>, ${eur(side.p)}</span><a href="${side.url}" target="_blank" rel="noopener">Voir</a></div>
        <div class="more"><span>Avec <b>Le Cercle</b>, 20 % de remise sur cette offre.</span><a href="#cercle" class="red">Découvrir</a></div>
        <button type="button" class="link-btn" id="qreset">${icon('redo')} Recommencer</button>`;
      $('#qreset').onclick = () => { step = 0; ans = {}; render(); };
      return;
    }
    const q = Q[step];
    quiz.innerHTML = `${steps()}<h3>${q.q}</h3><div class="opts">${q.o.map(([v, t, d, img]) =>
      `<button type="button" class="opt ${img ? '' : 'text'}" data-v="${v}" ${img ? `style="background-image:url('${img}')"` : ''}><b>${t}</b><span>${d}</span></button>`).join('')}</div>
      ${step ? `<button type="button" class="link-btn" id="qback">${icon('back')} Retour</button>` : ''}`;
    $$('.opt', quiz).forEach(b => b.onclick = () => { ans[q.k] = b.dataset.v; step++; render(); });
    const back = $('#qback'); if (back) back.onclick = () => { step--; render(); };
  };
  render();

  // Visites : prix du site actuel (2 personnes, +50 € par personne ; Kansai 550 €/jour par groupe)
  const F = [{ id: 'night', t: 'Soirée à Tokyo', d: '3 heures', p: 200 }, { id: 'half', t: 'Demi-journée', d: '4 heures', p: 300 }, { id: 'day', t: 'Journée à Tokyo', d: '8 heures, la plus demandée', p: 500 }, { id: 'kansai', t: 'Kansai', d: 'Kyoto, Osaka, Nara · 2 jours min.', p: 550, perDay: true }];
  let fmt = 'day', pax = 2;
  const fbox = $('#fmts');
  fbox.innerHTML = F.map(f => `<button type="button" class="fmt" role="radio" data-id="${f.id}" aria-checked="${f.id === fmt}"><b>${f.t}</b><span>${f.d}</span><span class="p">${eur(f.p)}${f.perDay ? ' <small>par jour</small>' : ''}</span></button>`).join('');
  const totalEl = $('#total');
  let shown = 500;
  const tween = to => {
    if (calm) { totalEl.textContent = eur(to); shown = to; return; }
    const from = shown, t0 = performance.now();
    const tick = now => { const k = Math.min(1, (now - t0) / 400); const v = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3))); totalEl.textContent = eur(v); if (k < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick); shown = to;
  };
  const price = () => {
    const f = F.find(x => x.id === fmt);
    $('#daysfield').hidden = !f.perDay;
    const tot = f.perDay ? f.p * Number($('#days').value) : f.p + Math.max(0, pax - 2) * 50;
    $('#pax').textContent = pax;
    $('#paxnote').textContent = f.perDay ? 'prix pour le groupe' : (pax > 2 ? `dont ${(pax - 2) * 50} € pour ${pax - 2} en plus` : 'prix pour 2');
    tween(tot);
    return tot;
  };
  $$('.fmt', fbox).forEach(b => b.onclick = () => { fmt = b.dataset.id; $$('.fmt', fbox).forEach(x => x.setAttribute('aria-checked', x === b)); price(); });
  $('#plus').onclick = () => { if (pax < 10) { pax++; price(); } };
  $('#minus').onclick = () => { if (pax > 1) { pax--; price(); } };
  $('#days').onchange = price;
  const date = $('#date');
  date.min = new Date().toISOString().slice(0, 10);
  date.value = new Date(Date.now() + 864e5 * 14).toISOString().slice(0, 10);
  $('#booker').addEventListener('submit', e => {
    e.preventDefault();
    const m = $('#bookmsg'); m.hidden = false;
    if (!date.value) { m.textContent = 'Choisis une date pour continuer.'; return; }
    const tot = price(), dep = Math.round(tot * 0.3);
    m.textContent = `Démo : un acompte de ${dep} € sur ${tot} € bloquerait le ${new Date(date.value).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}. Rien n'a été envoyé ni payé.`;
  });
  price();

  // Le Cercle
  let yearly = false;
  const plan = () => {
    $('#planprice').innerHTML = yearly ? '120 € <small>par an</small>' : '12 € <small>par mois</small>';
    $('#bm').setAttribute('aria-pressed', !yearly); $('#by').setAttribute('aria-pressed', yearly);
  };
  $('#bm').onclick = () => { yearly = false; plan(); };
  $('#by').onclick = () => { yearly = true; plan(); };
  $('#join').onclick = () => { const m = $('#joinmsg'); m.hidden = false; m.textContent = "Démo : ici s'ouvrira le paiement de l'abonnement. Rien n'a été payé."; };

  // Formulaires e-mail (démo : rien n'est envoyé)
  const mailOk = v => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.trim());
  const wire = (form, input, msg, done) => $(form).addEventListener('submit', e => {
    e.preventDefault();
    const m = $(msg); m.hidden = false;
    if (!mailOk($(input).value)) { m.textContent = "Il manque un @ ou un domaine dans l'adresse."; $(input).focus(); return; }
    m.textContent = "C'est noté. Dans la version en ligne, la liste part tout de suite dans ta boîte mail.";
    store.set('jnb-sub', '1');
    if (done) setTimeout(done, 1600);
  });

  // Pop-up newsletter : 15 s, une fois tous les 7 jours
  const pop = $('#pop');
  let lastFocus = null;
  const closePop = () => {
    pop.classList.remove('open');
    setTimeout(() => { pop.hidden = true; }, calm ? 0 : 350);
    store.set('jnb-pop', String(Date.now()));
    document.removeEventListener('keydown', onKey);
    if (lastFocus) lastFocus.focus();
  };
  const onKey = e => {
    if (e.key === 'Escape') closePop();
    if (e.key === 'Tab') {
      const f = $$('button, input, a[href]', pop).filter(x => !x.hidden && x.offsetParent !== null);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  };
  const openPop = () => {
    if (!pop.hidden) return;
    lastFocus = document.activeElement;
    pop.hidden = false;
    requestAnimationFrame(() => pop.classList.add('open'));
    document.addEventListener('keydown', onKey);
    setTimeout(() => $('#popmail').focus(), 60);
  };
  $('#pop-close').onclick = closePop;
  $('#pop-no').onclick = closePop;
  pop.addEventListener('click', e => { if (e.target === pop) closePop(); });
  wire('#leadform', '#leadmail', '#leadmsg');
  wire('#popform', '#popmail', '#popmsg', closePop);
  const last = Number(store.get('jnb-pop') || 0);
  const forced = location.hash === '#newsletter';
  if (forced) openPop();
  else if (!store.get('jnb-sub') && Date.now() - last > 7 * 864e5) setTimeout(openPop, 15000);

  // Apparitions au scroll
  const seen = $$('.lines, .rise, .curtain, .vphoto');
  if ('IntersectionObserver' in window && !calm) {
    // un élément masqué par clip-path n'est pas vu par l'observer : on observe son parent
    const io = new IntersectionObserver(es => es.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target._reveal || en.target;
      el.classList.add('seen'); io.unobserve(en.target);
    }), { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    seen.forEach(el => {
      if (el.classList.contains('curtain')) { const w = el.parentElement; w._reveal = el; io.observe(w); }
      else io.observe(el);
    });
  } else seen.forEach(el => el.classList.add('seen'));
  requestAnimationFrame(() => $('#h1').classList.add('seen'));

  // Comptage des chiffres
  const counters = $$('[data-count]');
  const fmtCount = n => n >= 1e6 ? (n / 1e6).toFixed(n % 1e6 ? 1 : 0).replace('.', ',') + ' M' : (n / 1e3).toFixed(n % 1e3 ? 1 : 0).replace('.', ',') + ' K';
  const run = el => {
    const end = Number(el.dataset.count), t0 = performance.now(), dur = 1400;
    const step = now => { const k = Math.min(1, (now - t0) / dur); const v = end * (1 - Math.pow(1 - k, 3)); el.textContent = k < 1 ? fmtCount(Math.round(v / 100) * 100 || 100) : fmtCount(end); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window && !calm) {
    const co = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { run(en.target); co.unobserve(en.target); } }), { threshold: 0.6 });
    counters.forEach(el => co.observe(el));
  }

  // Scroll : progression, soleil, en-tête, barre collante, menu actif
  const bar = $('#progress'), sun = $('#sun'), nav = $('#nav'), sticky = $('#sticky'), hero = $('#top');
  const links = $$('.menu a');
  const secs = links.map(a => $(a.getAttribute('href')));
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    if (!calm) sun.style.transform = `translate3d(0, ${Math.min(y, 900) * 0.1}px, 0) scale(${1 + Math.min(y, 900) / 9000})`;
    nav.classList.toggle('scrolled', y > 8);
    sticky.classList.toggle('show', y > hero.offsetHeight * 0.8);
    let cur = -1; secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top < innerHeight * 0.4) cur = i; });
    links.forEach((a, i) => a.classList.toggle('on', i === cur));
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
})();
