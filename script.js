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
}

/**
 * Initializes project selection for desktop and mobile.
 */
function initProjects() {
  const desktopButtons = document.querySelectorAll(".projects-selector-btn");
  const mobileButtons = document.querySelectorAll(".projects-mobile-btn");
  const elements = getDomElements();
  const projects = getProjects();
  const projectKeys = Object.keys(projects);

  setupDesktopProjectButtons(desktopButtons, mobileButtons, elements, projects);
  setupMobileProjectButtons(
    mobileButtons,
    desktopButtons,
    elements,
    projects,
    projectKeys,
  );
}

/**
 * Sets up click handlers for desktop project buttons.
 * @param {NodeList} desktopButtons - Desktop project buttons.
 * @param {NodeList} mobileButtons - Mobile project buttons.
 * @param {Object} elements - DOM elements for rendering.
 * @param {Object} projects - Project data.
 */
function setupDesktopProjectButtons(
  desktopButtons,
  mobileButtons,
  elements,
  projects,
) {
  desktopButtons.forEach((desktopButton, index) => {
    desktopButton.addEventListener("click", () => {
      const projectKey = desktopButton.dataset.project;
      const project = projects[projectKey];

      updateActiveButton(desktopButtons, desktopButton);
      updateActiveButton(mobileButtons, mobileButtons[index]);

      renderProjectContent(elements, project);
      renderMobileProject(project);
    });
  });
}

/**
 * Sets up click handlers for mobile project buttons.
 * @param {NodeList} mobileButtons - Mobile project buttons.
 * @param {NodeList} desktopButtons - Desktop project buttons.
 * @param {Object} elements - DOM elements for rendering.
 * @param {Object} projects - Project data.
 * @param {string[]} projectKeys - Array of project keys.
 */
function setupMobileProjectButtons(
  mobileButtons,
  desktopButtons,
  elements,
  projects,
  projectKeys,
) {
  mobileButtons.forEach((mobileButton, index) => {
    mobileButton.addEventListener("click", () => {
      const projectKey = projectKeys[index];
      const project = projects[projectKey];

      updateActiveButton(mobileButtons, mobileButton);
      updateActiveButton(desktopButtons, desktopButtons[index]);

      renderProjectContent(elements, project);
      renderMobileProject(project);
    });
  });
}

/**
 * Returns all DOM elements required for desktop project rendering.
 * @returns {Object} DOM element references.
 */
function getDomElements() {
  return {
    projectContent: document.querySelector(".project-content"),
    techIcons: document.querySelector(".project-icon"),
    previewImg: document.querySelector(".project-preview-img"),
    liveBtn: document.querySelector(".project-btn-live"),
    gitBtn: document.querySelector(".project-btn-git"),
  };
}

/**
 * Updates the active state of a button group.
 * @param {NodeList} buttons - Button group.
 * @param {HTMLElement} activeButton - Button to activate.
 */
function updateActiveButton(buttons, activeButton) {
  buttons.forEach((button) => button.classList.remove("active"));
  activeButton.classList.add("active");
}

/**
 * Renders desktop project content.
 * @param {Object} elements - DOM elements for rendering.
 * @param {Object} project - Project data.
 */
function renderProjectContent(elements, project) {
  elements.projectContent.innerHTML = renderSections(project.sections);
  elements.techIcons.innerHTML = renderTechIcons(project.tech);
  elements.previewImg.src = project.img;
  updateButtons(elements, project);
}

/**
 * Updates visibility and links of desktop project buttons.
 * @param {Object} elements - DOM elements for rendering.
 * @param {Object} project - Project data.
 */
function updateButtons(elements, project) {
  const hasLinks = project.live && project.git;
  elements.liveBtn.style.display = hasLinks ? "inline-flex" : "none";
  elements.gitBtn.style.display = hasLinks ? "inline-flex" : "none";

  if (hasLinks) {
    elements.liveBtn.href = project.live;
    elements.gitBtn.href = project.git;
  }
}

/**
 * Renders all mobile project content sections.
 * @param {Object} project - Project data.
 */
function renderMobileProject(project) {
  renderMobileTitle(project);
  renderMobileImage(project);
  renderMobileTech(project);
  renderMobileSections(project);
  renderMobileButtons(project);
}

/**
 * Initializes contact form validation.
 */
