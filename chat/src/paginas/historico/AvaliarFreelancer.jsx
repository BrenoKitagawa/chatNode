import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function AvaliarFreelancer() {
  const { id } = useParams();
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState("");
  const navigate = useNavigate();

  async function enviar() {
    await api.patch(`/historico/avaliar/${id}`, {
      nota,
      comentario,
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    navigate("/historico");
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Avaliar Freelancer</h1>

      <Input
        type="number"
        min="1"
        max="5"
        value={nota}
        onChange={(e) => setNota(e.target.value)}
        placeholder="Nota 1 a 5"
        className="mb-4"
      />

      <Textarea
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="Comentário"
        className="mb-4"
      />

      <Button onClick={enviar}>Enviar Avaliação</Button>
    </div>
  );
}
