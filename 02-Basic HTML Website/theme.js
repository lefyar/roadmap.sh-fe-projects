(function () {
  "use strict";

  var I18N = {
    en: {
      pageTitles: {
        index: "Home | Basic HTML Website",
        projects: "Projects | Basic HTML Website",
        articles: "Articles | Basic HTML Website",
        contact: "Contact | Basic HTML Website"
      },
      navHome: "Home",
      navProjects: "Projects",
      navArticles: "Articles",
      navContact: "Contact",
      heroTitle: "Front-End Developer",
      heroText: "Next JS adalah framework terbaik di dunia",
      projectsH1: "Projects",
      p1Title: "Project 1",
      p1Desc: "Project 1 Description",
      p2Title: "Project 2",
      p2Desc: "Project 2 Description",
      p3Title: "Project 3",
      p3Desc: "Project 3 Description",
      articlesH1: "Articles",
      a1Title: "Article 1",
      a1Desc: "Article 1 Description",
      a2Title: "Article 2",
      a2Desc: "Article 2 Description",
      a3Title: "Article 3",
      a3Desc: "Article 3 Description",
      contactH1: "Contact Me",
      nameLabel: "Name",
      emailLabel: "Email",
      messageLabel: "Message",
      submitLabel: "Submit"
    },
    id: {
      pageTitles: {
        index: "Beranda | Situs HTML Dasar",
        projects: "Proyek | Situs HTML Dasar",
        articles: "Artikel | Situs HTML Dasar",
        contact: "Kontak | Situs HTML Dasar"
      },
      navHome: "Beranda",
      navProjects: "Proyek",
      navArticles: "Artikel",
      navContact: "Kontak",
      heroTitle: "Pengembang Front-End",
      heroText: "Next JS adalah framework terbaik di dunia",
      projectsH1: "Proyek",
      p1Title: "Proyek 1",
      p1Desc: "Deskripsi Proyek 1",
      p2Title: "Proyek 2",
      p2Desc: "Deskripsi Proyek 2",
      p3Title: "Proyek 3",
      p3Desc: "Deskripsi Proyek 3",
      articlesH1: "Artikel",
      a1Title: "Artikel 1",
      a1Desc: "Deskripsi Artikel 1",
      a2Title: "Artikel 2",
      a2Desc: "Deskripsi Artikel 2",
      a3Title: "Artikel 3",
      a3Desc: "Deskripsi Artikel 3",
      contactH1: "Hubungi Saya",
      nameLabel: "Nama",
      emailLabel: "Email",
      messageLabel: "Pesan",
      submitLabel: "Kirim"
    }
  };

  function pageKey() {
    var path = window.location.pathname;
    if (path === "/" || path.indexOf("index") !== -1) return "index";
    if (path.indexOf("projects") !== -1) return "projects";
    if (path.indexOf("articles") !== -1) return "articles";
    if (path.indexOf("contact") !== -1) return "contact";
    return "index";
  }

  function renderI18n(lang) {
    var dict = I18N[lang];
    document.documentElement.lang = lang;
    document.title = dict.pageTitles[pageKey()];

    var all = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < all.length; i++) {
      var key = all[i].getAttribute("data-i18n");
      if (Object.prototype.hasOwnProperty.call(dict, key)) {
        all[i].textContent = dict[key];
      }
    }
  }

  function currentLang() {
    return localStorage.getItem("site-lang") || "en";
  }

  function currentTheme() {
    var saved = localStorage.getItem("site-theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme() {
    var theme = currentTheme();
    document.documentElement.dataset.theme = theme;
    var toggle = document.getElementById("themeToggle");
    if (toggle) toggle.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  function applyActiveNav() {
    var current = pageKey();
    var links = document.querySelectorAll("nav a");
    for (var i = 0; i < links.length; i++) {
      var key = links[i].getAttribute("data-i18n")
        ? links[i].getAttribute("data-i18n").replace("nav", "").toLowerCase()
        : null;
      links[i].classList.toggle("active", key === current);
    }
  }

  function setLang(lang) {
    localStorage.setItem("site-lang", lang);
    renderI18n(lang);
    var toggle = document.getElementById("langToggle");
    if (toggle) toggle.textContent = lang === "en" ? "EN → ID" : "ID → EN";
  }

  function init() {
    var themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", function () {
        var next = currentTheme() === "dark" ? "light" : "dark";
        localStorage.setItem("site-theme", next);
        applyTheme();
      });
    }

    var langToggle = document.getElementById("langToggle");
    if (langToggle) {
      langToggle.addEventListener("click", function () {
        setLang(currentLang() === "en" ? "id" : "en");
      });
    }

    applyTheme();
    applyActiveNav();
    setLang(currentLang());
  }

  init();
})();
