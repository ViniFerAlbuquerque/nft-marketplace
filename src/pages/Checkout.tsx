
import { useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import Decimal from "decimal.js";
import axios from "axios";
import { Wallet } from "lucide-react";

import { useCart, clearCart } from "../features/cart/cartStore";
import { submitOrder } from "../services/orders";
import Footer from "../components/layout/Footer";

export default function Checkout() {
  const items = useCart();
  const navigate = useNavigate();

  const [wallet, setWallet] = useState("metamask");
  const [error, setError] = useState("");

  const [displayName, setDisplayName] = useState("");
  const [profileName, setProfileName] = useState("");
  const [secondaryWallet, setSecondaryWallet] = useState("");
  const [ensName, setEnsName] = useState("");
  const [username, setUsername] = useState("");
  const [network, setNetwork] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [walletType, setWalletType] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [email, setEmail] = useState("");
  const [useAnotherWallet, setUseAnotherWallet] = useState(false);
  const [notes, setNotes] = useState("");

  const idempotencyKey = useRef<string | null>(null);

  const orderMutation = useMutation({
    mutationFn: submitOrder,
  });

  const subtotal = items.reduce(
    (sum, item) =>
      sum.plus(new Decimal(item.nft.price).times(item.quantity)),
    new Decimal(0)
  );

  const fee = new Decimal("0.005");
  const total = subtotal.plus(fee);

  async function handleCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (orderMutation.isPending || items.length === 0) {
      return;
    }

    setError("");

    if (!idempotencyKey.current) {
      idempotencyKey.current = crypto.randomUUID();
    }

    try {
      const order = await orderMutation.mutateAsync({
        items: items.map(({ nft, quantity }) => ({
          nftId: nft.id,
          quantity,
        })),
        wallet,
        idempotencyKey: idempotencyKey.current,
      });

      await navigate({
        to: "/orders/$orderId",
        params: { orderId: order.id },
      });

      clearCart();
    } catch (cause) {
      if (axios.isAxiosError(cause)) {
        const message = cause.response?.data?.message;

        setError(
          typeof message === "string"
            ? message
            : "Falha na comunicação com a API simulada."
        );
      } else {
        setError("Não foi possível concluir o pedido.");
      }
    }
  }

  const inputClass =
    "h-10 w-full rounded-sm border border-[#493022] bg-[#120b08] px-3 text-[11px] text-[#f4e9d9] outline-none placeholder:text-[#80624a] focus:border-[#d9904b]";

  const labelClass =
    "mb-2 block text-[11px] font-bold text-[#d9904b]";

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#120b08] font-mono text-[#f4e9d9]">
        <div className="mx-auto max-w-[1200px] px-5 py-16">
          <h1 className="mb-4 text-2xl font-bold">
            Seu carrinho está vazio
          </h1>
          <Link to="/" className="text-[#d9904b]">
            Voltar ao marketplace
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#120b08] font-mono text-[#f4e9d9]">
      <div className="mx-auto max-w-[1200px] px-4 pb-20 pt-10 sm:px-6 lg:px-0">
        {/* CAMINHO */}
        <nav
          aria-label="Caminho de navegação"
          className="mb-8 flex flex-wrap items-center gap-2 text-[11px] text-[#f4e9d9]"
        >
          <Link to="/" className="hover:text-[#d9904b]">
            Início
          </Link>
          <span>/</span>
          <Link
            to="/"
            hash="marketplace"
            className="hover:text-[#d9904b]"
          >
            Mercado
          </Link>
          <span>/</span>
          <span className="text-[#d9904b]">Pagamento</span>
        </nav>

        <form
          onSubmit={handleCheckout}
          className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-16"
        >
          {/* PERFIL DO COLECIONADOR */}
          <section>
            <h1 className="mb-6 text-[17px] font-bold">
              Perfil do colecionador
            </h1>

            <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
              {/* LINHA 1 */}
              <div>
                <label htmlFor="displayName" className={labelClass}>
                  Nome de exibição*
                </label>
                <input
                  id="displayName"
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  placeholder="Seu nome de exibição"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="username" className={labelClass}>
                  Nome de usuário*
                </label>
                <input
                  id="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Seu nome de usuário"
                  required
                  className={inputClass}
                />
              </div>

              {/* LINHA 2 */}
              <div>
                <label htmlFor="network" className={labelClass}>
                  Rede*
                </label>
                <select
                  id="network"
                  value={network}
                  onChange={(event) => setNetwork(event.target.value)}
                  required
                  className={inputClass}
                >
                  <option value="">Selecione uma rede</option>
                  <option value="ethereum">Ethereum</option>
                  <option value="polygon">Polygon</option>
                  <option value="solana">Solana</option>
                </select>
              </div>

              <div>
                <label htmlFor="profileName" className={labelClass}>
                  Nome do perfil*
                </label>
                <input
                  id="profileName"
                  value={profileName}
                  onChange={(event) => setProfileName(event.target.value)}
                  placeholder="Nome do perfil"
                  required
                  className={inputClass}
                />
              </div>

              {/* LINHA 3 */}
              <div>
                <label htmlFor="walletAddress" className={labelClass}>
                  Endereço da carteira*
                </label>
                <input
                  id="walletAddress"
                  value={walletAddress}
                  onChange={(event) => setWalletAddress(event.target.value)}
                  placeholder="Endereço da carteira"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="secondaryWallet" className={labelClass}>
                  ENS ou carteira secundária (opcional)
                </label>
                <input
                  id="secondaryWallet"
                  value={secondaryWallet}
                  onChange={(event) => setSecondaryWallet(event.target.value)}
                  placeholder="ENS ou carteira secundária"
                  className={inputClass}
                />
              </div>

              {/* LINHA 4 */}
              <div>
                <label htmlFor="walletType" className={labelClass}>
                  Tipo de carteira*
                </label>
                <select
                  id="walletType"
                  value={walletType}
                  onChange={(event) => {
                    const selected = event.target.value;
                    setWalletType(selected);
                    if (selected === "metamask" || selected === "walletconnect" || selected === "coinbase") {
                      setWallet(selected);
                    }
                  }}
                  required
                  className={inputClass}
                >
                  <option value="">Selecione uma carteira</option>
                  <option value="metamask">MetaMask</option>
                  <option value="walletconnect">WalletConnect</option>
                  <option value="coinbase">Coinbase Wallet</option>
                </select>
              </div>

              <div>
                <label htmlFor="referralCode" className={labelClass}>
                  Código de indicação*
                </label>
                <input
                  id="referralCode"
                  value={referralCode}
                  onChange={(event) => setReferralCode(event.target.value)}
                  placeholder="Código de indicação"
                  required
                  className={inputClass}
                />
              </div>

              {/* LINHA 5 */}
              <div>
                <label htmlFor="email" className={labelClass}>
                  E-mail*
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Seu e-mail"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="ensName" className={labelClass}>
                  Nome ENS*
                </label>
                <div className="flex gap-2">
                  <input
                    id="ensName"
                    value={ensName}
                    onChange={(event) => setEnsName(event.target.value)}
                    placeholder="Seu nome ENS"
                    required
                    className={inputClass}
                  />
                  <span className="flex h-10 shrink-0 items-center border border-[#493022] bg-[#21150f] px-3 text-[11px] text-[#d9904b]">
                    .eth
                  </span>
                </div>
              </div>
            </div>

            {/* CARTEIRA ALTERNATIVA */}
            <label className="mt-7 flex items-center gap-2 text-[11px]">
              <input
                type="checkbox"
                checked={useAnotherWallet}
                onChange={(event) => setUseAnotherWallet(event.target.checked)}
                className="accent-[#d9904b]"
              />
              Usar outra carteira?
            </label>

            {/* OBSERVAÇÕES */}
            <div className="mt-6">
              <label htmlFor="notes" className={labelClass}>
                Observação do colecionador (opcional)
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={5}
                className={`${inputClass} h-auto resize-y py-3`}
                placeholder="Adicione uma observação..."
              />
            </div>
          </section>


          {/* SEUS NFTS E PAGAMENTO */}
          <aside>
            <h2 className="mb-5 text-[16px] font-bold">
              Seus NFTs
            </h2>

            <div className="mb-5 border-b border-[#493022] pb-3 text-[11px]">
              <div className="mb-3 flex justify-between font-bold">
                <span>NFTs</span>
                <span>Subtotal</span>
              </div>

              <div className="space-y-3">
                {items.map(({ nft, quantity }) => (
                  <div
                    key={nft.id}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="h-12 w-12 shrink-0 rounded-sm object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-[10px] font-bold">
                          {nft.name}
                        </p>
                        <p className="text-[10px] text-[#b99b79]">
                          {quantity} edição(ões)
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 text-[10px] font-bold text-[#d9904b]">
                      {new Decimal(nft.price)
                        .times(quantity)
                        .toFixed(3)}{" "}
                      ETH
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 text-[11px]">
              <div className="flex justify-between">
                <span className="text-[#b99b79]">
                  Subtotal
                </span>
                <span>{subtotal.toFixed(3)} ETH</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#b99b79]">
                  Desconto de lançamento
                </span>
                <span>0.000 ETH</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#b99b79]">
                  Taxa de rede
                </span>
                <span>{fee.toFixed(3)} ETH</span>
              </div>

              <div className="flex justify-between border-t border-[#493022] pt-4 text-[14px] font-bold">
                <span>Total</span>
                <span className="text-[#d9904b]">
                  {total.toFixed(3)} ETH
                </span>
              </div>
            </div>

            <h3 className="mt-7 mb-4 text-center text-[14px] font-bold">
              Carteira e rede
            </h3>

            <div className="space-y-2">
              {[
                { id: "metamask", label: "MetaMask" },
                { id: "walletconnect", label: "WalletConnect" },
                { id: "coinbase", label: "Coinbase Wallet" },
              ].map((option) => (
                <label
                  key={option.id}
                  className="flex min-h-10 cursor-pointer items-center gap-2 border border-[#493022] px-3 text-[11px]"
                >
                  <input
                    type="radio"
                    name="wallet"
                    checked={wallet === option.id}
                    onChange={() => setWallet(option.id)}
                    className="accent-[#d9904b]"
                  />
                  <Wallet size={15} className="text-[#d9904b]" />
                  {option.label}
                </label>
              ))}
            </div>

            {error && (
              <p role="alert" className="mt-4 text-[11px] text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={orderMutation.isPending}
              className="mt-5 min-h-11 w-full rounded bg-[#d9904b] px-5 text-[12px] font-bold text-[#120b08] hover:bg-[#e9a869] disabled:opacity-50"
            >
              {orderMutation.isPending
                ? "Processando..."
                : "Confirmar compra"}
            </button>

            <p className="mt-3 text-[10px] leading-5 text-[#957a61]">
              Checkout demonstrativo. Nenhuma carteira real
              será conectada e nenhum pagamento será realizado.
            </p>
          </aside>
        </form>
      </div>

      <Footer />
    </main>
  );
}
