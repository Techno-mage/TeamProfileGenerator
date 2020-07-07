const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

var flag = false;
var employeeList = [];
var employeePrompt = [
    { type: "input", message: "What is your Name?", name: "name" },
    { type: "input", message: "What is your Employee Id?", name: "id" },
    { type: "input", message: "What is your Email", name: "email" },
    { type: "list", message: "What is your role", choices: ["Engineer", "Intern", "Manager"], name: "role"}
]
function rolePrompt(role){
    var item;
    switch(role){
        case "Engineer":
            return "github";
        case "Intern":
            return "school";
        case "Manager":
            return "officeNumber";
    }
}

function creatEmployee(name, id, email, role, special){
    switch(role){
        case "Engineer":
            return new Engineer(name, id, email, special);
        case "Intern":
            return new Intern(name, id, email, special);
        case "Manager":
            return new Manager(name, id, email, special);
    }
}

function writeToFile(output){
    fs.access(OUTPUT_DIR, (err)=>{
        if (err){
            fs.mkdirSync(OUTPUT_DIR)
        }
    })
    

    fs.writeFile(outputPath, output, (err)=>{if(err) throw err})
}

async function init() {
    console.log("hi")
    try {
        do {
            var p1 = await inquirer.prompt(employeePrompt);
            console.log(p1);

            var p2 = await inquirer.prompt([
                {type: "input", message: "what it your "+ rolePrompt(p1.role), name: "special"}
            ])
            console.log(p2);
            const newEmployee = creatEmployee(p1.name, p1.id, p1.email, p1.role, p2.special);
            employeeList.push(newEmployee);
            console.log(employeeList);

            var p3 = await inquirer.prompt([{type:"confirm", Message:"do you have additional employees?", name:"flag"}])

        } while (p3.flag); //do you have additional employees?

        const outfile = render(employeeList)

        writeToFile(outfile)

    } catch (err) {
        console.log(err);
    }
}
init();





// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
