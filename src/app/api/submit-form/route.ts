// app/api/submit-form/route.ts
import { NextResponse } from 'next/server';

interface FormData {
  nome: string;
  email: string;
  mensagem: string;
}

let formDataList: FormData[] = []; // Armazena dados em memória

export async function POST(request: Request) {
  try {
    const data: FormData = await request.json();

    // Validação básica
    if (!data.nome || !data.email || !data.mensagem) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios.' },
        { status: 400 }
      );
    }

    // Adiciona os dados recebidos à lista
    formDataList.push(data);
    console.log('Dados recebidos:', data); // Mostra no terminal

    return NextResponse.json(
      { message: 'Formulário enviado com sucesso!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao processar o formulário:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}

// Endpoint para retornar os dados armazenados
export async function GET() {
  return NextResponse.json(formDataList);
}
