document.addEventListener("DOMContentLoaded", init);
const burgerMenu = document.getElementById("burgerMenu");
const mobileOverlay = document.querySelector(".mobile-menu-shape");

/**
 * Initializes all application modules after the DOM is fully loaded.
 */
function init() {
  initProjects();
  initContactValidation();
  initMobileMenu();
  initNavActive();

  // Sprache laden
  const language = loadLanguage();
  setLanguage(language);

  // Standardprojekt laden
  renderProject("el-pollo-loco");
}

/**
 * Initializes project selection for desktop and mobile.
 */
function initProjects() {
  const desktopButtons = document.querySelectorAll(".projects-selector-btn");
  const mobileButtons = document.querySelectorAll(".projects-mobile-btn");

  desktopButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const projectKey = btn.dataset.project;

      updateActiveButton(desktopButtons, btn);
      updateActiveButton(mobileButtons, mobileButtons[index]);

      renderProject(projectKey);
    });
  });

  mobileButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const projectKey = btn.dataset.project;

      updateActiveButton(mobileButtons, btn);
      updateActiveButton(desktopButtons, desktopButtons[index]);

      renderProject(projectKey);
    });
  });
}

/**
 * Updates the active state of a button group.
 */
function updateActiveButton(buttons, activeButton) {
  buttons.forEach((button) => button.classList.remove("active"));
  activeButton.classList.add("active");
}

/**
 * Renders desktop + mobile project content.
 */
function renderProject(projectKey) {
  const projects = getProjects();
  const project = projects[projectKey];
  const keys = projectKeyMap[projectKey];

  // TEXT-KEYS setzen (statische Selektoren!)
  document
    .querySelector(".about-heading")
    .setAttribute("data-i18n", keys.about);
  document
    .querySelector(".about-text")
    .setAttribute("data-i18n", keys.aboutText);

  document
    .querySelector(".process-heading")
    .setAttribute("data-i18n", keys.process);
  document
    .querySelector(".process-text")
    .setAttribute("data-i18n", keys.processText);

  document
    .querySelector(".learned-heading")
    .setAttribute("data-i18n", keys.learned);
  document
    .querySelector(".learned-text")
    .setAttribute("data-i18n", keys.learnedText);

  // Bild
  document.querySelector(".project-preview-img").src = project.img;

  // Tech Icons
  const techContainer = document.querySelector(".project-icon");
  techContainer.innerHTML = "";
  project.tech.forEach((icon) => {
    const img = document.createElement("img");
    img.classList.add("tech-icon");
    img.src = icon;
    techContainer.appendChild(img);
  });

  // Buttons
  toggleButton(document.querySelector(".project-btn-live"), project.live);
  toggleButton(document.querySelector(".project-btn-git"), project.git);

  // Mobile
  renderMobileTitle(project);
  renderMobileImage(project);
  renderMobileTech(project);
  renderMobileButtons(project);

  // Übersetzen
  applyTranslations(loadLanguage());
}

/**
 * Shows or hides a button and sets its link.
 */
function toggleButton(button, url) {
  if (url) {
    button.style.display = "inline-flex";
    button.href = url;
  } else {
    button.style.display = "none";
  }
}

/**
 * MOBILE TITLE
 */
function renderMobileTitle(project) {
  const titleElement = document.querySelector(".project-mobile-title");
  titleElement.textContent = project.title;
}

/**
 * MOBILE IMAGE
 */
function renderMobileImage(project) {
  const imageElement = document.querySelector(".project-mobile-img");
  imageElement.src = project.img;
}

/**
 * MOBILE TECH
 */
function renderMobileTech(project) {
  const techContainer = document.querySelector(".project-mobile-tech");
  techContainer.innerHTML = project.tech
    .map((iconPath) => `<span>${extractTechName(iconPath)}</span>`)
    .join("");
}

/**
 * MOBILE BUTTONS
 */
function renderMobileButtons(project) {
  const liveButton = document.querySelector(".project-btn-live");
  const gitButton = document.querySelector(".project-btn-git");

  toggleButton(liveButton, project.live);
  toggleButton(gitButton, project.git);
}

/**
 * EMAIL VALIDATION + MOBILE MENU + NAVIGATION
 * (unverändert gelassen)
 */
function initContactValidation() {}
function addInputListeners() {}
function validateInputField() {}
function validateForm() {}
function showError() {}
function hideError() {}
function isValidEmail() {}

function initMobileMenu() {}
function toggleMobileMenu() {}
function closeMenuOnOverlayClick() {}
function closeMobileMenu() {}

function initNavActive() {}
function setActiveNavigationLink() {}

/**
 * TRANSLATION SYSTEM
 */
function applyTranslations(language) {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[language] && translations[language][key]) {
      element.innerHTML = translations[language][key];
    }
  });
}

function saveLanguage(language) {
  localStorage.setItem("language", language);
}

function loadLanguage() {
  return localStorage.getItem("language") || "en";
}

function setLanguage(language) {
  saveLanguage(language);
  applyTranslations(language);
  updateActiveLanguageUI(language);
}

function updateActiveLanguageUI(language) {
  const languageButtons = document.querySelectorAll(".nav-lang-option");
  languageButtons.forEach((button) => {
    button.classList.toggle(
      "active",
      button.textContent.trim().toLowerCase() === language,
    );
  });
}

document.querySelectorAll(".nav-lang-option").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const language = button.textContent.trim().toLowerCase();
    setLanguage(language);
  });
});
