import inquirer from "inquirer";
import Engineer from "../lib/engineer.js";

const engineerQuestions = [
  {
    type: "input",
    name: "id",
    message: "What is the id of the engineer?",
  },
  {
    type: "input",
    name: "name",
    message: "What is the name of the engineer?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the email of the engineer?",
  },
  {
    type: "input",
    name: "github",
    message: "What is the github of the engineer?",
  },
];

export async function make() {
  const answers = await inquirer.prompt(engineerQuestions);
  return new Engineer(answers.id, answers.name, answers.email, answers.github);
}

export function generateHTML(engineer) {
  return `<div class="card">
    <div class="card-head">
      <div>${engineer.getName()}</div>
      <div>${engineer.getRole()}</div>
    </div>
    <div class="card-body">
      <div>ID: ${engineer.getId()}</div>
      <div>Email: <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></div>
      <div>Github: ${engineer.getGithub()}</div>
    </div>
  </div>`;
}
