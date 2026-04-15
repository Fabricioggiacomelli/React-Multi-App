import { useState } from 'react';
import './Calculadora.css';

const BUTTONS = [
  ['C', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

function Calculadora() {
  const [display, setDisplay] = useState('0');
  const [operando, setOperando] = useState(null);
  const [operador, setOperador] = useState(null);
  const [esperandoSegundo, setEsperandoSegundo] = useState(false);

  function handleNumber(num) {
    if (esperandoSegundo) {
      setDisplay(num === '.' ? '0.' : num);
      setEsperandoSegundo(false);
    } else {
      if (num === '.' && display.includes('.')) return;
      setDisplay(display === '0' && num !== '.' ? num : display + num);
    }
  }

  function handleOperador(op) {
    const atual = parseFloat(display);
    if (operando !== null && !esperandoSegundo) {
      const resultado = calcular(operando, atual, operador);
      setDisplay(formatar(resultado));
      setOperando(resultado);
    } else {
      setOperando(atual);
    }
    setOperador(op);
    setEsperandoSegundo(true);
  }

  function calcular(a, b, op) {
    switch (op) {
      case '+': return a + b;
      case '−': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : 'Erro';
      default: return b;
    }
  }

  function formatar(val) {
    if (val === 'Erro') return 'Erro';
    return parseFloat(val.toFixed(10)).toString();
  }

  function handleIgual() {
    if (operador === null || operando === null) return;
    const atual = parseFloat(display);
    const resultado = calcular(operando, atual, operador);
    setDisplay(formatar(resultado));
    setOperando(null);
    setOperador(null);
    setEsperandoSegundo(false);
  }

  function handleClear() {
    setDisplay('0');
    setOperando(null);
    setOperador(null);
    setEsperandoSegundo(false);
  }

  function handlePlusMinus() {
    if (display === '0' || display === 'Erro') return;
    setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display);
  }

  function handlePercent() {
    setDisplay(formatar(parseFloat(display) / 100));
  }

  function handleClick(btn) {
    if (btn === 'C') return handleClear();
    if (btn === '±') return handlePlusMinus();
    if (btn === '%') return handlePercent();
    if (btn === '=') return handleIgual();
    if (['+', '−', '×', '÷'].includes(btn)) return handleOperador(btn);
    handleNumber(btn);
  }

  function tipoBtn(btn) {
    if (btn === '=') return 'igual';
    if (['+', '−', '×', '÷'].includes(btn)) return 'operador';
    if (['C', '±', '%'].includes(btn)) return 'funcao';
    return 'numero';
  }

  return (
    <div className="calc-container">
      <h2 className="calc-title">Calculadora</h2>
      <div className="calc-body">
        <div className="calc-display">
          {operando !== null && operador && (
            <span className="calc-sub">{operando} {operador}</span>
          )}
          <span className="calc-valor">{display}</span>
        </div>
        <div className="calc-grid">
          {BUTTONS.flat().map((btn, i) => (
            <button
              key={i}
              className={`calc-btn ${tipoBtn(btn)} ${btn === '0' ? 'zero' : ''}`}
              onClick={() => handleClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calculadora;
