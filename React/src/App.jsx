import React, { useState } from "react";
import "./assets/styles/App.css";
//import criarNavio from "./helpers/criarNavio";

import { Header, Footer, Game } from "./components";

function App() {
  return (
    <div id="container">
      <Header />
      <main>
        <Game />
      </main>
      <Footer />
    </div>
  );
}

export default App;
