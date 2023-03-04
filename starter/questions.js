const inquirer = require("inquirer");
const Manager = require("./lib/Manager.js");

/*------------------------- INPUT VALIDATION -------------------- */
const isValidName = (name) => {
  const letters = /^[a-z\s]*$/gi;
  return name.trim().match(letters) ? true : "Invalid name!";
};

const isValidNum = (num) => {
  return num.trim().match(/[^0-9]/g) ? "Invalid input" : true;
};

// regex to validate email address found at https://www.w3schools.blog/email-validation-javascript-js
const isValidEmail = (email) => {
  const mailformat =
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  return email.match(mailformat) ? true : "Invalid email address!";
};

// reused function that I created in my other repo https://github.com/senseilein/readme-file-generator/blob/main/utils/functions.js
const isValidGithubUserName = (userName) => {
  // criteria to consider when validating userName (as per Github username requirements):
  // can only contain alphanumeric characters and dashes
  // Usernames must not exceed 39 characters

  // regex excludes nonAlphanumChar except dashes
  const authorizedChar = /^[a-zA-Z0-9-]*$/gi;

  const trimmedUserName = userName.trim();

  const validUserName =
    trimmedUserName.match(authorizedChar) &&
    trimmedUserName.length > 0 &&
    trimmedUserName.length <= 39;

  return validUserName ? true : "Invalid user name!";
};

/*------------------------- BUILD TEAM -------------------- */

const devTeam = [];

/*------------------------- MANAGER -------------------- */

function createNewManager(info) {
  const manager = new Manager(
    info.managerName,
    info.managerID,
    info.managerEmailAddress,
    info.managerOfficeNumber
  );
  return manager;
}

function getManagerInfo() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Manager's name:",
        name: "managerName",
        validate: isValidName,
      },
      {
        type: "input",
        message: "Manager's ID:",
        name: "managerID",
        validate: isValidNum,
      },
      {
        type: "input",
        message: "Manager's email address:",
        name: "managerEmailAddress",
        validate: isValidEmail,
      },
      {
        type: "input",
        message: "Manager's office number:",
        name: "managerOfficeNumber",
        validate: isValidNum,
      },
    ])
    .then((info) => {
      // console.log(response);
      const manager = createNewManager(info);
      devTeam.push(manager);
    });
}

// const questions = [
//   //
//   {
//     type: "list",
//     message: "Do you want to: ",
//     name: "menu",
//     choices: ["Add an engineer", "Add an intern", "Finish building the team"],
//   },
//   {
//     type: "input",
//     message: "Engineer's name:",
//     name: "managerName",
//     validate: isValidName,
//     when(answers) {
//       return answers.menu === "Add an engineer";
//     },
//   },
//   {
//     type: "input",
//     message: "Engineer's ID:",
//     name: "engineerID",
//     validate: isValidNum,
//     when(answers) {
//       return answers.menu === "Add an engineer";
//     },
//   },
//   {
//     type: "input",
//     message: "Engineer's email address:",
//     name: "engineerEmailAddress",
//     validate: isValidEmail,
//     when(answers) {
//       return answers.menu === "Add an engineer";
//     },
//   },
//   {
//     type: "input",
//     message: "Engineer's Github username:",
//     name: "engineerGithubUsername",
//     validate: isValidGithubUserName,
//     when(answers) {
//       return answers.menu === "Add an engineer";
//     },
//   },
//   {
//     type: "list",
//     message: "Do you want to: ",
//     name: "menu",
//     choices: ["Add an engineer", "Add an intern", "Finish building the team"],
//   },
// ];

module.exports = { getManagerInfo };
