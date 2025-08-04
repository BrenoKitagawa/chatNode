import { ThemeProvider } from "@/components/theme-provider"
import Rotas from "./Rotas"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {<Rotas/>}
    </ThemeProvider>
  )
}

export default App