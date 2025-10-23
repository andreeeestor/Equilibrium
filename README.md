# Equilibrium: Seu Terapeuta Pessoal com IA

Equilibrium é uma aplicação web full-stack moderna que oferece um companheiro de saúde mental baseado em Inteligência Artificial. Construído do zero, este projeto simula uma experiência terapêutica completa, desde o rastreamento de humor até sessões de chat interativas com uma IA avançada (Google Gemini).

Este projeto foi desenvolvido não apenas como uma ferramenta funcional, mas como uma demonstração robusta de arquitetura de software moderna, integrando um front-end reativo, um back-end seguro, um banco de dados NoSQL e serviços de IA de ponta.

---

## 🚀 Principais Funcionalidades

* 🧠 **Agente Terapêutico de IA**: Converse em tempo real com um agente de IA (Google Gemini) treinado para fornecer apoio e insights sobre saúde mental.
* 📊 **Painel de Controle (Dashboard)**: Interface moderna para rastrear o humor, visualizar estatísticas de bem-estar e acessar atividades.
* 🧘‍♂️ **Jogos de Relaxamento**: Minijogos interativos integrados (como exercícios de respiração e jardim zen) para ajudar a aliviar a ansiedade.
* 🔒 **Autenticação Segura**: Registro e login de usuários usando JWT (JSON Web Tokens) e sessões de banco de dados.
* 🎨 **Interface Moderna**: Design limpo e responsivo (mobile-first) construído com Next.js, Tailwind CSS e Shadcn/ui, incluindo modos claro e escuro.
* 🔄 **Tarefas Assíncronas**: Uso do Ingest para lidar com tarefas pesadas em segundo plano, como análise de sessões de terapia, garantindo que a interface permaneça rápida.

---

## 🛠️ Stack de Tecnologia (Tech Stack)

### Frontend

| Tecnologia    | Descrição                                                         |
| ------------- | ----------------------------------------------------------------- |
| Next.js       | Framework React para renderização do lado do servidor (SSR) e UI. |
| React         | Biblioteca principal para a construção da interface do usuário.   |
| Tailwind CSS  | Framework CSS utility-first para estilização rápida e responsiva. |
| Shadcn/ui     | Coleção de componentes de UI acessíveis e reutilizáveis.          |
| Framer Motion | Para animações fluidas e modernas na interface.                   |

### Backend

| Tecnologia    | Descrição                                                               |
| ------------- | ----------------------------------------------------------------------- |
| Node.js       | Ambiente de execução JavaScript do lado do servidor.                    |
| Express.js    | Framework web para a construção da API RESTful.                         |
| MongoDB       | Banco de dados NoSQL para armazenar dados de usuários, sessões e chats. |
| Mongoose      | ODM (Object Data Modeling) para modelagem e interação com o MongoDB.    |
| Google Gemini | API de Inteligência Artificial usada para alimentar o agente terapeuta. |
| Ingest        | Plataforma para gerenciar tarefas assíncronas e em segundo plano.       |
| JWT           | Para autenticação e gerenciamento seguro de sessões de usuário.         |

---

## 🏛️ Arquitetura Simplificada

1. O **Frontend** (Next.js) interage com o usuário e se comunica com o **Backend** via API REST.
2. O **Backend** (Node.js/Express) recebe solicitações, valida autenticação (JWT) e interage com o MongoDB.
3. Para interações de chat, o Backend envia a conversa para a API do Google Gemini.
4. Para tarefas pesadas (como "Analisar Sessão"), o Backend envia um evento para o **Ingest**, que processa a tarefa de forma assíncrona e atualiza o banco de dados sem bloquear o usuário.

---

## 🚦 Rodando o Projeto Localmente

Para executar o Equilibrium em sua máquina local, você precisará clonar o repositório e configurar tanto o frontend quanto o backend.

### Pré-requisitos

* Node.js (v18 ou superior)
* Git
* Conta no MongoDB Atlas (para a URI do banco)
* Chave de API do Google AI Studio (Gemini)

---

### 1. Configuração do Backend

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/equilibrium.git
cd equilibrium/backend

# 2. Instale as dependências
npm install

# 3. Crie um arquivo .env na raiz da pasta /backend
#    e adicione as seguintes variáveis:
```

**backend/.env.example**

```
# Porta do servidor
PORT=3001

# String de conexão do MongoDB Atlas
MONGODB_URI="mongodb+srv://..."

# Chave secreta para assinar os JWTs
JWT_SECRET="SEU_SEGREDO_SUPER_FORTE_AQUI"

# Chave de API do Google Gemini
GEMINI_API_KEY="SUA_CHAVE_GEMINI_AQUI"

# (Se estiver usando Ingest, adicione as chaves dele aqui)
```

```bash
# 4. Inicie o servidor de desenvolvimento
npm run dev
```

O servidor backend estará rodando em: `http://localhost:3001`.

---

### 2. Configuração do Frontend

```bash
# 1. Em um novo terminal, navegue até a pasta do frontend
cd ../frontend

# 2. Instale as dependências
npm install

# 3. Crie um arquivo .env.local na raiz da pasta /frontend
#    e aponte para a URL do seu backend:
```

**frontend/.env.local**

```
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

```bash
# 4. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará acessível em: `http://localhost:3000`.

---

## 📄 Licença

Este projeto é apenas para fins educacionais e de portfólio.
