
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

import { register } from "../features/auth/authService";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) {
      setError("Informe seu nome completo.");
      return;
    }

    if (password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (!acceptedTerms) {
      setError("Confirme que deseja criar sua conta.");
      return;
    }

    setIsSubmitting(true);

    try {
      await register(cleanName, cleanEmail, password);
      await navigate({ to: "/profile" });
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Não foi possível criar sua conta."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative flex min-h-[calc(100dvh-80px)] items-center justify-center overflow-hidden bg-[#120b08] px-4 py-10 font-mono text-[#f4e9d9] sm:px-6 sm:py-14">
      {/* Elementos decorativos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#d9904b]/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#8f4f25]/15 blur-3xl"
      />

      <div className="relative z-10 w-full max-w-[510px]">
        {/* Marca */}
        <div className="mb-8 flex justify-center">
          <Link
            to="/"
            aria-label="KURIO - voltar ao início"
            className="inline-flex items-center gap-3"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#a86b3b] bg-[#d9904b] text-[#120b08]">
              <Sparkles size={24} strokeWidth={2} />
            </span>

            <span className="text-2xl font-black tracking-[0.18em] text-[#f4e9d9]">
              KURIO<span className="text-[#d9904b]">.</span>
            </span>
          </Link>
        </div>

        <div className="rounded-[22px] border border-[#493022] bg-[#21150f] p-6 shadow-2xl shadow-black/30 sm:p-9">
          {/* Cabeçalho */}
          <div className="mb-8 text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#d9904b]">
              Faça parte da comunidade
            </p>

            <h1 className="text-2xl font-extrabold tracking-tight text-[#f4e9d9] sm:text-3xl">
              Crie seu perfil
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-xs leading-6 text-[#b99b79] sm:text-sm">
              Entre no universo KURIO e comece sua jornada
              como colecionador de arte digital.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nome */}
            <div>
              <label
                htmlFor="register-name"
                className="mb-2 block text-xs font-bold text-[#f4e9d9]"
              >
                Nome completo
              </label>

              <div className="relative">
                <UserRound
                  size={18}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#b99b79]"
                />

                <input
                  id="register-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={100}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Seu nome completo"
                  className="h-12 w-full rounded-lg border border-[#493022] bg-[#120b08] pl-12 pr-4 text-sm text-[#f4e9d9] outline-none transition placeholder:text-[#80664e] focus:border-[#d9904b]"
                />
              </div>
            </div>

            {/* E-mail */}
            <div>
              <label
                htmlFor="register-email"
                className="mb-2 block text-xs font-bold text-[#f4e9d9]"
              >
                E-mail
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#b99b79]"
                />

                <input
                  id="register-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="seuemail@exemplo.com"
                  className="h-12 w-full rounded-lg border border-[#493022] bg-[#120b08] pl-12 pr-4 text-sm text-[#f4e9d9] outline-none transition placeholder:text-[#80664e] focus:border-[#d9904b]"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label
                htmlFor="register-password"
                className="mb-2 block text-xs font-bold text-[#f4e9d9]"
              >
                Senha
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#b99b79]"
                />

                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Mínimo de 8 caracteres"
                  className="h-12 w-full rounded-lg border border-[#493022] bg-[#120b08] pl-12 pr-12 text-sm text-[#f4e9d9] outline-none transition placeholder:text-[#80664e] focus:border-[#d9904b]"
                />

                <button
                  type="button"
                  aria-label={
                    showPassword ? "Ocultar senha" : "Mostrar senha"
                  }
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center text-[#b99b79] transition hover:text-[#d9904b]"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              <p className="mt-2 text-[11px] text-[#a88b70]">
                Utilize pelo menos 8 caracteres.
              </p>
            </div>

            {/* Confirmar senha */}
            <div>
              <label
                htmlFor="register-confirm-password"
                className="mb-2 block text-xs font-bold text-[#f4e9d9]"
              >
                Confirmar senha
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#b99b79]"
                />

                <input
                  id="register-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  placeholder="Repita sua senha"
                  className="h-12 w-full rounded-lg border border-[#493022] bg-[#120b08] pl-12 pr-12 text-sm text-[#f4e9d9] outline-none transition placeholder:text-[#80664e] focus:border-[#d9904b]"
                />

                <button
                  type="button"
                  aria-label={
                    showConfirmPassword
                      ? "Ocultar confirmação da senha"
                      : "Mostrar confirmação da senha"
                  }
                  aria-pressed={showConfirmPassword}
                  onClick={() =>
                    setShowConfirmPassword((value) => !value)
                  }
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center text-[#b99b79] transition hover:text-[#d9904b]"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirmação */}
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) =>
                  setAcceptedTerms(event.target.checked)
                }
                className="mt-1 h-4 w-4 shrink-0 accent-[#d9904b]"
              />

              <span className="text-xs leading-6 text-[#b99b79]">
                Confirmo que desejo criar uma conta na KURIO.
              </span>
            </label>

            {/* Mensagem de erro */}
            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs leading-5 text-red-300"
              >
                {error}
              </p>
            )}

            {/* Botão principal */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-[#d9904b] px-5 text-sm font-extrabold uppercase tracking-wide text-[#120b08] transition hover:bg-[#edaa67] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Criando conta..." : "Criar meu perfil"}

              {!isSubmitting && <ArrowRight size={19} />}
            </button>
          </form>

          {/* Separador */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#493022]" />
            <span className="text-[11px] uppercase text-[#a88b70]">
              Sua jornada começa aqui
            </span>
            <div className="h-px flex-1 bg-[#493022]" />
          </div>

          {/* Informação de segurança */}
          <div className="flex items-start gap-3 rounded-lg border border-[#493022] bg-[#170e0a] p-4">
            <ShieldCheck
              size={20}
              className="mt-0.5 shrink-0 text-[#d9904b]"
            />

            <p className="text-xs leading-6 text-[#b99b79]">
              Escolha uma senha exclusiva e nunca compartilhe
              suas credenciais de acesso.
            </p>
          </div>

          {/* Link para Login */}
          <p className="mt-7 text-center text-xs text-[#b99b79] sm:text-sm">
            Já possui uma conta?{" "}
            <Link
              to="/login"
              className="font-bold text-[#d9904b] underline-offset-4 transition hover:underline"
            >
              Entrar
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-[11px] leading-5 text-[#80664e]">
          KURIO Marketplace — Arte, tecnologia e cultura digital.
        </p>
      </div>
    </main>
  );
}
