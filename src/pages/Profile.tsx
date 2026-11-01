
import { Link, useNavigate } from "@tanstack/react-router";
import { UserRound, Wallet, LogOut, Mail } from "lucide-react";
import {
  getCurrentUser,
  logout,
} from "../features/auth/authService";

export default function Profile() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  if (!user) {
    return (
      <main className="min-h-screen bg-[#120b08] px-5 py-16 text-center text-white">
        <h1 className="mb-4 text-2xl font-bold">
          Acesse sua conta
        </h1>
        <p className="mb-6 text-[#b99b79]">
          Entre para visualizar seu perfil.
        </p>
        <Link to="/login" className="text-[#d9904b]">
          Fazer login
        </Link>
      </main>
    );
  }

  function handleLogout() {
    logout();
    void navigate({ to: "/login" });
  }

  return (
    <main className="min-h-screen bg-[#120b08] px-5 py-12 text-[#f4e9d9]">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold">Meu perfil</h1>

        <div className="grid gap-8 md:grid-cols-[250px_1fr]">
          <aside className="h-fit rounded-xl border border-[#38251a] bg-[#21150f] p-6">
            <div className="mb-6 flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-[#493022] p-5 text-[#d9904b]">
                <UserRound size={40} />
              </div>
              <h2 className="font-bold">{user.name}</h2>
              <p className="mt-1 break-all text-xs text-[#b99b79]">
                {user.email}
              </p>
            </div>

            <nav className="space-y-3">
              <Link
                to="/profile"
                className="flex items-center gap-3 rounded-lg bg-[#38251a] p-3 text-[#d9904b]"
              >
                <UserRound size={18} />
                Meu perfil
              </Link>

              <Link
                to="/wallets"
                className="flex items-center gap-3 rounded-lg p-3 hover:bg-[#38251a]"
              >
                <Wallet size={18} />
                Minhas carteiras
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-[#38251a]"
              >
                <LogOut size={18} />
                Sair
              </button>
            </nav>
          </aside>

          <section className="rounded-xl border border-[#38251a] bg-[#21150f] p-6 md:p-8">
            <h2 className="mb-6 text-xl font-bold">
              Informações pessoais
            </h2>

            <div className="space-y-6">
              <div>
                <p className="mb-2 text-sm text-[#b99b79]">
                  Nome completo
                </p>
                <p className="rounded-lg border border-[#493022] bg-[#120b08] p-4">
                  {user.name}
                </p>
              </div>

              <div>
                <p className="mb-2 flex items-center gap-2 text-sm text-[#b99b79]">
                  <Mail size={16} />
                  E-mail
                </p>
                <p className="break-all rounded-lg border border-[#493022] bg-[#120b08] p-4">
                  {user.email}
                </p>
              </div>

              <p className="text-sm text-[#b99b79]">
                Conta demonstrativa. A edição dos dados será
                adicionada em uma próxima versão.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

