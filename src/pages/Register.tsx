import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { register } from "../features/auth/authService";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      register(name, email, password);
      void navigate({ to: "/profile" });
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Erro ao cadastrar."
      );
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#120b08] px-5 py-12 text-[#f4e9d9]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-[#38251a] bg-[#21150f] p-8"
      >
        <h1 className="mb-2 text-3xl font-bold">Criar conta</h1>
        <p className="mb-8 text-sm text-[#b99b79]">
          Faça parte do universo KURIO.
        </p>

        <label className="mb-2 block text-sm">Nome completo</label>
        <input
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="mb-5 w-full rounded-lg border border-[#493022] bg-[#120b08] p-3 outline-none focus:border-[#d9904b]"
        />

        <label className="mb-2 block text-sm">E-mail</label>
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mb-5 w-full rounded-lg border border-[#493022] bg-[#120b08] p-3 outline-none focus:border-[#d9904b]"
        />

        <label className="mb-2 block text-sm">Senha</label>
        <input
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mb-5 w-full rounded-lg border border-[#493022] bg-[#120b08] p-3 outline-none focus:border-[#d9904b]"
        />

        {error && (
          <p role="alert" className="mb-4 text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-[#d9904b] p-3 font-bold text-[#120b08]"
        >
          Criar conta
        </button>

        <p className="mt-6 text-center text-sm text-[#b99b79]">
          Já tem uma conta?{" "}
          <Link to="/login" className="text-[#d9904b]">
            Entrar
          </Link>
        </p>
      </form>
    </main>
  );
}

