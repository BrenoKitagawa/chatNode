import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUsuarioLogado } from "@/hooks/useUsuarioLogado";

export default function Conversas() {
  const [conversas, setConversas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const usuario = useUsuarioLogado();

  async function carregarConversas() {
    setLoading(true);
    try {
      // 1) tenta rota /conversas (antiga)
      let res = await api.get("/conversas", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      // se veio vazio ou status 404/500, tenta rota nova /chat/minhas
      if (!res?.data || (Array.isArray(res.data) && res.data.length === 0)) {
        try {
          res = await api.get("/chat/minhas", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
        } catch (err2) {
          // se deu erro, joga para o catch principal
          throw err2;
        }
      }

      const lista = Array.isArray(res.data) ? res.data : [];
      setConversas(lista);
    } catch (e) {
      console.error("Erro ao carregar conversas:", e);
      toast.error(e.response?.data?.erro || "Erro ao carregar conversas");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // espera usuario carregado (se tiver hook de usuario)
    if (usuario) carregarConversas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario]);

  function abrirConversa(item) {
    // suporta ambos formatos:
    // - item.propostaId (antigo)
    // - item.chatId (novo)
    console.log(item)
    if (item.trabalhoId) {

      navigate(`/chat/${item.trabalhoId}`);
      return;
    }
    if (item.propostaId) {
      navigate(`/servico/${item.propostaId}`);
      return;
    }

    // se backend retornou conversa com somente usuario1Id/usuario2Id, pegamos id
    if (item.usuario1Id && item.usuario2Id) {
      // assumimos chatId presente como item.chatId (se não, abrir criação)
      if (item.chatId) {
        navigate(`/chat/${item.chatId}`);
      } else {
        // fallback: abrir página que inicia chat entre usuários
        const outroId = usuario?.id === item.usuario1Id ? item.usuario2Id : item.usuario1Id;
        navigate(`/chat/novo/${outroId}`);
      }
    }
  }

  if (!usuario) return <p className="p-6">Carregando usuário...</p>;
  if (loading) return <p className="p-6">Carregando conversas...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Minhas Conversas</h1>

      <div className="space-y-3">
        {conversas.map((c, idx) => {
          // normalizar campos para exibição
          // tenta obter id e última mensagem de vários formatos
          const idExibir = c.propostaId ?? c.chatId ?? c.id;
          const ultima = c.ultimaMensagem ?? c.texto ?? c.lastMessage ?? "Nenhuma mensagem ainda";
          const horario = c.horario ?? c.updatedAt ?? c.createdAt ?? null;

          // determinar "outro usuário" quando possível
          let outroUsuarioId = null;
          if (c.usuario1Id && c.usuario2Id && usuario?.id) {
            outroUsuarioId = usuario.id === c.usuario1Id ? c.usuario2Id : c.usuario1Id;
          } else if (c.clienteId && c.freelancerId && usuario?.id) {
            outroUsuarioId = usuario.id === c.clienteId ? c.freelancerId : c.clienteId;
          }

          return (
            <div
              key={idExibir ?? idx}
              className="p-4 border rounded cursor-pointer hover:bg-muted"
              onClick={() => abrirConversa(c)}
            >
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold">
                  {outroUsuarioId ? `Com usuário #${outroUsuarioId}` : `Conversa #${idExibir}`}
                </h2>

                <span className="text-sm text-muted-foreground">
                  {horario ? new Date(horario).toLocaleTimeString() : ""}
                </span>
              </div>

              <p className="text-sm text-muted-foreground mt-1">
                {ultima}
              </p>
            </div>
          );
        })}

        {conversas.length === 0 && (
          <p className="text-center text-muted-foreground">Você ainda não tem conversas.</p>
        )}
      </div>
    </div>
  );
}
