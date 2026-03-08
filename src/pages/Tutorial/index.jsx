import React from 'react';

function Tutorial() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Tutorial em breve...</h1>
      <button onClick={() => window.history.back()}>Voltar</button>
    </div>
  );
}

export default Tutorial;