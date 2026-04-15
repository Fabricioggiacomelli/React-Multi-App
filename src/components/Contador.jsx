import { useState } from 'react';
import './Contador.css';

function Contador() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount((c) => c + 1);
  }

  function decrement() {
    setCount((c) => c - 1);
  }

  function reset() {
    setCount(0);
  }

  function getColorClass() {
    if (count > 0) return 'positive';
    if (count < 0) return 'negative';
    return 'zero';
  }

  return (
    <div className="contador-container">
      <h2 className="contador-title">Contador de Cliques</h2>

      <div className={`contador-display ${getColorClass()}`}>
        {count}
      </div>

      <div className="contador-buttons">
        <button className="btn btn-decrement" onClick={decrement}>−</button>
        <button className="btn btn-reset" onClick={reset}>Reset</button>
        <button className="btn btn-increment" onClick={increment}>+</button>
      </div>
    </div>
  );
}

export default Contador;
