
export type User = {
  id: string;
  name: string;
  email: string;
};

const USERS_KEY = "kurio_demo_users_v2";
const SESSION_KEY = "kurio_session_v1";
const LEGACY_USERS_KEY = "kurio_users_v1";

function readUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const data: unknown = raw ? JSON.parse(raw) : [];

    if (!Array.isArray(data)) return [];

    return data.filter(
      (item): item is User =>
        typeof item === "object" &&
        item !== null &&
        typeof item.id === "string" &&
        typeof item.name === "string" &&
        typeof item.email === "string"
    ).map(({ id, name, email }) => ({ id, name, email }));
  } catch {
    return [];
  }
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function saveSession(user: User) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function getCurrentUser(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);

    if (!raw) return null;

    const data: unknown = JSON.parse(raw);

    if (
      typeof data !== "object" ||
      data === null ||
      !("id" in data) ||
      !("name" in data) ||
      !("email" in data) ||
      typeof data.id !== "string" ||
      typeof data.name !== "string" ||
      typeof data.email !== "string"
    ) {
      return null;
    }

    return {
      id: data.id,
      name: data.name,
      email: data.email,
    };
  } catch {
    return null;
  }
}

export function register(
  name: string,
  email: string,
  password: string
): User {
  const normalizedEmail = email.trim().toLowerCase();

  if (
    !name.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) ||
    password.length < 8
  ) {
    throw new Error(
      "Preencha os dados e use uma senha de pelo menos 8 caracteres."
    );
  }

  const users = readUsers();

  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error("Este e-mail já está cadastrado.");
  }

  const user: User = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
  };

  saveUsers([...users, user]);
  saveSession(user);

  return user;
}

export function login(email: string, password: string): User {
  const normalizedEmail = email.trim().toLowerCase();

  // Demonstração: a senha não é armazenada nem verificada.
  // Este mecanismo NÃO autentica a identidade do usuário.
  const user = readUsers().find(
    (item) => item.email === normalizedEmail
  );

  if (!user || !password) {
    throw new Error("E-mail ou senha inválidos.");
  }

  saveSession(user);

  return user;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

// Remove registros antigos que continham senhas em texto puro.
// Executado quando este módulo é carregado no navegador.
if (typeof localStorage !== "undefined") {
  localStorage.removeItem(LEGACY_USERS_KEY);
}
