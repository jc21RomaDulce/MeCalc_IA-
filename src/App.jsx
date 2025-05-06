import Calculadora from "./componentes/Calculadora";
import ModoAprendizaje from './componentes/ModoAprendizaje';
import ChatBot from './componentes/ChatBot';

export default function App() {
  return (
    <section className="App">
      <h1>MeCalc_IA</h1>

      <Calculadora />
      <ModoAprendizaje />
      <ChatBot />
    </section>
  );
}