// =========================
// PROJECT KEY MAP
// =========================
const projectKeyMap = {
  "el-pollo-loco": {
    about: "polloAbout",
    aboutText: "polloAboutText",
    process: "polloProcess",
    processText: "polloProcessText",
    learned: "polloLearned",
    learnedText: "polloLearnedText",
  },
  join: {
    about: "joinAbout",
    aboutText: "joinAboutText",
    process: "joinProcess",
    processText: "joinProcessText",
    learned: "joinLearned",
    learnedText: "joinLearnedText",
  },
  "ongoing-project": {
    about: "ongoingAbout",
    aboutText: "ongoingAboutText",

    // ⭐ Diese beiden sollen NICHT angezeigt werden
    process: "empty",
    processText: "empty",
    learned: "empty",
    learnedText: "empty",
  },
};

// =========================
// PROJECT DATA
// =========================
function getProjects() {
  return {
    "el-pollo-loco": {
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
      tech: [
        "./assets/img/icons/tech-icons/angular-project-icon.png",
        "./assets/img/icons/tech-icons/ts-project-icon.png",
        "./assets/img/icons/tech-icons/js-project-icon.png",
      ],
      img: "./assets/img/project-img/coming-soon.png",
    },
  };
}

// =========================
// RENDER PROJECT
// =========================
function renderProject(projectKey) {
  const projects = getProjects();
  const project = projects[projectKey];
  const keys = projectKeyMap[projectKey];

  // ⭐ Statische Selektoren – funktionieren IMMER
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
  const liveBtn = document.querySelector(".project-btn-live");
  const gitBtn = document.querySelector(".project-btn-git");

  toggleButton(liveBtn, project.live);
  toggleButton(gitBtn, project.git);

  // Übersetzen
  applyTranslations(loadLanguage());
}

// =========================
// BUTTON HELPER
// =========================
function toggleButton(button, url) {
  if (url) {
    button.style.display = "inline-flex";
    button.href = url;
  } else {
    button.style.display = "none";
  }
}

// =========================
// INIT
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const projectButtons = document.querySelectorAll(".projects-selector-btn");

  projectButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      projectButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const project = btn.getAttribute("data-project");
      renderProject(project);
    });
  });

  // initial: El Pollo Loco
  renderProject("el-pollo-loco");
});
