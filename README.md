# Dev Controle 🚀

## Descrição

O **Dev Controle** é uma aplicação desenvolvida com o objetivo de auxiliar no gerenciamento de clientes e chamados para desenvolvedores. Ele oferece uma plataforma intuitiva e eficiente para criar, acompanhar e fechar chamados de clientes, tudo isso integrado com autenticação via Google para garantir segurança e controle de acesso.

## Funcionalidades Principais

- **Autenticação via Google**: O Dev Controle permite que os usuários façam login utilizando suas contas do Google, garantindo autenticidade e segurança.
- **Gerenciamento de Clientes**: Os usuários podem criar e gerenciar clientes, atribuindo a eles detalhes importantes como nome, email, e outras informações relevantes.
- **Gerenciamento de Chamados**: A aplicação permite a criação e acompanhamento de chamados para cada cliente, com a capacidade de marcar chamados como abertos ou fechados, além de visualizar detalhes adicionais de cada chamado.
- **Criação de Chamados sem Login**: Mesmo sem estar autenticado, os usuários podem criar chamados fornecendo um email válido do cliente, simplificando o processo de comunicação e registro de solicitações.

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização do lado do servidor, oferecendo uma experiência de desenvolvimento rápida e eficiente.
- **Prisma**: ORM moderno para Node.js e TypeScript, utilizado para comunicação com o banco de dados e criação de migrações.
- **Tailwind CSS**: Framework CSS utilitário que facilita a criação de interfaces responsivas e elegantes.
- **NextAuth**: Biblioteca de autenticação para Next.js, utilizada para integração com o Google OAuth e controle de acesso.
- **Zod**: Biblioteca para validação de esquemas em TypeScript, garantindo integridade e consistência nos dados.

## Estrutura do Projeto

O projeto é estruturado de forma modular, seguindo as melhores práticas de organização de código. As principais partes do projeto incluem:

- prisma: Configurações do ORM.
- app
  - **api**: Rotas da API.
  - **dashboard**: Página principal com chamados abertos e botão para criar um novo.
  - **customer**: Página para gerenciamento de clientes, com clientes abertos e botão para criar um novo.
  - **components**: Componentes globais da aplicação.
  - **lib**: Arquivos de configuração da API, autenticação e Prisma.
  - **providers**: Wrapper de autenticação e contexto de modal.
  - **types**: Interfaces e tipos de dados.

## Contribuição

Contribuições são bem-vindas! Se você tem sugestões de novas funcionalidades, melhorias de código ou encontrou algum problema, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
