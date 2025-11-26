// src/paginas/trabalhos/TrabalhoDetalhes.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUsuarioLogado } from "@/hooks/useUsuarioLogado";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import api from "../../services/api";

export default function TrabalhoDetalhes() {
  const { id } = useParams(); // id do serviço/trabalho
  const navigate = useNavigate();
  const usuario = useUsuarioLogado();

  const [servico, setServico] = useState(null);
  const [propostasRecebidas, setPropostasRecebidas] = useState([]);
  const [minhaProposta, setMinhaProposta] = useState({ valor: "", descricao: "" });
  const [loading, setLoading] = useState(false);
  const [enviando, setEnviando] = useState(false);

  // carrega serviço + propostas conforme papel do usuário
  async function carregarTudo() {
    if (!usuario) return; // aguarda usuario logado
    setLoading(true);

    try {
      // 1) buscar serviço (usando rota de servicos)
      const svcRes = await api.get(`/servicos/${id}`);
      setServico(svcRes.data);

      // 2) se for dono do serviço, buscar propostas recebidas
      if (svcRes.data.clienteId === usuario.id) {
        // rota: GET /propostas/:id/recebidas  (id = servicoId)
        const resp = await api.get(`/propostas/${id}/recebidas`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setPropostasRecebidas(Array.isArray(resp.data) ? resp.data : []);
      } else {
        // 3) se não for dono, buscar as propostas desse usuário para esse serviço
        const resp = await api.get(`/propostas/${id}/minhas`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setPropostasRecebidas(Array.isArray(resp.data) ? resp.data : []);
      }
    } catch (e) {
      console.error("Erro ao carregar serviço/propostas:", e);
      toast.error(e.response?.data?.erro || "Erro ao carregar trabalho");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // só carrega quando usuario estiver disponível
    if (usuario) carregarTudo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario, id]);

  // enviar proposta (freelancer) - NÃO enviar freelancerId no body
  async function enviarProposta() {
    if (!usuario) {
      toast.error("Usuário não carregado");
      return;
    }

    if (!minhaProposta.valor || !minhaProposta.descricao) {
      toast.error("Preencha valor e descrição");
      return;
    }

    setEnviando(true);
    try {
      const body = {
        trabalhoId: Number(id),
        valor: Number(minhaProposta.valor),
        descricao: minhaProposta.descricao,
      };

      await api.post("/propostas/enviar", body, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      toast.success("Proposta enviada!");
      setMinhaProposta({ valor: "", descricao: "" });
      await carregarTudo(); // atualizar lista
    } catch (e) {
      console.error("Erro ao enviar proposta:", e);
      toast.error(e.response?.data?.erro || "Erro ao enviar proposta");
    } finally {
      setEnviando(false);
    }
  }

  // abrir chat já com id da proposta
  function abrirChat(idProposta) {
    navigate(`/chat/${idProposta}`);
  }

  if (!usuario) return <p className="p-6">Carregando usuário...</p>;
  if (loading || !servico) return <p className="p-6">Carregando trabalho...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{servico.titulo}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">{servico.descricao}</p>

          <p>
            <strong>Categoria:</strong> {servico.categoria ?? "—"}
          </p>

          <p>
            <strong>Valor sugerido:</strong> R$ {servico.valor ?? "—"}
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Criado por usuário #{servico.clienteId}
          </p>
        </CardContent>
      </Card>

      {/* Se for dono do serviço -> listar propostas recebidas */}
      {usuario.id === servico.clienteId ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Propostas Recebidas</h2>

          {propostasRecebidas.length === 0 ? (
            <p>Nenhuma proposta recebida ainda.</p>
          ) : (
            propostasRecebidas.map((p) => (
              <Card key={p.id} className="mb-4">
                <CardHeader>
                  <CardTitle>Proposta de #{p.freelancerId}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">{p.descricao}</p>
                  <p className="font-bold text-green-600">R$ {p.valor}</p>

                  <div className="flex gap-2 mt-3">
                    <Button onClick={() => abrirChat(p.id)}>Abrir Chat</Button>
                    {/* aqui você pode adicionar aceitar/rejeitar proposta */}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </>
      ) : (
        // Se não for dono -> formulário para enviar proposta
        <>
          <h2 className="text-2xl font-bold mb-4">Enviar Proposta</h2>

          <Card className="p-4">
            <Input
              type="number"
              placeholder="Valor"
              value={minhaProposta.valor}
              onChange={(e) => setMinhaProposta({ ...minhaProposta, valor: e.target.value })}
              className="mb-3"
            />

            <Textarea
              placeholder="Descrição da proposta"
              value={minhaProposta.descricao}
              onChange={(e) => setMinhaProposta({ ...minhaProposta, descricao: e.target.value })}
              className="mb-3"
            />

            <Button onClick={enviarProposta} disabled={enviando}>
              {enviando ? "Enviando..." : "Enviar Proposta"}
            </Button>
          </Card>

          {/* mostrar as propostas que esse usuário já enviou (se desejar mostrar) */}
          {propostasRecebidas.length > 0 && (
            <>
              <h3 className="mt-6 text-lg font-semibold">Suas propostas para este serviço</h3>
              <div className="space-y-3 mt-3">
                {propostasRecebidas.map((p) => (
                  <Card key={p.id}>
                    <CardContent>
                      <p className="mb-1">{p.descricao}</p>
                      <p className="text-sm text-muted-foreground">R$ {p.valor}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
