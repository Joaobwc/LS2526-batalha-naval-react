# AI Context — TP React “Batalha Naval Avançada” (LS 2025/2026)

Este ficheiro é a **fonte de verdade** do projeto. Todas as decisões e implementação devem respeitar o **enunciado**.

## 1) Objetivo do TP

Desenvolver uma aplicação em **React 19** que implemente uma variante “Batalha Naval Avançada”, com vertente tática e gestão de recursos:

- 2 adversários: **Jogador** vs **Computador**
- Tabuleiro quadrado (mínimo **10x10**)
- Objetivo: **destruir toda a frota adversária** ou ganhar por **combustível** (o adversário fica sem combustível / o jogador fica sem combustível e perde de imediato)

O trabalho será defendido oralmente; qualquer elemento deve saber explicar toda a lógica e arquitetura.

---

## 2) Restrições obrigatórias (enunciado)

### Obrigatório

- **React 19**
- **Componentes funcionais**
- **Hooks** (ex.: `useState`, `useEffect`, `useMemo`, `useCallback`)
- Aplicação **não monolítica**: separar a UI em múltiplos componentes com responsabilidades claras
- **Gestão de estado com `useState` distribuído**: **não** centralizar tudo no `App`

### Proibido

- `useReducer`
- **Context API**
- Bibliotecas externas de estado (ex.: Redux, Zustand, etc.)
- **Manipulação direta do DOM** (sob pena de anulação do requisito):
  - `getElementById` (exceto o nó raiz da app)
  - `querySelector`
  - `addEventListener` manual (usar eventos sintéticos do React, ex.: `onClick`)
- Bibliotecas de componentes React pré-feitos:
  - Material UI
  - Ant Design
  - React Bootstrap / Reactstrap

### Permitido

- Bibliotecas utilitárias de CSS para layout:
  - Bootstrap
  - Tailwind CSS

---

## 3) Componentes mínimos (ou equivalentes)

A interface deve estar organizada, no mínimo, em:

- **Board**: tabuleiro (grelha NxN)
- **Cell / Square**: célula individual
- **Dashboard / ControlPanel**: cronómetro, combustível, radar (estado disponível/indisponível)
- **Setup**: fase de posicionamento manual da frota do jogador
- **GameOver / Results**: ecrã final com vencedor, nº de jogadas e “Jogar Novamente”

> Nota: podem existir outros componentes (Header/Footer, menus, etc.) desde que os acima existam (ou equivalentes claros).

---

## 4) Modelo de domínio (termos e estados)

### Entidades / conceitos

- **Jogador**: nome, combustível, estado do radar, contagem de jogadas
- **Computador**: frota (pré-definida ou aleatória), lógica de IA (básica ou avançada)
- **Tabuleiro**: matriz NxN de células
- **Navio**: conjunto de células contíguas (horizontal ou vertical), tamanho conforme frota
- **Tiro**: tentativa de atacar uma célula do adversário
- **Turno**: jogada do jogador com limite temporal (15s), alternado com turno do computador

### Estados visuais das células (obrigatórios)

A UI deve distinguir e renderizar 4 estados:

1. **Água (não explorada)**
2. **Tiro Falhado (água explorada)**
3. **Acerto (parte do navio atingida)**
4. **Navio Destruído (navio totalmente afundado)**

#### Representação recomendada (no estado)

Usar strings/constantes (em `src/constants/`) para evitar “magic strings”, por exemplo:

- `UNKNOWN_WATER`
- `MISS`
- `HIT`
- `SUNK`

> Importante: o estado do tabuleiro deve permitir distinguir “célula com navio mas ainda escondida” (para debug/mostrar frota) vs “estado do tiro”. Isto pode ser feito com:

- dois campos por célula (recomendado): `hasShip: boolean` e `shotState: ...`
  ou
- uma estrutura equivalente que permita cumprir debug + 4 estados visuais.

---

## 5) Regras do jogo (obrigatórias)

### 5.1 Tabuleiro

- Quadrado com dimensão mínima **10x10**
- Recomenda-se definir `BOARD_SIZE = 10` (configurável)

### 5.2 Frota do jogador (obrigatória)

Composição:

- 1 navio de tamanho **5**
- 1 navio de tamanho **4**
- 2 navios de tamanho **3**
- 2 navios de tamanho **2**

### 5.3 Posicionamento manual (fase Setup)

- Tabuleiro vazio
- Jogador escolhe **orientação** (horizontal / vertical) num menu/botão
- Jogador **clica** no tabuleiro para colocar o navio atual
- Validações obrigatórias:
  - Sem sobreposição
  - Sem sair fora dos limites

### 5.4 Configuração do computador

Deve existir menu/lista para escolher:

- **3 tabuleiros** com frota **pré-definida** para o computador **OU**
- opção **“frota aleatória”** (gerar posicionamento válido automaticamente)

### 5.5 Modo Debug/Testes

