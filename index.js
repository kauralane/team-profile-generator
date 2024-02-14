const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

let manager;
let intern;
let engineer;

// empty array to push newly created team members to
const teamMembers = [];

// Inquirer questions
const managerQuestions = [{
    type: 'input',
    message: 'Name:',
    name: 'name'
},
{
    type: 'input',
    message: 'ID:',
    name: 'id'
},
{
    type: 'input',
    message: 'Email address:',
    name: 'email'
},
{
    type: 'input',
    message: 'Office Number:',
    name: 'office'
}
]

const postManagerMenu = [{
    type: 'list',
    message: 'What would you like to do now?',
    name: 'postManagerMenu',
    choices: ['Add an engineer', 'Add an intern', 'Finish building the team']
}]

const engineerQuestions = [{
    type: 'input',
    message: 'Name:',
    name: 'name'
},
{
    type: 'input',
    message: 'ID:',
    name: 'id'
},
{
    type: 'input',
    message: 'Email:',
    name: 'email'
},
{
    type: 'input',
    message: 'GitHub username:',
    name: 'github'
}
]

const internQuestions = [{
    type: 'input',
    message: 'Name:',
    name: 'name'
},
{
    type: 'input',
    message: 'ID:',
    name: 'id'
},
{
    type: 'input',
    message: 'Email:',
    name: 'email'
},
{
    type: 'input',
    message: 'School:',
    name: 'school'
}
]

// First prompt the manager questions
function promptManagerQuestions() {
    console.log('Hello. Please input the following details for the manager of the team.')
    inquirer.prompt(managerQuestions)
        .then((data) => createManager(data))
        .then(() => promptMenuQuestions());
}

// function to create the manager and push to the team array
function createManager(data) {
    const manager = new Manager(data.name, data.id, data.email, data.office);
    teamMembers.push(manager)
}

// prompt the 'next step' menu questions after each new team member is created
function promptMenuQuestions() {
    inquirer.prompt(postManagerMenu)
        .then((data) => menuResponse(data))
}

// depending on the user's response to the menu options, run the relevant function
function menuResponse(data) {
    let response = data.postManagerMenu;
    console.log(`You have chosen to ${response}`)
    if (response === 'Add an engineer') {
        promptEngineerQuestions()
    } else if (response === 'Add an intern') {
        promptInternQuestions()
    } else if (response === 'Finish building the team') {
        generateHTML()
    }
}

function promptEngineerQuestions() {
    inquirer.prompt(engineerQuestions)
        .then((data) => createEngineer(data))
        .then(() => promptMenuQuestions());
}

function createEngineer(data) {
    const engineer = new Engineer(data.name, data.id, data.email, data.github)
    teamMembers.push(engineer)
}

function promptInternQuestions() {
    inquirer.prompt(internQuestions)
        .then((data) => createIntern(data))
        .then(() => promptMenuQuestions());
}

function createIntern(data) {
    const intern = new Intern(data.name, data.id, data.email, data.school)
    teamMembers.push(intern)
}


// renders the team members array and writes the HTML code to the file in the output folder
function generateHTML() {
    let team = render(teamMembers);

if (outputPath)

    fs.writeFile(outputPath, team, (err) => err ? console.error(err) : console.log('Team created!'))
}

// starts the code running
promptManagerQuestions()

