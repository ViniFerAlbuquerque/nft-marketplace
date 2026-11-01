
import { Link } from "@tanstack/react-router";
import { ShoppingCart, UserRound, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#3a281d] bg-[#120b08]/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 lg:px-10">
        <Link
          to="/"
          className="text-3xl font-black tracking-[0.12em] text-[#d9904b]"
        >
          KURIO
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-[#f4e9d9] md:flex">
          <Link to="/" className="hover:text-[#d9904b]">
            Início
          </Link>
          <Link to="/" className="hover:text-[#d9904b]">
            Mercado
          </Link>
          <Link to="/" className="hover:text-[#d9904b]">
            Criadores
          </Link>
          <Link to="/" className="hover:text-[#d9904b]">
            Aprenda
          </Link>
        </nav>

        <div className="flex items-center gap-5">
          <Link
            to="/"
            aria-label="Buscar NFTs"
            className="hidden text-[#f4e9d9] hover:text-[#d9904b] sm:block"
          >
            <Search size={21} />
          </Link>

          <Link
            to="/cart"
            aria-label="Carrinho"
            className="text-[#f4e9d9] hover:text-[#d9904b]"
          >
            <ShoppingCart size={22} />
          </Link>

          <Link
            to="/login"
            aria-label="Entrar"
            className="text-[#f4e9d9] hover:text-[#d9904b] md:hidden"
          >
            <UserRound size={22} />
          </Link>

          <Link
            to="/login"
            className="hidden rounded-md border border-[#d9904b] px-5 py-2 text-sm font-semibold text-[#d9904b] transition hover:bg-[#d9904b] hover:text-[#120b08] md:block"
          >
            Entrar
          </Link>
        </div>
      </div>
    </header>
  );
}
