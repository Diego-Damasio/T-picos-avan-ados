// app/components/Formulario.tsx
'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormularioProps { }

interface FormData {
    nome: string;
    email: string;
    mensagem: string;
}

const Formulario: React.FC<FormularioProps> = () => {
    const [formData, setFormData] = useState<FormData>({
        nome: '',
        email: '',
        mensagem: '',
    });

    const [status, setStatus] = useState<'idle' | 'enviando' | 'sucesso' | 'erro'>('idle');
    const [mensagemErro, setMensagemErro] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('enviando');
        setMensagemErro('');

        try {
            const response = await fetch('/api/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setStatus('sucesso');
                setFormData({ nome: '', email: '', mensagem: '' });
            } else {
                setStatus('erro');
                setMensagemErro(result.error || 'Erro ao enviar o formulário.');
            }
        } catch (error) {
            console.error('Erro ao enviar o formulário:', error);
            setStatus('erro');
            setMensagemErro('Erro ao enviar o formulário.');
        }
    };

    return (
        <><div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
            <h2>Contato</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="mensagem">Mensagem:</label>
                    <textarea
                        id="mensagem"
                        name="mensagem"
                        value={formData.mensagem}
                        onChange={handleChange}
                        required
                        rows={4}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={status === 'enviando'}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#0070f3',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    {status === 'enviando' ? 'Enviando...' : 'Enviar'}
                </button>
            </form>

            {status === 'sucesso' && (
                <p style={{ color: 'green', marginTop: '10px' }}>Formulário enviado com sucesso!</p>
            )}

            {status === 'erro' && (
                <p style={{ color: 'red', marginTop: '10px' }}>{mensagemErro}</p>
            )}
        </div>
            <div>
                <button onClick={() => window.location.href = '/view-data'} style={{
                    padding: '10px 20px',
                    backgroundColor: '#0070f3',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease'
                }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#005bb5'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0070f3'}>
                    Ver dados inseridos
                </button>

            </div></>
    );
};

export default Formulario;
