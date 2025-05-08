
import PasswordGenerator from '../components/PasswordGenerator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-blue-950 flex flex-col items-center justify-center p-4">
      <header className="w-full max-w-lg mx-auto mb-8">
        <h1 className="text-3xl font-bold text-white text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-cyan-300">
            Gerador de Senha Segura
          </span>
        </h1>
      </header>
      
      <main className="w-full">
        <PasswordGenerator />
      </main>
      
      <footer className="mt-8 text-center text-blue-300 text-sm">
        <p>© 2025 Gerador de Senhas Seguras</p>
      </footer>
    </div>
  );
};

export default Index;
