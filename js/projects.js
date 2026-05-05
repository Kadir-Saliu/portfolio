/**
 * Returns all project data used for rendering desktop and mobile project views.
 * Each project contains a title, descriptive sections, technology icons,
 * preview image, and optional live and GitHub links.
 *
 * @returns {Object} An object containing all project entries indexed by project keys.
 */
function getProjects() {
  return {
    "el-pollo-loco": {
      title: "El Pollo Loco",
      sections: [
        {
          titleKey: "polloAbout",
          textKey: "polloAboutText",
          title: "About the Project",
          text: "A simple Jump-and-Run game based on an object-oriented approach. Help El Pollo Loco to find coins and poison bottles to fight against the killer whale.",
        },
        {
          titleKey: "polloProcess",
          textKey: "polloProcessText",
          title: "How I have organised my work process",
          text: "How do you keep your code clean and maintainable? Have you broken the project down into reusable modules? Focus on documentation, naming files, variables, classes and testing.",
        },
        {
          titleKey: "polloLearned",
          textKey: "polloLearnedText",
          title: "What I have learned",
          text: "As someone who is always trying to learn new technologies, you may have enjoyed working on this project because it allowed you to delve deep into a particular technology.",
        },
      ],
      tech: [
        "./assets/img/icons/project-html.svg",
        "./assets/img/icons/project-javascript.svg",
        "./assets/img/icons/project-css.svg",
      ],
      img: "./assets/img/project-img/el-pollo-loco-2 (1).png",
      live: "https://el-pollo-loco.kadir-saliu.de",
      git: "https://github.com/Kadir-Saliu/el_pollo_loco",
    },

    join: {
      title: "Join",
      sections: [
        {
          titleKey: "joinAbout",
          textKey: "joinAboutText",
          title: "About the Project",
          text: "Duration: 2 months. Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.",
        },
        {
          titleKey: "joinProcess",
          textKey: "joinProcessText",
          title: "How I have organised my work process",
          text: "How do you keep your code clean and maintainable? Have you broken the project down into reusable modules or components? Focus on documentation, naming files, variables, classes and testing.",
        },
        {
          titleKey: "joinLearned",
          textKey: "joinLearnedText",
          title: "My group work experience",
          text: "How many people were in the team and what was your role? Describe your tasks in 1–2 sentences. It is nice to mention a good teamwork and cooperation.",
        },
      ],
      tech: [
        "./assets/img/icons/project-html.svg",
        "./assets/img/icons/project-javascript.svg",
        "./assets/img/icons/project-css.svg",
        "./assets/img/icons/project-firebase.svg",
      ],
      img: "./assets/img/project-img/join.png",
      live: "https://join.kadir-saliu.de",
      git: "https://github.com/Kadir-Saliu/join",
    },

    "ongoing-project": {
      title: "Ongoing Project",
      sections: [
        {
          titleKey: "ongoingAbout",
          textKey: "ongoingAboutText",
          title: "About the project",
          text: "What are you currently working on and what features are you implementing? What is the key to success in your projects? You can mention good planning, code quality and execution. Show a desire to learn new technologies and continually improve your skills.",
        },
      ],
      tech: [
        "./assets/img/icons/project-angular.svg",
        "./assets/img/icons/project-typescript.svg",
        "./assets/img/icons/project-javascript.svg",
      ],
      img: "./assets/img/project-img/coming-soon.png",
    },
  };
}
