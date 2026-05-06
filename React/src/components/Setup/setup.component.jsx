import { useState } from "react";
import { ORIENTATION, REQUIRED_FLEET } from "../../constants";

export default function Setup({ initialName = "", onConfirm }) {
  const [name, setName] = useState(initialName);
  const [orientation, setOrientation] = useState(ORIENTATION.HORIZONTAL);

  //trim para retirar os espaços
  const isNameValid = name.trim().length >= 2;

  //validar  a subminção do formulario
  function handleSubmit(event) {
    //Impedir o refresh da página html
    event.preventDefault();

    if (!isNameValid) return;

    onConfirm({
      name: name.trim(),
      orientation,
    });
  }
  return (
    <section>
      <h2>Configuração Inicial</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Nome do jogador:
          <input
            type="text"
            value={name}
            onChange={(e) => e.target.value}
            placeholder="EX: João"
          />
        </label>

        <div style="margin-top: 12px;">
          <div>Orientação do navio:</div>

          <label>
            <input type="radio" name="orientation" checked />
            Horizontal
          </label>

          <label style="margin-left: 12px;">
            <input type="radio" name="orientation" />
            Vertical
          </label>
        </div>

        <div style="margin-top: 12px;">
          Frota obrigatória: Porta-aviões, Couraçado, Submarino
        </div>

        <button type="submit" style="margin-top: 12px;">
          Confirmar e começar a posicionar
        </button>

        <div style="margin-top: 8px;">
          O nome deve ter pelo menos 2 caracteres.
        </div>
      </form>
    </section>
  );
}

//////OLhar para a ficha 9
/*
  return (
    <section>
      <h2>Configuração Inicial</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Nome do jogador:
          <input
            type="text"
            value={name}
            // 4. Manipulação de eventos inline com arrow functions (como ensinado na Ficha 9)
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Joao"
          />
        </label>

        <div style={{ marginTop: 12 }}>
          <div>Orientação do navio:</div>

          <label>
            <input
              type="radio"
              name="orientation"
              checked={orientation === ORIENTATION.HORIZONTAL}
              onChange={() => setOrientation(ORIENTATION.HORIZONTAL)}
            />
            Horizontal
          </label>

          <label style={{ marginLeft: 12 }}>
            <input
              type="radio"
              name="orientation"
              checked={orientation === ORIENTATION.VERTICAL}
              onChange={() => setOrientation(ORIENTATION.VERTICAL)}
            />
            Vertical
          </label>
        </div>

        <div style={{ marginTop: 12 }}>
          Frota obrigatória: {REQUIRED_FLEET.join(", ")}
        </div>

        <button type="submit" disabled={!isNameValid} style={{ marginTop: 12 }}>
          Confirmar e começar a posicionar
        </button>

        {!isNameValid && (
          <div style={{ marginTop: 8 }}>
            O nome deve ter pelo menos 2 caracteres.
          </div>
        )}
      </form>
    </section>

*/
