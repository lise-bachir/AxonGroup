/* ==========================================================================
   ✏️ VOS COORDONNÉES — modifiez seulement ces deux lignes
   ========================================================================== */
const EMAIL_CONTACT = "contact@axongroup.sn";   // reçoit les demandes du formulaire
const NUMERO_WHATSAPP = "221000000000";         // format international, sans + ni espaces

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

// Formulaire de contact : ouvre la messagerie avec la demande pré-remplie
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = `Demande de devis — ${data.get("service")}`;
    const body = [
      `Nom : ${data.get("nom")}`,
      `Entreprise : ${data.get("entreprise") || "-"}`,
      `E-mail : ${data.get("email")}`,
      `Téléphone : ${data.get("tel") || "-"}`,
      `Service : ${data.get("service")}`,
      "",
      data.get("message"),
    ].join("\n");
    window.location.href = `mailto:${EMAIL_CONTACT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

// Année automatique dans le pied de page
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
