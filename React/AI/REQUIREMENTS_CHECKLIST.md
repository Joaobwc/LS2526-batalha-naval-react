# Checklist de Requisitos — TP “Batalha Naval Avançada” (React)

Checklist verificável baseada no enunciado + critérios de avaliação.  
Cada item inclui um **Critério de aceitação** (como confirmar que está feito).

---

## 1) Setup inicial (nome do jogador, vez destacada) — 7.5%

- [ ] O sistema solicita o **nome do jogador** antes do início do jogo.  
      **Aceitação:** ao abrir a app, existe um ecrã/modal/step que impede começar sem nome.
- [ ] O nome do jogador é **apresentado na UI** durante o jogo.  
      **Aceitação:** o dashboard/header mostra o nome após confirmação.
- [ ] A UI destaca visualmente **de quem é a vez**.  
      **Aceitação:** há indicador claro “Turno do Jogador/Computador” e muda corretamente após jogada/timeout.

---

## 2) Tabuleiro e estados (4 estados visuais) — 10%

- [ ] Existem dois tabuleiros (Jogador e Computador) lado a lado (ou layout equivalente claro).  
      **Aceitação:** visualmente distinguíveis; cada um é uma grelha NxN.
- [ ] Tabuleiro com dimensão mínima **10x10**.  
      **Aceitação:** grid tem no mínimo 10 linhas e 10 colunas.
- [ ] As células suportam e renderizam os 4 estados obrigatórios:
  - [ ] Água (não explorada)
  - [ ] Tiro Falhado (água explorada)
  - [ ] Acerto
  - [ ] Navio Destruído  
        **Aceitação:** ao jogar, cada ação altera a célula e o estilo/estado apresentado na UI é correto.

---

## 3) Posicionamento da frota do jogador (orientação e validações) — 15%

- [ ] Existe fase **Setup** com tabuleiro vazio para o jogador.  
      **Aceitação:** antes do jogo começar, o utilizador vê apenas a colocação da frota.
- [ ] Existe controlo para escolher **orientação** (horizontal/vertical).  
      **Aceitação:** ao alternar orientação, o preview/colocação muda.
- [ ] Colocação por **clique** no tabuleiro.  
      **Aceitação:** clicar numa célula coloca navio (ou rejeita com feedback).
- [ ] Validação de **limites** (não permite sair fora do tabuleiro).  
      **Aceitação:** tentativa inválida é recusada.
- [ ] Validação de **sobreposição** (navios não podem sobrepor).  
      **Aceitação:** tentativa inválida é recusada.
- [ ] Frota obrigatória completa:
  - [ ] 1× tamanho 5
  - [ ] 1× tamanho 4
  - [ ] 2× tamanho 3
  - [ ] 2× tamanho 2  
        **Aceitação:** o setup obriga a colocar exatamente estes navios antes de iniciar o jogo.

---

## 4) Configuração do PC + Debug — 10%

- [ ] Menu/lista para escolher **3 frotas pré-definidas** para o computador.  
      **Aceitação:** existem 3 opções selecionáveis e produzem tabuleiros diferentes.
- [ ] Opção “**frota aleatória**” que gera posicionamento válido autonomamente.  
      **Aceitação:** ao selecionar, o PC gera frota sem sobreposição e dentro dos limites.
- [ ] Checkbox **Debug/Testes** para mostrar/esconder frota do computador.  
      **Aceitação:** quando ativa, as posições dos navios do PC ficam visíveis; quando desativa, ficam escondidas (mantendo estados de tiros).

---

## 5) Tempo de jogada (15s, auto-pass, penalização) — 10%

- [ ] Cronómetro de turno do jogador: **15 → 0** visível e em tempo real.  
      **Aceitação:** contador desce a cada segundo e reinicia a cada turno do jogador.
- [ ] Se chegar a 0, o turno passa **automaticamente** para o computador.  
      **Aceitação:** sem clique do jogador, o estado muda para turno do PC.
- [ ] Penalização por timeout: **-5 combustível**.  
      **Aceitação:** ao expirar, o combustível reduz 5 (respeitando a regra de derrota se chegar a 0).

---

## 6) Combustível (regras completas) — 10%

- [ ] Combustível inicial do jogador: **100** (máximo 100).  
      **Aceitação:** ao iniciar partida, UI mostra 100.
- [ ] Cada disparo do jogador consome **5**.  
      **Aceitação:** após jogador disparar, combustível reduz exatamente 5.
- [ ] Ao acertar num navio inimigo, o jogador recupera **10** (até 100).  
      **Aceitação:** num hit, combustível aumenta 10 sem passar de 100.
- [ ] Timeout penaliza **-5** (além do consumo por disparo, se aplicável ao turno seguinte).  
      **Aceitação:** expirar tempo aplica imediatamente -5.
