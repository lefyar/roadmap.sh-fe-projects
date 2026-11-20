const banner = document.querySelector("#cookieConsent");
const settings = document.querySelector("#resetCookiesBtn");
const optional = [...banner.querySelectorAll("input:not(:disabled)")];
const status = document.querySelector("#consentStatus");

function readConsent() {
  try {
    const consent = JSON.parse(localStorage.getItem("cookie-consent"));
    if (consent?.accepted) return consent;
    const legacy = localStorage.getItem("cookieConsent");
    if (legacy === "accepted") return { analytics: true, marketing: true };
    if (legacy === "declined") return { analytics: false, marketing: false };
  } catch { /* Defaults are used when storage is unavailable. */ }
  return null;
}

function showPreferences() {
  for (const option of optional) option.checked = Boolean(consent?.[option.name]);
  banner.hidden = false;
  settings.setAttribute("aria-expanded", "true");
}

function savePreferences(value) {
  consent = { essential: true, accepted: true, ...value };
  try {
    localStorage.setItem("cookie-consent", JSON.stringify(consent));
    localStorage.removeItem("cookieConsent");
    status.textContent = "Preferences saved.";
  } catch {
    status.textContent = "Preferences applied for this visit.";
  }
  banner.hidden = true;
  settings.setAttribute("aria-expanded", "false");
  settings.focus();
}

let consent = readConsent();
settings.addEventListener("click", () => {
  showPreferences();
  optional[0].focus();
});
document.querySelector("#acceptCookiesBtn").addEventListener("click", () => {
  savePreferences({ analytics: true, marketing: true });
});
document.querySelector("#rejectCookiesBtn").addEventListener("click", () => {
  savePreferences({ analytics: false, marketing: false });
});
document.querySelector("#saveCookiesBtn").addEventListener("click", () => {
  savePreferences(Object.fromEntries(optional.map(option => [option.name, option.checked])));
});

if (!consent) showPreferences();
