const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const managerQuestions = [{
    type: 'input',
    message: 'Name:',
    name: 'name'
},
{
    type: 'input',
    message: 'ID:',
    name: 'ID'
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
    name: 'ID'
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
    name: 'ID'
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

function promptManagerQuestions() {
    console.log('Hello. Please input the following details for the manager of the team.')
    inquirer.prompt(managerQuestions)
    .then((data) => createManager(data))
    .then(() => promptMenuQuestions());
}

function createManager(data) {
let manager = data;
console.log(manager);
}

function promptMenuQuestions() {
    inquirer.prompt(postManagerMenu)
    .then((data) => menuResponse(data))
}

function menuResponse(data) {
    let response = data.postManagerMenu;
    console.log(`You have chosen to ${response}`)
    if (response === 'Add an engineer') {
        promptEngineerQuestions()
    } else if (response === 'Add an intern') {
        promptInternQuestions()
    } else if (response === 'Finish building the team') {
        // unsure if this is the right function name below?
        generateTeam();
    }
}

function promptEngineerQuestions() {
    inquirer.prompt(engineerQuestions)
    .then((data) => createEngineer(data))
    .then(() => promptMenuQuestions());
}

// not sure if these create functions will only let you do one... 
function createEngineer(data) {
    let engineer = data;
    console.log(engineer);
}

function promptInternQuestions() {
    inquirer.prompt(internQuestions)
    .then((data) => createIntern(data))
    .then(() => promptMenuQuestions());
}

// not sure if these create functions will only let you do one... 
function createIntern(data) {
    let intern = data;
    console.log(intern);
}

promptManagerQuestions()