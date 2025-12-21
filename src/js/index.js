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

    // Handle language selection
    const langOptions = langDropdown.querySelectorAll("a");
    const langBtnImg = langBtn.querySelector("img");
    const langBtnText = langBtn.querySelector("span");

    langOptions.forEach((option) => {
      option.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Get the selected flag and text from the clicked option
        const selectedImg = option.querySelector("img");
        const selectedText = option.querySelector("span");

        // Update the button with selected values
        if (langBtnImg && selectedImg) {
          langBtnImg.src = selectedImg.src;
          langBtnImg.alt = selectedImg.alt;
        }
        if (langBtnText && selectedText) {
          langBtnText.textContent = selectedText.textContent;
        }

        // Close dropdown
        langDropdown.classList.add("hidden");
        langArrow.classList.remove("rotate-180");
      });
    });
  }

  // Helper function for masked input logic
  function initMaskedInput(input) {
    const realValue = input.value;
    input.setAttribute("data-real-value", realValue);
    input.value = "*".repeat(realValue.length);
    input.classList.add("font-verdana"); // Apply font for consistent asterisk display

    input.addEventListener("input", (e) => {
      const currentMaskedValue = e.target.value;
      const oldRealValue = e.target.getAttribute("data-real-value") || "";
      let newRealValue = "";

      // Determine if a character was added or deleted
      if (currentMaskedValue.length > oldRealValue.length) {
        // Character added: append to real value
        const addedChar = currentMaskedValue[currentMaskedValue.length - 1];
        newRealValue = oldRealValue + addedChar;
      } else if (currentMaskedValue.length < oldRealValue.length) {
        // Character deleted: remove from real value
        newRealValue = oldRealValue.slice(0, currentMaskedValue.length);
      } else {
        // Value changed but length is same (e.g., paste, or overwrite)
        // For simplicity, if length is same, assume it's an overwrite or paste
        // and treat the new input as the real value for now, then mask it.
        // A more robust solution might compare char by char.
        newRealValue = currentMaskedValue;
      }

      e.target.setAttribute("data-real-value", newRealValue);
      e.target.value = "*".repeat(newRealValue.length);
    });
  }

  // Find all password inputs
  const passwordInputs = document.querySelectorAll(".js-password-input");
  passwordInputs.forEach((input) => {
    // Setup toggle button if it exists nearby
    const container = input.closest(".relative");
    // Use structural selector: the button inside the wrapper
    const toggleBtn = container ? container.querySelector("button") : null;

    if (toggleBtn) {
      // Find icons by order since IDs might be duplicated or unique
      const svgs = toggleBtn.querySelectorAll("svg");
      const eyeOpen = svgs[0];
      const eyeClosed = svgs[1];

      // Apply type text first
      input.type = "text";
      input.classList.add("masked-password");

      initMaskedInput(input);

      if (eyeOpen && eyeClosed) {
        // Remove old listeners by cloning
        const newBtn = toggleBtn.cloneNode(true);
        toggleBtn.parentNode.replaceChild(newBtn, toggleBtn);

        // Re-query eyes inside new button because we cloned it
        const newSvgs = newBtn.querySelectorAll("svg");
        const newEyeOpen = newSvgs[0];
        const newEyeClosed = newSvgs[1];

        newBtn.addEventListener("click", () => {
          const isMasked = input.classList.contains("masked-password");
          const real = input.getAttribute("data-real-value") || "";

          if (isMasked) {
            // Show Plain
            input.value = real;
            input.classList.remove("masked-password");
            input.classList.remove("font-verdana"); // safety
            newEyeOpen.classList.add("hidden");
            newEyeClosed.classList.remove("hidden");
          } else {
            // Mask
            input.classList.add("masked-password");
            input.value = "*".repeat(real.length);
            newEyeOpen.classList.remove("hidden");
            newEyeClosed.classList.add("hidden");
          }
        });
      }
    } else {
      // Even if no toggle button, still init masking logic
      input.type = "text";
      input.classList.add("masked-password");
      initMaskedInput(input);
    }
  });
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
  const passwordInputMain = document.getElementById("password");
  const passwordError = document.getElementById("passwordError");

  if (loginBtn && passwordInputMain && passwordError) {
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      // READ REAL VALUE from data attribute or value
      const password =
        passwordInputMain.getAttribute("data-real-value") ||
        passwordInputMain.value;

      // Validation - password must be "123"
      if (!email || !password || password !== "123") {
        // Show error state
        passwordInputMain.classList.add("border-[#D54033]");
        passwordInputMain.classList.remove("border-[#DCDEDE]");
        passwordError.classList.remove("hidden");
        passwordError.classList.add("flex");
        return;
      }

      // Success - redirect
      window.location.href = "./index.html";
    });

    // Reset error on input
    passwordInputMain.addEventListener("input", () => {
      passwordInputMain.classList.remove("border-[#D54033]");
      passwordInputMain.classList.add("border-[#DCDEDE]");
      passwordError.classList.add("hidden");
      passwordError.classList.remove("flex");
    });
  }
});

