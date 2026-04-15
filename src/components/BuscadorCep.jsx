import { useState } from 'react';
import './BuscadorCep.css';

function BuscadorCep() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  function formatarCep(valor) {
    return valor.replace(/\D/g, '').slice(0, 8);
  }

  async function buscar() {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) {
      setErro('Digite um CEP válido com 8 dígitos.');
      setEndereco(null);
      return;
    }

    setCarregando(true);
    setErro('');
    setEndereco(null);

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();

      if (data.erro) {
        setErro('CEP não encontrado.');
      } else {
        setEndereco(data);
      }
    } catch {
      setErro('Erro ao buscar o CEP. Verifique sua conexão.');
    } finally {
      setCarregando(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') buscar();
  }

  function limpar() {
    setCep('');
    setEndereco(null);
    setErro('');
  }

  const campos = endereco
    ? [
        { label: 'CEP', valor: endereco.cep },
        { label: 'Logradouro', valor: endereco.logradouro },
        { label: 'Complemento', valor: endereco.complemento || '—' },
        { label: 'Bairro', valor: endereco.bairro },
        { label: 'Cidade', valor: endereco.localidade },
        { label: 'Estado', valor: endereco.uf },
        { label: 'IBGE', valor: endereco.ibge },
        { label: 'DDD', valor: endereco.ddd },
      ]
    : [];

  return (
    <div className="cep-container">
      <h2 className="cep-title">Buscador de CEP</h2>

      <div className="cep-input-row">
        <input
          className="cep-input"
          type="text"
          placeholder="Ex: 01310-100"
          value={cep}
          onChange={(e) => setCep(formatarCep(e.target.value))}
          onKeyDown={handleKeyDown}
          maxLength={8}
        />
        <button className="cep-btn" onClick={buscar} disabled={carregando}>
          {carregando ? 'Buscando...' : 'Buscar'}
        </button>
        {(endereco || erro) && (
          <button className="cep-btn-limpar" onClick={limpar}>Limpar</button>
        )}
      </div>

      {erro && <p className="cep-erro">{erro}</p>}

      {endereco && (
        <div className="cep-resultado">
          <ul className="cep-lista">
            {campos.map(({ label, valor }) => (
              <li key={label} className="cep-linha">
                <span className="cep-label">{label}</span>
                <span className="cep-valor">{valor}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BuscadorCep;
