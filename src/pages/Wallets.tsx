
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Wallet, Plus, Trash2 } from "lucide-react";
import { getCurrentUser } from "../features/auth/authService";

type SavedWallet = {
  id: string;
  name: string;
  address: string;
};

function readWallets(userId: string): SavedWallet[] {
  try {
    const raw = localStorage.getItem(`kurio_wallets_${userId}`);
    return raw ? (JSON.parse(raw) as SavedWallet[]) : [];
  } catch {
    return [];
  }
}

export default function Wallets() {
  const user = getCurrentUser();

  const [wallets, setWallets] = useState<SavedWallet[]>(() =>
    user ? readWallets(user.id) : []
  );

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  if (!user) {
    return (
      <main className="min-h-screen bg-[#120b08] p-10 text-center text-white">
        <h1 className="mb-4 text-2xl font-bold">
          Faça login para acessar suas carteiras
        </h1>
        <Link to="/login" className="text-[#d9904b]">
          Entrar
        </Link>
      </main>
    );
  }

  function save(next: SavedWallet[]) {
    if (!user) return;

    localStorage.setItem(
      `kurio_wallets_${user.id}`,
      JSON.stringify(next)
    );
    setWallets(next);
  }

  function handleAdd(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const normalizedAddress = address.trim();

    if (!/^0x[a-fA-F0-9]{40}$/.test(normalizedAddress)) {
      setError("Informe um endereço Ethereum válido.");
      return;
    }

    if (
      wallets.some(
        (wallet) =>
          wallet.address.toLowerCase() === normalizedAddress.toLowerCase()
      )
    ) {
      setError("Esta carteira já está cadastrada.");
      return;
    }

    save([
      ...wallets,
      {
        id: crypto.randomUUID(),
        name: name.trim() || "Minha carteira",
        address: normalizedAddress,
      },
    ]);

    setName("");
    setAddress("");
  }

  return (
    <main className="min-h-screen bg-[#120b08] px-5 py-12 text-[#f4e9d9]">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Minhas carteiras</h1>

          <Link to="/profile" className="text-sm text-[#d9904b]">
            Voltar ao perfil
          </Link>
        </div>

        <section className="mb-8 rounded-xl border border-[#38251a] bg-[#21150f] p-6">
          <h2 className="mb-6 flex items-center gap-3 text-xl font-bold">
            <Plus size={20} className="text-[#d9904b]" />
            Adicionar carteira
          </h2>

          <form onSubmit={handleAdd} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm">
                Nome da carteira
              </label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ex.: Carteira principal"
                className="w-full rounded-lg border border-[#493022] bg-[#120b08] p-3 outline-none focus:border-[#d9904b]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm">
                Endereço Ethereum
              </label>
              <input
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="0x..."
                required
                className="w-full rounded-lg border border-[#493022] bg-[#120b08] p-3 outline-none focus:border-[#d9904b]"
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="rounded-lg bg-[#d9904b] px-6 py-3 font-bold text-[#120b08]"
            >
              Adicionar carteira
            </button>
          </form>
        </section>

        <section>
          <h2 className="mb-5 text-xl font-bold">
            Carteiras cadastradas
          </h2>

          {wallets.length === 0 ? (
            <p className="rounded-xl border border-[#38251a] p-6 text-[#b99b79]">
              Nenhuma carteira cadastrada.
            </p>
          ) : (
            <div className="space-y-4">
              {wallets.map((wallet) => (
                <article
                  key={wallet.id}
                  className="flex items-center gap-4 rounded-xl border border-[#38251a] bg-[#21150f] p-5"
                >
                  <Wallet className="shrink-0 text-[#d9904b]" />

                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold">{wallet.name}</h3>
                    <p className="break-all text-xs text-[#b99b79]">
                      {wallet.address}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      save(wallets.filter((item) => item.id !== wallet.id))
                    }
                    aria-label={`Remover ${wallet.name}`}
                    className="rounded-lg p-2 hover:bg-[#38251a] hover:text-red-400"
                  >
                    <Trash2 size={19} />
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>

        <p className="mt-6 text-xs text-[#b99b79]">
          As carteiras são apenas endereços cadastrados para
          demonstração. Nenhuma conexão blockchain é realizada.
        </p>
      </div>
    </main>
  );
}