function initContactValidation() {
  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const messageField = document.getElementById("message");
  const privacyCheckbox = document.getElementById("privacy");
  const submitButton = document.querySelector(".contact-submit");

  addInputListeners([nameField, emailField, messageField]);
  privacyCheckbox.addEventListener("change", () =>
    validateForm(
      nameField,
      emailField,
      messageField,
      privacyCheckbox,
      submitButton,
    ),
  );
}

/**
 * Adds blur listeners to input fields.
 * @param {HTMLElement[]} inputFields - Input elements.
 */
function addInputListeners(inputFields) {
  inputFields.forEach((inputField) => {
    inputField.addEventListener("blur", () => validateInputField(inputField));
  });
}

/**
 * Validates a single input field.
 * @param {HTMLElement} inputField - Input element.
 * @returns {boolean} Whether the field is valid.
 */
function validateInputField(inputField) {
  const errorMessageElement =
    inputField.parentElement.querySelector(".error-message");

  if (inputField.value.trim() === "") {
    showError(
      inputField,
      errorMessageElement,
      `${inputField.labels[0].innerText} is required`,
    );
    return false;
  }

  if (inputField.id === "email" && !isValidEmail(inputField.value)) {
    showError(inputField, errorMessageElement, "Please enter a valid email");
    return false;
  }

  hideError(inputField, errorMessageElement);
  return true;
}

/**
 * Validates the entire contact form.
 * @param {HTMLElement} nameField
 * @param {HTMLElement} emailField
 * @param {HTMLElement} messageField
 * @param {HTMLElement} privacyCheckbox
 * @param {HTMLElement} submitButton
 */
function validateForm(
  nameField,
  emailField,
  messageField,
  privacyCheckbox,
  submitButton,
) {
  const formIsValid =
    nameField.value.trim() !== "" &&
    isValidEmail(emailField.value) &&
    messageField.value.trim() !== "" &&
    privacyCheckbox.checked;

  submitButton.disabled = !formIsValid;
  submitButton.style.color = formIsValid ? "white" : "grey";
  submitButton.style.borderColor = formIsValid ? "rgb(137, 188, 217)" : "grey";
  submitButton.style.cursor = formIsValid ? "pointer" : "not-allowed";
}

/**
 * Displays an error message for a field.
 * @param {HTMLElement} inputField
 * @param {HTMLElement} errorMessageElement
 * @param {string} message
 */
function showError(inputField, errorMessageElement, message) {
  inputField.classList.add("error");
  if (errorMessageElement) {
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = "block";
  }
}

/**
 * Hides an error message for a field.
 * @param {HTMLElement} inputField
 * @param {HTMLElement} errorMessageElement
 */
function hideError(inputField, errorMessageElement) {
  inputField.classList.remove("error");
  if (errorMessageElement) {
    errorMessageElement.style.display = "none";
  }
}

/**
 * Validates an email string.
 * @param {string} emailValue
 * @returns {boolean} Whether the email is valid.
 */
function isValidEmail(emailValue) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
}

/**
 * Initializes the mobile menu interactions.
 */
function initMobileMenu() {
  burgerMenu.addEventListener("click", toggleMobileMenu);
  mobileOverlay.addEventListener("click", closeMenuOnOverlayClick);
  document
    .querySelectorAll(".mobile-menu-links a")
    .forEach((link) => link.addEventListener("click", closeMobileMenu));
}

/**
 * Toggles the mobile menu open/close state.
 */
function toggleMobileMenu() {
  mobileOverlay.classList.toggle("d_none");
  setTimeout(() => mobileOverlay.classList.toggle("open"), 10);
}

/**
 * Closes the menu when clicking outside the menu content.
 * @param {MouseEvent} event
 */
function closeMenuOnOverlayClick(event) {
  if (event.target === mobileOverlay) closeMobileMenu();
}

/**
 * Closes the mobile menu with animation.
 */
function closeMobileMenu() {
  mobileOverlay.classList.remove("open");
  setTimeout(() => mobileOverlay.classList.add("d_none"), 300);
}

/**
 * Initializes navigation link active state handling.
 */
function initNavActive() {
  const navigationLinks = document.querySelectorAll(".nav-link");
  navigationLinks.forEach((navigationLink) => {
    navigationLink.addEventListener("click", () =>
      setActiveNavigationLink(navigationLinks, navigationLink),
    );
  });
}

/**
 * Sets the active navigation link.
 * @param {NodeList} allLinks
 * @param {HTMLElement} activeLink
 */
function setActiveNavigationLink(allLinks, activeLink) {
  allLinks.forEach((link) => link.classList.remove("active"));
  activeLink.classList.add("active");
}
