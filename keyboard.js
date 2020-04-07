const engLayout = [
    "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
    "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "DEL",
    "Caps Lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "ENTER",
    "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "❌", "▲", "Shift ",
    "Ctrl", "Win", "Alt", " ", "Alt ", "Ctrl ", "◄", "▼", "►"
];

const ruLayout = [
    "ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
    "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", "DEL",
    "Caps Lock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "ENTER",
    "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "❌", "▲", "Shift ",
    "Ctrl", "Win", "Alt", " ", "Alt ", "Ctrl ", "◄", "▼", "►"
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

// Caret behavior
const moveCaretSpecific = (posit) => {
    let text = document.querySelector("textarea");
    text.setSelectionRange(posit, posit);
};

const caretMoveStop = () => {
    let savedPos = document.querySelector("textarea").selectionStart;
    if (savedPos !== textField.textContent.length) {
        moveCaretSpecific(savedPos -1);
    }
};

// Generate buttons and their behavior
window.addEventListener("click", (event) => {
    let sub = event.target.textContent;
    if ([...sub].length === 1 && sub !== "❌") {
        addText(`${event.target.innerText}`);
    }
});

// Main input function
const addText = (value, jump = 1) => {
    let start = document.querySelector("textarea").selectionStart;
    let result;
    let subString1 = [...textField.textContent];
    let subString2 = [...textField.textContent];
    subString1.splice(start, textField.textContent.length);
    subString2.splice(0, start);
    result  = subString1.join("") + value + subString2.join("");
    textField.textContent = result;
    moveCaretSpecific(start + jump);
};

// DEL button
const del = (mod = 0) => {
    let start = document.querySelector("textarea").selectionStart + mod;
    let end = document.querySelector("textarea").selectionEnd;
    if (start !== [...textField.textContent].length) {
        let subString = [...textField.textContent];
        if (start === end) {
            subString.splice(start, end - start + 1);
        } else {
            subString.splice(start, end - start);
        }
        subString = subString.join("");
        textField.textContent = subString;
        moveCaretSpecific(start);
    }
};

// Backspace button
const backspace = (mod = 0) => {
    let start = document.querySelector("textarea").selectionStart - mod;
    let end = document.querySelector("textarea").selectionEnd;
    if(start !== 0) {
        let subString = [...textField.textContent];
        if (start === end) {
            subString.splice(start - 1, end - start + 1);
        } else {
            subString.splice(start, end - start + mod);
        }
        subString = subString.join("");
        textField.textContent = subString;
        moveCaretSpecific(start - 1);
    }
};

// Layout swap function
const layoutSwap = () => {
    if (currentLayout === engLayout) {
        currentLayout = ruLayout;
        document.querySelector("body").innerHTML = "<script src=\"./keyboard.js\"></script>";
    } else {
        currentLayout = engLayout;
        document.querySelector("body").innerHTML = "<script src=\"./keyboard.js\"></script>";
    }
};

// Virtual keyboard buttons and actions
let capsState = "off";
let shiftState = "off";
let rightShiftState = "off";
let counter = 0;
let currentLayout = engLayout;

const generateButtons = () => {
    counter = 0;
    currentLayout.forEach(el => {
        let button = document.createElement("div");
        button.classList.add("keyboard__button");
        button.setAttribute("data", `${el}`);

        switch (el) {
            case "Backspace":
                button.classList.add("keyboard__button--backspace");
                button.classList.add("font16");
                button.addEventListener("click", () => {
                    backspace();
                });
                break;
            case "DEL":
                button.classList.add("font16");
                button.addEventListener("click", () => {
                    del();
                });
                break;
            case " ":
                button.classList.add("keyboard__button--space");
                button.addEventListener("click", () => {
                    addText(" ");
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
                    addText("\n");
                });
                break;
            case "Tab":
                button.classList.add("keyboard__button--tab");
                button.classList.add("font16");
                button.addEventListener("click", () => {
                    addText("  ", 2);
                });
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
            case "❌":
                button.addEventListener("click", () => {
                    textField.textContent = "";
                });
                break;
            case "Ctrl":
                button.classList.add("keyboard__button--ctrl");
                button.classList.add("font16");
                break;
            case "Ctrl ":
                button.classList.add("keyboard__button--ctrl");
                button.classList.add("font16");
                break;
            case "Alt":
                button.classList.add("keyboard__button--alt");
                button.classList.add("font16");
                break;
            case "Alt ":
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

    const commentary = document.createElement("div");
    commentary.className = "commentary";
    commentary.innerText = "Комбинация клавиш для смены раскладки: Shift + Alt.\n" +
        "Кнопка ❌ очищает поле\n\n" +
        "Операционная система: Windows 10.";
    document.body.appendChild(commentary);

    generateButtons();
};

// Create page when DOM is loaded
window.addEventListener("DOMContentLoaded", createElements);

// Highlighting and physical keyboard behavior
let layoutShift = 0;
let layoutCtrl = 0;
document.onkeydown = (event) => {
    if (event.key === "ArrowUp") {
        event.preventDefault();
        document.querySelector(`[data="▲"]`).classList.add("activeKey");
        addText("▲", 0);
    }
    if (event.key === "ArrowDown") {
        event.preventDefault();
        document.querySelector(`[data="▼"]`).classList.add("activeKey");
        addText("▼", 0);
    }
    if (event.key === "ArrowLeft") {
        event.preventDefault();
        document.querySelector(`[data="◄"]`).classList.add("activeKey");
        addText("◄", 0);
    }
    if (event.key === "ArrowRight") {
        event.preventDefault();
        document.querySelector(`[data="►"]`).classList.add("activeKey");
        addText("►", 0);
    }
    if (event.code === "Backslash") {
        document.querySelector(`#button27`).classList.add("activeKey");
    }
    if (event.key.length === 1) {
        event.preventDefault();
        addText(`${event.key}`, 0);
    }
    addText(`${event.target.innerText}`);
    switch (event.key) {
        case "Shift":
            layoutShift = 1;
            shiftState = "on";
            logicFunction();
            if (event.code === "ShiftLeft") {
                document.querySelector(`[data="Shift"]`).classList.add("activeKey");
                document.querySelector(`[data="Shift"]`).classList.remove("keyboard__button--pressed");
            } else {
                document.querySelector(`[data="Shift "]`).classList.add("activeKey");
                document.querySelector(`[data="Shift "]`).classList.remove("keyboard__button--pressed");
            }
            caretMoveStop();
            break;
        case "Alt":
            layoutCtrl = 1;
            if (event.code === "AltLeft") {
                document.querySelector(`[data="Alt"]`).classList.add("activeKey");
            } else {
                document.querySelector(`[data="Alt "]`).classList.add("activeKey");
            }
            caretMoveStop();
            break;
        case "CapsLock":
            if (capsState === "off") {
                capsState = "on";
                logicFunction();
                document.querySelector(`[data="Caps Lock"]`).classList.add("keyboard__button--pressed");
            } else {
                capsState = "off";
                logicFunction();
                document.querySelector(`[data="Caps Lock"]`).classList.remove("keyboard__button--pressed");
            }
            caretMoveStop();
            break;
        case "Control":
            if (event.code === "ControlLeft") {
                document.querySelector(`[data="Ctrl"]`).classList.add("activeKey");
            } else {
                document.querySelector(`[data="Ctrl "]`).classList.add("activeKey");
            }
            caretMoveStop();
            break;
        case "Delete":
            document.querySelector(`[data="DEL"]`).classList.add("activeKey");
            event.preventDefault();
            del(-1);
            break;
        case "Enter":
            document.querySelector(`[data="ENTER"]`).classList.add("activeKey");
            event.preventDefault();
            addText("\n");
            break;
        case "Meta":
            document.querySelector(`[data="Win"]`).classList.add("activeKey");
            event.preventDefault();
            break;
        case "Tab":
            event.preventDefault();
            addText("  ", 2);
            break;
        case "Space":
            event.preventDefault();
            addText(" ");
            break;
        case "Backspace":
            event.preventDefault();
            if (document.querySelector("textarea").selectionStart === textField.textContent.length) {
                backspace()
            } else if (document.querySelector("textarea").selectionStart === 1) {
                moveCaretSpecific(0);
            } else {
                backspace(1);
            }
            break;
    }
    if (event.key === "Alt") {
        event.preventDefault();
    }

    if (event.key !== "CapsLock" && event.key !== "Control" && event.code !== "AltRight" && event.code !== "ShiftRight"
        && event.code !== "Delete" && event.code !== "Enter" && event.code !== "MetaLeft" && event.code !== "ArrowUp"
        && event.code !== "ArrowDown" && event.code !== "ArrowLeft" && event.code !== "ArrowRight"
        && event.code !== "Backslash") {
        if (document.querySelector(`[data="${event.key}"]`)) {
            document.querySelector(`[data="${event.key}"]`).classList.add("activeKey");
        }
    }
    // Shift + alt layout change
    if (layoutCtrl === 1  && layoutShift === 1) {
        let savedPos = document.querySelector("textarea").selectionStart;
        layoutShift = 0;
        layoutCtrl = 0;
        layoutSwap();
        createElements();
        moveCaretSpecific(savedPos);
    }
};

document.onkeyup = (event) => {
    document.querySelectorAll(".keyboard__button").forEach((el) => {
        el.classList.remove("activeKey");
        if (event.key === "Shift") {
            layoutShift = 0;
            shiftState = "off";
            rightShiftState = "off";
            logicFunction();
            document.querySelector(`[data="Shift"]`).classList.remove("keyboard__button--pressed");
            document.querySelector(`[data="Shift "]`).classList.remove("keyboard__button--pressed");
        }
        if (event.key === "Alt") {
            layoutCtrl = 0;
        }
    });
};

// Save layout on page reloading.
const saveLayout = () => {
    if (currentLayout === engLayout) {
        localStorage.setItem('layout', `English`);
    } else {
        localStorage.setItem('layout', `Russian`);
    }
};

if (localStorage.getItem('layout') === "Russian") {
    currentLayout = ruLayout;
} else if (localStorage.getItem('layout') === "English") {
    currentLayout = engLayout;
}
console.info( "Virtual keyboard opened. Layout set to: " + localStorage.getItem('layout') + ".");
window.onbeforeunload = saveLayout;

// Layout switch/caps functions
const upperButtons = () => {
    if (currentLayout === engLayout) {
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
    } else {
        document.querySelector('[data="й"]').innerHTML = "Й";
        document.querySelector('[data="ц"]').innerHTML = "Ц";
        document.querySelector('[data="у"]').innerHTML = "У";
        document.querySelector('[data="к"]').innerHTML = "К";
        document.querySelector('[data="е"]').innerHTML = "Е";
        document.querySelector('[data="н"]').innerHTML = "Н";
        document.querySelector('[data="г"]').innerHTML = "Г";
        document.querySelector('[data="ш"]').innerHTML = "Ш";
        document.querySelector('[data="щ"]').innerHTML = "Щ";
        document.querySelector('[data="з"]').innerHTML = "З";
        document.querySelector('[data="х"]').innerHTML = "Х";
        document.querySelector('[data="ъ"]').innerHTML = "Ъ";
        document.querySelector('[data="ф"]').innerHTML = "Ф";
        document.querySelector('[data="ы"]').innerHTML = "Ы";
        document.querySelector('[data="в"]').innerHTML = "В";
        document.querySelector('[data="а"]').innerHTML = "А";
        document.querySelector('[data="п"]').innerHTML = "П";
        document.querySelector('[data="р"]').innerHTML = "Р";
        document.querySelector('[data="о"]').innerHTML = "О";
        document.querySelector('[data="л"]').innerHTML = "Л";
        document.querySelector('[data="д"]').innerHTML = "Д";
        document.querySelector('[data="ж"]').innerHTML = "Ж";
        document.querySelector('[data="э"]').innerHTML = "Э";
        document.querySelector('[data="я"]').innerHTML = "Я";
        document.querySelector('[data="ч"]').innerHTML = "Ч";
        document.querySelector('[data="с"]').innerHTML = "С";
        document.querySelector('[data="м"]').innerHTML = "М";
        document.querySelector('[data="и"]').innerHTML = "И";
        document.querySelector('[data="т"]').innerHTML = "Т";
        document.querySelector('[data="ь"]').innerHTML = "Ь";
        document.querySelector('[data="б"]').innerHTML = "Б";
        document.querySelector('[data="ю"]').innerHTML = "Ю";
        document.querySelector('[data="ё"]').innerHTML = "Ё";
    }
};

const upperSigns= () => {
    document.querySelector('[data="1"]').innerHTML = "!";
    document.querySelector('[data="8"]').innerHTML = "*";
    document.querySelector('[data="9"]').innerHTML = "(";
    document.querySelector('[data="0"]').innerHTML = ")";
    document.querySelector('[data="-"]').innerHTML = "_";
    document.querySelector('[data="="]').innerHTML = "+";
    if (currentLayout === engLayout) {
        document.querySelector('[data="`"]').innerHTML = "~";
        document.querySelector('[data="2"]').innerHTML = "@";
        document.querySelector('[data="3"]').innerHTML = "#";
        document.querySelector('[data="4"]').innerHTML = "$";
        document.querySelector('[data="5"]').innerHTML = "%";
        document.querySelector('[data="6"]').innerHTML = "^";
        document.querySelector('[data="7"]').innerHTML = "&";
        document.querySelector('#button27').innerHTML = "|";
        document.querySelector('#button52').innerHTML = "?";
        document.querySelector('#button50').innerHTML = "<";
        document.querySelector('#button51').innerHTML = ">";
        document.querySelector('#button39').innerHTML = ":";
        document.querySelector('#button40').innerHTML = "\"";
        document.querySelector('#button25').innerHTML = "{";
        document.querySelector('#button26').innerHTML = "}";
    } else {
        document.querySelector('[data="2"]').innerHTML = "\"";
        document.querySelector('[data="3"]').innerHTML = "№";
        document.querySelector('[data="4"]').innerHTML = ";";
        document.querySelector('[data="5"]').innerHTML = "%";
        document.querySelector('[data="6"]').innerHTML = ":";
        document.querySelector('[data="7"]').innerHTML = "?";
        document.querySelector('#button27').innerHTML = "/";
        document.querySelector('#button52').innerHTML = ",";
    }
};

const lowerButtons = () => {
    if (currentLayout === engLayout) {
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
    } else {
        document.querySelector('[data="й"]').innerHTML = "й";
        document.querySelector('[data="ц"]').innerHTML = "ц";
        document.querySelector('[data="у"]').innerHTML = "у";
        document.querySelector('[data="к"]').innerHTML = "к";
        document.querySelector('[data="е"]').innerHTML = "е";
        document.querySelector('[data="н"]').innerHTML = "н";
        document.querySelector('[data="г"]').innerHTML = "г";
        document.querySelector('[data="ш"]').innerHTML = "ш";
        document.querySelector('[data="щ"]').innerHTML = "щ";
        document.querySelector('[data="з"]').innerHTML = "з";
        document.querySelector('[data="х"]').innerHTML = "х";
        document.querySelector('[data="ъ"]').innerHTML = "ъ";
        document.querySelector('[data="ф"]').innerHTML = "ф";
        document.querySelector('[data="ы"]').innerHTML = "ы";
        document.querySelector('[data="в"]').innerHTML = "в";
        document.querySelector('[data="а"]').innerHTML = "а";
        document.querySelector('[data="п"]').innerHTML = "п";
        document.querySelector('[data="р"]').innerHTML = "р";
        document.querySelector('[data="о"]').innerHTML = "о";
        document.querySelector('[data="л"]').innerHTML = "л";
        document.querySelector('[data="д"]').innerHTML = "д";
        document.querySelector('[data="ж"]').innerHTML = "ж";
        document.querySelector('[data="э"]').innerHTML = "э";
        document.querySelector('[data="я"]').innerHTML = "я";
        document.querySelector('[data="ч"]').innerHTML = "ч";
        document.querySelector('[data="с"]').innerHTML = "с";
        document.querySelector('[data="м"]').innerHTML = "м";
        document.querySelector('[data="и"]').innerHTML = "и";
        document.querySelector('[data="т"]').innerHTML = "т";
        document.querySelector('[data="ь"]').innerHTML = "ь";
        document.querySelector('[data="б"]').innerHTML = "б";
        document.querySelector('[data="ю"]').innerHTML = "ю";
        document.querySelector('[data="ё"]').innerHTML = "ё";
    }
};

const lowerSigns= () => {
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
    if (currentLayout === engLayout) {
        document.querySelector('#button52').innerHTML = "/";
        document.querySelector('#button50').innerHTML = ",";
        document.querySelector('#button51').innerHTML = ".";
        document.querySelector('#button39').innerHTML = ";";
        document.querySelector('#button40').innerHTML = "'";
        document.querySelector('#button25').innerHTML = "[";
        document.querySelector('#button26').innerHTML = "]";
    } else {
        document.querySelector('#button52').innerHTML = ".";
    }
};
