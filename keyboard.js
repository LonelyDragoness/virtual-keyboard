// TODO: add small alter-signs to keys.
// TODO: fix caps+alt changing dirt.
//prevent standard "TAB" function
document.onkeydown = function (item) {
    if(item.keyCode === 9){
        return false;
    }
};

// Preparation
const engLayout = [
    "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
    "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "DEL",
    "Caps Lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "ENTER",
    "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "🌐", "▲", "Shift ",
    "Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "◄", "▼", "►"
];

// Caps + shift dependencies
const logicFunction = () => {
    if (capsState === "on" && shiftState === "off" && rightShiftState === "off") {
        upperButtons();
        lowerSigns();
    } else if (capsState === "on" && shiftState === "on" && rightShiftState === "off") {
        lowerButtons();
        upperSigns();
    } else if (capsState === "off" && shiftState === "on" && rightShiftState === "off") {
        upperButtons();
        upperSigns();
    } else if (capsState === "off" && shiftState === "off" && rightShiftState === "off") {
        lowerButtons();
        lowerSigns();
    } else if (capsState === "on" && shiftState === "off" && rightShiftState === "on") {
        lowerButtons();
        upperSigns();
    } else if (capsState === "on" && shiftState === "on" && rightShiftState === "on") {
        lowerButtons();
        upperSigns();
    } else if (capsState === "off" && shiftState === "on" && rightShiftState === "on") {
        upperButtons();
        upperSigns();
    } else if (capsState === "off" && shiftState === "off" && rightShiftState === "on") {
        upperButtons();
        upperSigns();
    }
};

const upperButtons = () => {
    document.querySelector('[data="q"]').innerHTML = "Q";
    document.querySelector('[data="w"]').innerHTML = "W";
    document.querySelector('[data="e"]').innerHTML = "E";
    document.querySelector('[data="r"]').innerHTML = "R";
    document.querySelector('[data="t"]').innerHTML = "T";
    document.querySelector('[data="y"]').innerHTML = "Y";
    document.querySelector('[data="u"]').innerHTML = "U";
    document.querySelector('[data="i"]').innerHTML = "I";
    document.querySelector('[data="o"]').innerHTML = "O";
    document.querySelector('[data="p"]').innerHTML = "P";
    document.querySelector('[data="a"]').innerHTML = "A";
    document.querySelector('[data="s"]').innerHTML = "S";
    document.querySelector('[data="d"]').innerHTML = "D";
    document.querySelector('[data="f"]').innerHTML = "F";
    document.querySelector('[data="g"]').innerHTML = "G";
    document.querySelector('[data="h"]').innerHTML = "H";
    document.querySelector('[data="j"]').innerHTML = "J";
    document.querySelector('[data="k"]').innerHTML = "K";
    document.querySelector('[data="l"]').innerHTML = "L";
    document.querySelector('[data="z"]').innerHTML = "Z";
    document.querySelector('[data="x"]').innerHTML = "X";
    document.querySelector('[data="c"]').innerHTML = "C";
    document.querySelector('[data="v"]').innerHTML = "V";
    document.querySelector('[data="b"]').innerHTML = "B";
    document.querySelector('[data="n"]').innerHTML = "N";
    document.querySelector('[data="m"]').innerHTML = "M";
};

