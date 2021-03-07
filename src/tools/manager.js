const fs = require("fs");
const path = require("path");
const mustache = require("mustache");
const inquirer = require("inquirer");

const askQuestions = () => {
  const questions = [
    {
      name: "MANAGER",
      type: "input",
      message: "Whats the name of the manager?",
    },
  ];
  return inquirer.prompt(questions);
};

const changeFavicon = (manager) => {
  const FAVICON_PATH = path.resolve(__dirname, "../../public/favicon.ico");
  const FAVICON_FROM_PATH = path.resolve(__dirname, `../../favicon/${manager}.ico`);
  fs.access(FAVICON_PATH, fs.constants.F_OK, (err) => {
    if (!err) {
      fs.unlinkSync(FAVICON_PATH);
    }
    copyFile(FAVICON_FROM_PATH, FAVICON_PATH);
  });
};

const copyFile = (src, dist) => {
  fs.writeFileSync(dist, fs.readFileSync(src));
};

const run = async () => {
  const answers = await askQuestions();
  const { MANAGER } = answers;
  const TEMPLATE_PATH = path.resolve(__dirname, "../../.env.mustache");
  const PRODUCTION_PATH = path.resolve(__dirname, "../../.env.production");

  const template = fs.readFileSync(TEMPLATE_PATH, "utf8");
  const indexContent = mustache.render(template, {
    manager: MANAGER,
  });

  fs.writeFileSync(PRODUCTION_PATH, indexContent);
  changeFavicon(MANAGER);
};

run();
