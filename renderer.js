const { ipcRenderer } = require('electron');

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".calc-button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    if (value === undefined || value === null) return;

    if (value === "C") {
      display.value = "";
    } else if (value === "=") {
      const operators = ['+', '-', '*', '/'];
      const lastChar = display.value.slice(-1);
      if (operators.includes(lastChar)) return; // Do nothing if last character is an operator
      try {
        display.value = eval(display.value);
      } catch {
        display.value = "Error";
      }
    } else {
      if (display.value.length < 10) {
        const operators = ['+', '-', '*', '/'];
        const lastChar = display.value.slice(-1);
        if (operators.includes(lastChar) && operators.includes(value)) {
          display.value = display.value.slice(0, -1) + value;
        } else {
          display.value += value;
        }
      }
    }
  });
});


document.getElementById('close').addEventListener('click', () => {
  console.log('Chiudi cliccato');
  ipcRenderer.send('window-close');
});

document.getElementById('reduce').addEventListener('click', () => {
  ipcRenderer.send('window-minimize');
});