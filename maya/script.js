// =====================================================
//  LINKS DA MAYA — edite apenas aqui
//  Use URLs completas começando com https://
//  Enquanto estiver "", o botão aparece mas não abre nada.
// =====================================================
const links = {
  telegram: "https://t.me/mayavl_vip",
  privacy: "https://maya.ofc.bio/"
};

const TELEGRAM_DESTINATIONS = {
  ig01: "https://go.ofc.bio/l/ig01?utm_source=instagram&utm_campaign=ig01&utm_medium=organic&utm_content=profile&utm_id=ig01&shk=xok8zrhi",
  tt01: "https://go.ofc.bio/l/tktk01?utm_source=tiktok&utm_campaign=tt01&utm_medium=organic&utm_content=profile&utm_id=tt01&shk=mgi492dw"
};

// -----------------------------------------------------
(function () {
  "use strict";

  function knownSource(value) {
    var source = typeof value === "string" ? value.toLowerCase() : "";
    return Object.prototype.hasOwnProperty.call(TELEGRAM_DESTINATIONS, source) ? source : "";
  }

  var source = knownSource(new URLSearchParams(window.location.search).get("src"));
  try {
    if (source) sessionStorage.setItem("traffic_source", source);
    else source = knownSource(sessionStorage.getItem("traffic_source"));
  } catch (_) { /* armazenamento indisponível: usa a URL ou o fallback */ }

  var destinations = {
    telegram: source ? TELEGRAM_DESTINATIONS[source] : links.telegram,
    privacy: source ? links.privacy + "?src=" + encodeURIComponent(source) : links.privacy
  };

  function isValid(url) {
    return typeof url === "string" && /^https:\/\/\S+$/i.test(url.trim());
  }

  document.querySelectorAll("[data-link]").forEach(function (btn) {
    var url = destinations[btn.getAttribute("data-link")];

    if (isValid(url)) {
      btn.setAttribute("href", url.trim());
      btn.removeAttribute("aria-disabled");
    } else {
      // sem link configurado: o botão aparece, mas não abre nada
      btn.removeAttribute("href");
      btn.setAttribute("role", "link");
      btn.setAttribute("aria-disabled", "true");
      btn.addEventListener("click", function (e) { e.preventDefault(); });
    }
  });
})();
