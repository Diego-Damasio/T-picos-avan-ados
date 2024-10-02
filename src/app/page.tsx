// app/page.tsx
'use client';

import React from 'react';
import Formulario from './components/Formulario';

const Home: React.FC = () => {
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Bem-vindo ao nosso site!</h1>
      <p>Preencha o formulário abaixo:</p>
      <Formulario />

    </div>
  );
};

export default Home;
