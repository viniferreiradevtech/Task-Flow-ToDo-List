# Task-Flow-ToDo-List
TaskFlow é Um gerenciador de tarefas simples que eu montei pra praticar Python e desenvolvimento web.A ideia surgiu da vontade de ter algo útil no dia a dia, mas principalmente de estudar de ponta a ponta: backend, banco de dados e uma interface que não fosse só o básico. Queria conseguir filtrar tarefas, ver o progresso, categorizar e ainda ter um tema escuro. Nada muito complexo, só algo que fizesse sentido usar.O que dá pra fazer, Você consegue criar, editar, marcar como concluída e excluir tarefas. Tem categorias (Trabalho, Estudos, Pessoal e Outros), prazo opcional, filtros por status e por categoria, busca por texto, cards com o total de tarefas, quantas estão feitas e quantas ainda faltam, além de uma barra de progresso. Também tem tema claro e escuro, e a preferência fica salva no navegador.Como Tecnologias No backend usei Python com Flask e SQLite.

## Funcionalidades

- Criar, editar, concluir e excluir tarefas
- Categorização (Trabalho, Estudos, Pessoal, Outros)
- Prazo opcional por tarefa
- Filtros por status (Todas / Pendentes / Concluídas)
- Filtro por categoria
- Busca por texto
- Cards de resumo (total, concluídas, pendentes)
- Barra de progresso geral
- Tema claro e escuro (preferência salva no `localStorage`)
- Confirmação antes de excluir
- Layout responsivo

No frontend: HTML, CSS e JavaScript puro, com Bootstrap 5 e Bootstrap Icons pra deixar a interface mais limpa.Como rodarVocê precisa ter o Python instalado (de preferência a partir da versão 3.10).
Clone o repositório
Entre na pasta do projeto
(Opcional) Crie um ambiente virtual
Instale as dependências com:
pip install -r requirements.txt
Rode com:
python app.py
Abra no navegador:
http://127.0.0.1:5000
O banco de dados é criado sozinho na primeira vez que você roda.

## Estrutura

app.py → toda a lógica do Flask e do banco
templates/index.html → a página principal
static/style.css → estilos e o tema escuro
static/script.js → filtros, busca, tema e o modal de edição
requirements.txt → dependências


Algumas decisões e o que eu aprendi.Escolhi SQLite porque queria algo simples, sem ter que ficar configurando banco de dados. Foi o suficiente pro tamanho do projeto e me deixou focar mais na aplicação em si.No frontend fui de JavaScript puro. Queria treinar manipulação de DOM, filtros no cliente e uso do localStorage. Tentei manter o código organizado em funções claras pra não virar bagunça.Também coloquei uma pequena lógica pra atualizar o banco antigo caso alguém já tivesse rodado uma versão anterior (quando ainda não existiam as colunas de categoria e prazo). Foi uma forma prática de lidar com isso sem usar ferramentas de migração.O tema escuro e deixar tudo responsivo foram as partes que mais me fizeram prestar atenção em detalhes de CSS. Ainda dá pra melhorar, mas já ficou bem utilizável no celular.

## Possíveis evoluções
O que ainda dá pra evoluir:
- Login de usuário
- Salvar os filtros no navegador
- Avisos de tarefas próximas do prazo
- Colocar online em algum serviço gratuito
- Escrever alguns testes
- Usar no dia a dia