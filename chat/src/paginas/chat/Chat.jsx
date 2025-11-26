import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import api from "../../services/api";
import { useUsuarioLogado } from "@/hooks/useUsuarioLogado";

const socket = io("http://localhost:3000");

export default function Chat() {
  const { propostaId } = useParams();
  const usuario = useUsuarioLogado();
  const [mensagens, setMensagens] = useState([]);
  const [texto, setTexto] = useState("");

  async function carregarMensagens() {
    const res = await api.get(`/chat/${propostaId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });

    setMensagens(res.data);
  }

  useEffect(() => {
    carregarMensagens();

    socket.emit("entrar_sala", propostaId);

    const receberMensagem = (msg) => {
      setMensagens((prev) =>
        prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]
      );
    };

    socket.on("nova_mensagem", receberMensagem);

    return () => {
      socket.off("nova_mensagem", receberMensagem);
    };
  }, [propostaId]);

  async function enviar() {
    if (!texto.trim()) return;

    const body = { propostaId, texto };

    const res = await api.post("/chat/enviar", body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    socket.emit("enviar_mensagem", res.data);
    setTexto("");
  }

  async function aceitarProposta() {
    try {
      await api.post(`/propostas/${propostaId}/aceitar`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      alert("Proposta aceita!");
    } catch (e) {
      alert("Erro ao aceitar proposta");
    }
  }

const [proposta, setProposta] = useState(null);


async function carregarProposta() {
  const res = await api.get(`/propostas/${propostaId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  setProposta(res.data);
}

useEffect(() => {
  carregarMensagens();
  carregarProposta();

  socket.emit("entrar_sala", propostaId);

  const receberMensagem = (msg) => {
    setMensagens((prev) =>
      prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]
    );
  };

  socket.on("nova_mensagem", receberMensagem);

  return () => {
    socket.off("nova_mensagem", receberMensagem);
  };
}, [propostaId]);

const donoDoServico =
  proposta && usuario && proposta.clienteId === usuario.id;

 
  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Chat</h1>

      {donoDoServico && (
        <button
          onClick={aceitarProposta}
          className="bg-green-600 text-white px-4 py-2 rounded mb-4"
        >
          Aceitar Proposta
        </button>
      )}

      <div className="border p-3 h-[400px] overflow-auto rounded">
        {mensagens.map((m) => (
          <div key={m.id} className="mb-2">
            <b>{m.remetenteId}:</b> {m.texto}
          </div>
        ))}
      </div>

      <div className="flex mt-3 gap-2">
        <input
          className="border p-2 flex-1 rounded"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Digite sua mensagem..."
        />

        <button
          onClick={enviar}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
