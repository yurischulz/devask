<p align="center">
  <img alt="Devask" src=".github/logo.svg" width="160px">
</p>

<p align="center">  
  <img src="https://img.shields.io/github/stars/yurischulz/devask?label=stars&message=MIT&color=2F80ED&labelColor=000000" alt="Stars">

  <img  src="https://img.shields.io/static/v1?label=license&message=MIT&color=2F80ED&labelColor=000000" alt="License">   
</p>

<h1 align="center">
    <img alt="Devask" src=".github/cover.svg" />
</h1>

<br>

## 🌐 Demo

- [Firebase Hosting](https://letmeask-be28a.web.app)

### Salas para teste

- Sala aberta: **-Md9Yg41sbUyYdvLCq6F**
- Sala fechada: **-McqE0WxM1_f0IQxnpUN**

## 🧪 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [React](https://reactjs.org)
- [Firebase](https://firebase.google.com/)
- [TypeScript](https://www.typescriptlang.org/)

## 🚀 Como executar

Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone https://github.com/yurischulz/devask
$ cd devask
```

Para iniciá-lo, siga os passos abaixo:

```bash
# Instalar as dependências
$ yarn

# Iniciar o projeto
$ yarn start
```

O app estará disponível no seu browser pelo endereço http://localhost:3000.

Lembrando que será necessário criar uma conta no [Firebase](https://firebase.google.com/) e um projeto para disponibilizar um Realtime Database.

## 💻 Projeto

Este é um projeto desenvolvido durante a **[Next Level Week Together](https://nextlevelweek.com/)**, apresentada dos dias 20 a 27 de Junho de 2021.

Devask é perfeito para educadores no nicho de desenvolvimento poderem criar salas de Q&A com o seu público, de uma forma muito organizada e democrática.

Além disto, a identidade visual do projeto foi adaptada, e, também, foi implementado uma série de melhorias e novas funcionalidades, tais como:

### Funcionalidades adicionadas

#### Geral

- Alterado as tags `<textarea />` para o componente `<MarkdownEditor />` do pacote **[@uiw/react-markdown-editor](https://github.com/uiwjs/react-markdown-editor)**, possibilitando que os usuários insiram códigos com highlight em suas perguntas e respostas
- Inserido ícone animado nas perguntas marcadas como _highlighted_, sinalizando que algo está sendo digitado

#### Admin

- Inserir nova resposta ao clicar no ícone/botão de marcar pergunta como _highlighted_
- Ao inserir uma resposta, o ícone/botão _highlighted_ é alterado para o ícone de edição
- Ao clicar no ícone de edição exibe o componente `<MarkdownEditor />` com a resposta previamente enviada

#### Usuário

- Visualização das respostas inseridas pelo admin, utilizando o componente `<MarkdownPreview />`

## 🔖 Layout

Você pode visualizar o layout do projeto através do link abaixo:

- [Layout Web](https://www.figma.com/file/uD4KMEsZtdDeRTVBcjMM2Z/Devask)

Lembrando que você precisa ter uma conta no [Figma](http://figma.com/).

## 📝 License

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
