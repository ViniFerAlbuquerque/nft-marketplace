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
    <main className="flex min-h-screen items-center justify-center bg-[#120b08] px-5 py-12 text-[#f4e9d9]">
      <section className="w-full max-w-xl rounded-2xl border border-[#38251a] bg-[#21150f] p-8 text-center">
        <CheckCircle2
          size={60}
          className="mx-auto mb-5 text-[#d9904b]"
        />

        <h1 className="mb-3 text-3xl font-bold">
          Compra simulada concluída!
        </h1>

        <p className="mb-8 text-[#b99b79]">
          Seu pedido foi registrado nesta demonstração.
          Nenhuma transação real ocorreu na blockchain.
        </p>

        <div className="space-y-4 rounded-xl bg-[#120b08] p-5 text-left">
          <div>
            <p className="text-xs text-[#b99b79]">
              Identificador do pedido
            </p>
            <p className="break-all text-sm">{order.id}</p>
          </div>

          <div>
            <p className="text-xs text-[#b99b79]">Data</p>
            <p>
              {new Date(order.createdAt).toLocaleString("pt-BR")}
            </p>
          </div>

          <div>
            <p className="text-xs text-[#b99b79]">
              Carteira selecionada
            </p>
            <p>{order.wallet}</p>
          </div>

          <div className="border-t border-[#38251a] pt-4">
            <p className="mb-3 font-semibold">Itens</p>
            {order.items.map(({ nft, quantity }) => (
              <p key={nft.id} className="mb-2 text-sm text-[#b99b79]">
                {nft.name} × {quantity}
              </p>
            ))}
          </div>

          <div className="flex justify-between border-t border-[#38251a] pt-4 font-bold">
            <span>Total</span>
            <span className="text-[#d9904b]">
              {order.total} ETH
            </span>
          </div>
        </div>

        <Link
          to="/"
          className="mt-8 block rounded-lg bg-[#d9904b] px-6 py-4 font-bold text-[#120b08]"
        >
          Voltar ao marketplace
        </Link>
      </section>
    </main>
  );
}

