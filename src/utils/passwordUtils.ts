
// Função para gerar senha aleatória
export function generatePassword(
  length: number,
  options: {
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
  }
): string {
  let charset = "";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_-+={}[]|:;<>,.?/";

  if (options.uppercase) charset += uppercaseChars;
  if (options.lowercase) charset += lowercaseChars;
  if (options.numbers) charset += numberChars;
  if (options.symbols) charset += symbolChars;

  // Se nenhuma opção foi selecionada, use todas
  if (!charset) {
    charset = uppercaseChars + lowercaseChars + numberChars;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

// Função para avaliar a força da senha
export function evaluatePasswordStrength(password: string): {
  score: number;
  strength: "fraca" | "média" | "forte";
} {
  if (!password) return { score: 0, strength: "fraca" };

  let score = 0;

  // Comprimento da senha
  if (password.length >= 12) {
    score += 3;
  } else if (password.length >= 8) {
    score += 2;
  } else if (password.length >= 6) {
    score += 1;
  }

  // Verificar a variedade de caracteres
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 2;

  // Determinar a força com base na pontuação
  let strength: "fraca" | "média" | "forte" = "fraca";
  if (score >= 6) {
    strength = "forte";
  } else if (score >= 4) {
    strength = "média";
  }

  return { score, strength };
}
