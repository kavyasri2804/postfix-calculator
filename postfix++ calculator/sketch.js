// S Kavyasri

//import readline module
const readline = require("readline");

//function that evaluates postfix++ expression
function evalPostfix(arr, symbolTable) {
    let stack = [];

    //loop through each token in input array
    for (let token of arr) {
        if (!isNaN(token)) {
            //if token is number, push to stack
            stack.push(Number(token));
        } else if (["+", "-", "*", "/"].includes(token)) {
            //if token is an operator, pop two values and apply operation
            let val1 = stack.pop();
            let val2 = stack.pop();
            stack.push(
                token === "+"
                    ? val2 + val1
                    : token === "-"
                    ? val2 - val1
                    : token === "*"
                    ? val2 * val1
                    : Math.trunc(val2 / val1)
            );
        } else if (token === "=") {
            //if token is =
            let value = stack.pop();
            let variableName = stack.pop();
            if (typeof variableName === "string" && /^[A-Z]$/.test(variableName)) {
                symbolTable[variableName] = value;
            } else {
                console.log("Invalid variable assignment.");
            }
        } else if (/^[A-Z]$/.test(token)) {
            //if token is variable name A-Z
            if (token in symbolTable) {
                stack.push(symbolTable[token]);
            } else {
                //if not defined yet
                stack.push(token);
            }
        } else {
            console.log(`Unknown token: ${token}`);
        }
    }

    //if stack is not empty print top value as result
    if (stack.length > 0) {
        console.log(stack[stack.length - 1]);
    }
}

//readline interface for terminal interaction
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
});

//symbol table to store variable assignments
let symbolTable = {};

console.log("Postfix++ Calculator (type expressions like A 3 = or A B *)");
rl.prompt();

//event listener user input
rl.on("line", (line) => {
    const tokens = line.trim().split(/\s+/);
    if (tokens[0].toLowerCase() === "exit") {
        rl.close();
    } else {
        evalPostfix(tokens, symbolTable);
        rl.prompt();
    }
}).on("close", () => {
    console.log("Session ended.");
    process.exit(0);
});