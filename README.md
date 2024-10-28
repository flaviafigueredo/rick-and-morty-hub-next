# Rick and Morty Hub

## Descrição

Este projeto é uma aplicação desenvolvida em Next.js, que permite explorar os personagens do universo de *Rick and Morty*. A aplicação utiliza a [API do Rick and Morty](https://rickandmortyapi.com/) para fornecer informações detalhadas sobre os personagens, como nome, status, espécie, e episódios em que aparecem.

## Funcionalidades

- **Pesquisa de personagens**: Busca por personagens pelo nome.
- **Lista de personagens**: Exibe uma lista com personagens e informações resumidas.
- **Detalhes do personagem**: Exibe detalhes de cada personagem ao clicar em um card.
- **Navegação entre páginas**: Permite ao usuário navegar entre diferentes páginas de resultados, facilitando a exploração completa dos personagens.
- **Navegação intuitiva**: Interface simplificada e responsiva para melhorar a experiência do usuário.

## Tecnologias Utilizadas

- **Next.js**: Framework React para construção de aplicações web.
- **Tailwind CSS**: Framework de CSS para estilização da interface.
- **DaisyUI**: Plugin para Tailwind CSS que fornece componentes prontos para uso.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.

## Estrutura do Projeto
```
/app
    globals.css
    layout.tsx 
    page.tsx
    /components
    /character
    /hooks
    /services
    /types
```

## Instalação

Para rodar este projeto localmente, siga os passos abaixo:

1. Clone o repositório:

    ```bash
    git clone <link-do-repositório>
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

4. Acesse a aplicação em http://localhost:3000