const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  // colocando o digito na tela
  addDigit(digit) {
    console.log(digit);
    // Olhando se o numero já tem ponto
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  // processar todas as operações da calculadora
  processOperation(operation) {
    // Verificar se o valor está vazio
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      // troca operações
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    // Pegando os antigos e atuais valores
    let operationValue;
    let previous = +this.previousOperationText.innerText.split(" ")[0];
    let current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "x":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "CE":
        this.processClearCurrentOperator();
        break;
      case "C":
        this.processClearOperator();
        break;
      case "=":
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }

  // Trocando os valores na tela
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      // Adiciona número ao valor atual
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      // se o numero for 0, só mostra o numero atual
      if (previous === 0) {
        operationValue = current;
      }
      // Adiciona valor atual ao anterior
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  // trocando operações
  changeOperation(operation) {
    const mathOperations = ["*", "-", "+", "/"];

    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  // apaga um digito
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }

  // Limpa atual
  processClearCurrentOperator() {
    this.currentOperationText.innerText = "";
  }

  // Limpa tudo
  processClearOperator() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  // Resolve a conta
  processEqualOperator() {
    let operation = this.previousOperationText.innerText.split(" ");
    let previous = parseFloat(operation[0]);
    let current = parseFloat(this.currentOperationText.innerText);

    let result;
    switch (operation[1]) {
        case "+":
            result = previous + current;
            break;
        case "-":
            result = previous - current;
            break;
        case "x":
            result = previous * current;
            break;
        case "/":
            result = previous / current;
            break;
        default:
            return;
    }

    // Exibe o resultado no display
    this.currentOperationText.innerText = result.toString();
    this.previousOperationText.innerText = "";
    this.currentOperation = result.toString();
}
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      console.log(value);
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});