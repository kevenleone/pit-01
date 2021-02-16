import React, { useState } from 'react';
import Header from './components/Header';
import Button from './components/Button';

const App = () => {
  const [contador, setContador] = useState(0);

  return (
    <div className="App">
      <Header title="Aplicação 1" subtitle="Aprendendo conceito de Props">
        <h1>Testando Children</h1>
      </Header>

      <Header title="Aplicação 2" subtitle="Aprendendo conceito de State">
        State App
      </Header>

      <h1>
        {`Meu numero: ${contador}`}
      </h1>
      <Button
        onClick={() => setContador(contador + 1)}
        type="button"
      >
        Adicionar
      </Button>
      <Button
        onClick={() => setContador(contador - 1)}
        type="button"
      >
        Diminuir
      </Button>
    </div>
  );
};

export default App;
