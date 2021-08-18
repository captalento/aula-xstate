import "../App.css";
import React from "react";
import { useMachine } from "@xstate/react";
import { appMachine } from "./machine";
import Home from "./home";

function App() {
  const [state, dispatch] = useMachine(appMachine, {});
  const [email, setEmail] = React.useState("");
  return (
    <div className="App">
      {state.matches("show-login") ? (
        <section>
          <h1>Login</h1>
          <button onClick={() => dispatch("go-to-forgot")}>
            esqueci minha senha
          </button>
          <br />
          <button onClick={() => dispatch("logar")}>Logar</button>
        </section>
      ) : null}

      {console.log({ stateAtual: state.value })}
      
      {console.log({ contexto: state.context })}

      {state.matches("show-forgot") ? (
        <section>
          <h1>Digite seu email para recuperar sua conta</h1>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <button onClick={() => dispatch({ type: "go-to-info", email })}>
            Enviar
          </button>
        </section>
      ) : null}

      {state.matches("show-info") ? (
        <section>
          <h1>Enviamos um email para {state.context?.email}</h1>

          <button onClick={() => dispatch("go-to-login")}>
            Voltar para login
          </button>
        </section>
      ) : null}

      {state.matches("show-home") ? <Home /> : null}
    </div>
  );
}

export default App;
