# 📚 **Biblioteca Virtual**

Uma aplicação web intuitiva feita com **React**, ideal para gerenciamento de livros em uma biblioteca digital. A aplicação permite **cadastrar, editar, listar e excluir livros**, integrando com um backend por meio de uma API REST.

✨ Interface moderna e responsiva construída com **Tailwind CSS**.
🔁 Atualizações em tempo real com **mensagens de feedback visuais**.

## 🚀 **Funcionalidades**

-✅ **Cadastrar** novo livro
-📝 **Editar** informações de livros existentes
-❌ **Excluir** livros
-📋 **Listar** todos os livros cadastrados
-🔔 **Mensagens** visuais de sucesso e erro


## 🧑‍💻 **Tecnologias Utilizadas**

| 🔧 Tecnologia   | 💡 Descrição                                                |
|----------------|-------------------------------------------------------------|
| **React**       | Biblioteca para construção de interfaces de usuário        |
| **Axios**       | Cliente HTTP para comunicação com o backend                |
| **Tailwind CSS**| Framework de estilização com classes utilitárias           |
| **Hooks React** | `useState`, `useEffect` para controle de estado e efeitos  |
| **API REST**    | Backend (ex: Spring Boot, Node.js ou JSON Server)          |

🗂️ Estrutura do Projeto

biblioteca-virtual/
├── App.js               # Componente principal com lógica da aplicação
├── components/
│   ├── LivroCard.jsx    # Cartão visual de cada livro
│   ├── Formulario.jsx   # Formulário de cadastro e edição
│   
├── pages/
│   └── Home.jsx         # Página inicial da aplicação
|   └── Notificacao.jsx  # Componente para exibir mensagens ao usuário
├── index.css            # Estilos globais com Tailwind
└── ...

## ⚙️ **Como Executar Localmente**

### 🔁 Pré-requisitos

-Node.js instalado
-Backend rodando na porta correta

### 📥 **Clone o projeto**

git clone https://github.com/alessandre108/biblioteca-virtual.git
cd biblioteca-virtual

##📦 **Instale as dependências**

npm install

🔧 Configure a URL da API

No arquivo App.js, edite a constante:

const API_URL = "http://localhost:5159/livrosvirtual"; // 

##▶️ **Inicie o projeto**

-npm run dev
-Acesse: http://localhost:5159

##💡 **Como Usar**

-Clique em  **Adicionar Livro** no topo da tela
-Preencha os campos: **título, autor, gênero e descrição**
-Clique em **Salvar**
O livro aparecerá na **lista inicial** com botões para Editar ou Excluir

📸 Captura de Tela

![image](https://github.com/user-attachments/assets/b0309392-e7ef-434c-95fe-a38606166735)


##✨ **Feito com 💙 por pessoas que amam ler**

Se você gostou do projeto, ⭐ favorite, contribua ou compartilhe com outros leitores e desenvolvedores!
