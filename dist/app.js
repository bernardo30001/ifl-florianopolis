(() => {
  'use strict';
  const data = window.IFL_CONTENT;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const escapeHTML = (s = '') => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeURL = value => {
    if (!value) return '';
    try { const u = new URL(value, location.href); return ['https:', 'http:'].includes(u.protocol) ? escapeHTML(value) : ''; } catch { return ''; }
  };
  const paths = {
    arrow: '<path d="M6 18 18 6M6 6h12v12"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    book: '<path d="M12 5v15M12 6C9 3 5 3 2 4v15c4-1 7 0 10 2 3-2 6-3 10-2V4c-3-1-7-1-10 2Z"/>',
    network: '<path d="M12 6v6M5 17v-5h14v5"/><circle cx="12" cy="4" r="2"/><rect x="2" y="17" width="6" height="5" rx="1"/><rect x="9" y="17" width="6" height="5" rx="1"/><rect x="16" y="17" width="6" height="5" rx="1"/><path d="M12 12v5"/>',
    mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/>',
    person: '<circle cx="12" cy="6" r="3"/><path d="M5 22v-3a7 7 0 0 1 14 0v3M12 14v8"/>',
    scale: '<path d="M12 3v18M5 21h14M3 7h18M5 7l-4 8h8Zm14 0-4 8h8Z"/><circle cx="12" cy="5" r="2"/>',
    building: '<path d="M4 22V5l8-3 8 3v17M2 22h20M9 22v-5h6v5M8 7h1m6 0h1M8 11h1m6 0h1"/>',
    exchange: '<path d="M3 7h17l-4-4M21 17H4l4 4M20 7l-4 4M4 17l4-4"/>',
    key: '<circle cx="8" cy="8" r="5"/><path d="m12 12 9 9m-5-5 3-3m-1 5 3-3"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    pointer: '<path d="m5 2 14 10-6 1-3 7Z"/>',
    calendar: '<rect x="3" y="5" width="18" height="17" rx="2"/><path d="M7 2v6m10-6v6M3 11h18m-13 5h1m6 0h1"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 5 10 8L22 5"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7M7 7v.1M11 17v-7m0 3a3 3 0 0 1 6 0v4"/>',
    whatsapp: '<path d="M21 11.5a9 9 0 0 1-13.5 8L2 21l1.5-5.5A9 9 0 1 1 21 11.5Z"/><path d="M8.2 6.8c-2 1-1 4.4 1.5 6.8s5.7 3.4 6.8 1.4l-2.6-1.6-1.1 1c-1.7-.7-2.9-1.9-3.5-3.5l1-1.1Z"/>',
    shield: '<path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6Z"/><path d="m8 12 3 3 5-6"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="8" r="2"/><path d="m3 17 6-6 4 4 3-3 5 5"/>',
    hex: '<path d="m12 1 10 5.5v11L12 23 2 17.5v-11Z"/><path d="m12 5 6.5 3.5v7L12 19l-6.5-3.5v-7Z"/>',
  };
  const icon = name => `<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.hex}</svg>`;
  function fillIcons(root = document) { $$('[data-icon]', root).forEach(el => { el.innerHTML = icon(el.dataset.icon); }); }

  // Conteúdo editável, mantido fora do layout.
  $('#values-grid').innerHTML = data.values.map(v => `<article class="value-card"><div class="hex-icon">${icon(v.icon)}</div><h3>${escapeHTML(v.name)}</h3><p>${escapeHTML(v.text)}</p></article>`).join('') + `<div class="value-signature" aria-hidden="true">${icon('hex')}</div>`;
  $('#faq-list').innerHTML = data.faq.map(f => `<details><summary>${escapeHTML(f.question)}</summary><div class="faq-answer"><p${f.answer.startsWith('[') ? ' class="pending"' : ''}>${escapeHTML(f.answer)}</p>${f.link ? `<a class="text-link" href="${safeURL(f.link)}" ${f.partnership ? 'data-partnership' : ''} ${f.link.startsWith('https:') ? 'target="_blank" rel="noopener noreferrer"' : ''}>${escapeHTML(f.linkLabel)} <span aria-hidden="true">↗</span></a>` : ''}</div></details>`).join('');
  $('#board-term').textContent = data.boardTerm;
  $('#board-grid').innerHTML = data.board.map(p => `<article class="board-card"><div class="board-photo ${p.photo ? '' : 'placeholder'}">${p.photo ? `<img src="${safeURL(p.photo)}" alt="${escapeHTML(p.name)}, ${escapeHTML(p.role)} do IFL Florianópolis" width="276" height="308" loading="lazy">` : `<div class="photo-placeholder">${icon('person')}<span>[PREENCHER: foto]</span></div>`}</div><h3>${p.name.startsWith('[') ? `<span class="pending">${escapeHTML(p.name)}</span>` : escapeHTML(p.name)}</h3><p class="board-role">${escapeHTML(p.role)}</p><p class="board-occupation"><span class="${p.occupation.startsWith('[') ? 'pending' : ''}">${escapeHTML(p.occupation)}</span></p>${p.linkedin ? `<a class="board-linkedin" href="${safeURL(p.linkedin)}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de ${escapeHTML(p.name)}">${icon('linkedin')}</a>` : `<span class="board-linkedin" aria-hidden="true">${icon('linkedin')}</span><span class="linkedin-pending">[PREENCHER: LinkedIn]</span>`}</article>`).join('');
  $('#president-quote').textContent = data.presidentQuote;
  $('#president-quote-author').textContent = `${data.presidentQuoteAuthor} · Presidência do IFL Florianópolis`;
  if (!data.presidentQuote.startsWith('[')) $('#president-quote').classList.remove('pending');

  // O horário do evento usa Brasília; eventos encerrados deixam o destaque.
  const eventFormatter = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', timeZone: 'America/Sao_Paulo' });
  const timeFormatter = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' });
  const fullDateFormatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', timeZone: 'America/Sao_Paulo' });
  const yearFormatter = new Intl.DateTimeFormat('pt-BR', {year:'numeric',timeZone:'America/Sao_Paulo'});
  function upcomingEvents(now = Date.now()) { return data.events.filter(e => Number.isFinite(Date.parse(e.startsAt)) && Date.parse(e.startsAt) >= now).sort((a,b) => Date.parse(a.startsAt) - Date.parse(b.startsAt)); }
  function renderEvents() {
    const next = upcomingEvents()[0];
    const ribbon = $('#event-ribbon');
    ribbon.hidden = !next;
    if (next) {
      const date = new Date(next.startsAt);
      const shortDate = eventFormatter.format(date);
      ribbon.innerHTML = `<div class="container ribbon-inner"><span class="ribbon-label">${icon('calendar')} PRÓXIMO ENCONTRO</span><span class="ribbon-date">${shortDate}<small>${timeFormatter.format(date).replace(':','H')}</small></span><span class="ribbon-title">${escapeHTML(next.speaker)}<small>${escapeHTML(next.title)}</small></span><a class="text-link" href="#eventos" aria-label="Ver detalhes do próximo encontro">Saiba mais <span aria-hidden="true">↗</span></a></div>`;
      $('#upcoming-events').innerHTML = `<article class="event-card"><div class="event-poster ${next.image ? 'has-photo' : ''}">${next.image ? `<img src="${safeURL(next.image)}" alt="${escapeHTML(next.alt || next.title)}" width="700" height="700" loading="lazy">` : ''}<span class="small-label">ENCONTRO IFL FLORIANÓPOLIS</span><p class="poster-title">O futuro<br>se constrói<br><span>em diálogo.</span></p><p>LIBERDADE. PREPARO. LIDERANÇA.</p></div><div class="event-details"><span class="small-label">PRÓXIMO EVENTO</span><p class="speaker">${escapeHTML(next.speaker)}</p><h3>${escapeHTML(next.title)}</h3><div class="event-meta"><div>${icon('calendar')}<span>${escapeHTML(fullDateFormatter.format(date))}<small>${timeFormatter.format(date).replace(':','h')} · horário de Brasília</small></span></div><div>${icon('pin')}<span>${escapeHTML(next.location)}<small>${escapeHTML(next.address)}</small></span></div></div>${!next.dateConfirmed ? `<p class="pending">[CONFIRMAR: ano do evento, ${yearFormatter.format(date)}]</p>` : ''}${next.ticketUrl ? `<a class="button primary" href="${safeURL(next.ticketUrl)}" target="_blank" rel="noopener noreferrer">Garantir meu ingresso <span aria-hidden="true">↗</span></a>` : '<button class="button primary" id="ticket-pending">Garantir meu ingresso <span aria-hidden="true">↗</span></button><p class="pending" style="margin:12px 0 0">[PREENCHER: link Blueticket]</p>'}</div></article>`;
      $('#ticket-pending')?.addEventListener('click', () => showDialog('Ingressos do próximo encontro', '<p class="pending">[PREENCHER: link Blueticket]</p><p>O link de ingressos precisa ser confirmado pelo instituto. Acompanhe a divulgação pelo Instagram do IFL Florianópolis.</p><a class="dialog-link" href="https://www.instagram.com/ifl_florianopolis/" target="_blank" rel="noopener noreferrer">Acessar Instagram ↗</a>'));
    } else { ribbon.innerHTML = ''; $('#upcoming-events').innerHTML = ''; }
  }
  renderEvents();
  setInterval(renderEvents, 60000);
  $('#past-events').innerHTML = data.pastEvents.map(e => `<figure class="past-event"><div class="past-event-image ${e.image ? 'has-photo' : ''}">${e.image ? `<img src="${safeURL(e.image)}" alt="${escapeHTML(e.alt || e.title)}" loading="lazy" width="600" height="375">` : `${icon('image')}<span>[PREENCHER: foto do evento]</span>`}</div><figcaption>${escapeHTML(e.title)}<small>${escapeHTML(e.caption)}</small></figcaption></figure>`).join('');
  $('#supporters-logos').innerHTML = data.supporters.length ? `<div class="supporter-logos">${data.supporters.map(s => `${s.url ? `<a href="${safeURL(s.url)}" target="_blank" rel="noopener noreferrer">` : '<span>'}<img src="${safeURL(s.logo)}" alt="${escapeHTML(s.name)}" loading="lazy" width="150" height="65">${s.url ? '</a>' : '</span>'}`).join('')}</div>` : '<p class="pending supporter-empty">[PREENCHER: logos dos apoiadores]</p>';

  // Hexágono acessível por toque, mouse e teclado.
  const vertices = [[300,30],[534,165],[534,435],[300,570],[66,435],[66,165]];
  const centroids = [[378,165],[456,300],[378,435],[222,435],[144,300],[222,165]];
  $('#leadership-hex').innerHTML = data.competencies.map((c,i) => `<g class="hex-segment ${i === 0 ? 'is-active' : ''}" role="button" tabindex="0" aria-label="${c.number}. ${escapeHTML(c.name)}" aria-pressed="${i === 0}" data-competency="${i}"><path d="M300 300 ${vertices[i].join(' ')} ${vertices[(i+1)%6].join(' ')} Z"/><text x="${centroids[i][0]}" y="${centroids[i][1]+8}" text-anchor="middle">${c.number}</text></g>`).join('') + '<path class="hex-center" d="M300 230 361 265v70L300 370l-61-35v-70Z"/><text class="hex-center-small" x="300" y="284" text-anchor="middle">IFL</text><text class="hex-center-text" x="300" y="306" text-anchor="middle">LIDERANÇA</text><text class="hex-center-small" x="300" y="326" text-anchor="middle">EM PRÁTICA</text>';
  $('#competency-buttons').innerHTML = data.competencies.map((c,i) => `<button type="button" class="competency-button" data-competency="${i}" aria-pressed="${i === 0}"><span>${c.number}</span>${escapeHTML(c.name)}<span aria-hidden="true">↗</span></button>`).join('');
  let activeCompetency = 0;
  function selectCompetency(index) {
    if (activeCompetency === index) return;
    activeCompetency = index;
    const c = data.competencies[index];
    $$('[data-competency]').forEach(el => { const selected = +el.dataset.competency === index; el.setAttribute('aria-pressed', String(selected)); el.classList.toggle('is-active', selected); });
    $('#competency-number').textContent = c.number;
    $('#competency-name').textContent = c.name;
    $('#competency-text').textContent = c.text;
  }
  $$('[data-competency]').forEach(el => {
    el.addEventListener('click', () => selectCompetency(+el.dataset.competency));
    el.addEventListener('pointerenter', e => { if(e.pointerType === 'mouse') selectCompetency(+el.dataset.competency); });
    el.addEventListener('focus', () => selectCompetency(+el.dataset.competency));
    el.addEventListener('keydown', e => { if(el.tagName.toLowerCase() === 'g' && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); selectCompetency(+el.dataset.competency); } });
  });

  // Menu em tela cheia; dialog gerencia foco e tecla Escape.
  const menu = $('#mobile-menu');
  const menuToggle = $('.menu-toggle');
  const closeMenu = () => { menu.close(); };
  menuToggle.addEventListener('click', () => { menu.showModal(); document.body.classList.add('menu-open'); menuToggle.setAttribute('aria-expanded', 'true'); });
  $('.close-menu').addEventListener('click', closeMenu);
  $$('a', menu).forEach(a => a.addEventListener('click', closeMenu));
  menu.addEventListener('close', () => { document.body.classList.remove('menu-open'); menuToggle.setAttribute('aria-expanded', 'false'); });
  matchMedia('(min-width:1071px)').addEventListener('change', e => { if(e.matches && menu.open) closeMenu(); });

  // Navegação ativa por posição da página.
  const navSections = $$('.desktop-nav a').map(a => ({a, section: $(a.getAttribute('href'))}));
  let scrollQueued = false;
  function updateNav() {
    let current = '';
    const threshold = Math.min(260, innerHeight * .35);
    navSections.forEach(({section}) => { if(section.getBoundingClientRect().top <= threshold) current = section.id; });
    navSections.forEach(({a,section}) => { const active = section.id === current; a.classList.toggle('active', active); if(active) a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current'); });
    scrollQueued = false;
  }
  addEventListener('scroll', () => { if(!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateNav); } }, { passive: true });
  updateNav();
  document.addEventListener('click', e => { const a = e.target.closest('a[href^="#"]'); if (!a) return; const target = $(a.getAttribute('href')); if(target) { target.setAttribute('tabindex','-1'); target.focus({preventScroll:true}); } });
  $$('[data-partnership]').forEach(el => el.addEventListener('click', () => { $('#contact-subject').value = 'Parceria e patrocínio'; }));

  const dialog = $('#info-dialog');
  function showDialog(title, html) { $('#dialog-title').textContent = title; $('#dialog-body').innerHTML = html; if(!dialog.open) dialog.showModal(); }
  $('.dialog-close').addEventListener('click', () => dialog.close());
  $('.dialog-dismiss').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if(e.target === dialog) { const r=dialog.getBoundingClientRect(); if(e.clientX<r.left || e.clientX>r.right || e.clientY<r.top || e.clientY>r.bottom) dialog.close(); } });
  const privacyHTML = '<p class="pending">[CONFIRMAR: política de privacidade com o instituto antes de ativar os formulários]</p><p>Esta página apresenta a minuta das informações de privacidade para o IFL Florianópolis.</p><h3>Responsável pelos dados</h3><p>IFL Florianópolis. CNPJ [PREENCHER]. Canal para exercer seus direitos: [PREENCHER: e-mail do responsável].</p><h3>Dados e finalidade</h3><p>A candidatura solicita nome, sobrenome, e-mail, WhatsApp, idade, cidade, profissão/empresa, LinkedIn opcional e motivação. O contato solicita nome, e-mail, telefone, assunto e mensagem. A finalidade é avaliar candidaturas ou responder à solicitação enviada.</p><h3>Base legal e serviço de envio</h3><p>[CONFIRMAR: base legal aplicável, fornecedor de formulários, operadores e eventual transferência internacional]. A versão atual mantém o envio desativado enquanto o canal e esta política não forem configurados e aprovados.</p><h3>Retenção e direitos</h3><p>[PREENCHER: prazo de retenção, medidas de segurança e procedimento para atender direitos]. Você pode solicitar acesso, correção, informações sobre tratamento e exclusão quando aplicável pelo canal de privacidade do instituto [PREENCHER].</p><h3>Armazenamento no navegador</h3><p>Esta versão usa apenas armazenamento local para lembrar que você leu o aviso de privacidade. Não instala ferramentas de análise nem publicidade. Os campos dos formulários não são gravados no navegador. Links externos seguem as políticas de seus respectivos serviços.</p><p class="pending">[PREENCHER: data de atualização e aprovação da política]</p>';
  $$('[data-privacy]').forEach(el => el.addEventListener('click', () => showDialog('Política de privacidade', privacyHTML)));
  function openWhatsApp() {
    const phone = String(data.contacts.whatsapp).replace(/\D/g,'');
    if(phone.length < 12 || phone.length > 15 || !phone.startsWith('55')) { showDialog('Vamos conversar', '<p class="pending">[PREENCHER: WhatsApp do IFL Florianópolis]</p><p>O número oficial precisa ser informado pelo instituto. Por enquanto, acompanhe o IFL pelo Instagram.</p><a class="dialog-link" href="https://www.instagram.com/ifl_florianopolis/" target="_blank" rel="noopener noreferrer">Acessar @ifl_florianopolis ↗</a>'); return; }
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent('Olá! Vim pelo site do IFL Florianópolis e gostaria de mais informações.')}`, '_blank', 'noopener,noreferrer');
  }
  $('#whatsapp-contact').addEventListener('click', openWhatsApp);
  $('#floating-whatsapp').addEventListener('click', openWhatsApp);
  if(data.contacts.whatsapp) $('#whatsapp-label').textContent = data.contacts.whatsapp;
  $('#email-contact').addEventListener('click', () => {
    if(data.contacts.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contacts.email)) location.href=`mailto:${encodeURIComponent(data.contacts.email)}`;
    else showDialog('E-mail do instituto', '<p class="pending">[PREENCHER: e-mail do IFL Florianópolis]</p><p>O endereço oficial precisa ser informado pelo instituto.</p>');
  });
  if(data.contacts.email) $('#email-label').textContent = data.contacts.email;
  if(data.contacts.cnpj) { $('#cnpj').textContent = `CNPJ ${data.contacts.cnpj}`; $('#cnpj').classList.remove('pending'); }
  if(data.contacts.linkedin) $('#local-linkedin').outerHTML = `<a href="${safeURL(data.contacts.linkedin)}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn do IFL Florianópolis">${icon('linkedin')}</a>`;
  $('#year').textContent = new Intl.DateTimeFormat('pt-BR',{year:'numeric',timeZone:'America/Sao_Paulo'}).format(new Date());

  // Envio real após configuração. Nunca mostra sucesso sem resposta positiva.
  $$('form[data-form]').forEach(form => {
    const kind = form.dataset.form;
    const endpoint = kind === 'application' ? data.forms.applicationEndpoint : data.forms.contactEndpoint;
    if(endpoint && data.forms.privacyApproved) $('.form-config-note',form).hidden = true;
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if(!form.reportValidity()) return;
      const status = $('.form-status',form);
      status.dataset.state = 'error';
      if(!endpoint || !/^https:\/\//.test(endpoint)) { status.textContent = 'Envio ainda não disponível. [PREENCHER: canal de envio do instituto]. Seus dados não foram enviados.'; return; }
      if(!data.forms.privacyApproved) { status.textContent = 'Envio ainda não disponível. [CONFIRMAR: aprovação da política de privacidade]. Seus dados não foram enviados.'; return; }
      const button = $('[type=submit]',form);
      const original = button.innerHTML;
      button.disabled = true; button.textContent = 'Enviando…'; status.dataset.state = 'pending'; status.textContent = 'Enviando suas informações.';
      try {
        const response = await fetch(endpoint, {method:'POST',body:new FormData(form),headers:{Accept:'application/json'},signal:AbortSignal.timeout(20000)});
        if(!response.ok) throw new Error('send_failed');
        status.dataset.state = 'success';
        status.textContent = kind === 'application' ? 'Candidatura enviada com sucesso! O IFL Florianópolis recebeu suas informações para análise.' : 'Mensagem enviada com sucesso! Obrigado pelo contato com o IFL Florianópolis.';
        form.reset();
      } catch { status.dataset.state = 'error'; status.textContent = 'Não foi possível confirmar o envio. Tente novamente em alguns instantes ou utilize um dos canais de contato do instituto.'; }
      finally {button.disabled=false;button.innerHTML=original;}
    });
  });

  fillIcons();
  const banner = $('#cookie-banner');
  try { banner.hidden = localStorage.getItem('ifl-privacy-notice-v1') === 'acknowledged'; } catch { banner.hidden = false; }
  $('#accept-cookies').addEventListener('click', () => { banner.hidden=true; try{localStorage.setItem('ifl-privacy-notice-v1','acknowledged');}catch{} });
  if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting) {entry.target.classList.add('is-visible'); observer.unobserve(entry.target);} }), {threshold:.04});
    $$('.reveal').forEach(el => observer.observe(el));
    document.documentElement.classList.add('js-enabled');
  }
})();
