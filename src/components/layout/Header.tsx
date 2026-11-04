
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Menu,
  Search,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#35251c] bg-[#120b08]/95 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-5 px-4 sm:px-6 lg:px-10">
        {/* Logotipo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="shrink-0 text-2xl font-black tracking-[0.12em] text-[#d9904b] sm:text-3xl"
        >
          KURIO
        </Link>

        {/* Navegação desktop */}

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-7 lg:flex xl:gap-10"
        >
          <Link
            to="/"
            onClick={closeMenu}
            activeOptions={{ exact: true }}
            className="relative inline-flex items-center py-3 text-sm font-medium text-[#d9904b] transition-colors hover:text-[#edaa67] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#d9904b]"
          >
            Início
          </Link>

          <a
            href="/#marketplace"
            className="py-3 text-sm font-medium text-[#f4e9d9] transition-colors hover:text-[#d9904b]"
          >
            Mercado
          </a>

          <a
            href="/#featured"
            className="py-3 text-sm font-medium text-[#f4e9d9] transition-colors hover:text-[#d9904b]"
          >
            Criadores
          </a>

          <a
            href="/#blog"
            className="py-3 text-sm font-medium text-[#f4e9d9] transition-colors hover:text-[#d9904b]"
          >
            Aprenda
          </a>
        </nav>


        {/* Ações */}
        <div className="flex items-center gap-3 sm:gap-5">
          <a
            href="/#marketplace"
            aria-label="Buscar NFTs"
            className="hidden text-[#f4e9d9] transition-colors hover:text-[#d9904b] sm:inline-flex"
          >
            <Search size={20} />
          </a>

          <Link
            to="/cart"
            aria-label="Carrinho"
            className="inline-flex text-[#f4e9d9] transition-colors hover:text-[#d9904b]"
          >
            <ShoppingCart size={21} />
          </Link>

          <Link
            to="/login"
            aria-label="Entrar"
            className="inline-flex text-[#f4e9d9] transition-colors hover:text-[#d9904b] sm:hidden"
          >
            <UserRound size={21} />
          </Link>
          <Link
            to="/login"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#d9904b] bg-[#d9904b] px-6 py-2 font-mono text-sm font-extrabold uppercase tracking-wide text-[#120b08] transition-colors hover:bg-[#edaa67]"
          >
            ENTRAR
          </Link>

          {/* Menu mobile */}
          <button
            type="button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="kurio-mobile-menu"
            onClick={() => setMenuOpen((previous) => !previous)}
            className="inline-flex items-center justify-center text-[#f4e9d9] transition-colors hover:text-[#d9904b] lg:hidden"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Navegação mobile */}
      {menuOpen && (
        <nav
          id="kurio-mobile-menu"
          aria-label="Navegação mobile"
          className="border-t border-[#35251c] bg-[#1b110d] px-5 py-5 lg:hidden"
        >
          <div className="mx-auto flex max-w-[1440px] flex-col gap-5">
            <Link
              to="/"
              onClick={closeMenu}
              className="text-sm font-medium text-[#f4e9d9] hover:text-[#d9904b]"
            >
              Início
            </Link>

            <a
              href="/#marketplace"
              onClick={closeMenu}
              className="text-sm font-medium text-[#f4e9d9] hover:text-[#d9904b]"
            >
              Mercado
            </a>

            <a
              href="/#featured"
              onClick={closeMenu}
              className="text-sm font-medium text-[#f4e9d9] hover:text-[#d9904b]"
            >
              Destaques
            </a>

            <a
              href="/#newsletter"
              onClick={closeMenu}
              className="text-sm font-medium text-[#f4e9d9] hover:text-[#d9904b]"
            >
              Comunidade
            </a>

            <Link
              to="/login"
              onClick={closeMenu}
              className="text-sm font-medium text-[#d9904b] hover:text-[#e9a869]"
            >
              Entrar
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
