import { useEffect, useState } from "react";
import api from "../../services/api";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function HistoricoFinalizados() {
  const [lista, setLista] = useState([]);
  const navigate = useNavigate();

  async function carregar() {
    const res = await api.get("/historico/finalizados", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setLista(res.data);
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">Histórico de Serviços</h1>

      {lista.map((item) => (
        <Card key={item.id} className="shadow-md">
          <CardHeader>
            <CardTitle>
              Serviço #{item.trabalhoId}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-gray-700">Valor final: <b>R$ {item.valorFinal}</b></p>
            <p>Freelancer: {item.freelancerId}</p>

            {item.notaFreelancer ? (
              <p className="text-yellow-500 mt-2">⭐ {item.notaFreelancer}/5</p>
            ) : (
              <Button
                className="mt-3"
                onClick={() => navigate(`/avaliar/${item.id}`)}
              >
                Avaliar Freelancer
              </Button>
            )}

            <Button
              variant="secondary"
              className="mt-3 ml-3"
              onClick={() => navigate(`/servico/${item.trabalhoId}`)}
            >
              Recontratar Freelancer
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
