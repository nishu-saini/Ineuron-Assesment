import { useState } from 'react';
import './App.css';

function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [para, setPara] = useState('');

  const handleDigitClick = digit => {
    if (displayValue === '0' || waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(prevDisplay => prevDisplay + digit);
    }
    setPara(para+digit);
  };

  const handleDecimalClick = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(prevDisplay => prevDisplay + '.');
      setPara(para+'.');
    }
  };

  const handleOperatorClick = op => {
    if (operator && !waitingForSecondOperand) {
      calculate();
    }
    setFirstOperand(parseFloat(displayValue));
    setOperator(op);
    setWaitingForSecondOperand(true);
    setPara(para+op);
  };

  const calculate = () => {
    const secondOperand = parseFloat(displayValue);
    let result = 0;

    switch (operator) {
      case '+':
        result = firstOperand + secondOperand;
        break;
      case '-':
        result = firstOperand - secondOperand;
        break;
      case '*':
        result = firstOperand * secondOperand;
        break;
      case '/':
        result = firstOperand / secondOperand;
        break;
      default:
        return;
    }

    setDisplayValue(result.toString());
    setFirstOperand(result);
    setWaitingForSecondOperand(true);
    setOperator(null);
    setPara(para + '=' + result);
  };

  const handleClearClick = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
    setPara('');
  };

  return (
    <div className="calculator">
      <div className='display'>
        <input type="text" value={displayValue} readOnly />
        <p>{para}</p>
      </div>

      <div className="buttons">
        <button onClick={() => handleDigitClick('7')}>7</button>
        <button onClick={() => handleDigitClick('8')}>8</button>
        <button onClick={() => handleDigitClick('9')}>9</button>
        <button onClick={() => handleOperatorClick('/')}>/</button>
        <button onClick={() => handleDigitClick('4')}>4</button>
        <button onClick={() => handleDigitClick('5')}>5</button>
        <button onClick={() => handleDigitClick('6')}>6</button>
        <button onClick={() => handleOperatorClick('*')}>*</button>
        <button onClick={() => handleDigitClick('1')}>1</button>
        <button onClick={() => handleDigitClick('2')}>2</button>
        <button onClick={() => handleDigitClick('3')}>3</button>
        <button onClick={() => handleOperatorClick('-')}>-</button>
        <button onClick={handleDecimalClick}>.</button>
        <button onClick={() => handleDigitClick('0')}>0</button>
        <button onClick={calculate}>=</button>
        <button onClick={() => handleOperatorClick('+')}>+</button>
        <button onClick={handleClearClick}>AC</button>
      </div>
    </div>
  );
}

export default App;
