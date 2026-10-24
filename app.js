// Habitanium changelog site: unlock with the team password, decrypt the
// data, then render « Quoi de neuf », « Le plan », « Épopées » and « Galerie ».
(function () {
  "use strict";

  const TZ = "America/Toronto";
  const KEY_STORE = "hab-changelog-key";
  const LANG_STORE = "hab-changelog-lang";
  const LOCK_SIGNAL = "hab-changelog-locked";
  const PAGE = 25;

  const T = {
    fr: {
      title: "Journal de bord",
      tagline: "Tout ce qui change dans l'app Habitanium.",
      lockText:
        "Ce contenu est chiffré. Entrez le mot de passe de l'équipe pour l'ouvrir.",
      password: "Mot de passe",
      remember: "Se souvenir de cet appareil",
      open: "Ouvrir",
      opening: "Ouverture…",
      wrong: "Mot de passe incorrect.",
      failed: "Impossible d'ouvrir le journal. Réessayez dans un moment.",
      unsupported:
        "Ce navigateur ne peut pas ouvrir le journal. Utilisez une version récente de Chrome, Edge, Firefox ou Safari, à son adresse https.",
      framed: "Ouvrez le journal directement à son adresse.",
      stale: "Le journal a été mis à jour.",
      reload: "Recharger",
      imageFailed: "Image indisponible.",
      previewNote: "Aperçu : n'importe quel mot de passe fonctionne.",
      lock: "Verrouiller",
      otherLang: "English",
      tabs: {
        news: "Quoi de neuf",
        review: "À revoir",
        plan: "Le plan",
        epics: "Épopées",
        gallery: "Galerie",
      },
      prsTitle: "Pull requests ouvertes",
      prsIntro:
        "Le travail en cours de revue. Une PR est prête pour votre « merge » quand la revue indépendante l'approuve et que les vérifications passent.",
      prGroups: {
        ready: "Prêtes pour votre merge",
        review: "En revue",
        draft: "Brouillons",
      },
      prState: {
        draft: "Brouillon",
        none: "En attente de revue",
        changes: "Corrections demandées",
        approved: "Revue approuvée",
        reviewed: "Revue faite",
        outdated: "Nouvelle version à revoir",
      },
      ci: {
        none: "Vérifications pas lancées",
        running: "Vérifications en cours",
        passed: "Vérifications réussies",
        failed: "Vérifications en échec",
      },
      landing: "En train d'atterrir",
      noPrs: "Aucune pull request ouverte.",
      prUpdated: "mise à jour {when}",
      acceptTitle: "Construites, à accepter",
      acceptIntro:
        "Stories construites et testées qui attendent votre acceptation, épopée par épopée.",
      toAccept: "{n} à accepter",
      updated: "Mis à jour le {date}",
      week: "Changements cette semaine",
      progress: "Avancement des stories",
      built: "{p} % construit",
      status: {
        done: "Terminée",
        review: "Construite, à accepter",
        "in-progress": "En cours",
        "ready-for-dev": "Prête à construire",
        backlog: "Prévue",
      },
      epicStatus: {
        done: "Terminée",
        "in-progress": "En cours",
        backlog: "Prévue",
      },
      kinds: {
        all: "Tout",
        feature: "Fonctionnalités",
        fix: "Correctifs",
        plan: "Plan",
        docs: "Docs",
        tooling: "Outils et règles",
        other: "Autres",
      },
      kind1: {
        feature: "Fonctionnalité",
        fix: "Correctif",
        plan: "Changement de plan",
        docs: "Documentation",
        tooling: "Outils et règles",
        other: "Autre",
      },
      lanesAll: "Toutes les voies",
      lane: "Voie {l}",
      laneName: {
        A: "Argent et données",
        B: "Accès et sécurité",
        C: "Écrans et le reste",
      },
      laneWhat: {
        A: "Facturation, grand livre, paiements, imports.",
        B: "Connexion, 2FA, rôles, permissions, journal d'audit.",
        C: "Pages, documents et tout le reste.",
      },
      search: "Rechercher",
      today: "Aujourd'hui",
      yesterday: "Hier",
      count: { one: "{n} changement", other: "{n} changements" },
      readMore: "Lire plus",
      readLess: "Réduire",
      builtWith: "Construit avec {m}",
      showMore: "Voir plus",
      noResults: "Rien ne correspond à ces filtres.",
      planIntro:
        "Trois voies avancent en même temps, une story à la fois par voie. Seule la voie A touche à l'argent.",
      head: "En tête de file",
      next: "Ensuite",
      shipped: "Déjà livrées",
      queueEmpty: "File terminée",
      others: "+ {n} autres",
      epic: "Épopée {n}",
      epicsAll: "Toutes",
      epicsActive: "En cours",
      epicsDone: "Terminées",
      epicsPlanned: "Prévues",
      epicCounts: "{d} sur {t} terminées",
      epicToAccept: "{r} à accepter",
      story: "Story {l}",
      related: "Changements liés",
      shots: "Captures ({n})",
      noShots: "Pas encore de captures pour cette story.",
      noRelated: "Aucun changement relié pour l'instant.",
      language: "Langue",
      device: "Appareil",
      theme: "Thème",
      any: "Tous",
      desktop: "Ordinateur",
      phone: "Téléphone",
      light: "Clair",
      dark: "Sombre",
      images: { one: "{n} image", other: "{n} images" },
      showAll: "Voir les {n}",
      showLess: "Moins",
      close: "Fermer",
      prev: "Image précédente",
      nextImg: "Image suivante",
      openStory: "Ouvrir la story",
      auto: "Construite en mode auto",
      other: "Autres captures",
    },
    en: {
      title: "Build journal",
      tagline: "Everything that changes in the Habitanium app.",
      lockText:
        "This content is encrypted. Enter the team password to open it.",
      password: "Password",
      remember: "Remember this device",
      open: "Open",
      opening: "Opening…",
      wrong: "Wrong password.",
      failed: "The journal could not be opened. Try again in a moment.",
      unsupported:
        "This browser cannot open the journal. Use a recent Chrome, Edge, Firefox or Safari, at its https address.",
      framed: "Open the journal at its own address.",
      stale: "The journal was updated.",
      reload: "Reload",
      imageFailed: "Image unavailable.",
      previewNote: "Preview: any password works.",
      lock: "Lock",
      otherLang: "Français",
      tabs: {
        news: "What's new",
        review: "To review",
        plan: "The plan",
        epics: "Epics",
        gallery: "Gallery",
      },
      prsTitle: "Open pull requests",
      prsIntro:
        'Work under review. A PR is ready for your "merge" when the independent review approves it and the checks pass.',
      prGroups: {
        ready: "Ready for your merge",
        review: "In review",
        draft: "Drafts",
      },
      prState: {
        draft: "Draft",
        none: "Waiting for review",
        changes: "Changes requested",
        approved: "Review approved",
        reviewed: "Reviewed",
        outdated: "New version to review",
      },
      ci: {
        none: "Checks not run",
        running: "Checks running",
        passed: "Checks passed",
        failed: "Checks failed",
      },
      landing: "Landing",
      noPrs: "No open pull request.",
      prUpdated: "updated {when}",
      acceptTitle: "Built, to accept",
      acceptIntro:
        "Stories built and tested that wait for your acceptance, epic by epic.",
      toAccept: "{n} to accept",
      updated: "Updated {date}",
      week: "Changes this week",
      progress: "Story progress",
      built: "{p}% built",
      status: {
        done: "Done",
        review: "Built, to accept",
        "in-progress": "In progress",
        "ready-for-dev": "Ready to build",
        backlog: "Planned",
      },
      epicStatus: {
        done: "Done",
        "in-progress": "In progress",
        backlog: "Planned",
      },
      kinds: {
        all: "All",
        feature: "Features",
        fix: "Fixes",
        plan: "Plan",
        docs: "Docs",
        tooling: "Tools & rules",
        other: "Other",
      },
      kind1: {
        feature: "Feature",
        fix: "Fix",
        plan: "Change of plan",
        docs: "Documentation",
        tooling: "Tools & rules",
        other: "Other",
      },
      lanesAll: "All lanes",
      lane: "Lane {l}",
      laneName: {
        A: "Money & data",
        B: "Access & security",
        C: "Screens & the rest",
      },
      laneWhat: {
        A: "Billing, ledger, payments, imports.",
        B: "Sign-in, 2FA, roles, permissions, audit log.",
        C: "Pages, documents and everything else.",
      },
      search: "Search",
      today: "Today",
      yesterday: "Yesterday",
      count: { one: "{n} change", other: "{n} changes" },
      readMore: "Read more",
      readLess: "Show less",
      builtWith: "Built with {m}",
      showMore: "Show more",
      noResults: "Nothing matches these filters.",
      planIntro:
        "Three lanes move at the same time, one story at a time per lane. Only lane A touches money.",
      head: "Head of the queue",
      next: "Next",
      shipped: "Already shipped",
      queueEmpty: "Queue done",
      others: "+ {n} more",
      epic: "Epic {n}",
      epicsAll: "All",
      epicsActive: "In progress",
      epicsDone: "Done",
      epicsPlanned: "Planned",
      epicCounts: "{d} of {t} done",
      epicToAccept: "{r} to accept",
      story: "Story {l}",
      related: "Related changes",
      shots: "Screenshots ({n})",
      noShots: "No screenshots for this story yet.",
      noRelated: "No related change yet.",
      language: "Language",
      device: "Device",
      theme: "Theme",
      any: "All",
      desktop: "Desktop",
      phone: "Phone",
      light: "Light",
      dark: "Dark",
      images: { one: "{n} image", other: "{n} images" },
      showAll: "See all {n}",
      showLess: "Less",
      close: "Close",
      prev: "Previous image",
      nextImg: "Next image",
      openStory: "Open the story",
      auto: "Built in auto mode",
      other: "Other screenshots",
    },
  };

  const KIND_ICON = {
    feature: "sparkles",
    fix: "wrench",
    plan: "map",
    docs: "file-text",
    tooling: "settings",
    other: "git-commit-horizontal",
  };
  const LANE_ICON = { A: "banknote", B: "shield-check", C: "layout-dashboard" };
  const KINDS = ["feature", "fix", "plan", "docs", "tooling", "other"];

  const preview = window.HAB_PREVIEW || null;
  const LOGO = (preview && preview.logo) || "logo.png";
  const ICONS = window.HAB_ICONS || {};
  const state = {
    lang: initialLang(),
    tab: "news",
    data: null,
    key: null,
    news: { kind: "all", lane: "all", q: "", limit: PAGE, open: new Set() },
    epics: { filter: "all" },
    review: { expanded: new Set() },
    gallery: {
      locale: "all",
      device: "all",
      theme: "all",
      expanded: new Set(),
    },
  };

  // ---------- helpers ----------
  const $ = (sel, root) => (root || document).querySelector(sel);
  const ESC = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ESC[c]);
  const rich = (s) => esc(s).replace(/`([^`]+)`/g, "<code>$1</code>");
  const icon = (name) =>
    `<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;

  function t(path, vars) {
    let v = path
      .split(".")
      .reduce((o, k) => (o ? o[k] : undefined), T[state.lang]);
    if (v && typeof v === "object" && vars && "n" in vars) {
      v =
        new Intl.PluralRules(state.lang).select(vars.n) === "one"
          ? v.one
          : v.other;
    }
    return String(v == null ? path : v).replace(/\{(\w+)\}/g, (_, k) =>
      vars && k in vars ? vars[k] : "",
    );
  }

  function initialLang() {
    try {
      const saved = localStorage.getItem(LANG_STORE);
      if (saved === "fr" || saved === "en") return saved;
    } catch {
      // storage blocked: fall back to the browser's language
    }
    return /^en\b/i.test(navigator.language || "") ? "en" : "fr";
  }

  function store(kind, key, value) {
    try {
      const s = kind === "local" ? localStorage : sessionStorage;
      if (value == null) s.removeItem(key);
      else s.setItem(key, value);
    } catch {
      // storage blocked: the visitor types the password again next time
    }
  }
  function load(key) {
    try {
      return sessionStorage.getItem(key) || localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  const locale = () => (state.lang === "fr" ? "fr-CA" : "en-CA");
  const dayKey = (d) =>
    new Intl.DateTimeFormat("en-CA", {
      timeZone: TZ,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(d);
  const fmt = (d, opts) =>
    new Intl.DateTimeFormat(locale(), { timeZone: TZ, ...opts }).format(d);

  function ago(iso) {
    const mins = Math.round((new Date(iso).getTime() - Date.now()) / 60000);
    const rtf = new Intl.RelativeTimeFormat(locale(), { numeric: "auto" });
    if (Math.abs(mins) < 60) return rtf.format(mins, "minute");
    if (Math.abs(mins) < 60 * 24)
      return rtf.format(Math.round(mins / 60), "hour");
    return rtf.format(Math.round(mins / 1440), "day");
  }

  function dayLabel(key) {
    const now = new Date();
    if (key === dayKey(now)) return t("today");
    const [y, m, d0] = dayKey(now).split("-").map(Number);
    if (key === dayKey(new Date(Date.UTC(y, m - 1, d0 - 1, 12))))
      return t("yesterday");
    const d = new Date(`${key}T12:00:00`);
    const label = new Intl.DateTimeFormat(locale(), {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: d.getFullYear() === now.getFullYear() ? undefined : "numeric",
    }).format(d);
    return label.charAt(0).toUpperCase() + label.slice(1);
  }

  const b64 = {
    decode: (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0)),
    encode: (bytes) => btoa(String.fromCharCode(...bytes)),
  };

  // ---------- encrypted source ----------
  function config() {
    return JSON.parse($("#hab-config").textContent);
  }
  async function deriveRaw(password) {
    const { salt, iterations } = config();
    const base = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(password.normalize("NFC")),
      "PBKDF2",
      false,
      ["deriveBits"],
    );
    const bits = await crypto.subtle.deriveBits(
      { name: "PBKDF2", hash: "SHA-256", salt: b64.decode(salt), iterations },
      base,
      256,
    );
    return new Uint8Array(bits);
  }
  async function decrypt(key, buffer) {
    const bytes = new Uint8Array(buffer);
    return crypto.subtle.decrypt(
      { name: "AES-GCM", iv: bytes.slice(0, 12) },
      key,
      bytes.slice(12),
    );
  }
  async function fetchBytes(url) {
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) throw new Error(`fetch ${url}: ${res.status}`);
    return res.arrayBuffer();
  }
  async function openWith(raw) {
    const key = await crypto.subtle.importKey("raw", raw, "AES-GCM", false, [
      "decrypt",
    ]);
    const box = await fetchBytes("data.bin");
    let plain;
    try {
      plain = await decrypt(key, box);
    } catch {
      const wrong = new Error("wrong password");
      wrong.wrong = true;
      throw wrong;
    }
    const stream = new Blob([plain])
      .stream()
      .pipeThrough(new DecompressionStream("gzip"));
    const data = JSON.parse(await new Response(stream).text());
    return { key, data };
  }

  const imageCache = new Map();
  // Bumped by a lock, so an image that finishes decrypting after it is
  // dropped instead of shown.
  let epoch = 0;
  function imageUrl(id) {
    if (!imageCache.has(id)) {
      const img = state.data.images[id];
      const mine = epoch;
      const p = preview
        ? Promise.resolve(img.src || "")
        : fetchBytes(`s/${img.f}.bin`)
            .then((buf) => decrypt(state.key, buf))
            .then((plain) => {
              const url = URL.createObjectURL(
                new Blob([plain], { type: img.type }),
              );
              if (mine === epoch) return url;
              URL.revokeObjectURL(url);
              return "";
            });
      imageCache.set(
        id,
        p.catch((err) => {
          // A later view tries again; a 404 means the site was rebuilt.
          imageCache.delete(id);
          if (/: 404$/.test(err.message)) showStale();
          throw err;
        }),
      );
    }
    return imageCache.get(id);
  }
  function showStale() {
    if (document.getElementById("stale")) return;
    const bar = document.createElement("div");
    bar.id = "stale";
    bar.className = "stale";
    bar.setAttribute("role", "status");
    bar.innerHTML = `<span>${esc(t("stale"))}</span><button class="btn-outline" type="button">${esc(t("reload"))}</button>`;
    bar.querySelector("button").onclick = () => location.reload();
    document.body.append(bar);
  }
  const observer =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              if (!e.isIntersecting) continue;
              observer.unobserve(e.target);
              showImage(e.target);
            }
          },
          { rootMargin: "300px" },
        )
      : null;
  function showImage(el) {
    imageUrl(Number(el.dataset.img))
      .then((url) => {
        if (url) el.src = url;
      })
      .catch(() => {
        el.classList.add("broken");
        el.alt = t("imageFailed");
      });
  }
  function forgetImages(root) {
    if (!observer) return;
    for (const el of root.querySelectorAll("img[data-img]"))
      observer.unobserve(el);
  }
  function hydrateImages(root) {
    for (const el of root.querySelectorAll("img[data-img]:not([src])")) {
      if (observer) observer.observe(el);
      else showImage(el);
    }
  }

  // ---------- lock screen ----------
  function renderLock(message) {
    document.documentElement.lang = state.lang;
    document.title = `Habitanium · ${t("title")}`;
    $("#root").innerHTML = `
      <div class="lock">
        <div class="lock-card">
          <img class="mark" src="${LOGO}" alt="" />
          <h1>${esc(t("title"))}</h1>
          <p>${esc(t("lockText"))}</p>
          <form id="lock-form" autocomplete="on">
            <label class="label" for="pw">${esc(t("password"))}</label>
            <input class="field" id="pw" name="password" type="password" autocomplete="current-password" required />
            <label class="check"><input type="checkbox" id="remember" /> ${esc(t("remember"))}</label>
            <p class="lock-error" id="lock-error" role="alert">${esc(message || "")}</p>
            <button class="btn-primary" id="open-btn" type="submit">${icon("lock")} ${esc(t("open"))}</button>
          </form>
          ${preview ? `<p class="lock-note">${esc(t("previewNote"))}</p>` : ""}
          <button class="btn-ghost" id="lock-lang" type="button">${icon("languages")} ${esc(t("otherLang"))}</button>
        </div>
      </div>`;
    $("#pw").focus();
    $("#lock-lang").onclick = () => {
      setLang(state.lang === "fr" ? "en" : "fr");
      renderLock();
    };
    $("#lock-form").onsubmit = async (ev) => {
      ev.preventDefault();
      const btn = $("#open-btn");
      btn.disabled = true;
      btn.textContent = t("opening");
      $("#lock-error").textContent = "";
      try {
        if (preview) {
          start(preview.data, null);
          return;
        }
        const raw = await deriveRaw($("#pw").value);
        const { key, data } = await openWith(raw);
        const remember = $("#remember").checked;
        if (!start(data, key)) return;
        store("local", KEY_STORE, remember ? b64.encode(raw) : null);
        store("session", KEY_STORE, remember ? null : b64.encode(raw));
      } catch (err) {
        btn.disabled = false;
        btn.innerHTML = `${icon("lock")} ${esc(t("open"))}`;
        $("#lock-error").textContent =
          err && err.wrong ? t("wrong") : t("failed");
        $("#pw").select();
      }
    };
  }

  function lockNow() {
    store("local", KEY_STORE, null);
    store("session", KEY_STORE, null);
    // Tells the other tabs, whether their key is remembered or not.
    store("local", LOCK_SIGNAL, String(Date.now()));
    epoch++;
    for (const id of ["lightbox", "drawer", "drawer-scrim", "stale"]) {
      document.getElementById(id)?.remove();
    }
    for (const p of imageCache.values()) {
      p.then(
        (u) => u && u.startsWith("blob:") && URL.revokeObjectURL(u),
        () => {},
      );
    }
    imageCache.clear();
    state.data = null;
    state.key = null;
    // The address names no tab or story once locked.
    history.replaceState(null, "", location.pathname + location.search);
    renderLock();
  }
  // « Verrouiller » in one tab locks every other open tab.
  addEventListener("storage", (ev) => {
    if (ev.key === LOCK_SIGNAL && state.data && !preview) lockNow();
  });

  function setLang(lang) {
    state.lang = lang;
    store("local", LANG_STORE, lang);
  }

  // ---------- app ----------
  // Returns false, with the lock screen showing why, when the data cannot
  // be shown (for example a cached page with newer data).
  function start(data, key) {
    try {
      state.data = data;
      state.key = key;
      const fromHash = (location.hash.match(
        /^#(news|review|plan|epics|gallery)/,
      ) || [])[1];
      if (fromHash) state.tab = fromHash;
      renderApp();
      const story = (location.hash.match(/story=([\w-]+)/) || [])[1];
      if (story && data.stories[story]) openStory(story);
      return true;
    } catch {
      state.data = null;
      state.key = null;
      renderLock(t("failed"));
      return false;
    }
  }

  function renderApp() {
    document.documentElement.lang = state.lang;
    document.title = `Habitanium · ${t("title")}`;
    const tabs = ["news", "review", "plan", "epics", "gallery"]
      .map(
        (id) =>
          `<button class="tab" role="tab" data-tab="${id}" aria-selected="${state.tab === id}">${esc(t(`tabs.${id}`))}</button>`,
      )
      .join("");
    $("#root").innerHTML = `
      <header class="topbar">
        <div class="topbar-inner">
          <div class="brand"><img src="${LOGO}" alt="" /><div>Habitanium<small>${esc(t("title"))}</small></div></div>
          <nav class="tabs" role="tablist" aria-label="${esc(t("title"))}">${tabs}</nav>
          <div class="tools">
            <button class="btn-ghost" id="lang-btn" type="button" title="${esc(t("otherLang"))}">${icon("languages")} ${state.lang === "fr" ? "EN" : "FR"}</button>
            <button class="btn-ghost" id="lock-btn" type="button" title="${esc(t("lock"))}">${icon("lock")}<span class="hide-sm">${esc(t("lock"))}</span></button>
          </div>
        </div>
      </header>
      <main>
        ${renderHero()}
        <section id="view"></section>
      </main>`;
    for (const b of document.querySelectorAll("[data-tab]")) {
      b.onclick = () => {
        state.tab = b.dataset.tab;
        history.replaceState(null, "", `#${state.tab}`);
        for (const x of document.querySelectorAll("[data-tab]"))
          x.setAttribute("aria-selected", String(x === b));
        renderView();
      };
    }
    $("#lang-btn").onclick = () => {
      setLang(state.lang === "fr" ? "en" : "fr");
      renderApp();
    };
    $("#lock-btn").onclick = lockNow;
    requestAnimationFrame(() => {
      for (const s of document.querySelectorAll(".bar span"))
        s.style.width = s.dataset.w;
    });
    renderView();
  }

  function storyCounts(keys) {
    const c = { done: 0, review: 0, active: 0, backlog: 0, total: keys.length };
    for (const k of keys) {
      const s = state.data.stories[k].status;
      if (s === "done") c.done++;
      else if (s === "review") c.review++;
      else if (s === "in-progress" || s === "ready-for-dev") c.active++;
      else c.backlog++;
    }
    return c;
  }

  function avatar(author) {
    const name = author.name || author.login;
    const initials = esc(name.slice(0, 1).toUpperCase());
    if (author.login === "claude")
      return `<span class="avatar">${icon("bot")}</span>`;
    if (!author.id) return `<span class="avatar">${initials}</span>`;
    const src = `https://avatars.githubusercontent.com/u/${author.id}?s=64&v=4`;
    return `<span class="avatar"><img src="${src}" alt="" loading="lazy" referrerpolicy="no-referrer" data-fallback="${initials}" /></span>`;
  }

  function renderHero() {
    const d = state.data;
    const all = storyCounts(Object.keys(d.stories));
    const pct = (n) => `${((n / Math.max(all.total, 1)) * 100).toFixed(2)}%`;
    const builtPct = Math.round(
      ((all.done + all.review) / Math.max(all.total, 1)) * 100,
    );
    const since = Date.now() - 7 * 864e5;
    const week = d.changes.filter(
      (c) => new Date(c.date).getTime() >= since,
    ).length;
    const updated = fmt(new Date(d.head.date), {
      dateStyle: "long",
      timeStyle: "short",
    });
    return `
      <section class="hero">
        <h1>${esc(t("title"))}</h1>
        <p class="sub">${esc(t("tagline"))} ${esc(t("updated", { date: updated }))}.</p>
        <div class="kpis">
          <div class="card kpi">
            <span class="tile">${icon("git-merge")}</span>
            <div><div class="num">${week}</div><div class="lbl">${esc(t("week"))}</div></div>
          </div>
          <div class="card progress-card">
            <div class="head"><span>${esc(t("progress"))}</span><strong>${esc(t("built", { p: builtPct }))}</strong></div>
            <div class="bar" role="img" aria-label="${esc(t("built", { p: builtPct }))}">
              <span class="s-done" data-w="${pct(all.done)}"></span><span class="s-review" data-w="${pct(all.review)}"></span><span class="s-active" data-w="${pct(all.active)}"></span><span class="s-backlog" data-w="${pct(all.backlog)}"></span>
            </div>
            <div class="legend">
              <span><i class="s-done"></i>${esc(t("status.done"))} <b>${all.done}</b></span>
              <span><i class="s-review"></i>${esc(t("status.review"))} <b>${all.review}</b></span>
              <span><i class="s-active"></i>${esc(t("status.in-progress"))} <b>${all.active}</b></span>
              <span><i class="s-backlog"></i>${esc(t("status.backlog"))} <b>${all.backlog}</b></span>
            </div>
          </div>
        </div>
      </section>`;
  }

  function renderView() {
    const view = $("#view");
    const render = {
      news: renderNews,
      review: renderReview,
      plan: renderPlan,
      epics: renderEpics,
      gallery: renderGallery,
    }[state.tab];
    forgetImages(view);
    view.innerHTML = render();
    wire(view);
    hydrateImages(view);
  }

  // Every interactive element carries a data-* action, wired here.
  function wire(root) {
    for (const el of root.querySelectorAll("[data-story]")) {
      el.onclick = (ev) => {
        ev.stopPropagation();
        openStory(el.dataset.story);
      };
    }
    for (const el of root.querySelectorAll("[data-shots]")) {
      el.onclick = () =>
        openLightbox(
          el.dataset.shots.split(",").map(Number),
          Number(el.dataset.at || 0),
        );
    }
    for (const el of root.querySelectorAll("[data-set]")) {
      el.onclick = () => {
        const [group, field, value] = el.dataset.set.split(":");
        state[group][field] = value;
        if (group === "news") state.news.limit = PAGE;
        renderView();
      };
    }
    const search = $("#news-q", root);
    if (search) {
      // Only the list is redrawn, so the field keeps its focus and an
      // accent being typed (dead key, IME) is not interrupted.
      const update = (ev) => {
        if (ev.isComposing) return;
        state.news.q = search.value;
        state.news.limit = PAGE;
        const list = $("#news-list");
        forgetImages(list);
        list.innerHTML = renderNewsList();
        wire(list);
        hydrateImages(list);
      };
      search.oninput = update;
      search.addEventListener("compositionend", update);
    }
    for (const el of root.querySelectorAll("[data-toggle-body]")) {
      el.onclick = () => {
        const sha = el.dataset.toggleBody;
        if (state.news.open.has(sha)) state.news.open.delete(sha);
        else state.news.open.add(sha);
        renderView();
      };
    }
    const more = $("#news-more", root);
    if (more) {
      more.onclick = () => {
        state.news.limit += PAGE;
        renderView();
      };
    }
    for (const el of root.querySelectorAll("[data-epic]")) {
      el.onclick = () => openEpic(Number(el.dataset.epic));
    }
    for (const el of root.querySelectorAll("[data-expand]")) {
      el.onclick = () => {
        const at = el.dataset.expand.indexOf(":");
        const group = el.dataset.expand.slice(0, at);
        const key = el.dataset.expand.slice(at + 1);
        const set = state[group].expanded;
        if (set.has(key)) set.delete(key);
        else set.add(key);
        renderView();
      };
    }
  }

  function chip(group, field, value, label) {
    return `<button class="chip" type="button" data-set="${group}:${field}:${value}" aria-pressed="${state[group][field] === value}">${label}</button>`;
  }

  function lanePill(lane) {
    return lane
      .split("+")
      .map(
        (l) =>
          `<span class="pill lane lane-${l}">${icon(LANE_ICON[l])}${esc(t("lane", { l }))}</span>`,
      )
      .join("");
  }
  function statusPill(status) {
    return `<span class="pill st-${esc(status)}">${esc(t(`status.${status}`))}</span>`;
  }
  function storyPill(key) {
    const s = state.data.stories[key];
    return `<button class="pill story-link" type="button" data-story="${esc(key)}" title="${esc(t("openStory"))}">${icon("book-open")}${esc(t("story", { l: s.label }))}</button>`;
  }

  // Clearest screenshots first: French, desktop, light.
  function ordered(ids) {
    const score = (i) => {
      const m = state.data.images[i];
      return (m.locale === "en" ? 2 : 0) + (m.phone ? 1 : 0) + (m.dark ? 4 : 0);
    };
    return [...ids].sort((a, b) => score(a) - score(b));
  }

  function thumbs(ids, max) {
    if (!ids.length) return "";
    const list = ordered(ids);
    const shown = list.slice(0, max);
    const all = list.join(",");
    return `<div class="thumbs">${shown
      .map((id, i) => {
        const extra =
          i === shown.length - 1 && list.length > max
            ? `<span class="more">+${list.length - max + 1}</span>`
            : "";
        return `<button class="thumb" type="button" data-shots="${all}" data-at="${i}" aria-label="${esc(state.data.images[id].name)}"><img data-img="${id}" alt="" />${extra}</button>`;
      })
      .join("")}</div>`;
  }

  // ---------- « Quoi de neuf » ----------
  function newsMatches(c) {
    const n = state.news;
    if (n.kind !== "all" && c.kind !== n.kind) return false;
    if (n.lane !== "all" && !c.lanes.includes(n.lane)) return false;
    if (!n.q.trim()) return true;
    const hay = [
      c.title,
      c.author.name || c.author.login,
      c.pr ? `#${c.pr}` : "",
      ...c.stories.map((k) => state.data.stories[k].label),
      ...c.blocks.map((b) => b.p || b.ul.join(" ")),
    ]
      .join(" ")
      .toLowerCase();
    return n.q
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean)
      .every((w) => hay.includes(w));
  }

  function renderNews() {
    const d = state.data;
    const counts = {};
    for (const c of d.changes) counts[c.kind] = (counts[c.kind] || 0) + 1;
    const kindChips = [chip("news", "kind", "all", esc(t("kinds.all")))]
      .concat(
        KINDS.filter((k) => counts[k]).map((k) =>
          chip(
            "news",
            "kind",
            k,
            `${icon(KIND_ICON[k])}${esc(t(`kinds.${k}`))} <span class="n">${counts[k]}</span>`,
          ),
        ),
      )
      .join("");
    const laneChips = [chip("news", "lane", "all", esc(t("lanesAll")))]
      .concat(
        ["A", "B", "C"].map((l) =>
          chip(
            "news",
            "lane",
            l,
            `${icon(LANE_ICON[l])}${esc(t("lane", { l }))}`,
          ),
        ),
      )
      .join("");
    return `
      <div class="toolbar">
        <label class="search">${icon("search")}<input id="news-q" type="search" placeholder="${esc(t("search"))}" aria-label="${esc(t("search"))}" value="${esc(state.news.q)}" /></label>
        <div class="filters">${kindChips}</div>
        <div class="filters">${laneChips}</div>
      </div>
      <div id="news-list">${renderNewsList()}</div>`;
  }

  function renderNewsList() {
    const list = state.data.changes.filter(newsMatches);
    const shown = list.slice(0, state.news.limit);
    const days = [];
    for (const c of shown) {
      const key = dayKey(new Date(c.date));
      if (!days.length || days[days.length - 1].key !== key)
        days.push({ key, items: [] });
      days[days.length - 1].items.push(c);
    }
    return `
      ${
        days.length
          ? days
              .map(
                (day) => `
        <div class="day">
          <h3 class="day-head">${esc(dayLabel(day.key))} <span>${esc(t("count", { n: day.items.length }))}</span></h3>
          <div class="card list">${day.items.map(renderChange).join("")}</div>
        </div>`,
              )
              .join("")
          : `<p class="empty">${esc(t("noResults"))}</p>`
      }
      ${list.length > shown.length ? `<div class="more-wrap"><button class="btn-outline" id="news-more" type="button">${esc(t("showMore"))} (${list.length - shown.length})</button></div>` : ""}`;
  }

  function renderBlocks(blocks) {
    return blocks
      .map((b) =>
        b.p
          ? `<p>${rich(b.p)}</p>`
          : `<ul>${b.ul.map((i) => `<li>${rich(i)}</li>`).join("")}</ul>`,
      )
      .join("");
  }

  function renderChange(c) {
    const d = state.data;
    const open = state.news.open.has(c.sha);
    const text = c.blocks.map((b) => b.p || b.ul.join(" ")).join(" ");
    const long = c.blocks.length > 1 || text.length > 260;
    const time = fmt(new Date(c.date), { hour: "numeric", minute: "2-digit" });
    const link = c.pr
      ? `<a class="meta-link" href="${esc(d.repoUrl)}/pull/${c.pr}" target="_blank" rel="noopener">${icon("git-pull-request")}#${c.pr}</a>`
      : `<a class="meta-link" href="${esc(d.repoUrl)}/commit/${esc(c.sha)}" target="_blank" rel="noopener">${icon("git-commit-horizontal")}${esc(c.sha.slice(0, 7))}</a>`;
    return `
      <article class="change">
        <span class="kind k-${c.kind}" title="${esc(t(`kind1.${c.kind}`))}">${icon(KIND_ICON[c.kind])}<span class="sr-only">${esc(t(`kind1.${c.kind}`))}</span></span>
        <div class="change-main">
          <h4>${rich(c.title)}</h4>
          <div class="meta">
            <span class="person">${avatar(c.author)}${esc(c.author.name || c.author.login)}</span>
            <span>${esc(time)}</span>
            ${link}
            ${c.model ? `<span class="meta-item" title="${esc(t("builtWith", { m: c.model }))}">${icon("bot")}${esc(c.model)}</span>` : ""}
          </div>
          ${c.lanes.length || c.stories.length ? `<div class="tags">${c.lanes.length ? lanePill(c.lanes.join("+")) : ""}${c.stories.map(storyPill).join("")}</div>` : ""}
          ${
            c.blocks.length
              ? `<div class="body${long && !open ? " clamped" : ""}">${renderBlocks(c.blocks)}</div>
                 ${long ? `<button class="link-btn" type="button" data-toggle-body="${esc(c.sha)}">${esc(t(open ? "readLess" : "readMore"))}${icon(open ? "chevron-up" : "chevron-down")}</button>` : ""}`
              : ""
          }
          ${thumbs(c.images, 5)}
        </div>
      </article>`;
  }

  // ---------- « À revoir » ----------
  const PR_STATE_CLASS = {
    draft: "st-backlog",
    none: "st-in-progress",
    changes: "st-bad",
    approved: "st-done",
    reviewed: "st-review",
    outdated: "st-in-progress",
  };
  const CI_PILL = {
    none: ["st-backlog", "clock"],
    running: ["st-review", "clock"],
    passed: ["st-done", "circle-check"],
    failed: ["st-bad", "circle-x"],
  };

  function prGroup(p) {
    if (p.draft) return "draft";
    return p.review === "approved" && p.ci === "passed" ? "ready" : "review";
  }

  function renderPull(p) {
    const d = state.data;
    const stateKey = p.draft ? "draft" : p.review;
    const [ciClass, ciIcon] = CI_PILL[p.ci] || CI_PILL.none;
    const url = `${d.repoUrl}/pull/${p.number}`;
    return `
      <article class="change">
        <span class="kind k-pr-${prGroup(p)}">${icon(p.draft ? "git-pull-request-draft" : "git-pull-request")}</span>
        <div class="change-main">
          <h4><a class="title-link" href="${esc(url)}" target="_blank" rel="noopener">${rich(p.title)}</a></h4>
          <div class="meta">
            <span class="person">${avatar(p.author)}${esc(p.author.name || p.author.login)}</span>
            <a class="meta-link" href="${esc(url)}" target="_blank" rel="noopener">${icon("git-pull-request")}#${p.number}</a>
            <span>${esc(t("prUpdated", { when: ago(p.updatedAt) }))}</span>
          </div>
          <div class="tags">
            <span class="pill ${PR_STATE_CLASS[stateKey]}">${esc(t(`prState.${stateKey}`))}</span>
            ${p.draft ? "" : `<span class="pill ${ciClass}">${icon(ciIcon)}${esc(t(`ci.${p.ci}`))}</span>`}
            ${p.landing ? `<span class="pill st-review">${icon("plane-landing")}${esc(t("landing"))}</span>` : ""}
            ${p.lanes.length ? lanePill(p.lanes.join("+")) : ""}
            ${p.stories.map(storyPill).join("")}
          </div>
        </div>
      </article>`;
  }

  function renderReview() {
    const d = state.data;
    const groups = { ready: [], review: [], draft: [] };
    for (const p of [...d.pulls].sort((a, b) =>
      b.updatedAt.localeCompare(a.updatedAt),
    ))
      groups[prGroup(p)].push(p);
    const prs = d.pulls.length
      ? ["ready", "review", "draft"]
          .filter((g) => groups[g].length)
          .map(
            (g) => `
        <div class="day">
          <h3 class="day-head">${esc(t(`prGroups.${g}`))} <span>${groups[g].length}</span></h3>
          <div class="card list">${groups[g].map(renderPull).join("")}</div>
        </div>`,
          )
          .join("")
      : `<p class="empty">${esc(t("noPrs"))}</p>`;
    const epics = d.epics
      .map((e) => ({
        e,
        keys: e.stories.filter((k) => d.stories[k].status === "review"),
      }))
      .filter((x) => x.keys.length)
      .reverse();
    const total = epics.reduce((n, x) => n + x.keys.length, 0);
    const accept = epics
      .map(({ e, keys }) => {
        const open = state.review.expanded.has(String(e.num));
        const shown = open ? keys : keys.slice(0, 4);
        return `
          <section class="card accept">
            <div class="accept-head">
              <div><div class="eyebrow">${esc(t("epic", { n: e.num }))}</div><h3>${esc(e.title)}</h3></div>
              <span class="pill st-review">${esc(t("toAccept", { n: keys.length }))}</span>
            </div>
            <div class="rows flat">${shown
              .map((k) => {
                const s = d.stories[k];
                return `<button class="story-row" type="button" data-story="${esc(k)}"><span class="lab">${esc(s.label)}</span><span>${esc(s.title)}</span>${icon("chevron-right")}</button>`;
              })
              .join("")}</div>
            ${keys.length > 4 ? `<button class="link-btn more-link" type="button" data-expand="review:${e.num}">${esc(open ? t("showLess") : t("showAll", { n: keys.length }))}${icon(open ? "chevron-up" : "chevron-down")}</button>` : ""}
          </section>`;
      })
      .join("");
    return `
      <h2 class="section-title">${esc(t("prsTitle"))} <span>${d.pulls.length}</span></h2>
      <p class="intro">${esc(t("prsIntro"))}</p>
      ${prs}
      <h2 class="section-title spaced">${esc(t("acceptTitle"))} <span>${total}</span></h2>
      <p class="intro">${esc(t("acceptIntro"))}</p>
      <div class="accepts">${accept}</div>`;
  }

  // ---------- « Le plan » ----------
  function renderPlan() {
    const d = state.data;
    const lanes = ["A", "B", "C"]
      .map((lane) => {
        const queue = d.lanes[lane] || [];
        const open = queue.filter((k) => d.stories[k].status !== "done");
        const done = queue
          .filter((k) => d.stories[k].status === "done")
          .reverse();
        const head = open[0];
        const next = open.slice(1, 7);
        const headStory = head ? d.stories[head] : null;
        const live = headStory && headStory.status !== "backlog";
        return `
          <article class="card lane">
            <div class="lane-top">
              <span class="tile lane-${lane}">${icon(LANE_ICON[lane])}</span>
              <div>
                <h3>${esc(t("lane", { l: lane }))} · ${esc(t(`laneName.${lane}`))}</h3>
                <p>${esc(t(`laneWhat.${lane}`))}</p>
              </div>
            </div>
            <div class="lane-body">
              <div class="lane-label">${esc(t("head"))}</div>
              ${
                headStory
                  ? `<button class="head-card" type="button" data-story="${esc(head)}">
                      <span class="label">${live ? '<span class="pulse"></span>' : ""}${esc(t("story", { l: headStory.label }))} · ${esc(t("epic", { n: headStory.epic }))}</span>
                      <span class="t">${esc(headStory.title)}</span>
                      <span>${statusPill(headStory.status)}</span>
                    </button>`
                  : `<p class="empty-sm">${icon("circle-check")} ${esc(t("queueEmpty"))}</p>`
              }
              ${
                next.length
                  ? `<div class="lane-label">${esc(t("next"))}</div>
                     <ol class="queue">${next
                       .map(
                         (k) =>
                           `<li><button type="button" data-story="${esc(k)}"><span class="lab">${esc(d.stories[k].label)}</span><span>${esc(d.stories[k].title)}</span></button></li>`,
                       )
                       .join("")}</ol>
                     ${open.length > 7 ? `<p class="more-note">${esc(t("others", { n: open.length - 7 }))}</p>` : ""}`
                  : ""
              }
              ${
                done.length
                  ? `<div class="lane-label">${esc(t("shipped"))}</div>
                     <ul class="shipped">${done
                       .slice(0, 4)
                       .map(
                         (k) =>
                           `<li><button type="button" data-story="${esc(k)}">${icon("check")}<span><span class="lab">${esc(d.stories[k].label)}</span>${esc(d.stories[k].title)}</span></button></li>`,
                       )
                       .join("")}</ul>`
                  : ""
              }
            </div>
          </article>`;
      })
      .join("");
    return `
      <p class="intro">${esc(t("planIntro"))}</p>
      <div class="lanes">${lanes}</div>`;
  }

  // ---------- « Épopées » ----------
  function ring(c) {
    const r = 26;
    const len = 2 * Math.PI * r;
    const part = (n) => (n / Math.max(c.total, 1)) * len;
    const pct = Math.round(((c.done + c.review) / Math.max(c.total, 1)) * 100);
    const arc = (n, color) =>
      n > 0
        ? `<circle cx="32" cy="32" r="${r}" fill="none" stroke="var(${color})" stroke-width="7" stroke-dasharray="${n} ${len}" transform="rotate(-90 32 32)"/>`
        : "";
    return `<svg class="ring" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="${r}" fill="none" stroke="var(--muted)" stroke-width="7"/>
      ${arc(part(c.done) + part(c.review), "--primary")}${arc(part(c.done), "--ok")}
      <text x="32" y="36.5" text-anchor="middle">${pct}%</text></svg>`;
  }

  function epicCounts(c) {
    const parts = [t("epicCounts", { d: c.done, t: c.total })];
    if (c.review) parts.push(t("epicToAccept", { r: c.review }));
    return parts.join(" · ");
  }

  function renderEpics() {
    const d = state.data;
    const f = state.epics.filter;
    const epics = d.epics
      .filter((e) => e.stories.length)
      .filter(
        (e) =>
          f === "all" ||
          (f === "active" ? e.status === "in-progress" : e.status === f),
      )
      .slice()
      .reverse();
    const cards = epics
      .map((e) => {
        const c = storyCounts(e.stories);
        return `
          <button class="card epic" type="button" data-epic="${e.num}">
            <div>
              <div class="eyebrow">${esc(t("epic", { n: e.num }))}</div>
              <div class="t">${esc(e.title)}</div>
              <div class="counts">${esc(epicCounts(c))}</div>
            </div>
            ${ring(c)}
          </button>`;
      })
      .join("");
    return `
      <div class="toolbar">
        <div class="filters">
          ${chip("epics", "filter", "all", esc(t("epicsAll")))}
          ${chip("epics", "filter", "active", esc(t("epicsActive")))}
          ${chip("epics", "filter", "done", esc(t("epicsDone")))}
          ${chip("epics", "filter", "backlog", esc(t("epicsPlanned")))}
        </div>
      </div>
      <div class="epics">${cards || `<p class="empty">${esc(t("noResults"))}</p>`}</div>`;
  }

  // ---------- « Galerie » ----------
  function imageMatches(id) {
    const m = state.data.images[id];
    const g = state.gallery;
    if (g.locale !== "all" && m.locale !== g.locale) return false;
    if (g.device !== "all" && m.phone !== (g.device === "phone")) return false;
    if (g.theme !== "all" && m.dark !== (g.theme === "dark")) return false;
    return true;
  }

  function galleryTile(id, all, i) {
    const m = state.data.images[id];
    const tags = [
      m.locale ? esc(m.locale.toUpperCase()) : "",
      m.phone ? icon("smartphone") : "",
      m.dark ? icon("moon") : "",
    ]
      .filter(Boolean)
      .map((x) => `<b>${x}</b>`)
      .join("");
    return `<button class="thumb" type="button" data-shots="${all}" data-at="${i}" aria-label="${esc(m.name)}"><img data-img="${id}" alt="" />${tags ? `<span class="tag">${tags}</span>` : ""}</button>`;
  }

  function renderGallery() {
    const d = state.data;
    const groups = d.gallery
      .map((g) => ({ ...g, ids: ordered(g.images.filter(imageMatches)) }))
      .filter((g) => g.ids.length);
    const body = groups
      .map((g) => {
        const s = g.story ? d.stories[g.story] : null;
        const expanded = state.gallery.expanded.has(g.folder);
        const shown = expanded ? g.ids : g.ids.slice(0, 8);
        const all = g.ids.join(",");
        const name = s
          ? s.title
          : g.folder === "other"
            ? t("other")
            : g.folder.replace(/-/g, " ");
        return `
          <section class="g-group">
            <div class="g-head">
              <h3>${esc(name)}</h3>
              ${s ? storyPill(g.story) : ""}
              ${s ? statusPill(s.status) : ""}
              <span class="count">${esc(t("images", { n: g.ids.length }))}</span>
            </div>
            <div class="grid">${shown.map((id, i) => galleryTile(id, all, i)).join("")}</div>
            ${
              g.ids.length > 8
                ? `<div class="more-wrap"><button class="btn-outline" type="button" data-expand="gallery:${esc(g.folder)}">${esc(expanded ? t("showLess") : t("showAll", { n: g.ids.length }))}</button></div>`
                : ""
            }
          </section>`;
      })
      .join("");
    return `
      <div class="toolbar">
        <div class="filters">
          <span class="filter-label">${esc(t("language"))}</span>
          ${chip("gallery", "locale", "all", esc(t("any")))}${chip("gallery", "locale", "fr", "FR")}${chip("gallery", "locale", "en", "EN")}
        </div>
        <div class="filters">
          <span class="filter-label">${esc(t("device"))}</span>
          ${chip("gallery", "device", "all", esc(t("any")))}${chip("gallery", "device", "desktop", `${icon("monitor")}${esc(t("desktop"))}`)}${chip("gallery", "device", "phone", `${icon("smartphone")}${esc(t("phone"))}`)}
        </div>
        <div class="filters">
          <span class="filter-label">${esc(t("theme"))}</span>
          ${chip("gallery", "theme", "all", esc(t("any")))}${chip("gallery", "theme", "light", `${icon("sun")}${esc(t("light"))}`)}${chip("gallery", "theme", "dark", `${icon("moon")}${esc(t("dark"))}`)}
        </div>
      </div>
      ${body || `<p class="empty">${esc(t("noResults"))}</p>`}`;
  }

  // ---------- drawer (story, epic) ----------
  let lastFocus = null;
  function closeOverlay(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.remove();
    const scrim = document.getElementById(`${id}-scrim`);
    if (scrim) scrim.remove();
    if (id === "drawer" && /story=/.test(location.hash))
      history.replaceState(null, "", `#${state.tab}`);
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
  }

  function openDrawer(label, html) {
    closeOverlay("drawer");
    lastFocus = document.activeElement;
    const scrim = document.createElement("div");
    scrim.className = "scrim";
    scrim.id = "drawer-scrim";
    scrim.onclick = () => closeOverlay("drawer");
    const el = document.createElement("aside");
    el.className = "drawer";
    el.id = "drawer";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-label", label);
    el.innerHTML = `
      <div class="drawer-top">
        <span class="eyebrow">${esc(label)}</span>
        <button class="icon-btn" type="button" id="drawer-close" aria-label="${esc(t("close"))}">${icon("x")}</button>
      </div>${html}`;
    document.body.append(scrim, el);
    $("#drawer-close").onclick = () => closeOverlay("drawer");
    wire(el);
    hydrateImages(el);
    $("#drawer-close").focus();
  }

  function openEpic(num) {
    const d = state.data;
    const e = d.epics.find((x) => x.num === num);
    if (!e) return;
    const c = storyCounts(e.stories);
    openDrawer(
      `${t("epic", { n: e.num })} · ${t(`epicStatus.${e.status}`)}`,
      `
      <div class="drawer-head">
        <div><h2>${esc(e.title)}</h2><div class="counts">${esc(epicCounts(c))}</div></div>${ring(c)}
      </div>
      <div class="rows">${e.stories
        .map((k) => {
          const s = d.stories[k];
          return `<button class="story-row" type="button" data-story="${esc(k)}"><span class="lab">${esc(s.label)}</span><span>${esc(s.title)}</span>${statusPill(s.status)}</button>`;
        })
        .join("")}</div>`,
    );
  }

  function openStory(key) {
    const d = state.data;
    const s = d.stories[key];
    if (!s) return;
    const changes = s.changes
      .map((sha) => d.changes.find((c) => c.sha === sha))
      .filter(Boolean);
    const epic = d.epics.find((e) => e.num === s.epic);
    const ids = ordered(s.images);
    openDrawer(
      `${t("story", { l: s.label })} · ${t("epic", { n: s.epic })}${epic ? ` · ${epic.title}` : ""}`,
      `
      <h2>${esc(s.title)}</h2>
      <div class="tags">${statusPill(s.status)}${s.lane ? lanePill(s.lane) : ""}${s.auto ? `<span class="pill">${esc(t("auto"))}</span>` : ""}</div>
      ${s.statement ? `<div class="statement">${rich(s.statement)}</div>` : ""}
      <h4>${esc(t("related"))}</h4>
      ${
        changes.length
          ? `<div class="rows">${changes
              .map(
                (
                  c,
                ) => `<div class="mini-change"><span class="kind k-${c.kind}">${icon(KIND_ICON[c.kind])}</span><div><div>${rich(c.title)}</div>
                  <div class="meta">${esc(fmt(new Date(c.date), { dateStyle: "medium" }))} · ${esc(c.author.name || c.author.login)}${c.pr ? ` · <a class="meta-link" href="${esc(d.repoUrl)}/pull/${c.pr}" target="_blank" rel="noopener">${icon("git-pull-request")}#${c.pr}</a>` : ""}</div></div></div>`,
              )
              .join("")}</div>`
          : `<p class="muted">${esc(t("noRelated"))}</p>`
      }
      <h4>${esc(t("shots", { n: ids.length }))}</h4>
      ${ids.length ? `<div class="grid">${ids.map((id, i) => galleryTile(id, ids.join(","), i)).join("")}</div>` : `<p class="muted">${esc(t("noShots"))}</p>`}`,
    );
    history.replaceState(null, "", `#${state.tab}&story=${key}`);
  }

  // ---------- lightbox ----------
  function openLightbox(ids, at) {
    const prevFocus = document.activeElement;
    let i = at;
    const el = document.createElement("div");
    el.className = "lightbox";
    el.id = "lightbox";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.innerHTML = `
      <div class="lb-top"><span id="lb-caption"></span><button class="icon-btn" type="button" id="lb-close" aria-label="${esc(t("close"))}">${icon("x")}</button></div>
      <div class="lb-stage">
        <div class="spinner" id="lb-spin"></div>
        <img id="lb-img" alt="" />
        <button class="lb-nav lb-prev" type="button" id="lb-prev" aria-label="${esc(t("prev"))}">${icon("chevron-left")}</button>
        <button class="lb-nav lb-next" type="button" id="lb-next" aria-label="${esc(t("nextImg"))}">${icon("chevron-right")}</button>
      </div>
      <div class="lb-bottom"><span id="lb-count"></span><span id="lb-story"></span></div>`;
    document.body.append(el);
    const img = $("#lb-img", el);
    const show = () => {
      const id = ids[i];
      const m = state.data.images[id];
      const s = m.story ? state.data.stories[m.story] : null;
      $("#lb-caption", el).textContent = [
        s ? t("story", { l: s.label }) : m.folder,
        m.step,
        m.name,
      ]
        .filter(Boolean)
        .join(" · ");
      $("#lb-count", el).textContent = `${i + 1} / ${ids.length}`;
      $("#lb-story", el).innerHTML = s
        ? `<button class="btn-ghost" type="button" id="lb-open-story">${icon("book-open")}${esc(s.title)}</button>`
        : "";
      const go = $("#lb-open-story", el);
      if (go)
        go.onclick = () => {
          close();
          openStory(m.story);
        };
      img.removeAttribute("src");
      $("#lb-spin", el).classList.remove("hidden");
      imageUrl(id).then(
        (url) => {
          if (ids[i] !== id) return;
          img.src = url;
          $("#lb-spin", el).classList.add("hidden");
        },
        () => {
          if (ids[i] !== id) return;
          img.alt = t("imageFailed");
          $("#lb-spin", el).classList.add("hidden");
        },
      );
      $("#lb-prev", el).classList.toggle("hidden", ids.length < 2);
      $("#lb-next", el).classList.toggle("hidden", ids.length < 2);
    };
    const step = (n) => {
      i = (i + n + ids.length) % ids.length;
      show();
    };
    const onKey = (ev) => {
      // « Verrouiller » removes the lightbox without closing it.
      if (!el.isConnected) {
        document.removeEventListener("keydown", onKey);
        return;
      }
      if (ev.key === "Escape") close();
      if (ev.key === "ArrowLeft") step(-1);
      if (ev.key === "ArrowRight") step(1);
    };
    const close = () => {
      document.removeEventListener("keydown", onKey);
      el.remove();
      if (prevFocus && document.contains(prevFocus)) prevFocus.focus();
    };
    let touchX = null;
    el.addEventListener(
      "touchstart",
      (ev) => (touchX = ev.touches[0].clientX),
      { passive: true },
    );
    el.addEventListener("touchend", (ev) => {
      if (touchX == null) return;
      const dx = ev.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      touchX = null;
    });
    $("#lb-close", el).onclick = close;
    $("#lb-prev", el).onclick = () => step(-1);
    $("#lb-next", el).onclick = () => step(1);
    document.addEventListener("keydown", onKey);
    show();
    $("#lb-close", el).focus();
  }

  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" && !document.getElementById("lightbox"))
      closeOverlay("drawer");
  });
  // Tab stays inside the open panel: the lightbox, else the drawer.
  document.addEventListener("keydown", (ev) => {
    if (ev.key !== "Tab") return;
    const panel =
      document.getElementById("lightbox") || document.getElementById("drawer");
    if (!panel) return;
    const items = [...panel.querySelectorAll("button, a[href], input")].filter(
      (x) => x.getClientRects().length > 0,
    );
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    const inside = panel.contains(document.activeElement);
    if (ev.shiftKey && (!inside || document.activeElement === first)) {
      ev.preventDefault();
      last.focus();
    } else if (!ev.shiftKey && (!inside || document.activeElement === last)) {
      ev.preventDefault();
      first.focus();
    }
  });
  // An avatar that cannot load shows its initial instead.
  document.addEventListener(
    "error",
    (ev) => {
      const img = ev.target;
      if (img && img.dataset && img.dataset.fallback)
        img.replaceWith(document.createTextNode(img.dataset.fallback));
    },
    true,
  );

  // ---------- boot ----------
  function renderNotice(text) {
    $("#root").innerHTML = `
      <div class="lock"><div class="lock-card">
        <img class="mark" src="${LOGO}" alt="" /><p>${esc(text)}</p>
      </div></div>`;
  }

  async function boot() {
    if (preview) {
      renderLock();
      return;
    }
    // Inside another site's frame the password form could be abused.
    if (window.top !== window.self) {
      renderNotice(t("framed"));
      return;
    }
    if (
      !window.isSecureContext ||
      !window.crypto?.subtle ||
      typeof DecompressionStream === "undefined"
    ) {
      renderNotice(t("unsupported"));
      return;
    }
    const saved = load(KEY_STORE);
    if (!saved) {
      renderLock();
      return;
    }
    try {
      const { key, data } = await openWith(b64.decode(saved));
      start(data, key);
    } catch (err) {
      // Only a changed password forgets the device's key; a network error
      // keeps it for the next try.
      if (err && err.wrong) {
        store("local", KEY_STORE, null);
        store("session", KEY_STORE, null);
      }
      renderLock(err && err.wrong ? "" : t("failed"));
    }
  }
  boot();
})();
