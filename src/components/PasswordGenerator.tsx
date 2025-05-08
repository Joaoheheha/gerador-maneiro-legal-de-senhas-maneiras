
import React, { useState, useEffect } from "react";
import { generatePassword } from "../utils/passwordUtils";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(12);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: false,
    symbols: false,
  });
  const [copied, setCopied] = useState(false);

  // Gerar senha ao carregar o componente
  useEffect(() => {
    generateNewPassword();
  }, []);

  // Gerar senha quando opções ou comprimento mudam
  useEffect(() => {
    generateNewPassword();
  }, [passwordLength, options]);

  const generateNewPassword = () => {
    const newPassword = generatePassword(passwordLength, options);
    setPassword(newPassword);
  };

  const handleOptionChange = (option: keyof typeof options) => {
    // Garante que ao menos uma opção esteja ativada
    if (!options[option] || Object.values(options).filter(Boolean).length > 1) {
      setOptions((prev) => ({
        ...prev,
        [option]: !prev[option],
      }));
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Falha ao copiar texto: ", err);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-gradient-to-b from-blue-900 to-blue-950 rounded-lg p-6 shadow-2xl">
      <div className="flex items-center justify-center mb-6">
        <div className="text-4xl text-blue-300">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="mx-auto"
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
      </div>
      
      <h1 className="text-2xl font-bold text-center text-white mb-2">Gerador de senhas</h1>
      <p className="text-sm text-center text-blue-200 mb-6">Gere instantaneamente uma senha aleatória e segura</p>
      
      <div className="bg-blue-800/30 backdrop-blur-sm p-4 rounded-md mb-6 relative">
        <div className="flex items-center justify-between">
          <h2 className="text-sm text-blue-300 mb-1">Senha gerada</h2>
          <button 
            onClick={generateNewPassword}
            className="text-xs text-blue-300 hover:text-blue-100 transition-colors"
          >
            Recarregar
          </button>
        </div>
        
        <div className="flex items-center bg-blue-900/50 p-3 rounded-md">
          <p className="text-xl font-mono text-white flex-1 break-all">{password}</p>
          <button 
            onClick={copyToClipboard} 
            className="ml-2 p-2 bg-blue-700 hover:bg-blue-600 text-white rounded-md transition-colors"
          >
            {copied ? (
              <span className="text-sm">Copiado!</span>
            ) : (
              <span className="text-sm">Copiar</span>
            )}
          </button>
        </div>
      </div>
      
      <div className="bg-blue-800/20 backdrop-blur-sm p-4 rounded-md">
        <h2 className="text-lg font-medium text-white mb-4">Personalize sua senha</h2>
        
        <div className="grid grid-cols-1 gap-6 mb-4">
          <div>
            <h3 className="text-sm text-blue-300 mb-2">Número de caracteres</h3>
            <div className="flex items-center">
              <button
                onClick={() => setPasswordLength(Math.max(6, passwordLength - 1))}
                className="px-3 py-1 bg-blue-700 text-white rounded-l-md hover:bg-blue-600 transition-colors"
              >
                -
              </button>
              <span className="px-4 py-1 bg-blue-800/50 text-white text-center w-16">{passwordLength}</span>
              <button
                onClick={() => setPasswordLength(Math.min(32, passwordLength + 1))}
                className="px-3 py-1 bg-blue-700 text-white rounded-r-md hover:bg-blue-600 transition-colors"
              >
                +
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm text-blue-300 mb-2">Características da senha</h3>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.uppercase}
                  onChange={() => handleOptionChange("uppercase")}
                  className="w-4 h-4 accent-blue-500"
                />
                <span className="text-sm text-white">Letras maiúsculas</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.lowercase}
                  onChange={() => handleOptionChange("lowercase")}
                  className="w-4 h-4 accent-blue-500"
                />
                <span className="text-sm text-white">Letras minúsculas</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.numbers}
                  onChange={() => handleOptionChange("numbers")}
                  className="w-4 h-4 accent-blue-500"
                />
                <span className="text-sm text-white">Números</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.symbols}
                  onChange={() => handleOptionChange("symbols")}
                  className="w-4 h-4 accent-blue-500"
                />
                <span className="text-sm text-white">Símbolos</span>
              </label>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm text-blue-300 mb-2">Força da senha</h3>
            <PasswordStrengthMeter password={password} />
          </div>
        </div>
      </div>
      
      <p className="text-xs text-blue-300 text-center mt-6">
        Suas senhas são geradas localmente e nunca são armazenadas ou transmitidas
      </p>
    </div>
  );
};

export default PasswordGenerator;
