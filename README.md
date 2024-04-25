# Bookings

## Sobre o projeto

Este projeto trata-se do Front-End desenvolvido para consumir a API desenvolvida no Back-End. Acesse aqui: [https://github.com/MatheusAmon12/booking-api](https://github.com/MatheusAmon12/booking-api). Foram utilizadas as seguintes ferramentas e tecnologias:
    -   [NextJS](https://nextjs.org)
    -   [Material UI](https://mui.com/material-ui/)
    -   [NextAuth](https://next-auth.js.org)
    -   [Google Cloud Platform](https://cloud.google.com/?hl=pt-BR)
    -   [ReactJS](https://react.dev)
    
O seu `package.json` deve estar parecido com isto:
```json
"dependencies": {
    "@emotion/react": "^11.11.4",
    "@emotion/styled": "^11.11.0",
    "@mswjs/interceptors": "^0.27.2",
    "@mui/icons-material": "^5.15.14",
    "@mui/material": "^5.15.14",
    "axios": "^1.6.8",
    "formik": "^2.4.5",
    "next": "14.1.4",
    "next-auth": "^4.24.7",
    "next-router-mock": "^0.9.13",
    "react": "^18",
    "react-dom": "^18",
    "react-router-dom": "^6.22.3",
    "tss-react": "^4.9.6",
    "yup": "^1.4.0"
  },
"devDependencies": {
"@babel/preset-env": "^7.24.4",
"@babel/preset-react": "^7.24.1",
"@swc/core": "^1.4.13",
"@swc/jest": "^0.2.36",
"@testing-library/jest-dom": "^6.4.2",
"@testing-library/react": "^15.0.2",
"@testing-library/user-event": "^14.5.2",
"axios-mock-adapter": "^1.22.0",
"babel-jest": "^29.7.0",
"jest": "^29.7.0",
"jest-environment-jsdom": "^29.7.0",
"node-fetch": "^3.3.2",
"react-test-renderer": "^18.2.0"
}
```


## Setup inicial:

- [Node LTS](https://nodejs.org/en)

## Como rodar na minha máquina?

- Clone o projeto Front-End [https://github.com/MatheusAmon12/booking.git](https://github.com/MatheusAmon12/booking.git)
- Clone o projeto Back-End [https://github.com/MatheusAmon12/booking-api.git](https://github.com/MatheusAmon12/booking-api.git)
    - obs.: leia a documentação do [projeto Back-End](https://github.com/MatheusAmon12/booking-api/blob/master/README.md)
- É preciso ter uma conta no [Google Cloud](https://cloud.google.com/?hl=pt-BR), pois é preciso as informações `Id do cliente` e `Chave secreta do cliente`
- Crie um novo projeto no [GCP](console.cloud.google.com/) e siga a sequência de passos:
    - Acesse a aba [APIs e serviços](https://console.cloud.google.com/apis/dashboard)
    - Acesse a aba [Credentials](https://console.cloud.google.com/apis/credentials)
    - Crie uma nova credencial em `CRIAR CREDENCIAIS` e selecione a opção `ID do cliente OAuth`
    - Na seção `Tipo do aplicativo` selecione `Aplicativo da Web`
    - Na seção `Nome` adicione um nome para o projeto ao seu gosto
    - Na seção `Origens JavaScript autorizadas` adiciona a URL do Localhost, geralmente roda na porta `http://localhost:3000`
    - Na seção `URIs de redirecionamento autorizados` adicione o callback `http://localhost:3000/api/auth/callback/google`
    - Salve e lhe será retornado `Id do cliente` e `Chave secreta do cliente`
- Configure um arquivo `.env.local` contendo as seguintes variáveis com os valores que você recebeu no passo anterior:
    -   `GOOGLE_CLIENT_SECRET`
    -   `GOOGLE_CLIENT_ID`
    -   `BASE_URL`
        -   Adicione aqui o endpoint do projeto Back-End: `http://localhost:<insira a porta do projeto back-end>/api/`
- Inicialize o servidor Back-End conforme a documentação
- Rode `npm run dev`
- Finalizado!

## Estrutura do projeto

- `./src` contém todos os arquivos essenciais para o bom funcionamento do projeto
    - `./src/components` contém todos componentes necessários para construir a interface
        - `<AppBar>` cria o menu hambúrguer quando em telas de dispositivos mobile
        - `<Backdrop>` adiciona um loading em tela cheia
        - `<Button>` adiciona botões do tipo submit
        - `<CheckAuth>` verifica a existência de uma sessão criada, caso não haja o usuário é redirecionado para a página de login
        - `<Toasty>` exibi um toasty como alerta para ações executadas
    - `./src/context` cria um context API para gerenciar o estado do `<Toasty>` globalmente
    - `./src/pages` contém todas páginas do projeto
    - `./src/styles` contém todos os estilos necessários
    - `./src/templates` contém os templates `<TemplateDefault>` e `<TemplateAuth>`
    - `./src/test` contém o arquivo `setup.js` que é executado globalmente ao rodar o script `npm test`
    - `./src/utils` contém as definições e validações dos formulários presentes no projeto
    - `./src/theme.js` define configurações do tema utilizado com o [Material UI](https://mui.com/material-ui/)

## Como me localizar no projeto?

- O [NextJS](https://nextjs.org) cria o roteamento de páginas de acordo com a estrutura dos arquivos dentro do diretório `./src/pages`. Então nesse caminho você encontra todas as páginas existentes.

## Observações

É imprescindível a clonagem do repositório [Back-End](https://github.com/MatheusAmon12/booking-api/), pois esse projeto consome a API que lá está desenvolvida. Na documentação encontrará tudo que será necessário para que ambos projetos se comuniquem de forma correta. Atente-se aos detalhes de configurações de portas, variáveis de ambiente e a inserção correta de dados do Google Cloud Platform (GCP)