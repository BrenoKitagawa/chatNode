import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUsuarioLogado } from "@/hooks/useUsuarioLogado";

export default function PropostasAceitas() {
  const [propostas, setPropostas] = useState([]);
  const usuario = useUsuarioLogado();
  const navigate = useNavigate();

  async function carregar() {
    const res = await api.get("/propostas/aceitas", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    setPropostas(res.data);
  }

  useEffect(() => {
    if (usuario) carregar();
  }, [usuario]);

  async function finalizar(id) {
    if (!confirm("Deseja realmente finalizar este serviço?")) return;

    await api.patch(`/propostas/${id}/finalizar`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

  navigate(`/avaliar/${id}`);
    carregar();
  }

  if (!usuario) return <p className="p-6">Carregando...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Propostas Aceitas</h1>

      {propostas.length === 0 ? (
        <p className="text-muted-foreground">Nenhuma proposta aceita.</p>
      ) : (
        <div className="space-y-4">
          {propostas.map((p) => {

            const souDono = p.clienteId === usuario.id;

            return (
              <Card key={p.id} className="shadow">
                <CardHeader>
                  <CardTitle>
                    Serviço #{p.trabalhoId} • Proposta #{p.id}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-700 mb-2">{p.descricao}</p>

                  <p className="font-semibold text-green-600 text-lg">
                    R$ {p.valor}
                  </p>

                  <p className="text-sm text-muted-foreground mt-2">
                    Cliente: <b>{p.clienteId}</b> — Freelancer: <b>{p.freelancerId}</b>
                  </p>

                  <div className="flex gap-3 mt-4">

                    <Button onClick={() => navigate(`/servico/${p.trabalhoId}`)}>
                      Ver Serviço
                    </Button>

                    <Button
                      variant="secondary"
                      onClick={() => navigate(`/chat/${p.id}`)}
                    >
                      Conversar
                    </Button>

                    {souDono && p.status === "aceita" && (
                      <Button
                        variant="destructive"
                        onClick={() => finalizar(p.id)}
                      >
                        Finalizar Serviço
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
