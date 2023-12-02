import "./global.css";
import Router from "./routes/sections";
import ThemeProvider from "./theme";

function App() {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

export default App;