// Global functions for Phone Dropdown (needed for inline onclick in HTML)
window.toggleDropdown = function (menuId, iconId) {
  const menu = document.getElementById(menuId);
  const icon = document.getElementById(iconId);
  if (menu) menu.classList.toggle("hidden");
  if (icon) icon.classList.toggle("rotate-180");
};

window.selectPhoneCountry = function (countryCode, dialingCode, countryName) {
  const btnText = document.getElementById("country-code-text");
  const menu = document.getElementById("menu-phone-country");
  const icon = document.getElementById("icon-phone-country");
  const btnImg = document.querySelector(".group-dropdown img"); // Current selected flag

  // Update text
  if (btnText) btnText.textContent = dialingCode;

  // Update flag
  if (btnImg) {
    // We can construct the URL based on the country code or find the image in the clicked item
    // For simplicity, let's just use the CDN link pattern
    btnImg.src = `https://circle-flags.cdn.skk.moe/flags/${countryCode}.svg`;
    btnImg.alt = countryCode.toUpperCase();
  }

  // Close dropdown
  if (menu) menu.classList.add("hidden");
  if (icon) icon.classList.remove("rotate-180");
};

// Close phone dropdown when clicking outside
document.addEventListener("click", (e) => {
  const menu = document.getElementById("menu-phone-country");
  const icon = document.getElementById("icon-phone-country");
  const dropdownContainer = document.querySelector(".group-dropdown");

  if (menu && dropdownContainer && !menu.classList.contains("hidden")) {
    if (!dropdownContainer.contains(e.target)) {
      menu.classList.add("hidden");
      if (icon) icon.classList.remove("rotate-180");
    }
  }
});

// Connection Points Card Selection Logic
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".connection-card");

  if (cards.length > 0) {
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        // Toggle selection state independently
        if (card.classList.contains("border-[#0189D5]")) {
          // Deselect
          card.classList.remove("border-[#0189D5]");
          card.classList.add("border-[#E7E9E9]");
        } else {
          // Select
          card.classList.remove("border-[#E7E9E9]");
          card.classList.add("border-[#0189D5]");
        }
      });
    });
  }
});

