import { useState } from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';

function App() {
  const [activeTab, setActiveTab] = useState('todo');

  function renderTab() {
    switch (activeTab) {
      case 'todo':
        return <TodoList />;
      case 'contador':
        return null;
      case 'jogo':
        return null;
      case 'calculadora':
        return null;
      case 'cep':
        return null;
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
