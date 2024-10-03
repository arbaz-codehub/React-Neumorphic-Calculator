import React, { useState, useEffect } from "react";
import styles from "./Calculator.module.css";
import Display from "./Display";
import Button from "./Button";

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("");

  const appendToDisplay = (value) => {
    setDisplayValue((prev) => prev + value);
  };

  const clearDisplay = () => {
    setDisplayValue("");
  };

  const calculate = () => {
    console.log("Calculating:", displayValue);
    try {
      const result = evaluateExpression(displayValue);
      console.log("Result:", result);
      setDisplayValue(result.toString());
    } catch (error) {
      console.error("Calculation error:", error);
      setDisplayValue("Error");
    }
  };

  const evaluateExpression = (expression) => {
    const tokens = expression.match(/(\d+\.?\d*|\+|\-|\*|\/)/g) || [];
    const output = [];
    const operators = [];
    const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };

    for (const token of tokens) {
      if (!isNaN(parseFloat(token))) {
        output.push(parseFloat(token));
      } else {
        while (
          operators.length &&
          precedence[operators[operators.length - 1]] >= precedence[token]
        ) {
          output.push(operators.pop());
        }
        operators.push(token);
      }
    }

    while (operators.length) {
      output.push(operators.pop());
    }

    const stack = [];
    for (const token of output) {
      if (typeof token === "number") {
        stack.push(token);
      } else {
        const b = stack.pop();
        const a = stack.pop();
        switch (token) {
          case "+":
            stack.push(a + b);
            break;
          case "-":
            stack.push(a - b);
            break;
          case "*":
            stack.push(a * b);
            break;
          case "/":
            if (b === 0) throw new Error("Division by zero");
            stack.push(a / b);
            break;
        }
      }
    }

    if (stack.length !== 1) throw new Error("Invalid expression");
    return stack[0];
  };

  const handleKeyDown = (event) => {
    const key = event.key;
    console.log("Key pressed:", key);
    console.log("Current display value:", displayValue);

    if (/[0-9+\-*/.=]/.test(key)) {
      event.preventDefault();
      if (key === "=") {
        calculate();
      } else {
        appendToDisplay(key);
      }
    } else if (key === "Enter") {
      event.preventDefault();
      calculate();
    } else if (key === "Backspace") {
      event.preventDefault();
      setDisplayValue((prev) => prev.slice(0, -1));
    } else if (key === "Escape") {
      event.preventDefault();
      clearDisplay();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [displayValue]);

  return (
    <div className={styles.calculator} tabIndex="0">
      <Display value={displayValue} />
      <div className={styles.buttons}>
        <Button onClick={clearDisplay} className={styles.clear}>
          C
        </Button>
        <Button
          onClick={() => appendToDisplay("/")}
          className={styles.operator}
        >
          /
        </Button>
        <Button
          onClick={() => appendToDisplay("*")}
          className={styles.operator}
        >
          ×
        </Button>
        <Button
          onClick={() => appendToDisplay("-")}
          className={styles.operator}
        >
          -
        </Button>
        <Button onClick={() => appendToDisplay("7")}>7</Button>
        <Button onClick={() => appendToDisplay("8")}>8</Button>
        <Button onClick={() => appendToDisplay("9")}>9</Button>
        <Button
          onClick={() => appendToDisplay("+")}
          className={styles.operator}
        >
          +
        </Button>
        <Button onClick={() => appendToDisplay("4")}>4</Button>
        <Button onClick={() => appendToDisplay("5")}>5</Button>
        <Button onClick={() => appendToDisplay("6")}>6</Button>
        <Button onClick={() => appendToDisplay("1")}>1</Button>
        <Button onClick={() => appendToDisplay("2")}>2</Button>
        <Button onClick={() => appendToDisplay("3")}>3</Button>

        <Button
          onClick={calculate}
          className={`${styles.equals} ${styles.span2}`}
        >
          =
        </Button>
        {/* <Button
          onClick={calculate}
          className={`${styles.equals} ${styles.span2}`}
        >
          =
        </Button> */}
        <Button onClick={() => appendToDisplay("0")}>0</Button>
        <Button onClick={() => appendToDisplay(".")}>.</Button>
      </div>
    </div>
  );
};

export default Calculator;