// Password Strength Meter Logic
document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password"); // Use existing input
  const strengthMeter = document.getElementById("strengthMeter");
  const strengthText = document.getElementById("strength-text");

  // Requirement items
  const reqSymbol = document.getElementById("req-symbol");
  const reqUppercase = document.getElementById("req-uppercase");
  const reqLength = document.getElementById("req-length");
  const reqNumber = document.getElementById("req-number");

  // Meter bars
  const meters = [
    document.getElementById("meter-1"),
    document.getElementById("meter-2"),
    document.getElementById("meter-3"),
    document.getElementById("meter-4"),
  ];

  if (
    !passwordInput ||
    !strengthMeter ||
    !strengthText ||
    !reqSymbol ||
    !reqUppercase ||
    !reqLength ||
    !reqNumber
  ) {
    return; // Exit if elements not found (e.g. on login page)
  }

  // Regex for requirements
  const regexLower = /[a-z]/;
  const regexUpper = /[A-Z]/;
  const regexNumber = /[0-9]/;
  const regexSymbol = /[^A-Za-z0-9]/;

  function updateRequirement(element, met) {
    const iconBox = element.querySelector(".icon-box");
    //const textSpan = element.querySelector("span");

    if (met) {
      // REQUIREMENT MET
      if (iconBox) {
        iconBox.classList.remove("text-[#898F8F]");
        iconBox.classList.add("text-[#28B446]"); // Green
      }
      // textSpan?.classList.remove("text-[#14201F]");
      // textSpan?.classList.add("text-[#28B446]");
    } else {
      // REQUIREMENT NOT MET
      if (iconBox) {
        iconBox.classList.add("text-[#898F8F]"); // Gray
        iconBox.classList.remove("text-[#28B446]");
      }
      // textSpan?.classList.add("text-[#14201F]");
      // textSpan?.classList.remove("text-[#28B446]");
    }
  }

  function monitorPasswordStrength() {
    // If masked input is used, we need the real value
    // The previous code sets 'data-real-value' on the input
    const realValue =
      passwordInput.getAttribute("data-real-value") !== null
        ? passwordInput.getAttribute("data-real-value")
        : passwordInput.value;

    const value = realValue || "";

    // 1. Toggle Visibility
    if (value.length > 0) {
      strengthMeter.classList.remove("hidden");
    } else {
      strengthMeter.classList.add("hidden");
      return; // Stop processing if empty
    }

    // 2. Check Requirements
    const hasLower = regexLower.test(value); // Not explicitly tracked in UI but part of strength usually
    const hasUpper = regexUpper.test(value);
    const hasNumber = regexNumber.test(value);
    const hasSymbol = regexSymbol.test(value);
    const hasLength = value.length >= 8;

    updateRequirement(reqUppercase, hasUpper);
    updateRequirement(reqNumber, hasNumber);
    updateRequirement(reqSymbol, hasSymbol);
    updateRequirement(reqLength, hasLength);

    // 3. Calculate Strength Score (0 to 4)
    // We base score on the number of met requirements from the UI list (4 items + maybe length)
    // Actually the requirements are: Symbol, Uppercase, Length, Number (4 total)
    let score = 0;
    if (hasSymbol) score++;
    if (hasUpper) score++;
    if (hasNumber) score++;
    if (hasLength) score++;

    // 4. Update Bars and Text
    // Colors:
    // 1 bar: Red (#D54033) "Faible"
    // 2 bars: Orange (#FBBB00) "Moyen"
    // 3 bars: Blue (#0189D5) ? "Bon"
    // 4 bars: Green (#28B446) "Fort"

    // Reset all bars to default gray
    meters.forEach((meter) => {
      meter.className = "h-1 flex-1 rounded-full bg-[#E7E9E9] transition-all";
    });

    let colorClass = "";
    let statusText = "Faible";
    let activeBars = 0;

    if (score <= 1) {
      colorClass = "bg-[#D54033]"; // Red
      statusText = "Faible";
      activeBars = 1;
    } else if (score === 2) {
      colorClass = "bg-[#FBBB00]"; // Orange/Yellow
      statusText = "Moyen";
      activeBars = 2;
    } else if (score === 3) {
      colorClass = "bg-[#0189D5]"; // Blue
      statusText = "Bon";
      activeBars = 3;
    } else if (score === 4) {
      colorClass = "bg-[#28B446]"; // Green
      statusText = "Fort";
      activeBars = 4;
    }

    // Apply color to active bars
    for (let i = 0; i < activeBars; i++) {
      if (meters[i]) {
        meters[i].classList.remove("bg-[#E7E9E9]");
        meters[i].classList.add(
          colorClass.replace("bg-[", "").replace("]", "").startsWith("#")
            ? "bg-[" + colorClass.split("[")[1]
            : colorClass
        );
        // Since I am using tailwind arbitrary values, I need to be careful with string manipulation or just set exact class.
        // Cleaner way:
        meters[
          i
        ].className = `h-1 flex-1 rounded-full transition-all ${colorClass}`;
      }
    }

    // Update Text
    strengthText.textContent = statusText;
    strengthText.className = "text-xs font-medium ml-1 transition-colors";
    // Set text color to match the bars
    const textColor = colorClass.replace("bg-", "text-"); // e.g. text-[#D54033]
    strengthText.classList.add(textColor);
  }

  // Bind to Input
  // Since mask logic might update 'value' or 'data-real-value', we should listen to 'input'
  // AND maybe a custom event if the mask script doesn't fire input properly on algorithmic updates?
  // The 'input' event fires when user types. The mask script also updates value.
  // We need to ensure we read data-real-value.

  passwordInput.addEventListener("input", monitorPasswordStrength);

  // Also run once on load in case there is a value
  monitorPasswordStrength();
});

