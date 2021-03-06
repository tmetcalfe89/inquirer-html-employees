import fs from "fs";
import inquirer from "inquirer";
import * as engineer from "./src/engineer.js";
import * as intern from "./src/intern.js";
import * as manager from "./src/manager.js";

const nextEmployeeQuestions = [
  {
    type: "list",
    name: "type",
    message: "What type of employee would you like to add?",
    choices: ["Engineer", "Intern", "Finish"],
  },
];

const employees = [];

async function addManager() {
  const newManager = await manager.make();
  employees.push(newManager);
  addNextEmployee();
}

async function addNextEmployee() {
  const answers = await inquirer.prompt(nextEmployeeQuestions);
  let newEmployee;
  switch (answers.type) {
    case "Engineer":
      newEmployee = await engineer.make();
      break;
    case "Intern":
      newEmployee = await intern.make();
      break;
    default:
      generateHTML();
      return;
  }
  employees.push(newEmployee);
  addNextEmployee();
}

function generateHTML() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .title {
      background: salmon;
      height: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 1.5rem;
      font-family: sans-serif;
      margin-bottom: 2rem;
    }

    .card-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }

    .card {
      width: 20rem;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
    }

    .card-head {
      padding: 1rem;
      background: #1565c0;
      color: white;
      border-radius: 0.5rem 0.5rem 0 0;
    }

    .card-body {
      padding: 1rem;
      background: lightgrey;
      border-radius: 0 0 0.5rem 0.5rem;
      border-top: 3px groove lightgrey;
    }

    .card-body div {
      padding: 0.5rem;
      margin-bottom: 0.5rem;
      background: white;
      border: 3px inset lightgrey;
    }

    .card-body div:last-of-type {
      margin-bottom: 0;
    }
  </style>
</head>
<body>
  <div class="title">
    My Team
  </div>
  <div class="card-container">
  ${employees
    .map((employee) => {
      switch (employee.getRole()) {
        case "Engineer":
          return engineer.generateHTML(employee);
        case "Intern":
          return intern.generateHTML(employee);
        case "Manager":
          return manager.generateHTML(employee);
        default:
          return;
      }
    })
    .join("\r\n")}
  </div>
</body>
</html>`;
  fs.writeFileSync("./dist/index.html", html);
}

addManager();
