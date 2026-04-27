document.addEventListener("DOMContentLoaded", init);

function init() {
  initProjects();
  initContactValidation();
  initMobileMenu();
  initNavActive();
}

/* ------------------------------------------------ */
/* PROJECTS – DESKTOP + MOBILE                      */
/* ------------------------------------------------ */

function initProjects() {
  const desktopButtons = document.querySelectorAll(".projects-selector-btn");
  const mobileButtons = document.querySelectorAll(".projects-mobile-btn");

  const elements = getDomElements();
  const projects = getProjects();
  const projectKeys = Object.keys(projects);

  /* DESKTOP BUTTONS */
  desktopButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.project;
      const project = projects[key];

      updateActiveButton(desktopButtons, btn);
      updateActiveButton(mobileButtons, mobileButtons[index]);

      renderProjectContent(elements, project);
      renderMobileProject(project);
    });
  });

  /* MOBILE BUTTONS */
  mobileButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const key = projectKeys[index];
      const project = projects[key];

      updateActiveButton(mobileButtons, btn);
      updateActiveButton(desktopButtons, desktopButtons[index]);

      renderProjectContent(elements, project);
      renderMobileProject(project);
    });
  });
}

/* DOM ELEMENTS FOR DESKTOP */
function getDomElements() {
  return {
    projectContent: document.querySelector(".project-content"),
    techIcons: document.querySelector(".project-icon"),
    previewImg: document.querySelector(".project-preview-img"),
    liveBtn: document.querySelector(".project-btn-live"),
    gitBtn: document.querySelector(".project-btn-git"),
  };
}

/* ACTIVE BUTTON HANDLING */
function updateActiveButton(buttons, activeBtn) {
  buttons.forEach((b) => b.classList.remove("active"));
  activeBtn.classList.add("active");
}

/* DESKTOP CONTENT RENDERING */
function renderProjectContent(elements, project) {
  elements.projectContent.innerHTML = renderSections(project.sections);
  elements.techIcons.innerHTML = renderTechIcons(project.tech);
  elements.previewImg.src = project.img;
  updateButtons(elements, project);
}

/* DESKTOP SECTIONS */
function renderSections(sections) {
  return sections
    .map(
      (sec) => `
      <section class="project-section">
        <img class="project-bullet" src="./assets/img/icons/bullet-icon.png" alt="" aria-hidden="true" />
        <div class="project-text">
          <h3 class="project-heading">${sec.title}</h3>
          <p class="project-description">${sec.text}</p>
        </div>
      </section>`,
    )
    .join("");
}

/* DESKTOP TECH ICONS */
function renderTechIcons(icons) {
  return icons.map((src) => `<img class="tech-icon" src="${src}" />`).join("");
}

/* DESKTOP BUTTONS */
function updateButtons(elements, project) {
  const hasLinks = project.live && project.git;
  elements.liveBtn.style.display = hasLinks ? "inline-flex" : "none";
  elements.gitBtn.style.display = hasLinks ? "inline-flex" : "none";

  if (hasLinks) {
    elements.liveBtn.href = project.live;
    elements.gitBtn.href = project.git;
  }
}

/* ------------------------------------------------ */
/* MOBILE PROJECT RENDERING                         */
/* ------------------------------------------------ */

function renderMobileProject(project) {
  /* TITLE */
  document.querySelector(".project-mobile-title").textContent =
    project.title || detectProjectTitle(project);

  /* IMAGE */
  document.querySelector(".project-mobile-img").src = project.img;

  /* TECHNOLOGIES */
  const techContainer = document.querySelector(".project-mobile-tech");
  techContainer.innerHTML = project.tech
    .map((src) => `<span>${extractTechName(src)}</span>`)
    .join("");

  /* SECTIONS */
  const mobileContent = document.querySelector(".project-mobile-content");
  mobileContent.innerHTML = project.sections
    .map(
      (sec) => `
      <section class="project-section">
        <img class="project-bullet" src="./assets/img/icons/bullet-icon.png" alt="" />
        <div class="project-text">
          <h3 class="project-heading">${sec.title}</h3>
          <p class="project-description">${sec.text}</p>
        </div>
      </section>`,
    )
    .join("");

  /* BUTTONS */
  const liveBtn = document.querySelector(
    ".project-mobile-links .project-btn-live",
  );
  const gitBtn = document.querySelector(
    ".project-mobile-links .project-btn-git",
  );

  if (project.live) {
    liveBtn.style.display = "inline-flex";
    liveBtn.href = project.live;
  } else {
    liveBtn.style.display = "none";
  }

  if (project.git) {
    gitBtn.style.display = "inline-flex";
    gitBtn.href = project.git;
  } else {
    gitBtn.style.display = "none";
  }
}

/* Extract readable tech name */
function extractTechName(src) {
  src = src.toLowerCase();
  if (src.includes("html")) return "HTML";
  if (src.includes("css")) return "CSS";
  if (src.includes("js")) return "JavaScript";
  if (src.includes("firebase")) return "Firebase";
  if (src.includes("angular")) return "Angular";
  if (src.includes("ts")) return "TypeScript";
  return "Tech";
}

/* Detect project title */
function detectProjectTitle(project) {
  if (project.img.includes("pollo")) return "El Pollo Loco";
  if (project.img.includes("join")) return "Join";
  return "Ongoing Project";
}

/* ------------------------------------------------ */
/* PROJECT DATA                                     */
/* ------------------------------------------------ */

