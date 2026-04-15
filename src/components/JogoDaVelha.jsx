import { useState } from 'react';
import './JogoDaVelha.css';

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
  [0, 4, 8], [2, 4, 6],             // diagonais
];

function calcularVencedor(squares) {
  for (const [a, b, c] of WINNING_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { jogador: squares[a], linha: [a, b, c] };
    }
  }
  return null;
}

function JogoDaVelha() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [placar, setPlacar] = useState({ X: 0, O: 0 });

  const resultado = calcularVencedor(squares);
  const vencedor = resultado?.jogador;
  const linhaVencedora = resultado?.linha ?? [];
  const empate = !vencedor && squares.every(Boolean);

  function handleClick(i) {
    if (squares[i] || vencedor) return;
    const next = squares.slice();
    next[i] = xIsNext ? 'X' : 'O';
    setSquares(next);

    const res = calcularVencedor(next);
    if (res) {
      setPlacar((p) => ({ ...p, [res.jogador]: p[res.jogador] + 1 }));
    }
    setXIsNext(!xIsNext);
  }

  function resetar() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  function resetarPlacar() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setPlacar({ X: 0, O: 0 });
  }

  let status;
  if (vencedor) status = `Vencedor: ${vencedor}`;
  else if (empate) status = 'Empate!';
  else status = `Vez de: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="jogo-container">
      <h2 className="jogo-title">Jogo da Velha</h2>

      <div className="jogo-placar">
        <div className={`placar-item ${xIsNext && !vencedor && !empate ? 'ativo' : ''}`}>
          <span className="placar-simbolo x">X</span>
          <span className="placar-pontos">{placar.X}</span>
        </div>
        <span className="placar-vs">VS</span>
        <div className={`placar-item ${!xIsNext && !vencedor && !empate ? 'ativo' : ''}`}>
          <span className="placar-simbolo o">O</span>
          <span className="placar-pontos">{placar.O}</span>
        </div>
      </div>

      <div className={`jogo-status ${vencedor ? 'ganhou' : empate ? 'empate' : ''}`}>
        {status}
      </div>

      <div className="jogo-tabuleiro">
        {squares.map((valor, i) => (
          <button
            key={i}
            className={`celula ${valor ? valor.toLowerCase() : ''} ${linhaVencedora.includes(i) ? 'vencedora' : ''}`}
            onClick={() => handleClick(i)}
          >
            {valor}
          </button>
        ))}
      </div>

      <div className="jogo-acoes">
        <button className="btn-novo" onClick={resetar}>Nova Partida</button>
        <button className="btn-reset-placar" onClick={resetarPlacar}>Zerar Placar</button>
      </div>
    </div>
  );
}

export default JogoDaVelha;
