import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Sun, Moon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom";

export default function Header({ usuario, onSair, novasConversas = 0 }) {
  const { theme, setTheme } = useTheme()

const navigate = useNavigate();

function navegar(path) {
  navigate(path);
}
  return (
    <header className="w-full border-b bg-white dark:bg-slate-900 dark:border-slate-700 transition-colors">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <h1
          onClick={() => navegar("principal")}
          className="text-2xl font-bold cursor-pointer text-slate-900 dark:text-slate-100"
        >
          Freelancr
        </h1>

        <nav className="flex items-center gap-6">

          {/* PROPOSTAS */}
          <button
            onClick={() => navegar("principal")}
            className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Trabalhos
          </button>

          {/* CONVERSAS + BADGE */}

<button
  onClick={() => navigate("/propostas/aceitas")}
  className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
>
  Propostas
</button>

 <button
            onClick={() => navigate("/historico")}
            className="hover:text-blue-600 transition"
          >
            Histórico
          </button>

          <button
           onClick={() => navegar("/conversas")}
            className="relative text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Conversas

            {novasConversas > 0 && (
              <Badge className="absolute -top-2 -right-3 bg-red-600 text-white px-2 py-0.5 text-xs rounded-full">
                {novasConversas}
              </Badge>
            )}
          </button>

          {/* TOGGLE DARK MODE */}
        

          {/* MENU DO USUÁRIO */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer">
                <Avatar>
                  <AvatarImage src={usuario?.avatar} />
                  <AvatarFallback className="bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-slate-100">
                    {usuario?.nome?.substring(0, 1)?.toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48 bg-white dark:bg-slate-800 dark:text-slate-100 border dark:border-slate-700">
              <DropdownMenuLabel>{usuario?.nome ?? "Usuário"}</DropdownMenuLabel>
        

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={onSair} className="text-red-600">
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
