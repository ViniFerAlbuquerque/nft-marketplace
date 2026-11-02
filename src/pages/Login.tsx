
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
} from "lucide-react";
import { login } from "../features/auth/authService";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Preencha seu e-mail e sua senha.");
      return;
    }

    setIsSubmitting(true);

    try {
      login(email.trim(), password);
      void navigate({ to: "/profile" });
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Não foi possível entrar. Tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-[#493226] bg-[#160e0a] " +
    "py-3.5 pl-12 pr-12 text-sm text-[#f6eadb] " +
    "placeholder:text-[#806956] outline-none transition-colors " +
    "focus:border-[#e3a15e] focus:ring-2 focus:ring-[#e3a15e]/15";

  return (
    <main className="relative flex min-h-[calc(100dvh-80px)] items-center justify-center overflow-hidden bg-[#120b08] px-4 py-10 text-[#f6eadb] sm:px-6 lg:py-16">
      {/* Elementos decorativos do fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#d9904b]/8 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#d9904b]/8 blur-3xl"
      />

      <div className="relative z-10 w-full max-w-[440px]">
        {/* Identidade visual */}
        <div className="mb-8 text-center">
          <Link
            to="/"
            aria-label="KURIO - voltar ao início"
            className="inline-flex items-center justify-center gap-2"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#d9904b]/40 bg-[#d9904b]/10 text-[#e3a15e]">
              <Sparkles size={23} strokeWidth={2} />
            </span>

            <span className="text-3xl font-black tracking-[0.12em] text-[#f6eadb]">
              KURIO<span className="text-[#d9904b]">.</span>
            </span>
          </Link>

          <div className="mt-8">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#d9904b]">
              Sua jornada começa aqui
            </p>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Bem-vindo de volta!
            </h1>

            <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[#b99b79]">
              Entre na sua conta para explorar, colecionar e descobrir NFTs
              incríveis.
            </p>
          </div>
        </div>

        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          className="rounded-[24px] border border-[#3d291d] bg-[#21150f] p-5 shadow-2xl shadow-black/20 sm:p-8"
        >
          <div className="space-y-5">
            <div>
              <label
                htmlFor="login-email"
                className="mb-2 block text-sm font-semibold text-[#ead9c4]"
              >
                E-mail
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#a88a70]"
                />

                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="seuemail@exemplo.com"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="mb-2 block text-sm font-semibold text-[#ead9c4]"
              >
                Senha
              </label>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#a88a70]"
                />

                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Digite sua senha"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={inputClass}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={
                    showPassword ? "Ocultar senha" : "Mostrar senha"
                  }
                  aria-pressed={showPassword}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a88a70] transition-colors hover:text-[#e3a15e]"
                >
                  {showPassword ? (
                    <EyeOff size={19} aria-hidden="true" />
                  ) : (
                    <Eye size={19} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="mt-5 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#d9904b] px-5 py-4 text-sm font-extrabold text-[#1b100a] transition-colors hover:bg-[#edaa67] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#edaa67] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
            {!isSubmitting && (
              <ArrowRight size={18} aria-hidden="true" />
            )}
          </button>

          {/* Login social - apresentação visual */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#493226]" />
            <span className="text-xs text-[#a88a70]">
              ou continue com
            </span>
            <div className="h-px flex-1 bg-[#493226]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled
              title="Integração com Google ainda não disponível"
              className="flex items-center justify-center gap-2 rounded-xl border border-[#493226] bg-[#291a12] px-4 py-3 text-sm font-semibold text-[#c9b29a] opacity-60"
            >
              <span className="text-base font-bold">G</span>
              Google
            </button>

            <button
              type="button"
              disabled
              title="Integração com carteira ainda não disponível"
              className="flex items-center justify-center gap-2 rounded-xl border border-[#493226] bg-[#291a12] px-4 py-3 text-sm font-semibold text-[#c9b29a] opacity-60"
            >
              <span aria-hidden="true">◈</span>
              Carteira
            </button>
          </div>

          <p className="mt-7 text-center text-sm text-[#b99b79]">
            Ainda não tem uma conta?{" "}
            <Link
              to="/register"
              className="font-bold text-[#e3a15e] underline-offset-4 hover:underline"
            >
              Criar conta
            </Link>
          </p>
        </form>

        <div className="mt-7 flex items-center justify-center gap-2 text-center text-xs text-[#94775f]">
          <ShieldCheck
            size={16}
            aria-hidden="true"
            className="text-[#d9904b]"
          />
          <span>Experiência demonstrativa do marketplace KURIO</span>
        </div>
      </div>
    </main>
  );
}
