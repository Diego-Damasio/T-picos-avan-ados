// app/view-data/page.tsx
'use client';
import React, { useEffect, useState } from 'react';

const ViewData: React.FC = () => {
    const [dataList, setDataList] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/submit-form');
                if (!response.ok) {
                    throw new Error('Erro ao buscar dados');
                }
                const data = await response.json();
                setDataList(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <><div>
            <h1>Dados do Formulário</h1>
            <ul>
                {dataList.length > 0 ? (
                    dataList.map((item, index) => (
                        <li key={index}>
                            <strong>Nome:</strong> {item.nome} <br />
                            <strong>Email:</strong> {item.email} <br />
                            <strong>Mensagem:</strong> {item.mensagem}
                        </li>
                    ))
                ) : (
                    <p>Nenhum dado encontrado.</p>
                )}
            </ul>
        </div>
        <div>
        <button onClick={() => window.location.href = '/'} style={{
                    padding: '10px 20px',
                    backgroundColor: '#0070f3',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease'
                }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#005bb5'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0070f3'}>
                    Voltar
                </button>
</div></>
    );
};

export default ViewData;
