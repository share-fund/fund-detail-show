const fs = require("fs");
const path = require("path");
const mustache = require("mustache");
const inquirer = require("inquirer");

const TEMPLATE_PATH = path.resolve(__dirname, "../../.env.mustache");
const PRODUCTION_PATH = path.resolve(__dirname, "../../.env.production");

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

const run = async () => {
  const answers = await askQuestions();
  const { MANAGER } = answers;
  const template = fs.readFileSync(TEMPLATE_PATH, "utf8");
  const indexContent = mustache.render(template, {
    manager: MANAGER,
  });

  fs.writeFileSync(PRODUCTION_PATH, indexContent);
};

run();
