(function () {
  "use strict";

  var I18N = {
    en: {
      pageTitle: window.location.pathname.includes("projects") ? "Projects | Personal Portfolio"
        : window.location.pathname.includes("articles") ? "Articles | Personal Portfolio"
        : window.location.pathname.includes("contact") ? "Contact | Personal Portfolio"
        : "Home | Personal Portfolio",
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
      submitLabel: "Submit",
      footer: "&copy; 2025 Edma Reyfaldy, All Rights Reserved",
      themeToggle: "🌙",
      langToggle: "EN → ID"
    },
    id: {
      pageTitle: window.location.pathname.includes("projects") ? "Proyek | Personal Portfolio"
        : window.location.pathname.includes("articles") ? "Artikel | Personal Portfolio"
        : window.location.pathname.includes("contact") ? "Kontak | Personal Portfolio"
        : "Beranda | Personal Portfolio",
      navHome: "Beranda",
      navProjects: "Proyek",
      navArticles: "Artikel",
      navContact: "Kontak",
      heroTitle: "Pengembang Depan",
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
      submitLabel: "Kirim",
      footer: "&copy; 2025 Edma Reyfaldy, All Rights Reserved",
      themeToggle: "☀️",
      langToggle: "ID → EN"
    }
  };

  function renderI18n(lang) {
    var dict = I18N[lang];
    document.documentElement.lang = lang === "en" ? "en" : "id";
    document.title = dict.pageTitle;
    document.querySelector(".footer").innerHTML = dict.footer;

    var els = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute("data-i18n");
      if (Object.prototype.hasOwnProperty.call(dict, key)) {
        els[i].textContent = dict[key];
      }
    }
  }

  function currentTheme() {
    var saved = localStorage.getItem("portfolio-theme");
    if (saved) return saved;
    return "dark";
  }

  function toggleDarkMode() {
    var theme = currentTheme() === "dark" ? "light" : "dark";
    localStorage.setItem("portfolio-theme", theme);
    document.documentElement.dataset.theme = theme;
    updateIcons();
  }

  function updateIcons() {
    var moon = document.getElementById("moon_icon");
    var sun = document.getElementById("sun_icon");
    var theme = currentTheme();
    if (moon) moon.style.display = theme === "dark" ? "block" : "none";
    if (sun) sun.style.display = theme === "dark" ? "none" : "block";
  }

  function currentLang() {
    return localStorage.getItem("portfolio-lang") || "en";
  }

  function toggleLang() {
    var lang = currentLang() === "en" ? "id" : "en";
    localStorage.setItem("portfolio-lang", lang);
    renderI18n(lang);
    var toggle = document.querySelector(".lang-toggle");
    if (toggle) toggle.textContent = I18N[lang].langToggle;
  }

  function init() {
    document.documentElement.dataset.theme = currentTheme();
    updateIcons();
    renderI18n(currentLang());

    var langToggle = document.querySelector(".lang-toggle");
    if (langToggle) langToggle.textContent = I18N[currentLang()].langToggle;
  }

  document.addEventListener("DOMContentLoaded", init);
})();
