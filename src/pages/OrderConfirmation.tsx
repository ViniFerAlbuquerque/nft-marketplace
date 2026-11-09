import { Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import { fetchOrder } from "../services/orders";


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
    <main className="flex min-h-screen items-center justify-center bg-[#120b08] px-5 py-12 font-mono text-[#f4e9d9]">
      <section className="w-full max-w-[580px] overflow-hidden border border-[#493022] bg-[#261813]">

        {/* CABEÇALHO */}
        <div className="relative px-7 pb-5 pt-8 text-center">
          <CheckCircle2
            size={48}
            className="mx-auto mb-3 text-[#d9904b]"
          />

          <h1 className="text-[15px] font-bold">
            Pedido confirmado!
          </h1>

          <p className="mt-2 text-[12px] text-[#c8ad92]">
            Seu pedido foi registrado na demonstração KURIO.
          </p>
        </div>

        {/* DADOS DA TRANSAÇÃO */}
        <div className="grid grid-cols-2 gap-4 border-y border-[#805337] px-6 py-4 text-[11px] sm:grid-cols-4">
          <div>
            <p className="text-[#b99b79]">ID da transação</p>
            <p className="mt-1 break-all">
              {order.id.slice(0, 12)}...
            </p>
          </div>

          <div>
            <p className="text-[#b99b79]">Data</p>
            <p className="mt-1">
              {new Date(order.createdAt).toLocaleDateString("pt-BR")}
            </p>
          </div>

          <div>
            <p className="text-[#b99b79]">Total</p>
            <p className="mt-1 text-[#d9904b]">
              {order.total} ETH
            </p>
          </div>

          <div>
            <p className="text-[#b99b79]">Carteira</p>
            <p className="mt-1 capitalize">
              {order.wallet}
            </p>
          </div>
        </div>

        {/* DETALHES DA TRANSAÇÃO */}
        <div className="px-7 py-6">
          <h2 className="mb-4 text-[13px] font-bold">
            Detalhes da transação
          </h2>

          <div className="mb-3 grid grid-cols-[minmax(0,1fr)_65px_100px] gap-2 border-b border-[#493022] pb-3 text-[11px] font-bold">
            <span>NFTs</span>
            <span className="text-center">Edições</span>
            <span className="text-right">Subtotal</span>
          </div>

          <div className="space-y-4">
            {order.items.map(({ nft, quantity }) => (
              <div
                key={nft.id}
                className="grid grid-cols-[minmax(0,1fr)_65px_100px] items-center gap-2"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="h-14 w-14 shrink-0 rounded-md object-cover"
                  />

                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-bold">
                      {nft.name}
                    </p>

                    <p className="mt-1 truncate text-[10px] text-[#b99b79]">
                      ID do token: #{nft.id.padStart(4, "0")}
                    </p>
                  </div>
                </div>

                <span className="text-center text-[11px] text-[#b99b79]">
                  × {quantity}
                </span>

                <span className="text-right text-[11px] font-bold text-[#d9904b]">
                  {(
                    Number(nft.price) * quantity
                  ).toFixed(3)} ETH
                </span>
              </div>
            ))}
          </div>

          {/* VALORES */}
          <div className="mt-6 space-y-3 border-t border-[#493022] pt-4 text-[11px]">
            <div className="flex justify-between gap-4">
              <span className="text-[#b99b79]">
                Risco de separação
              </span>
              <span>—</span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-[#b99b79]">
                Taxa de rede
              </span>
              <span>
                Incluída no total demonstrativo
              </span>
            </div>

            <div className="flex justify-between border-t border-[#493022] pt-4 text-[13px] font-bold">
              <span>Total</span>
              <span className="text-[#d9904b]">
                {order.total} ETH
              </span>
            </div>
          </div>

          {/* MENSAGEM DE CONFIRMAÇÃO */}
          <p className="mx-auto mt-6 max-w-[420px] text-center text-[11px] leading-5 text-[#b99b79]">
            Pedido confirmado na demonstração KURIO.
            Nenhuma transferência real de propriedade foi
            realizada na Ethereum ou registrada na blockchain.
          </p>

          {/* BOTÕES */}
          <div className="mt-6 flex flex-col items-center gap-4">
            <button
              type="button"
              disabled
              title="Disponível apenas para transações reais"
              className="inline-flex w-fit cursor-not-allowed items-center justify-center rounded bg-[#d9904b]/60 px-5 py-2 text-[11px] font-bold text-[#120b08]"
            >
              Ver no Etherscan
            </button>

            <Link
              to="/"
              className="text-[11px] text-[#d9904b] hover:underline"
            >
              Voltar ao marketplace
            </Link>
          </div>
        </div>

        <div className="h-[6px] bg-[#d9904b]" />
      </section>
    </main>
  );
}

