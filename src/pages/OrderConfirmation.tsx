import { Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import { fetchOrder } from "../services/orders";
import Decimal from "decimal.js";


export default function OrderConfirmation() {
  const { orderId } = useParams({ from: "/orders/$orderId" });
  // const order = getOrder(orderId);

  const {
    data: order,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => fetchOrder(orderId),
  });


  if (isPending) {
    return (
      <main className="min-h-screen bg-[#120b08] p-10 text-center text-white">
        Carregando pedido...
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-[#120b08] p-10 text-center text-white">
        <h1 className="mb-4 text-2xl font-bold">
          Não foi possível consultar o pedido.
        </h1>
        <p className="text-[#b99b79]">
          Verifique se a API simulada está ativa.
        </p>
      </main>
    );
  }
  if (!order) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-16 text-white">
        <h1 className="mb-4 text-2xl font-bold">
          Pedido não encontrado
        </h1>
        <p className="mb-6 text-[#b99b79]">
          Os pedidos demonstrativos ainda não são persistidos
          após atualizar a página.
        </p>
        <Link to="/" className="text-[#d9904b]">
          Voltar ao marketplace
        </Link>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#120b08] px-4 py-12 text-[#f4e9d9]">
      <section className="w-full max-w-[720px] overflow-hidden border border-[#493022] bg-[#261813] shadow-2xl">

        {/* CABEÇALHO */}
        <header className="px-8 pb-7 pt-9 text-center">
          <CheckCircle2
            size={56}
            strokeWidth={1.6}
            className="mx-auto mb-4 text-[#d9904b]"
          />

          <h1 className="text-xl font-bold tracking-wide">
            Pedido confirmado!
          </h1>

          <p className="mt-3 text-sm text-[#c8ad92]">
            Seu pedido foi registrado na demonstração KURIO.
          </p>
        </header>

        {/* INFORMAÇÕES DO PEDIDO */}
        <div className="grid grid-cols-2 gap-5 border-y border-[#805337] px-8 py-5 sm:grid-cols-4">
          <div className="min-w-0">
            <p className="mb-2 text-xs text-[#b99b79]">
              ID da transação
            </p>
            <p className="truncate text-sm" title={order.id}>
              {order.id.slice(0, 12)}...
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs text-[#b99b79]">
              Data
            </p>
            <p className="text-sm">
              {new Date(order.createdAt).toLocaleDateString("pt-BR")}
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs text-[#b99b79]">
              Total
            </p>
            <p className="text-sm font-semibold text-[#d9904b]">
              {order.total} ETH
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs text-[#b99b79]">
              Carteira
            </p>
            <p className="text-sm capitalize">
              {order.wallet}
            </p>
          </div>
        </div>

        {/* DETALHES */}
        <div className="px-8 py-8">
          <h2 className="mb-6 text-lg font-semibold">
            Detalhes da transação
          </h2>

          <div className="grid grid-cols-[minmax(0,1fr)_65px_110px] gap-3 border-b border-[#493022] pb-4 text-xs font-semibold sm:grid-cols-[minmax(0,1fr)_110px_140px]">
            <span>NFTs</span>
            <span className="text-center">Edições</span>
            <span className="text-right">Subtotal</span>
          </div>

          <div className="divide-y divide-[#493022]/60">
            {order.items.map(({ nft, quantity }) => (
              <div
                key={nft.id}
                className="grid grid-cols-[minmax(0,1fr)_65px_110px] items-center gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_110px_140px]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="h-14 w-14 shrink-0 rounded-md object-cover sm:h-16 sm:w-16"
                  />

                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold sm:text-sm">
                      {nft.name}
                    </p>

                    <p className="mt-1 text-[11px] text-[#b99b79]">
                      ID do token: #{nft.id.padStart(4, "0")}
                    </p>
                  </div>
                </div>

                <span className="text-center text-xs sm:text-sm">
                  × {quantity}
                </span>

                <span className="text-right text-xs font-semibold text-[#d9904b] sm:text-sm">
                  {new Decimal(nft.price)
                    .times(quantity)
                    .toFixed(3)} ETH
                </span>
              </div>
            ))}
          </div>

          {/* RESUMO FINANCEIRO */}
          <div className="mt-5 space-y-4 border-t border-[#805337] pt-6">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-[#b99b79]">
                Risco de separação
              </span>
              <span>—</span>
            </div>

            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-[#b99b79]">
                Taxa de rede
              </span>
              <span>
                Incluída no total demonstrativo
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-[#493022] pt-5 text-base font-bold">
              <span>Total</span>
              <span className="text-[#d9904b]">
                {order.total} ETH
              </span>
            </div>
          </div>

          {/* MENSAGEM */}
          <p className="mx-auto mt-8 max-w-[480px] text-center text-sm leading-6 text-[#b99b79]">
            Pedido confirmado na demonstração KURIO.
            Nenhuma transferência real de propriedade foi
            realizada na Ethereum ou registrada na blockchain.
          </p>

          {/* AÇÕES */}
          <div className="mt-7 flex flex-col items-center gap-5">
            <button
              type="button"
              disabled
              title="Disponível apenas para transações reais"
              className="inline-flex w-fit cursor-not-allowed items-center justify-center rounded bg-[#d9904b]/60 px-5 py-2 text-xs font-bold text-[#120b08]"
            >
              Ver no Etherscan
            </button>

            <Link
              to="/"
              className="text-sm text-[#d9904b] transition-colors hover:text-[#f3b476]"
            >
              Voltar ao marketplace
            </Link>
          </div>
        </div>

        {/* BORDA INFERIOR */}
        <div className="h-[5px] bg-[#d9904b]" />
      </section>
    </main>
  );
}