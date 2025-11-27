import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Header from "@/components/Header";
import { useUsuarioLogado } from "@/hooks/useUsuarioLogado";
import { useNavigate } from "react-router-dom";

export default function Principal() {
  const usuario = useUsuarioLogado();
  const navigate = useNavigate();

  const [servicos, setServicos] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  function sair() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  // -----------------------------
  // FORMULARIO DO MODAL (SERVIÇO)
  // -----------------------------
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    valor: "",
    categoria: "",
  });

  useEffect(() => {
    if (usuario) {
      setForm((f) => ({ ...f, clienteId: usuario.id }));
    }
  }, [usuario]);

  // -----------------------------
  // FILTRO
  // -----------------------------
  const [filtro, setFiltro] = useState({
    busca: "",
    min: "",
    max: "",
  });

  // -----------------------------
  // CARREGAR SERVIÇOS DO BACK
  // -----------------------------
  async function carregarServicos() {
const resposta = await fetch("http://localhost:3000/servicos", {
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
  }
});
    const dados = await resposta.json();

    setServicos(Array.isArray(dados) ? dados : []);
  }

  useEffect(() => {
    carregarServicos();
  }, []);

  // -----------------------------
  // CRIAR SERVIÇO
  // -----------------------------
  async function criarServico() {
    if (!usuario) {
      alert("Usuário não carregado ainda");
      return;
    }

 const resposta = await fetch("http://localhost:3000/servicos", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
  },
  body: JSON.stringify(form),
});
    if (resposta.ok) {
      setOpenModal(false);
      carregarServicos();
      setForm({
        titulo: "",
        descricao: "",
        valor: "",
        categoria: "",
      });
    } else {
      alert("Erro ao criar serviço!");
    }
  }


const [propostas, setPropostas] = useState([]);

async function carregarPropostas() {
  const resposta = await fetch("http://localhost:3000/propostas", {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const dados = await resposta.json();

  console.log("Propostas carregadas:", dados);

  setPropostas(Array.isArray(dados) ? dados : []);
}


useEffect(() => {
  carregarServicos();
  carregarPropostas();
}, []);

const servicosFiltrados = servicos.filter((servico) => {
  
  // Oculta serviços com proposta ativa
  const propostaBloqueiaServico = propostas.some(
    (p) =>
      p.trabalhoId === servico.id &&
      ["aceita", "finalizado", "em_andamento"].includes(p.status)
  );

  if (propostaBloqueiaServico) return false;

  // filtros normais
  const buscaMatch =
    filtro.busca === "" ||
    servico.titulo.toLowerCase().includes(filtro.busca.toLowerCase()) ||
    servico.descricao.toLowerCase().includes(filtro.busca.toLowerCase());

  const minMatch = filtro.min === "" || servico.valor >= Number(filtro.min);
  const maxMatch = filtro.max === "" || servico.valor <= Number(filtro.max);

  return buscaMatch && minMatch && maxMatch;
});




  if (!usuario) return <p className="p-6">Carregando usuário...</p>;

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <>

      <div className="max-w-4xl mx-auto p-6">

        {/* Header + botão */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Serviços Disponíveis</h1>

          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
              <Button>Criar Serviço</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Novo Serviço</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <Input
                  placeholder="Título"
                  value={form.titulo}
                  onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                />

                <Textarea
                  placeholder="Descrição"
                  value={form.descricao}
                  onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                />

                <Input
                  type="number"
                  placeholder="Valor"
                  value={form.valor}
                  onChange={(e) => setForm({ ...form, valor: Number(e.target.value) })}
                />

                <Input
                  placeholder="Categoria"
                  value={form.categoria}
                  onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                />

                <Button onClick={criarServico} className="w-full">
                  Criar Serviço
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* FILTROS */}
        <div className="bg-muted p-4 rounded-md mb-6 space-y-4">
          <Input
            placeholder="Buscar por título ou descrição"
            value={filtro.busca}
            onChange={(e) => setFiltro({ ...filtro, busca: e.target.value })}
          />

          <div className="flex gap-4">
            <Input
              type="number"
              placeholder="Valor mínimo"
              value={filtro.min}
              onChange={(e) => setFiltro({ ...filtro, min: e.target.value })}
            />

            <Input
              type="number"
              placeholder="Valor máximo"
              value={filtro.max}
              onChange={(e) => setFiltro({ ...filtro, max: e.target.value })}
            />
          </div>
        </div>

       <div className="space-y-4">
  {servicosFiltrados
    .filter((s) => s.status !== "aceito") // ⬅️ remove aceitos da lista
    .map((s) => (
      <Card key={s.id} className="shadow-md">
        <CardHeader>
          <CardTitle>{s.titulo}</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-gray-700 mb-2">{s.descricao}</p>

          <p className="text-sm text-gray-500 mb-4">
            Criado por: <b>{s.clienteId}</b>
          </p>

          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-green-600">
              R$ {s.valor}
            </span>

            <Button onClick={() => navigate(`/servico/${s.id}`)}>
              Ver Detalhes
            </Button>
          </div>
        </CardContent>
      </Card>
    ))}

  {servicosFiltrados.filter((s) => s.status !== "aceito").length === 0 && (
    <p className="text-center text-muted-foreground">
      Nenhum serviço disponível.
    </p>
  )}
</div>
      </div>
    </>
  );
}
