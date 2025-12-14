// for the accordion functionality on sidebar
document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((accordion) => {
    const trigger = accordion.querySelector(".accordion-trigger");
    const content = accordion.querySelector(".accordion-content");
    const icon = accordion.querySelector(".accordion-icon");

    trigger.addEventListener("click", () => {
      content.classList.toggle("open");
      icon.classList.toggle("rotated");
      accordion.classList.toggle("active");
    });
  });
});

// dropdown menu functionality
const btn = document.getElementById("userDropdownBtn");
const dropdown = document.getElementById("userDropdown");
const arrow = document.getElementById("arrowIcon");

if (btn && dropdown && arrow) {
  btn.addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
    arrow.classList.toggle("rotate-180");
  });
}

// for the side bar toggle
(function () {
  const sidebar = document.getElementById("main-sidebar");
  const main = document.querySelector(".mainContent");
  const toggle = document.getElementById("sidebar-toggle");

  if (!sidebar || !main || !toggle) return;

  const cls = {
    desktopClose: "sidebar-closed",
    mobileOpen: "sidebar-mobile-open",
    mainFull: "main--full",
  };

  const isDesktop = () => window.innerWidth >= 768;

  function openMobile() {
    sidebar.classList.add(cls.mobileOpen);
    toggle.setAttribute("aria-expanded", "true");
  }
  function closeMobile() {
    sidebar.classList.remove(cls.mobileOpen);
    toggle.setAttribute("aria-expanded", "false");
  }
  function toggleDesktop() {
    const closed = sidebar.classList.toggle(cls.desktopClose);
    main.classList.toggle(cls.mainFull, closed);
    toggle.setAttribute("aria-expanded", String(!closed));
  }

  toggle.addEventListener("click", () => {
    if (isDesktop()) {
      sidebar.classList.remove(cls.mobileOpen);
      toggleDesktop();
    } else {
      sidebar.classList.contains(cls.mobileOpen) ? closeMobile() : openMobile();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains(cls.mobileOpen)) {
      closeMobile();
    }
  });

  window.addEventListener("resize", () => {
    if (isDesktop()) {
      sidebar.classList.remove(cls.mobileOpen);
    } else {
      sidebar.classList.remove(cls.desktopClose);
      main.classList.remove(cls.mainFull);
    }
  });

  toggle.setAttribute("aria-expanded", isDesktop() ? "true" : "false");
})();

// Reusable Modal Logic
window.AppModal = {
  modal: null,
  title: null,
  message: null,
  image: null,
  actionBtn: null,

  init: function () {
    this.modal = document.getElementById("modal");
    if (!this.modal) return;

    this.title = document.getElementById("modal-title");
    this.message = document.getElementById("modal-message");
    this.image = document.getElementById("modal-image");
    this.actionBtn = document.getElementById("modal-action");

    // Close on click outside content
    this.modal.addEventListener("click", (e) => {
      // If clicking the backdrop (not the inner content)
      if (e.target === this.modal) {
        this.hide();
      }
    });

    // Close on action button click (default behavior, can be overridden)
    if (this.actionBtn) {
      this.actionBtn.addEventListener("click", (e) => {
        // e.preventDefault(); // Optional, depending on if it's a link
        this.hide();
      });
    }
  },

  show: function ({ title, message, imageSrc, buttonText, onAction }) {
    if (!this.modal) this.init();
    if (!this.modal) return; // Still no modal? Exit.

    if (title && this.title) this.title.textContent = title;
    if (message && this.message) this.message.textContent = message;
    if (imageSrc && this.image) this.image.src = imageSrc;
    if (buttonText && this.actionBtn) this.actionBtn.textContent = buttonText;

    // Handle custom action
    if (onAction && this.actionBtn) {
      // Remove old listeners to prevent stacking?
      // Cloning node is a quick way to clear listeners
      const newBtn = this.actionBtn.cloneNode(true);
      this.actionBtn.parentNode.replaceChild(newBtn, this.actionBtn);
      this.actionBtn = newBtn;

      this.actionBtn.addEventListener("click", (e) => {
        e.preventDefault();
        onAction();
        this.hide();
      });
    } else if (this.actionBtn) {
      // Reset to simple close if no action provided
      const newBtn = this.actionBtn.cloneNode(true);
      this.actionBtn.parentNode.replaceChild(newBtn, this.actionBtn);
      this.actionBtn = newBtn;
      this.actionBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.hide();
      });
    }

    this.modal.classList.remove("hidden");
  },

  hide: function () {
    if (!this.modal) this.init();
    if (this.modal) {
      this.modal.classList.add("hidden");
    }
  },
};

