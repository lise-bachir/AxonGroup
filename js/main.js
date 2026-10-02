/* ==========================================================================
   ✏️ VOS COORDONNÉES — modifiez seulement ces deux lignes
   ========================================================================== */
const EMAIL_CONTACT = "commercial@axongroupcorp.com";   // reçoit les demandes de devis
const NUMERO_WHATSAPP = "221787165952";         // format international, sans + ni espaces

/* ========================================================================== */

// En-tête qui se colore au défilement
const header = document.getElementById("header");
const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 20);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Menu mobile
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
if (burger && nav) {
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open);
  });
  nav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    })
  );
}

// Apparition des blocs au défilement
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }),
    { threshold: 0.12 }
  );
  revealItems.forEach((el) => observer.observe(el));
} else {
  revealItems.forEach((el) => el.classList.add("is-visible"));
}

// Bouton WhatsApp
const whatsapp = document.getElementById("whatsapp");
if (whatsapp) {
  whatsapp.href = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent("Bonjour Axon Group, je souhaite des informations sur vos services.")}`;
}

// Formulaire de devis : envoyé directement par e-mail à EMAIL_CONTACT (service FormSubmit)
const form = document.getElementById("contact-form");
if (form) {
  const status = document.getElementById("form-status");
  const button = document.getElementById("submit-btn");
  const show = (type, text) => { status.className = `form__status is-${type}`; status.textContent = text; };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const data = new FormData(form);
    if (data.get("_honey")) return; // anti-spam
    data.append("_subject", `Demande de devis — ${data.get("Service")}`);
    data.append("_template", "table");
    data.append("_captcha", "false");
    button.disabled = true;
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${EMAIL_CONTACT}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const result = await response.json();
      if (!response.ok || String(result.success) === "false") throw new Error(result.message || "echec");
      form.reset();
      show("ok", "Merci ! Votre demande a bien été envoyée. Nous vous répondons sous 24h ouvrées.");
    } catch (error) {
      show("error", `L'envoi a échoué. Écrivez-nous directement à ${EMAIL_CONTACT} ou appelez le +221 78 716 59 52.`);
    } finally {
      button.disabled = false;
    }
  });
}

// Année automatique dans le pied de page
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
