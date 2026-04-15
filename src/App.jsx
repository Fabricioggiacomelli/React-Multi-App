import { useState } from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import Contador from './components/Contador';
import JogoDaVelha from './components/JogoDaVelha';
import Calculadora from './components/Calculadora';
import BuscadorCep from './components/BuscadorCep';

function App() {
  const [activeTab, setActiveTab] = useState('todo');

  function renderTab() {
    switch (activeTab) {
      case 'todo':
        return <TodoList />;
      case 'contador':
        return <Contador />;
      case 'jogo':
        return <JogoDaVelha />;
      case 'calculadora':
        return <Calculadora />;
      case 'cep':
        return <BuscadorCep />;
      default:
        return null;
    }
  }

  return (
    <>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main style={{ minHeight: 'calc(100vh - 110px)', background: '#f0f4f8' }}>
        {renderTab()}
      </main>
    </>
  );
}

export default App;