// Close new filter dropdowns when clicking outside
document.addEventListener("click", (e) => {
  const dropdowns = [
    { menuId: "menu-package", iconId: "icon-package" },
    { menuId: "menu-events", iconId: "icon-events" },
    { menuId: "menu-status", iconId: "icon-status" },
  ];

  dropdowns.forEach(({ menuId, iconId }) => {
    const menu = document.getElementById(menuId);
    const icon = document.getElementById(iconId);

    if (menu && !menu.classList.contains("hidden")) {
      const container = menu.parentElement; // The relative div

      if (container && !container.contains(e.target)) {
        menu.classList.add("hidden");
        if (icon) icon.classList.remove("rotate-180");
      }
    }
  });
});

// --- Pagination Logic ---
class TablePagination {
  constructor(tableId, pageSize = 5) {
    this.table = document.getElementById(tableId);
    if (!this.table) return;

    this.pageSize = pageSize;
    this.currentPage = 1;
    // Query rows directly from tbody to avoid selecting header row
    this.rows = Array.from(this.table.querySelectorAll("tbody tr"));
    this.totalPages = Math.ceil(this.rows.length / this.pageSize);

    // Elements
    this.currentPageText = document.getElementById("current-page-text");
    this.totalPagesText = document.getElementById("total-pages-text");
    this.prevBtn = document.getElementById("prev-page");
    this.nextBtn = document.getElementById("next-page");
    this.numbersContainer = document.getElementById("pagination-numbers");

    this.init();
  }

  init() {
    if (this.totalPagesText) this.totalPagesText.textContent = this.totalPages;
    this.addEventListeners();
    this.render();
  }

  addEventListeners() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.render();
        }
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.render();
        }
      });
    }
  }

  render() {
    // Update Text
    if (this.currentPageText)
      this.currentPageText.textContent = this.currentPage;

    // Update Button State
    if (this.prevBtn) this.prevBtn.disabled = this.currentPage === 1;
    if (this.nextBtn)
      this.nextBtn.disabled = this.currentPage === this.totalPages;

    // Show/Hide Rows
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;

    this.rows.forEach((row, index) => {
      if (index >= start && index < end) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });

    // Render Numbers
    this.renderNumbers();
  }

  renderNumbers() {
    if (!this.numbersContainer) return;
    this.numbersContainer.innerHTML = "";

    for (let i = 1; i <= this.totalPages; i++) {
      this.addNumberBtn(i);
    }
  }

  addNumberBtn(i) {
    const btn = document.createElement("button");
    btn.textContent = i;
    // Updated styling for pixel perfect design (white on gray pill)
    btn.className = `w-[26px] h-[26px] flex items-center justify-center rounded-[6px] text-sm transition-all ${
      i === this.currentPage
        ? "bg-white text-[#1D2939] shadow-sm font-semibold"
        : "text-[#475467] hover:text-[#1D2939] font-medium"
    }`;
    btn.onclick = () => {
      this.currentPage = i;
      this.render();
    };
    this.numbersContainer.appendChild(btn);
  }
}

// Initialize Pagination on Load
document.addEventListener("DOMContentLoaded", () => {
  new TablePagination("reservations-table", 10);
  initFlatpickr();
});

// Initialize Flatpickr for custom date and time inputs
function initFlatpickr() {
  // Date Picker
  flatpickr(".datepicker-input", {
    dateFormat: "d/m/Y",
    allowInput: true,
    locale: "fr",
    disableMobile: "true", // Force custom picker even on mobile for consistency
  });

  // Time Picker
  flatpickr(".timepicker-input", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true,
    allowInput: true,
    locale: "fr",
    disableMobile: "true",
  });

  // Handle custom icon clicks to open the picker
  const inputs = document.querySelectorAll(
    ".datepicker-input, .timepicker-input"
  );
  inputs.forEach((input) => {
    const container = input.closest(".relative");
    if (container) {
      const iconWrapper = container.querySelector(".pointer-events-none");
      if (iconWrapper) {
        iconWrapper.classList.remove("pointer-events-none");
        iconWrapper.style.cursor = "pointer";
        iconWrapper.addEventListener("click", () => {
          // Open the flatpickr instance associated with the input
          if (input._flatpickr) {
            input._flatpickr.open();
          }
        });
      }
    }
  });
}
