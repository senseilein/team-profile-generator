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

const questions = [
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
];

module.exports = questions;
