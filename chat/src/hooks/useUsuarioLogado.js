import { useEffect, useState } from "react";

export function useUsuarioLogado() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function carregar() {
      const token = localStorage.getItem("token");

      if (!token) return;

      const resposta = await fetch("http://localhost:3000/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (resposta.ok) {
        const dados = await resposta.json();
        setUsuario(dados);
      }
    }

    carregar();
  }, []);

  return usuario;
}
