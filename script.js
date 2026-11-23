// Update the footer year automatically.
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Close the mobile navigation after clicking a section link.
const navMenu = document.getElementById("mainNav");
if (navMenu) {
  document.querySelectorAll(".navbar-nav .nav-link, .navbar-nav .btn").forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
      }
    });
  });
}

// Add a scrolled state to the navbar when scrolling down.
const navbar = document.querySelector(".site-navbar");
if (navbar) {
  const toggleNavbarState = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  };
  toggleNavbarState();
  window.addEventListener("scroll", toggleNavbarState, { passive: true });
}

// Highlight the active nav link as sections enter view.
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link[href^='#']");
if (sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
  );
  sections.forEach((section) => sectionObserver.observe(section));
}

// Contact form validation and mailto handoff.
const contactForm = document.getElementById("contactForm");
const feedback = document.getElementById("formFeedback");
const recipientEmail = "hafizabdullah.webdev@gmail.com";

function setFeedback(message, type) {
  if (!feedback) return;
  feedback.textContent = message;
  feedback.classList.remove("is-error", "is-success");
  if (type) {
    feedback.classList.add(type);
  }
}

if (contactForm && feedback) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";

    if (!name || !email || !message) {
      setFeedback("Please complete all fields before sending.", "is-error");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setFeedback("Please enter a valid email address.", "is-error");
      return;
    }

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    setFeedback(
      `Opening your email client... If nothing opens, email ${recipientEmail} directly.`,
      "is-success"
    );

    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
    contactForm.reset();
  });
}