import inquirer from "inquirer";
import Manager from "../lib/manager.js";

const managerQuestions = [
  {
    type: "input",
    name: "id",
    message: "What is the id of the manager?",
  },
  {
    type: "input",
    name: "name",
    message: "What is the name of the manager?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the email of the manager?",
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is the office number of the manager?",
  },
];

export async function make() {
  const answers = await inquirer.prompt(managerQuestions);
  return new Manager(
    answers.id,
    answers.name,
    answers.email,
    answers.officeNumber
  );
}

export function generateHTML(manager) {
  return `<div class="card">
    <div class="card-head">
      <div>${manager.getName()}</div>
      <div>${manager.getRole()}</div>
    </div>
    <div class="card-body">
      <div>ID: ${manager.getId()}</div>
      <div>Email: <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a></div>
      <div>Office number: ${manager.getOfficeNumber()}</div>
    </div>
  </div>`;
}
