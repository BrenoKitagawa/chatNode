import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import { useUsuarioLogado } from "@/hooks/useUsuarioLogado";

export default function AppLayout() {
  const usuario = useUsuarioLogado();

  function sair() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <div>
      {/* Header fixo em todas as páginas deste layout */}
      <Header usuario={usuario} onSair={sair} novasConversas={3} />

      {/* Onde a página filha será renderizada */}
      <div className="pt-4">
        <Outlet />
      </div>
    </div>
  );
}
