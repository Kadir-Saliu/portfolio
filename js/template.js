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
 * Shows or hides a button and sets its link.
 * @param {HTMLElement} button - The button element.
 * @param {string} url - The URL to assign or null.
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
 * Renders mobile project action buttons (Live & GitHub).
 * @param {Object} project - Project data object.
 */
function renderMobileButtons(project) {
  const liveButton = document.querySelector(".project-btn-live");
  const gitButton = document.querySelector(".project-btn-git");

  toggleButton(liveButton, project.live);
  toggleButton(gitButton, project.git);
}
