
import { beforeEach, describe, expect, it } from "vitest";
import {
  getCurrentUser,
  login,
  logout,
  register,
} from "./authService";

describe("Autenticação demonstrativa KURIO", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("cadastra um usuário sem armazenar a senha", () => {
    const user = register(
      "Usuário Teste",
      "teste@exemplo.com",
      "senha-ficticia-123"
    );

    expect(user.name).toBe("Usuário Teste");
    expect(getCurrentUser()?.email).toBe("teste@exemplo.com");

    const stored = localStorage.getItem("kurio_demo_users_v2");

    expect(stored).not.toContain("senha-ficticia-123");
    expect(stored).not.toContain('"password"');
  });

  it("realiza login demonstrativo com e-mail cadastrado", () => {
    register(
      "Usuário Teste",
      "teste@exemplo.com",
      "senha-ficticia-123"
    );

    logout();

    const user = login(
      "teste@exemplo.com",
      "qualquer-senha"
    );

    expect(user.name).toBe("Usuário Teste");
  });

  it("rejeita e-mail não cadastrado", () => {
    expect(() =>
      login("inexistente@exemplo.com", "senha-errada")
    ).toThrow("E-mail ou senha inválidos.");
  });

  it("encerra a sessão", () => {
    register(
      "Usuário Teste",
      "teste@exemplo.com",
      "senha-ficticia-123"
    );

    logout();

    expect(getCurrentUser()).toBeNull();
  });
});
