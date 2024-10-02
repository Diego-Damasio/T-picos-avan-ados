// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Next.js 14 - Formulário Integrado com API',
  description: 'Exemplo de formulário integrado a uma API backend em Next.js 14 com TypeScript',
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="pt-BR">
      <head />
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