// Initialize modal logic on load
document.addEventListener("DOMContentLoaded", () => {
  if (window.AppModal) window.AppModal.init();

  // Language Dropdown Logic
  const langBtn = document.getElementById("langBtn");
  const langDropdown = document.getElementById("langDropdown");
  const langArrow = document.getElementById("langArrow");

  if (langBtn && langDropdown && langArrow) {
    langBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle("hidden");
      langArrow.classList.toggle("rotate-180");
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
        langDropdown.classList.add("hidden");
        langArrow.classList.remove("rotate-180");
      }
    });
  }
  // Login Form Logic
  const togglePasswordBtn = document.getElementById("togglePasswordBtn");
  const passwordInput = document.getElementById("password");
  const eyeOpen = document.getElementById("eyeOpen");
  const eyeClosed = document.getElementById("eyeClosed");

  if (togglePasswordBtn && passwordInput && eyeOpen && eyeClosed) {
    togglePasswordBtn.addEventListener("click", () => {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeOpen.classList.add("hidden");
        eyeClosed.classList.remove("hidden");
      } else {
        passwordInput.type = "password";
        eyeOpen.classList.remove("hidden");
        eyeClosed.classList.add("hidden");
      }
    });
  }

  const rememberMeContainer = document.getElementById("rememberMeContainer");
  const rememberCheckbox = document.getElementById("rememberCheckbox");
  const rememberCheckmark = document.getElementById("rememberCheckmark");
  const rememberMeInput = document.getElementById("rememberMeInput");

  function toggleRememberMe() {
    rememberMeInput.checked = !rememberMeInput.checked;
    if (rememberMeInput.checked) {
      // Checked state: blue background, no border, white checkmark
      rememberCheckbox.classList.remove("border-[#DCDEDE]", "border");
      rememberCheckbox.classList.add("bg-[#0189D1]");
      rememberCheckmark.classList.remove("hidden");
    } else {
      // Unchecked state: gray border, no background
      rememberCheckbox.classList.add("border-[#DCDEDE]", "border");
      rememberCheckbox.classList.remove("bg-[#0189D1]");
      rememberCheckmark.classList.add("hidden");
    }
  }

  if (
    rememberMeContainer &&
    rememberCheckbox &&
    rememberCheckmark &&
    rememberMeInput
  ) {
    rememberMeContainer.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleRememberMe();
    });
  }

  const loginBtn = document.getElementById("loginBtn");
  const passwordError = document.getElementById("passwordError");

  if (loginBtn && passwordInput && passwordError) {
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = passwordInput.value;

      // Validation - password must be "123"
      if (!email || !password || password !== "123") {
        // Show error state
        passwordInput.classList.add("border-[#D54033]");
        passwordInput.classList.remove("border-[#DCDEDE]");
        passwordError.classList.remove("hidden");
        passwordError.classList.add("flex");
        return;
      }

      // Success - redirect
      window.location.href = "./index.html";
    });

    // Reset error on input
    passwordInput.addEventListener("input", () => {
      passwordInput.classList.remove("border-[#D54033]");
      passwordInput.classList.add("border-[#DCDEDE]");
      passwordError.classList.add("hidden");
      passwordError.classList.remove("flex");
    });
  }
});