const upperSigns= () => {
    document.querySelector('[data="`"]').innerHTML = "~";
    document.querySelector('[data="1"]').innerHTML = "!";
    document.querySelector('[data="2"]').innerHTML = "@";
    document.querySelector('[data="3"]').innerHTML = "#";
    document.querySelector('[data="4"]').innerHTML = "$";
    document.querySelector('[data="5"]').innerHTML = "%";
    document.querySelector('[data="6"]').innerHTML = "^";
    document.querySelector('[data="7"]').innerHTML = "&";
    document.querySelector('[data="8"]').innerHTML = "*";
    document.querySelector('[data="9"]').innerHTML = "(";
    document.querySelector('[data="0"]').innerHTML = ")";
    document.querySelector('[data="-"]').innerHTML = "_";
    document.querySelector('[data="="]').innerHTML = "+";
    document.querySelector('#button27').innerHTML = "|";
    document.querySelector('#button52').innerHTML = "?";
    document.querySelector('#button50').innerHTML = "<";
    document.querySelector('#button51').innerHTML = ">";
    document.querySelector('#button39').innerHTML = ":";
    document.querySelector('#button40').innerHTML = "\"";
    document.querySelector('#button25').innerHTML = "{";
    document.querySelector('#button26').innerHTML = "}";
};

const lowerButtons = () => {
    document.querySelector('[data="q"]').innerHTML = "q";
    document.querySelector('[data="w"]').innerHTML = "w";
    document.querySelector('[data="e"]').innerHTML = "e";
    document.querySelector('[data="r"]').innerHTML = "r";
    document.querySelector('[data="t"]').innerHTML = "t";
    document.querySelector('[data="y"]').innerHTML = "y";
    document.querySelector('[data="u"]').innerHTML = "u";
    document.querySelector('[data="i"]').innerHTML = "i";
    document.querySelector('[data="o"]').innerHTML = "o";
    document.querySelector('[data="p"]').innerHTML = "p";
    document.querySelector('[data="a"]').innerHTML = "a";
    document.querySelector('[data="s"]').innerHTML = "s";
    document.querySelector('[data="d"]').innerHTML = "d";
    document.querySelector('[data="f"]').innerHTML = "f";
    document.querySelector('[data="g"]').innerHTML = "g";
    document.querySelector('[data="h"]').innerHTML = "h";
    document.querySelector('[data="j"]').innerHTML = "j";
    document.querySelector('[data="k"]').innerHTML = "k";
    document.querySelector('[data="l"]').innerHTML = "l";
    document.querySelector('[data="z"]').innerHTML = "z";
    document.querySelector('[data="x"]').innerHTML = "x";
    document.querySelector('[data="c"]').innerHTML = "c";
    document.querySelector('[data="v"]').innerHTML = "v";
    document.querySelector('[data="b"]').innerHTML = "b";
    document.querySelector('[data="n"]').innerHTML = "n";
    document.querySelector('[data="m"]').innerHTML = "m";
};

const lowerSigns= () => {
    document.querySelector('[data="`"]').innerHTML = "`";
    document.querySelector('[data="1"]').innerHTML = "1";
    document.querySelector('[data="2"]').innerHTML = "2";
    document.querySelector('[data="3"]').innerHTML = "3";
    document.querySelector('[data="4"]').innerHTML = "4";
    document.querySelector('[data="5"]').innerHTML = "5";
    document.querySelector('[data="6"]').innerHTML = "6";
    document.querySelector('[data="7"]').innerHTML = "7";
    document.querySelector('[data="8"]').innerHTML = "8";
    document.querySelector('[data="9"]').innerHTML = "9";
    document.querySelector('[data="0"]').innerHTML = "0";
    document.querySelector('[data="-"]').innerHTML = "-";
    document.querySelector('[data="="]').innerHTML = "=";
    document.querySelector('#button27').innerHTML = "\\";
    document.querySelector('#button52').innerHTML = "/";
    document.querySelector('#button50').innerHTML = ",";
    document.querySelector('#button51').innerHTML = ".";
    document.querySelector('#button39').innerHTML = ";";
    document.querySelector('#button40').innerHTML = "'";
    document.querySelector('#button25').innerHTML = "[";
    document.querySelector('#button26').innerHTML = "]";
};

// Generate buttons and their behavior
window.addEventListener("click", (event) => {
    let sub = event.target.textContent;
    if ([...sub].length === 1) {
        textField.textContent += `${event.target.innerText}`;
    }
});