function getProjects() {
  return {
    "el-pollo-loco": {
      title: "El Pollo Loco",
      sections: [
        {
          title: "About the Project",
          text: "A simple Jump-and-Run game based on an object-oriented approach. Help El Pollo Loco to find coins and poison bottles to fight against the killer whale.",
        },
        {
          title: "How I have organised my work process",
          text: "How do you keep your code clean and maintainable? Have you broken the project down into reusable modules? Focus on documentation, naming files, variables, classes and testing.",
        },
        {
          title: "What I have learned",
          text: "As someone who is always trying to learn new technologies, you may have enjoyed working on this project because it allowed you to delve deep into a particular technology.",
        },
      ],
      tech: [
        "./assets/img/icons/tech-icons/html-project icon.png",
        "./assets/img/icons/tech-icons/js-project-icon.png",
        "./assets/img/icons/tech-icons/css-project-icon.png",
      ],
      img: "./assets/img/project-img/el-pollo-loco-2 (1).png",
      live: "https://kadir-saliu.developerakademie.net/el_pollo_loco/index.html",
      git: "https://github.com/Kadir-Saliu",
    },

    join: {
      title: "Join",
      sections: [
        {
          title: "About the Project",
          text: "Duration: 2 months. Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.",
        },
        {
          title: "How I have organised my work process",
          text: "How do you keep your code clean and maintainable? Have you broken the project down into reusable modules or components? Focus on documentation, naming files, variables, classes and testing.",
        },
        {
          title: "My group work experience",
          text: "How many people were in the team and what was your role? Describe your tasks in 1–2 sentences. It is nice to mention a good teamwork and cooperation.",
        },
      ],
      tech: [
        "./assets/img/icons/tech-icons/html-project icon.png",
        "./assets/img/icons/tech-icons/js-project-icon.png",
        "./assets/img/icons/tech-icons/css-project-icon.png",
        "./assets/img/icons/tech-icons/firebase-project-icon.png",
      ],
      img: "./assets/img/project-img/join.png",
      live: "https://kadir-saliu.developerakademie.net/join/index.html",
      git: "https://github.com/Kadir-Saliu",
    },

    "ongoing-project": {
      title: "Ongoing Project",
      sections: [
        {
          title: "About the project",
          text: "What are you currently working on and what features are you implementing? What is the key to success in your projects? You can mention good planning, code quality and execution. Show a desire to learn new technologies and continually improve your skills.",
        },
      ],
      tech: [
        "./assets/img/icons/tech-icons/angular-project-icon.png",
        "./assets/img/icons/tech-icons/ts-project-icon.png",
        "./assets/img/icons/tech-icons/js-project-icon.png",
      ],
      img: "./assets/img/project-img/coming-soon.png",
    },
  };
}

/* ------------------------------------------------ */
/* CONTACT FORM VALIDATION                          */
/* ------------------------------------------------ */

function initContactValidation() {
  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const messageField = document.getElementById("message");
  const privacyCheckbox = document.getElementById("privacy");
  const submitBtn = document.querySelector(".contact-submit");

  const fields = [nameField, emailField, messageField];

  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
  });

  privacyCheckbox.addEventListener("change", validateForm);

  function validateField(field) {
    const error = field.parentElement.querySelector(".error-message");

    if (field.value.trim() === "") {
      field.classList.add("error");
      if (error) {
        error.textContent = `${field.labels[0].innerText} is required`;
        error.style.display = "block";
      }
      validateForm();
      return false;
    }

    if (field.id === "email") {
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
      if (!emailValid) {
        field.classList.add("error");
        if (error) {
          error.textContent = "Please enter a valid email";
          error.style.display = "block";
        }
        validateForm();
        return false;
      }
    }

    field.classList.remove("error");
    if (error) error.style.display = "none";

    validateForm();
    return true;
  }

  function validateForm() {
    const allValid =
      nameField.value.trim() !== "" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value) &&
      messageField.value.trim() !== "" &&
      privacyCheckbox.checked;

    submitBtn.disabled = !allValid;

    if (allValid) {
      submitBtn.style.color = "white";
      submitBtn.style.borderColor = "rgb(137, 188, 217)";
      submitBtn.style.cursor = "pointer";
    } else {
      submitBtn.style.color = "grey";
      submitBtn.style.borderColor = "grey";
      submitBtn.style.cursor = "not-allowed";
    }
  }
}

/* ------------------------------------------------ */
/* MOBILE MENU                                      */
/* ------------------------------------------------ */

const burgerMenu = document.getElementById("burgerMenu");
const mobileOverlay = document.querySelector(".mobile-menu-shape");

function initMobileMenu() {
  burgerMenu.addEventListener("click", () => {
    mobileOverlay.classList.toggle("d_none");

    setTimeout(() => {
      mobileOverlay.classList.toggle("open");
    }, 10);
  });

  mobileOverlay.addEventListener("click", (e) => {
    if (e.target === mobileOverlay) {
      mobileOverlay.classList.remove("open");

      setTimeout(() => {
        mobileOverlay.classList.add("d_none");
      }, 300);
    }
  });

  document.querySelectorAll(".mobile-menu-links a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileOverlay.classList.remove("open");

      setTimeout(() => {
        mobileOverlay.classList.add("d_none");
      }, 300);
    });
  });
}

/* ------------------------------------------------ */
/* NAV ACTIVE                                        */
/* ------------------------------------------------ */

function initNavActive() {
  const navigationLinks = document.querySelectorAll(".nav-link");

  navigationLinks.forEach((navigationLink) => {
    navigationLink.addEventListener("click", () => {
      navigationLinks.forEach((linkElement) => {
        linkElement.classList.remove("active");
      });
      navigationLink.classList.add("active");
    });
  });
}
