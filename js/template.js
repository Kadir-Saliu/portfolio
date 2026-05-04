/**
 * Returns HTML for a single project section.
 * @param {Object} section - Section object containing title and text.
 * @returns {string} HTML string for the section.
 */
function renderSectionTemplate(section) {
  const sectionTitle = resolveSectionText(section.titleKey, section.title);
  const sectionText = resolveSectionText(section.textKey, section.text);

  return `
    <section class="project-section">
      <img class="project-bullet" src="./assets/img/icons/bullet-icon.png" alt="" aria-hidden="true" />
      <div class="project-text">
        <h3 class="project-heading">${sectionTitle}</h3>
        <p class="project-description">${sectionText}</p>
      </div>
    </section>`;
}

/**
 * Resolves text by translation key with fallback to plain value.
 * @param {string | undefined} translationKey - Translation key.
 * @param {string} fallbackValue - Fallback text value.
 * @returns {string} Resolved text.
 */
function resolveSectionText(translationKey, fallbackValue) {
  if (!translationKey || typeof window.getTranslationByKey !== "function") {
    return fallbackValue;
  }
  return window.getTranslationByKey(translationKey);
}

/**
 * Renders all desktop project sections into HTML.
 * @param {Array<Object>} sections - Array of section objects.
 * @returns {string} HTML string for all sections.
 */
function renderSections(sections) {
  return sections.map(renderSectionTemplate).join("");
}

/**
 * Renders all desktop technology icons into HTML.
 * @param {string[]} icons - Array of icon image paths.
 * @returns {string} HTML string for all icons.
 */
function renderTechIcons(icons) {
  return icons
    .map((iconPath) => `<img class="tech-icon" src="${iconPath}" />`)
    .join("");
}

/**
 * Extracts a readable technology name from an icon path.
 * @param {string} src - Icon file path.
 * @returns {string} Technology name.
 */
function extractTechName(src) {
  const map = {
    html: "HTML",
    css: "CSS",
    js: "JavaScript",
    firebase: "Firebase",
    angular: "Angular",
    ts: "TypeScript",
  };

  const lower = src.toLowerCase();
  const key = Object.keys(map).find((tech) => lower.includes(tech));
  return key ? map[key] : "Tech";
}

/**
 * Detects a project title based on its image path.
 * @param {Object} project - Project object containing an image path.
 * @returns {string} Detected project title.
 */
function detectProjectTitle(project) {
  if (project.img.includes("pollo")) return "El Pollo Loco";
  if (project.img.includes("join")) return "Join";
  return "Ongoing Project";
}

/**
 * Renders the mobile project title.
 * @param {Object} project - Project data object.
 */
function renderMobileTitle(project) {
  const titleElement = document.querySelector(".project-mobile-title");
  titleElement.textContent = project.title || detectProjectTitle(project);
}

/**
 * Renders the mobile project preview image.
 * @param {Object} project - Project data object.
 */
function renderMobileImage(project) {
  const imageElement = document.querySelector(".project-mobile-img");
  imageElement.src = project.img;
}

/**
 * Renders the mobile technology list.
 * @param {Object} project - Project data object.
 */
function renderMobileTech(project) {
  const techContainer = document.querySelector(".project-mobile-tech");
  techContainer.innerHTML = project.tech
    .map((iconPath) => `<span>${extractTechName(iconPath)}</span>`)
    .join("");
}

/**
 * Renders all mobile project sections.
 * @param {Object} project - Project data object.
 */
function renderMobileSections(project) {
  const mobileContent = document.querySelector(".project-mobile-content");
  mobileContent.innerHTML = project.sections
    .map(renderSectionTemplate)
    .join("");
}

/**
 * Shows or hides a button and sets its link.
 * @param {HTMLElement} button - The button element.
 * @param {string} url - The URL to assign or null.
 */
function toggleButton(button, url) {
  if (url) {
    button.style.display = "inline-flex";
    button.href = url;
    button.target = "_blank";
    button.rel = "noopener noreferrer";
  } else {
    button.style.display = "none";
  }
}

/**
 * Renders mobile project action buttons (Live & GitHub).
 * @param {Object} project - Project data object.
 */
function renderMobileButtons(project) {
  const liveButtons = document.querySelectorAll(".project-btn-live");
  const gitButtons = document.querySelectorAll(".project-btn-git");

  liveButtons.forEach((button) => toggleButton(button, project.live));
  gitButtons.forEach((button) => toggleButton(button, project.git));
}
