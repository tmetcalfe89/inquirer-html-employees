import inquirer from "inquirer";
import Intern from "../lib/intern.js";

const internQuestions = [
  {
    type: "input",
    name: "id",
    message: "What is the id of the intern?",
  },
  {
    type: "input",
    name: "name",
    message: "What is the name of the intern?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the email of the intern?",
  },
  {
    type: "input",
    name: "school",
    message: "What is the school of the intern?",
  },
];

export async function make() {
  const answers = await inquirer.prompt(internQuestions);
  return new Intern(answers.id, answers.name, answers.email, answers.school);
}

export function generateHTML(intern) {
  return `<div class="card">
    <div class="card-head">
      <div>${intern.getName()}</div>
      <div>${intern.getRole()}</div>
    </div>
    <div class="card-body">
      <div>ID: ${intern.getId()}</div>
      <div>Email: <a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a></div>
      <div>School: ${intern.getSchool()}</div>
    </div>
  </div>`;
}
