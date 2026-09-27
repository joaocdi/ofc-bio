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
  ig01: "https://go.ofc.bio/l/ig01",
  ig02: "https://go.ofc.bio/l/ig02",
  ig03: "https://go.ofc.bio/l/ig03",
  tt01: "https://go.ofc.bio/l/tktk01"
};

// -----------------------------------------------------
(function () {
  "use strict";

  function knownSource(value) {
    var source = typeof value === "string" ? value.toLowerCase() : "";
    return Object.prototype.hasOwnProperty.call(TELEGRAM_DESTINATIONS, source) ? source : "";
  }

  var cookie = document.cookie.split(";").map(function (item) { return item.trim(); }).find(function (item) {
    return item.indexOf("traffic_source=") === 0;
  });
  var source = knownSource(cookie ? cookie.slice("traffic_source=".length) : "");
  try {
    if (source) sessionStorage.setItem("traffic_source", source);
    else source = knownSource(sessionStorage.getItem("traffic_source"));
  } catch (_) { /* armazenamento indisponível: usa o cookie ou o fallback */ }

  var destinations = {
    telegram: source ? TELEGRAM_DESTINATIONS[source] : links.telegram,
    privacy: links.privacy
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
