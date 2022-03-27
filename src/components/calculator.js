import React, { useState, useEffect } from "react";
import Mexp from "math-expression-evaluator";
import { round } from "mathjs";

function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [disableDot, setDisableDot] = useState(false); // disables . button when array item already has a . in it
  const [disableZero, setDisableZero] = useState(false); //disables 0 button when array starts with a 0
  const [disableNumbers, setDisableNumbers] = useState(false); // disables all numbers when array starts with a 0
  const [disableOperator, setDisableOperator] = useState(false);

  const inputArray = input.toString().split(" ");
  const indexLastArrayItem = inputArray.length - 1;
  const operator = ["/", "+", " - ", "*"];

  console.log(inputArray.slice(-1).length);

  // handleClick event for input

  const handleClick = (e) => {
    setInput(input + e.target.name);
  };

  // +/-

  const oppositeInput = () => {
    if (
      inputArray[inputArray.length - 3] === "-" &&
      inputArray[inputArray.length - 2] === "-"
    ) {
      inputArray.splice(inputArray.length - 2, 1);
    } else if (
      inputArray[inputArray.length - 3] === "+" &&
      inputArray[inputArray.length - 2] === "-"
    ) {
      inputArray.splice(inputArray.length - 2, 1);
    } else if (
      inputArray[inputArray.length - 3] === "/" &&
      inputArray[inputArray.length - 2] === "-"
    ) {
      inputArray.splice(inputArray.length - 2, 1);
    } else if (
      inputArray[inputArray.length - 3] === "*" &&
      inputArray[inputArray.length - 2] === "-"
    ) {
      inputArray.splice(inputArray.length - 2, 1);
    } else if (inputArray[0] === "-" && inputArray.length === 2) {
      inputArray.splice(inputArray.length - 2, 1);
    } else {
      inputArray.splice(
        indexLastArrayItem,
        1,
        "-",
        inputArray[indexLastArrayItem]
      );
    }
    setInput(inputArray.join(" "));
  };

  // clears input

  const clear = () => {
    setInput("");
    setResult("");
  };

  // removes last number inserted into array

  const erase = () => {
    if (input.length > 1) {
      setInput(input.slice(0, -1));
    } else {
      setInput("");
      setResult("");
    }
  };

  // uses math-expression-evaluator to do the math

  const evaluate = () => {
    setResult(Mexp.eval(input));
  };

  // disables . button when array item already has a . in it

  useEffect(() => {
    if (inputArray[indexLastArrayItem].includes(".")) {
      setDisableDot(true);
    } else {
      setDisableDot(false);
    }
  }, [inputArray, indexLastArrayItem]);

  //disables 0 button when array starts with a 0

  useEffect(() => {
    if (inputArray[indexLastArrayItem] === "0") {
      setDisableZero(true);
    } else {
      setDisableZero(false);
    }
  }, [inputArray, indexLastArrayItem]);

  // disables all numbers when array starts with a 0

  useEffect(() => {
    if (inputArray[indexLastArrayItem] === "0") {
      setDisableNumbers(true);
    } else {
      setDisableNumbers(false);
    }
  }, [inputArray, indexLastArrayItem]);

  // disables all numbers when array starts with a 0

  useEffect(() => {
    if (
      operator.includes(input.toString().slice(-2, -1)[0]) ||
      inputArray[indexLastArrayItem] === ""
    ) {
      setDisableOperator(true);
    } else {
      setDisableOperator(false);
    }
  }, [inputArray, indexLastArrayItem]);

  // when result is updated input is cleared

  useEffect(() => {
    setInput("");
  }, [result]);

  return (
    <div className="calculatorContainer">
      <div className="calculatorScreen">
        <p className="result">{input ? input : round(result, 4)}</p>
      </div>
      <div className="calculatorButtons">
        <button name="C" className="button" onClick={clear}>
          C
        </button>
        <button name="CE" className="button" onClick={erase}>
          CE
        </button>
        <button name="+/-" className="button" onClick={oppositeInput}>
          +/-
        </button>
        <button
          name=" / "
          className="button"
          onClick={handleClick}
          disabled={disableOperator}
        >
          ÷
        </button>
        <button
          name="7"
          className="button"
          onClick={handleClick}
          disabled={disableNumbers}
        >
          7
        </button>
        <button
          name="9"
          onClick={handleClick}
          className="button"
          disabled={disableNumbers}
        >
          9
        </button>
        <button
          name="8"
          onClick={handleClick}
          className="button"
          disabled={disableNumbers}
        >
          8
        </button>
        <button
          name=" * "
          className="button"
          onClick={handleClick}
          disabled={disableOperator}
        >
          x
        </button>
        <button
          name="4"
          onClick={handleClick}
          className="button"
          disabled={disableNumbers}
        >
          4
        </button>
        <button
          name="5"
          onClick={handleClick}
          className="button"
          disabled={disableNumbers}
        >
          5
        </button>
        <button
          name="6"
          onClick={handleClick}
          className="button"
          disabled={disableNumbers}
        >
          6
        </button>
        <button
          name=" - "
          className="button"
          onClick={handleClick}
          disabled={disableOperator}
        >
          -
        </button>
        <button
          name="1"
          onClick={handleClick}
          className="button"
          disabled={disableNumbers}
        >
          1
        </button>
        <button
          name="2"
          onClick={handleClick}
          className="button"
          disabled={disableNumbers}
        >
          2
        </button>
        <button
          name="3"
          onClick={handleClick}
          className="button"
          disabled={disableNumbers}
        >
          3
        </button>
        <button
          name=" + "
          className="button"
          onClick={handleClick}
          disabled={disableOperator}
        >
          +
        </button>
        <button
          name="0"
          onClick={handleClick}
          className="span-2"
          disabled={disableZero}
        >
          0
        </button>
        <button
          name="."
          onClick={handleClick}
          className="button"
          disabled={disableDot}
        >
          .
        </button>
        <button name="=" className="button" onClick={evaluate}>
          =
        </button>
      </div>
    </div>
  );
}

export default Calculator;
