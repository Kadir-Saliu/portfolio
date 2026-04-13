document.addEventListener("DOMContentLoaded", initProjects);

/**
 * Initializes project logic and event listeners.
 */
function initProjects() {
  const buttons = document.querySelectorAll(".projects-selector-btn");
  const elements = getDomElements();
  const projects = getProjects();

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.project;
      const project = projects[key];
      updateActiveButton(buttons, btn);
      renderProjectContent(elements, project);
    });
  });
}

/**
 * Returns all required DOM elements.
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
 * Updates the active button state.
 */
function updateActiveButton(buttons, activeBtn) {
  buttons.forEach((b) => b.classList.remove("active"));
  activeBtn.classList.add("active");
}

/**
 * Renders all project content into the DOM.
 */
function renderProjectContent(elements, project) {
  elements.projectContent.innerHTML = renderSections(project.sections);
  elements.techIcons.innerHTML = renderTechIcons(project.tech);
  elements.previewImg.src = project.img;
  updateButtons(elements, project);
}

/**
 * Builds the HTML for all project sections.
 */
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

/**
 * Builds the HTML for technology icons.
 */
function renderTechIcons(icons) {
  return icons.map((src) => `<img class="tech-icon" src="${src}" />`).join("");
}

/**
 * Shows or hides buttons and updates links.
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
 * Returns all project data.
 */
function getProjects() {
  return {
    "el-pollo-loco": {
      sections: [
        {
          title: "About the Project",
          text: "A simple Jump-and-Run game based on an object-oriented approach. Help El Pollo Loco to find coins and poison bottles to fight against the killer whale.",
        },
        {
          title: "How I have organised my work process",
          text: " How do you keep your code clean and maintainable? Have you broken the project down into reusable modules? Focus on documentation, naming files, variables, classes and testing.",
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

fetch("./contact_form_mail.php", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Test",
    email: "test@example.com",
    message: "Hallo",
  }),
})
  .then(async (r) => ({ status: r.status, body: await r.text() }))
  .then(console.log)
  .catch(console.error);

const links = document.querySelectorAll(".nav-link");

links.forEach((link) => {
  link.addEventListener("click", () => {
    links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});
