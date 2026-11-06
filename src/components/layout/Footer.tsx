
import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  Phone,
  Bell,
  Camera,
  Mail,
  Palette,
  ShieldCheck,
  Wallet,
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState("");

  function handleNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Integração com serviço de newsletter pendente.
  }

  const benefits = [
    {
      icon: ShieldCheck,
      title: "Segurança da carteira",
      description: "Proteja seus ativos digitais.",
    },
    {
      icon: Palette,
      title: "Criadores em destaque",
      description: "Conheça artistas e comunidades.",
    },
    {
      icon: Bell,
      title: "Alertas de lançamentos",
      description: "Descubra novidades do mercado.",
    },
  ];

  const linkClass =
    "block text-xs leading-6 text-[#c8ad92] transition hover:text-[#e9a15c]";

  return (
    <footer className="w-full bg-[#120b08] font-mono text-[#f4e9d9]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* FAIXA 1: BENEFÍCIOS E NEWSLETTER */}
        <section
          id="newsletter"
          aria-label="Novidades da KURIO"
          className="grid gap-0 border border-[#493022] bg-[#24160f] lg:grid-cols-[3fr_1.25fr]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="border-b border-[#493022] px-4 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
                >
                  <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#d9904b] text-[#120b08]">
                    <Icon size={21} strokeWidth={2} />
                  </span>

                  <h2 className="text-xs font-bold leading-5">
                    {benefit.title}
                  </h2>

                  <p className="mt-2 text-[11px] leading-5 text-[#b99b79]">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="border-t border-[#493022] px-5 py-4 lg:border-l lg:border-t-0">
            <h2 className="text-sm font-bold leading-5">
              Antecipe-se ao próximo lançamento
            </h2>

            <p className="mt-3 text-xs leading-5 text-[#b99b79]">
              Receba novidades sobre coleções, artistas e
              lançamentos da KURIO.
            </p>

            <form
              onSubmit={handleNewsletter}
              className="mt-3 flex flex-col gap-2 sm:flex-row"
            >
              <label htmlFor="footer-email" className="sr-only">
                E-mail para newsletter
              </label>

              <input
                id="footer-email"
                type="email"
                value={newsletterEmail}
                onChange={(event) =>
                  setNewsletterEmail(event.target.value)
                }
                placeholder="Digite seu e-mail..."
                className="h-11 min-w-0 flex-1 rounded-sm border border-[#6a452d] bg-[#120b08] px-3 text-xs text-[#f4e9d9] outline-none placeholder:text-[#957a61] focus:border-[#d9904b]"
              />

              <button
                type="submit"
                disabled
                title="Inscrição em desenvolvimento"
                className="h-11 shrink-0 cursor-not-allowed rounded-sm bg-[#d9904b]/60 px-5 text-xs font-bold text-[#120b08]"
              >
                Em breve
              </button>
            </form>

            <p className="mt-2 text-[10px] text-[#957a61]">
              Inscrições ainda não disponíveis.
            </p>
          </div>
        </section>



        {/* FAIXA 2: IDENTIDADE E CONTATO */}
        <section className="grid gap-5 border-x border-[#493022] bg-[#3b2517] px-5 py-5 sm:grid-cols-2 sm:px-7 lg:grid-cols-[0.8fr_1.5fr_1.2fr_1fr] lg:items-center lg:gap-6">
          {/* COLUNA 1: MARCA */}
          <Link
            to="/"
            className="inline-flex w-fit items-center text-2xl font-black tracking-[0.14em]"
          >
            KURIO<span className="text-[#d9904b]">.</span>
          </Link>

          {/* COLUNA 2: DESCRIÇÃO */}
          <p className="text-xs leading-5 text-[#dfc5a7]">
            Feito para colecionadores, criadores e curiosos
            pelo universo da arte digital.
          </p>

          {/* COLUNA 3: E-MAIL */}
          <div className="flex items-center gap-2 text-xs leading-5 text-[#dfc5a7]">
            <Mail size={17} className="shrink-0 text-[#d9904b]" />
            <span>Contato pelos canais oficiais da KURIO</span>
          </div>

          {/* COLUNA 4: TELEFONE */}
          <div className="flex items-center gap-2 text-xs leading-5 text-[#dfc5a7]">
            <Phone size={17} className="shrink-0 text-[#d9904b]" />
            <span>+55 11 4002 8922</span>
          </div>
        </section>



        {/* FAIXA 3: LINKS */}
        <section className="grid gap-6 border-x border-b border-[#493022] bg-[#21150f] px-5 py-6 sm:grid-cols-2 sm:px-7 lg:grid-cols-4 lg:gap-8">
          <nav aria-label="Meu perfil">
            <h2 className="mb-3 text-sm font-bold">
              Meu perfil
            </h2>

            <div className="space-y-1">
              <Link to="/profile" className={linkClass}>
                Meu perfil
              </Link>

              <Link to="/login" className={linkClass}>
                Minha conta
              </Link>

              <Link to="/wallets" className={linkClass}>
                Minhas carteiras
              </Link>

              <Link to="/register" className={linkClass}>
                Criar conta
              </Link>
            </div>
          </nav>

          <div>
            <h2 className="mb-3 text-sm font-bold">
              Central de ajuda
            </h2>

            <div className="space-y-1 text-xs leading-6 text-[#c8ad92]">
              <p>Como comprar NFTs</p>
              <p>Segurança da carteira</p>
              <p>Direitos e propriedade</p>
              <p>Políticas da comunidade</p>
            </div>
          </div>

          <nav aria-label="Coleções">
            <h2 className="mb-3 text-sm font-bold">
              Coleções
            </h2>

            <div className="space-y-1">
              <Link
                to="/"
                hash="marketplace"
                className={linkClass}
              >
                Arte digital
              </Link>

              <Link
                to="/"
                hash="marketplace"
                className={linkClass}
              >
                Fotografia
              </Link>

              <Link
                to="/"
                hash="marketplace"
                className={linkClass}
              >
                Música
              </Link>

              <Link
                to="/"
                hash="marketplace"
                className={linkClass}
              >
                Explorar todas
              </Link>
            </div>
          </nav>

          <div>
            <h2 className="mb-3 text-sm font-bold">
              Redes sociais
            </h2>

            <div className="flex gap-2">
              <span
                title="Rede social ainda não configurada"
                aria-label="Rede social indisponível"
                className="flex h-9 w-9 items-center justify-center border border-[#86532e] text-[#d9904b]"
              >
                <Camera size={18} />
              </span>

              <span
                title="Comunidade ainda não configurada"
                aria-label="Comunidade indisponível"
                className="flex h-9 w-9 items-center justify-center border border-[#86532e] text-[#d9904b]"
              >
                <Palette size={18} />
              </span>
            </div>

            <h3 className="mt-6 text-sm font-bold">
              Carteiras compatíveis
            </h3>

            <Link
              to="/wallets"
              className="mt-3 inline-flex items-center gap-2 text-xs text-[#d9904b] transition hover:text-[#f4e9d9]"
            >
              <Wallet size={17} />
              Ver carteiras
            </Link>
          </div>
        </section>
      </div>

      {/* FAIXA 4: COPYRIGHT */}
      <div className="bg-[#0c0705] px-4 py-5 text-center">
        <p className="text-[11px] leading-5 text-[#a88b70]">
          © {year} KURIO. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
