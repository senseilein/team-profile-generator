const inquirer = require("inquirer");
const fs = require("fs");

const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");

const path = require("path");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// Code to gather information about the development team members, and render the HTML file.

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

/*------------------------- INPUT FORMAT -------------------- */

// reused function that I created in my other repo https://github.com/senseilein/readme-file-generator/blob/main/utils/generateMarkdown.js
const capitalize = (str) => {
  let arrayOfwords = str.split(" ");
  let capitalizedStr = arrayOfwords.map((word) => {
    const firstLetter = word[0].toUpperCase();
    const restOfWord = word.substring(1).toLowerCase();
    return firstLetter + restOfWord;
  });
  return capitalizedStr.join(" ");
};
/*------------------------- BUILD TEAM -------------------- */

const devTeam = [];

function updateDevTeam(employee) {
  devTeam.push(employee);
}

/*------------------------- INIT & SHOW MENU -------------------- */

function init() {
  getManagerInfo();
}

function showMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Menu:\n  Please select one of the following options ",
        name: "menu",
        choices: [
          "Add an engineer",
          "Add an intern",
          "Finish building the team",
        ],
      },
    ])
    .then((response) => {
      switch (response.menu) {
        case "Add an engineer":
          getEngineerInfo();
          break;
        case "Add an intern":
          getInternInfo();
          break;
        default:
          writeToHtmlFile(OUTPUT_DIR, outputPath, render(devTeam));
          break;
      }
    });
}

/*------------------------- CREATE EMPLOYEES (manager, engineer or intern) -------------------- */

function createNewManager(info) {
  const manager = new Manager(
    capitalize(info.managerName),
    info.managerID,
    info.managerEmailAddress,
    info.managerOfficeNumber
  );
  return manager;
}

function createNewEngineer(info) {
  const engineer = new Engineer(
    capitalize(info.engineerName),
    info.engineerID,
    info.engineerEmailAddress,
    info.engineerGithubUserName
  );

  return engineer;
}

function createNewIntern(info) {
  const intern = new Intern(
    capitalize(info.internName),
    info.internID,
    info.internEmailAddress,
    info.internSchool
  );
  return intern;
}

/*------------------------- GET EMPLOYEES'DETAILS (manager, engineer or intern) -------------------- */

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
      const manager = createNewManager(info);
      updateDevTeam(manager);
      showMenu();
    });
}

function getEngineerInfo() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Engineer's name:",
        name: "engineerName",
        validate: isValidName,
      },
      {
        type: "input",
        message: "Engineer's ID:",
        name: "engineerID",
        validate: isValidNum,
      },
      {
        type: "input",
        message: "Engineer's email address:",
        name: "engineerEmailAddress",
        validate: isValidEmail,
      },
      {
        type: "input",
        message: "Engineer's Github username:",
        name: "engineerGithubUserName",
        validate: isValidGithubUserName,
      },
    ])
    .then((info) => {
      const engineer = createNewEngineer(info);
      updateDevTeam(engineer);
      showMenu();
    });
}

function getInternInfo() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Intern's name:",
        name: "internName",
        validate: isValidName,
      },
      {
        type: "input",
        message: "Intern's ID:",
        name: "internID",
        validate: isValidNum,
      },
      {
        type: "input",
        message: "Intern's email address:",
        name: "internEmailAddress",
        validate: isValidEmail,
      },
      {
        type: "input",
        message: "Intern's school:",
        name: "internSchool",
      },
    ])
    .then((info) => {
      const intern = createNewIntern(info);
      updateDevTeam(intern);
      showMenu();
    });
}
/*------------------------- FUNCTION TO WRITE TO FILE -------------------- */

//coderrocketfuel.com/article/check-if-a-directory-exists-in-node-js
//https://www.geeksforgeeks.org/node-js-fs-mkdir-method/
//https://stackoverflow.com/questions/35048686/whats-the-difference-between-path-resolve-and-path-join
function writeToHtmlFile(dirPath, filePath, data) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdir(dirPath, (error) => {
      if (error) {
        console.info("Sorry, an error occurred. Please try again later.");
      }
    });
  }

  fs.writeFile(filePath, data, (error) => {
    error
      ? console.info("Sorry, an error occurred. Please try again later.")
      : console.info(`The requested page has been successfully generated!`);
  });
}

init();