- [ ] Se combustível chegar a **0**, o jogador **perde imediatamente**.  
      **Aceitação:** ao atingir 0, aparece ecrã final com vitória do PC (sem permitir continuar).

---

## 7) Radar inteligente (condições + grelha 2x2 + uso único) — 10%

- [ ] Radar só desbloqueia se o jogador:
  - [ ] fizer a jogada em **< 3 segundos**, e
  - [ ] resultar em **acerto** num navio inimigo  
        **Aceitação:** acertar em ≥3s não desbloqueia; falhar em <3s não desbloqueia.
- [ ] Botão Radar mostra “**Disponível/Indisponível**”.  
      **Aceitação:** estado do botão é coerente com a regra de mérito.
- [ ] Ativar Radar é ação livre (não consome turno nem combustível).  
      **Aceitação:** ao clicar Radar, não muda o turno nem o combustível.
- [ ] Radar destaca uma área **2x2** no tabuleiro do PC contendo pelo menos uma parte de navio **ainda não atingida**.  
      **Aceitação:** a zona destacada cumpre a regra; não pode destacar uma 2x2 sem qualquer parte de navio “por descobrir”.
- [ ] Uso único por ativação obtida.  
      **Aceitação:** depois de usar, torna a ficar indisponível até voltar a cumprir critério (<3s + hit).

---

## 8) IA do PC (básico e avançado) — até 17.5%

### Básico (5%)

- [ ] PC dispara aleatoriamente em células **não atacadas**.  
      **Aceitação:** em N jogadas, nunca repete um tiro.

### Avançado (17.5%)

- [ ] PC procura aleatoriamente até obter **hit**.  
      **Aceitação:** comportamento inicial é aleatório sem repetição.
- [ ] Após hit, PC ataca **adjacentes (H/V)** até afundar o navio.  
      **Aceitação:** sequência após o hit prioriza adjacentes válidas e persiste até o navio estar destruído.
- [ ] Após afundar, PC volta ao modo aleatório.  
      **Aceitação:** após “sunk”, próxima escolha volta a ser aleatória (sem repetição de tiros).
- [ ] PC nunca repete tiros.  
      **Aceitação:** nenhuma jogada do PC escolhe célula já atacada.

---

## 9) Fim de jogo (vencedor, jogadas, restart) — 5%

- [ ] Deteta fim de jogo por:
  - [ ] destruição total da frota
  - [ ] combustível do jogador a 0  
        **Aceitação:** ambos os casos mostram ecrã final de forma imediata e correta.
- [ ] Ecrã final apresenta:
  - [ ] vencedor
  - [ ] nº total de jogadas efetuadas
  - [ ] botão “Jogar Novamente”  
        **Aceitação:** elementos visíveis e corretos.
- [ ] “Jogar Novamente” reinicia **todos os estados**.  
      **Aceitação:** novo jogo começa como no primeiro arranque (nome/Setup conforme desenho), sem lixo de estado anterior.

---

## 10) Restrições técnicas (penalizações se violadas)

- [ ] Sem `useReducer`.  
      **Aceitação:** pesquisa no workspace não encontra `useReducer(`.
- [ ] Sem Context API (`createContext`, `useContext`).  
      **Aceitação:** pesquisa no workspace não encontra `createContext`/`useContext`.
- [ ] Sem libs externas de estado (Redux, etc.).  
      **Aceitação:** `package.json` não inclui libs de state management extra.
- [ ] Sem manipulação direta do DOM (exceto root):
  - [ ] sem `getElementById` (exceto root)
  - [ ] sem `querySelector`
  - [ ] sem `addEventListener` manual  
        **Aceitação:** pesquisa global não encontra estes usos.
- [ ] Sem bibliotecas de componentes (MUI/AntD/ReactBootstrap).  
      **Aceitação:** `package.json` não inclui essas libs; UI composta por componentes próprios.
- [ ] App não é monolítica; componentes mínimos existem.  
      **Aceitação:** existem componentes Board/Cell/Setup/ControlPanel/GameOver (ou equivalentes) e responsabilidades claras.

---

## 11) Relatório (máx 3 páginas)

- [ ] Relatório técnico em PDF com **até 3 páginas**.  
      **Aceitação:** PDF validado e curto.
- [ ] Inclui diagrama de componentes.  
      **Aceitação:** diagrama mostra componentes principais e relações (props).
- [ ] Descreve funcionalidades dos componentes e soluções adotadas.  
      **Aceitação:** texto explica decisões (estado, timer, radar, IA, validações).
- [ ] Pronto para defesa (qualquer elemento explica e altera código).  
      **Aceitação:** equipa consegue justificar arquitetura e demonstrar funcionamento.

---
