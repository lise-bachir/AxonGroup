/* Boutique Axon Group : catalogue, panier ("ma demande de devis") et envoi par e-mail.
   Les produits se modifient dans js/products.js — rien à changer ici. */
(() => {
  const KEY = "axon_demande";
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const ICONS = {
    phone: '<rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M11 18.5h2"/>',
    laptop: '<rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 19h20"/>',
    gaming: '<path d="M6 9h12a3 3 0 0 1 3 3v3a2 2 0 0 1-3.4 1.4L16 15H8l-1.6 1.4A2 2 0 0 1 3 15v-3a3 3 0 0 1 3-3z"/><path d="M8 11v2M7 12h2M15.5 11.5h.01M17.5 13h.01"/>',
    desktop: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
    tablet: '<rect x="5" y="2.5" width="14" height="19" rx="2"/><path d="M11 18.5h2"/>',
    printer: '<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',
    mouse: '<rect x="6" y="2.5" width="12" height="19" rx="6"/><path d="M12 2.5v7"/>',
    storage: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    plug: '<path d="M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0z"/><path d="M12 17v5"/>',
    wifi: '<path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M2 9a14.5 14.5 0 0 1 20 0"/><circle cx="12" cy="19.5" r="1"/>',
    switch: '<rect x="2" y="8" width="20" height="8" rx="2"/><path d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01"/>',
    shield: '<path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z"/><path d="M9 12l2 2 4-4"/>',
    camera: '<rect x="2" y="7" width="14" height="9" rx="2"/><path d="M16 10l6-3v10l-6-3"/>',
    face: '<rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M8.5 17c1-2 2.2-2.5 3.5-2.5s2.5.5 3.5 2.5"/>',
    rack: '<rect x="4" y="2" width="16" height="20" rx="1.5"/><path d="M4 8h16M4 14h16M8 5h.01M8 11h.01M8 18h.01"/>',
    bolt: '<path d="M13 2L3 14h8l-1 8 10-12h-8z"/>',
  };
  const svg = (name, size = 64) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.desktop}</svg>`;
  const catOf = (id) => CATS.find((c) => c.id === id);
  const byId = (id) => PRODUCTS.find((p) => p.id === id);
  const imgOf = (p) => p.img || (typeof IMAGE_IDS !== "undefined" && IMAGE_IDS.has(p.id) ? `assets/produits/${p.id}.webp` : "");
  const optsHtml = (p, cls = "opts") => p.opts
    ? `<div class="${cls}">${Object.entries(p.opts).map(([label, values]) =>
        `<label>${esc(label)}<select data-opt="${esc(label)}">${values.map((v) => `<option>${esc(v)}</option>`).join("")}</select></label>`).join("")}</div>`
    : "";
  const readOpts = (root) => { const o = {}; root.querySelectorAll("[data-opt]").forEach((el) => { o[el.dataset.opt] = el.value; }); return o; };
  const optsText = (o) => Object.entries(o || {}).map(([k, v]) => `${k} : ${v}`).join(" · ");

  /* ---------- Panier ---------- */
  const load = () => {
    try {
      const v = JSON.parse(localStorage.getItem(KEY));
      return Array.isArray(v) ? v.filter((i) => byId(i.id)).map((i) => ({ ...i, opts: i.opts || {} })) : [];
    } catch { return []; }
  };
  let cart = load();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch { /* ignoré */ } renderCart(); };
  const count = () => cart.reduce((n, i) => n + i.qty, 0);
  const defaultMode = (p) => (p.vente ? "achat" : "location");

  function add(id, opts = {}) {
    const p = byId(id); if (!p) return;
    const key = JSON.stringify(opts);
    const line = cart.find((i) => i.id === id && JSON.stringify(i.opts || {}) === key);
    if (line) line.qty += 1; else cart.push({ id, qty: 1, mode: defaultMode(p), opts });
    save();
    toast(`${p.brand} ${p.name} ajouté à votre demande`);
  }

  let toastTimer;
  function toast(msg) {
    const t = $("#toast"); if (!t) return;
    t.textContent = msg; t.classList.add("is-on");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("is-on"), 2200);
  }

  /* ---------- Catalogue ---------- */
  const state = { cat: "all", brand: "all", q: "", mode: "all" };
  const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  function filtered(ignoreBrand = false) {
    const q = norm(state.q.trim());
    return PRODUCTS.filter((p) =>
      (state.cat === "all" || p.cat === state.cat) &&
      (ignoreBrand || state.brand === "all" || p.brand === state.brand) &&
      (state.mode === "all" || (state.mode === "vente" ? p.vente : p.location)) &&
      (!q || norm(`${p.brand} ${p.name} ${p.specs.join(" ")} ${catOf(p.cat).label}`).includes(q))
    );
  }

  function renderChips() {
    const all = `<button class="chip ${state.cat === "all" ? "is-active" : ""}" data-cat="all">Tout (${PRODUCTS.length})</button>`;
    $("#chips").innerHTML = all + CATS.map((c) => {
      const n = PRODUCTS.filter((p) => p.cat === c.id).length;
      return `<button class="chip ${state.cat === c.id ? "is-active" : ""}" data-cat="${c.id}">${esc(c.label)} (${n})</button>`;
    }).join("");
  }

  function renderBrands() {
    const brands = [...new Set(filtered(true).map((p) => p.brand))].sort((a, b) => a.localeCompare(b));
    if (state.brand !== "all" && !brands.includes(state.brand)) state.brand = "all";
    $("#brand").innerHTML = `<option value="all">Toutes les marques</option>` +
      brands.map((b) => `<option ${b === state.brand ? "selected" : ""}>${esc(b)}</option>`).join("");
  }

  function card(p) {
    const c = catOf(p.cat);
    const src = imgOf(p);
    const visual = src ? `<img src="${esc(src)}" alt="${esc(p.brand + " " + p.name)}" loading="lazy" decoding="async">` : svg(c.icon, p.opts ? 48 : 72);
    const modes = [p.vente ? "Vente" : "", p.location ? "Location" : ""].filter(Boolean).map((m) => `<span class="mode">${m}</span>`).join("");
    return `<article class="product ${p.opts ? "product--opts" : ""}">
      <div class="product__visual ${src ? "has-img" : ""}"><span class="brand-pill">${esc(p.brand)}</span><span class="modes">${modes}</span>${visual}</div>
      <div class="product__body">
        <h3>${esc(p.name)}</h3>
        <ul class="specs">${p.specs.slice(0, p.opts ? 2 : 3).map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
        ${optsHtml(p)}
        <div class="product__actions">
          ${p.opts ? "" : `<button class="btn btn--outline btn--sm" data-detail="${p.id}">Détails</button>`}
          <button class="btn btn--primary btn--sm" data-add="${p.id}">Ajouter</button>
        </div>
      </div></article>`;
  }

  function renderGrid() {
    const list = filtered();
    $("#count").textContent = `${list.length} produit${list.length > 1 ? "s" : ""}`;
    $("#grid").innerHTML = list.map(card).join("");
    $("#empty").hidden = list.length > 0;
  }

  const renderAll = () => { renderChips(); renderBrands(); renderGrid(); };

  /* ---------- Fiche détail ---------- */
  function openDetail(id) {
    const p = byId(id); const c = catOf(p.cat);
    const src = imgOf(p);
    const visual = src ? `<img src="${esc(src)}" alt="${esc(p.brand + " " + p.name)}">` : svg(c.icon, 96);
    $("#detail-body").innerHTML = `
      <div class="detail__visual ${src ? "has-img" : ""}">${visual}</div>
      <div class="detail__text">
        <span class="eyebrow">${esc(c.label)}</span>
        <h2>${esc(p.brand)} ${esc(p.name)}</h2>
        <p class="detail__modes">${[p.vente ? "Disponible à la vente" : "", p.location ? "Disponible à la location" : ""].filter(Boolean).join(" · ")}</p>
        <ul class="specs specs--full">${p.specs.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
        ${optsHtml(p)}
        <p class="note">Caractéristiques indicatives. La configuration exacte, la référence et la disponibilité sont confirmées dans votre devis.</p>
        <button class="btn btn--primary" data-add="${p.id}" data-close="1">Ajouter à ma demande</button>
      </div>`;
    $("#detail").showModal();
  }

  /* ---------- Panneau "Ma demande" ---------- */
  function renderCart() {
    document.querySelectorAll("[data-cart-count]").forEach((el) => { el.textContent = count(); });
    const list = $("#cart-list"); if (!list) return;
    $("#cart-empty").hidden = cart.length > 0;
    $("#cart-form").hidden = cart.length === 0;
    list.innerHTML = cart.map((i) => {
      const p = byId(i.id);
      const opts = [p.vente ? ["achat", "Achat"] : null, p.location ? ["location", "Location"] : null].filter(Boolean)
        .map(([v, l]) => `<option value="${v}" ${i.mode === v ? "selected" : ""}>${l}</option>`).join("");
      return `<li class="line" data-i="${cart.indexOf(i)}">
        <div class="line__info"><span class="line__brand">${esc(p.brand)}</span><strong>${esc(p.name)}</strong>${i.opts && Object.keys(i.opts).length ? `<small class="line__opts">${esc(optsText(i.opts))}</small>` : ""}</div>
        <div class="line__controls">
          <select data-mode aria-label="Achat ou location">${opts}</select>
          <div class="qty"><button type="button" data-dec aria-label="Moins">−</button><span>${i.qty}</span><button type="button" data-inc aria-label="Plus">+</button></div>
          <button type="button" class="line__remove" data-remove aria-label="Retirer">✕</button>
        </div></li>`;
    }).join("");
    const hasRent = cart.some((i) => i.mode === "location");
    $("#rent-field").hidden = !hasRent;
  }

  const drawer = () => $("#drawer");
  function openCart() { drawer().classList.add("is-open"); $("#overlay").classList.add("is-open"); document.body.classList.add("no-scroll"); }
  function closeCart() { drawer().classList.remove("is-open"); $("#overlay").classList.remove("is-open"); document.body.classList.remove("no-scroll"); }

  /* ---------- Envoi du devis ---------- */
  const EMAIL = (typeof EMAIL_CONTACT !== "undefined") ? EMAIL_CONTACT : "commercial@axongroupcorp.com";
  function summary() {
    return cart.map((i, n) => {
      const p = byId(i.id);
      return `${n + 1}. ${p.brand} ${p.name}${i.opts && Object.keys(i.opts).length ? " (" + optsText(i.opts) + ")" : ""} — Quantité : ${i.qty} — ${i.mode === "location" ? "LOCATION" : "ACHAT"}`;
    }).join("\n");
  }

  async function submitQuote(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!cart.length) return;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const data = new FormData(form);
    if (data.get("_honey")) return;
    const total = count();
    data.set("Produits demandés", summary());
    if (!cart.some((i) => i.mode === "location")) data.delete("Durée de location");
    data.append("_subject", `Demande de devis (boutique) — ${cart.length} produit(s), ${total} article(s)`);
    data.append("_template", "table");
    data.append("_captcha", "false");
    const btn = $("#send"); const status = $("#cart-status");
    btn.disabled = true; status.className = "form__status";
    try {
      const r = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, { method: "POST", headers: { Accept: "application/json" }, body: data });
      const res = await r.json().catch(() => ({}));
      if (!r.ok || String(res.success) === "false") { console.error("FormSubmit :", r.status, res); throw new Error(res.message || r.status); }
      cart = []; save(); form.reset();
      status.className = "form__status is-ok";
      status.textContent = "Merci ! Votre demande de devis a bien été envoyée. Notre équipe vous répond sous 24h ouvrées.";
    } catch (e) {
      console.error(e);
      const body = `${summary()}\n\n` + [...data.entries()].filter(([k]) => !k.startsWith("_") && k !== "Produits demandés").map(([k, v]) => `${k} : ${v || "-"}`).join("\n");
      const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent("Demande de devis (boutique)")}&body=${encodeURIComponent(body)}`;
      status.className = "form__status is-error";
      status.innerHTML = `L'envoi automatique a échoué. <a href="${mailto}"><strong>Cliquez ici pour envoyer votre demande par e-mail</strong></a>, ou appelez le +221 78 716 59 52.`;
    } finally { btn.disabled = false; }
  }

  /* ---------- Événements ---------- */
  document.addEventListener("click", (e) => {
    const t = e.target.closest("button, [data-open-cart]"); if (!t) return;
    if (t.dataset.cat) { state.cat = t.dataset.cat; state.brand = "all"; renderAll(); }
    else if (t.dataset.add) { add(t.dataset.add, readOpts(t.closest(".product, .detail__text") || document)); if (t.dataset.close) $("#detail").close(); }
    else if (t.dataset.detail) openDetail(t.dataset.detail);
    else if (t.hasAttribute("data-open-cart")) { e.preventDefault(); openCart(); }
    else if (t.hasAttribute("data-close-cart")) closeCart();
    else if (t.hasAttribute("data-close-detail")) $("#detail").close();
    else if (t.closest(".line")) {
      const line = cart[Number(t.closest(".line").dataset.i)]; if (!line) return;
      if (t.hasAttribute("data-inc")) line.qty = Math.min(line.qty + 1, 999);
      else if (t.hasAttribute("data-dec")) line.qty = Math.max(line.qty - 1, 1);
      else if (t.hasAttribute("data-remove")) cart = cart.filter((i) => i !== line);
      save();
    }
  });
  document.addEventListener("change", (e) => {
    if (e.target.matches("[data-mode]")) {
      const line = cart[Number(e.target.closest(".line").dataset.i)];
      if (line) { line.mode = e.target.value; save(); }
    }
  });
  $("#overlay").addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCart(); });
  $("#brand").addEventListener("change", (e) => { state.brand = e.target.value; renderGrid(); });
  $("#mode").addEventListener("change", (e) => { state.mode = e.target.value; renderAll(); });
  $("#search").addEventListener("input", (e) => { state.q = e.target.value; renderAll(); });
  $("#detail").addEventListener("click", (e) => { if (e.target === e.currentTarget) e.currentTarget.close(); });
  $("#cart-form").addEventListener("submit", submitQuote);
  $("#reset").addEventListener("click", () => { Object.assign(state, { cat: "all", brand: "all", q: "", mode: "all" }); $("#search").value = ""; $("#mode").value = "all"; renderAll(); });

  // Catégorie demandée dans l'adresse (ex. boutique.html#cctv)
  const hash = decodeURIComponent(location.hash.slice(1));
  if (CATS.some((c) => c.id === hash)) state.cat = hash;

  renderAll();
  renderCart();
})();
