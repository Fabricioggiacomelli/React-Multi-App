import './Header.css';

const navItems = [
  { id: 'todo', label: 'To-Do List' },
  { id: 'contador', label: 'Contador de Cliques' },
  { id: 'jogo', label: 'Jogo da Velha' },
  { id: 'calculadora', label: 'Calculadora' },
  { id: 'cep', label: 'Buscador de CEP' },
];

function Header({ activeTab, onTabChange }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">React Multi App</h1>
        <nav className="header-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-btn ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => onTabChange(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