- Checkbox para **mostrar/esconder** a frota “invisível” do computador
- Serve para testes/correção do docente
- Deve ser funcional (alterar o que é renderizado no tabuleiro do computador)

### 5.6 Combustível (gestão de recurso)

- Jogador inicia com **100** (máximo permitido = 100)
- Cada disparo consome **5**
- Se acertar num navio inimigo: recupera **10** (sem ultrapassar 100)
- Se o tempo do turno esgotar: penalização de **-5**
- Se combustível chegar a **0**: jogador **perde imediatamente**

### 5.7 Cronómetro de turno (tempo de jogada)

- O jogador tem **15 segundos** por jogada
- O cronómetro deve ser:
  - visível
  - atualizado em tempo real (contagem decrescente 15 → 0)
- Se chegar a 0:
  - o turno passa **automaticamente** para o computador
  - aplica penalização de combustível **-5**

### 5.8 Radar inteligente (recompensa)

- Radar fica disponível **apenas** se:
  - o jogador **acertar** num navio inimigo, **e**
  - a jogada foi feita em **menos de 3 segundos**
- Ativar radar é **ação livre**:
  - **não** consome turno
  - **não** consome combustível
- Ao ativar:
  - destacar no tabuleiro do computador uma área **2x2**
  - essa área deve conter **pelo menos** uma parte de navio **ainda não atingida**
- Radar é de uso único por **cada ativação obtida** (ganhas “1 uso”; gastas ao clicar)

### 5.9 IA do computador (dois níveis)

- **Básico (menos valorizado)**:
  - escolhe uma posição aleatória **não atacada anteriormente**
- **Avançado (mais valorizado)**:
  - atira aleatoriamente até **acertar** num navio
  - após o primeiro hit, passa a atacar **posições adjacentes** (H/V) até **afundar** esse navio
  - depois de afundar, volta ao modo aleatório
  - nunca repetir tiros em células já atacadas

### 5.10 Fim de jogo

Quando existir vencedor (por destruir frota ou combustível a 0):

- Mostrar ecrã final com:
  - **Vencedor**
  - **Número de jogadas efetuadas**
  - Botão **“Jogar Novamente”** que reinicia **todos os estados** para nova partida

---

## 6) Arquitetura sugerida (compatível com restrições)

### Objetivo

Manter o UI em React simples e separar “lógica de jogo” em funções puras para facilitar testes e manutenção.

### Estrutura sugerida (sem useReducer/Context)

- `src/components/`  
  Componentes de UI (Board, Square/Cell, Setup, ControlPanel, GameOver, etc.)
- `src/helpers/` (já existe)  
  Funções utilitárias (puras) já existentes/novas
- `src/constants/` (já existe)  
  Constantes do jogo (tamanho do board, frota, estados de célula, etc.)
- (Opcional) criar `src/game/`  
  Motor do jogo (validações, geração aleatória, IA) **sem React**.

### Gestão de estado (regras)

- Manter estado próximo de onde é usado (ex.: UI local em componentes)
- “Elevar estado” apenas quando necessário para comunicação entre componentes irmãos
- Evitar mutação de arrays/objetos:
  - copiar com `map`, `slice`, spread `{...}`, `[...arr]`
- Efeitos/timers:
  - `setInterval`/`setTimeout` devem ter **cleanup** no `useEffect`

---

## 7) Convenções do projeto

### Código

- Componentes: `PascalCase` (ex.: `ControlPanel.jsx`)
- Hooks custom: `useX` (ex.: `useTurnTimer`)
- Funções puras em helpers/game: nomes verbais (ex.: `canPlaceShip`, `applyShot`)

### CSS

- Manter CSS por componente (como já existe: `board.css`, `square.css`, etc.)
- Classes com nomes sem ambiguidade (ex.: `.cell--hit`, `.cell--miss`, `.cell--sunk`)

### Boas práticas (check)

- Cada célula renderizada tem `key` estável
- Não usar DOM APIs proibidas
- Não duplicar lógica de validação (centralizar em helpers)
- Garantir “reset total” no reinício do jogo

---

## 8) Assunções (configuráveis)

Se o enunciado não especificar algo, documentar aqui e manter configurável:

- Dimensão do tabuleiro: usar **10x10** por defeito (mínimo)
- Representação interna de navios/tabuleiro: livre, desde que cumpra 4 estados visuais + debug + validações
- “Número de jogadas efetuadas”: contabilizar como total de tiros (jogador + computador) — **confirmar durante implementação** e manter coerente

---

## 9) Como pedir ajuda ao Copilot/Chat (para ser eficiente)

Quando pedires ajuda:

- Indica o **requisito do enunciado** que estás a implementar (ex.: “Radar <3s + hit”)
- Cola o **erro do console/stacktrace** (se existir)
- Indica o **comportamento atual** vs **esperado**
- Cola o **excerto do código** relevante (ficheiro + linhas aproximadas)
- Diz se já há restrições extra (ex.: “sem Tailwind” / “usar CSS atual”)