let capsState = "off";
let shiftState = "off";
let rightShiftState = "off";
let counter = 0;
let currentLayout = engLayout;

const generateButtons = () => {
    currentLayout.forEach(el => {
        let button = document.createElement("div");
        button.classList.add("keyboard__button");
        button.setAttribute("data", `${el}`);

        switch (el) {
            case "Backspace":
                /*TODO: implement*/
                button.classList.add("keyboard__button--backspace");
                button.classList.add("font16");
                button.addEventListener("click", () => {
                    textField.innerText = textField.textContent.slice(0, -1);
                    });
                break;
            case " ":
                button.classList.add("keyboard__button--space");
                button.addEventListener("click", () => {
                    textField.textContent += ' ';
                });
                break;
            case "Caps Lock":
                button.classList.add("keyboard__button--caps");
                button.classList.add("font16");
                button.addEventListener("click", () => {

                    if (capsState === "off") {
                        capsState = "on";
                        button.classList.add("keyboard__button--pressed");
                    } else if (capsState === "on") {
                        capsState = "off";
                        button.classList.remove("keyboard__button--pressed");
                    }
                    logicFunction();
                });
                break;
            case "ENTER":
                button.classList.add("keyboard__button--enter");
                button.classList.add("font16");
                button.addEventListener("click", () => {
                    textField.textContent += '\n';
                });
                break;
            case "Tab":
                button.classList.add("keyboard__button--tab");
                button.classList.add("font16");
                button.addEventListener("click", () => {
                    textField.textContent += '  ';
                });
                break;
            case "DEL":
                /*TODO: implement*/
                button.classList.add("font16");
                break;
            case "Shift":
                button.classList.add("keyboard__button--shift");
                button.classList.add("font16");

                button.addEventListener("click", () => {
                    if (shiftState === "off") {
                        shiftState = "on";
                        button.classList.add("keyboard__button--pressed");
                    } else if (shiftState === "on") {
                        shiftState = "off";
                        button.classList.remove("keyboard__button--pressed");
                    }
                    logicFunction();
                });
                break;
            case "Shift ":
                button.classList.add("font16");

                button.addEventListener("click", () => {
                    if (rightShiftState === "off") {
                        rightShiftState = "on";
                        button.classList.add("keyboard__button--pressed");
                    } else if (rightShiftState === "on") {
                        rightShiftState = "off";
                        button.classList.remove("keyboard__button--pressed");
                    }
                    logicFunction();
                });
                break;
            case "🌐":
                if(currentLayout === engLayout) {
                    currentLayout = ruLayout;
                }
                break;
            case "Ctrl":
                button.classList.add("keyboard__button--ctrl");
                button.classList.add("font16");
                break;
            case "Alt":
                button.classList.add("keyboard__button--alt");
                button.classList.add("font16");
                break;
            case "Win":
                button.classList.add("font16");
                break;
        }

        button.innerText = el;
        document.querySelector(".keyboard__buttons").appendChild(button);
        button.setAttribute("id", `button${counter}`);
        counter++;
    })
};

// Create basic structure
let textField = document.createElement("textarea");

const createElements = () => {
    const screen = document.createElement("div");
    textField.autofocus = true;
    textField.setAttribute("onblur", "this.focus()");
    document.body.appendChild(screen);
    screen.appendChild(textField);
    textField.className = "textarea";
    screen.className = "screen";


    const mainDiv = document.createElement("div");
    const buttonsDiv = document.createElement("div");
    document.body.appendChild(mainDiv);
    mainDiv.className = "keyboard";
    mainDiv.appendChild(buttonsDiv);
    buttonsDiv.className = "keyboard__buttons";
    generateButtons();
};

window.addEventListener("DOMContentLoaded", createElements);

//layout

let layoutState = "eng";
document.onkeypress = (event) => {
    layoutState = "ru";
    if (event.key === "f") {
        document.querySelector('[data="`"]').innerHTML = "ё";
    }
};