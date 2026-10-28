# Agência V3 — Landing page

Landing page responsiva em React, TypeScript e Vite, com Motion for React, ícones Lucide e fonte Inter hospedada junto com o site. A direção visual segue a referência fornecida: preto e prata, superfícies vetoriais em perspectiva, iluminação central e animações discretas. Todos os assets são locais; não há dependência de um servidor Node em produção.

## Desenvolvimento

Use Node.js 24 LTS (versão indicada em `.nvmrc`) e npm.

```bash
npm ci
npm run dev
```

Em ambientes com cache padrão do npm sem permissão de escrita:

```bash
npm ci --cache /tmp/v3-npm-cache
```

```bash
npm run build        # TypeScript + build de produção em dist/
npm run preview      # Inspeção local do build
npm run format:check # Formatação
```

Os tokens de cores, tipografia, largura e raios estão no início de `src/styles.css`. A cor de destaque está centralizada em `--accent`. Componentes compartilhados estão em `src/components/`; as seções e a copy estão em `src/App.tsx`.

## Publicar na Vercel via GitHub

1. Importe o repositório `gabrielmarcuzzo1/landingpageaula` na Vercel.
2. Selecione a branch `main` e o preset **Vite**. O projeto fica na raiz do repositório.
3. Comando de instalação: `npm ci`. Build: `npm run build`. Diretório de saída: `dist`.
4. Use Node.js 24. Não há variáveis de ambiente obrigatórias.
5. Publique e configure seu domínio no painel da Vercel.

O `vercel.json` já define build, saída e desativa cache para o arquivo de configuração do formulário.

## Publicar no cPanel

1. Na sua máquina de desenvolvimento, execute `npm ci` e `npm run build`.
2. Compacte **o conteúdo de `dist/`**. Inclua o arquivo oculto `.htaccess`, se quiser o controle de cache no Apache.
3. No Gerenciador de Arquivos do cPanel, envie e extraia o ZIP na raiz do domínio, normalmente `public_html/`. O `index.html` deve ficar diretamente nessa pasta.
4. Publique `assets/`, `form-config.js`, os SVGs e a imagem de compartilhamento junto com `index.html`. Não envie `src/` ou `node_modules/`.

O build usa caminhos relativos e também pode ser servido em uma subpasta. Se fizer isso, ajuste `og:image` em `index.html` para a URL pública final da imagem de compartilhamento antes de gerar o build. Depois de definir o domínio final, é recomendável usar a URL absoluta também na hospedagem na raiz.

Não é necessário instalar Node.js no servidor cPanel. O site é estático; a integração do formulário é independente da hospedagem.

## Conectar o formulário depois

Por solicitação do projeto, **nenhuma integração de envio vem ativada**. Os campos estão montados, o botão de envio fica desabilitado e a página informa isso ao visitante, oferecendo o contato por e-mail. Nenhum lead é armazenado pelo site e nenhuma mensagem fictícia de sucesso é exibida.

Edite `public/form-config.js` antes do build:

```js
window.V3_CONFIG = {
  formEndpoint: 'https://seu-servico.example/contatos',
}
```

No cPanel, você também pode editar diretamente o `form-config.js` publicado, sem gerar outro build. Na Vercel, altere o arquivo no repositório e faça um novo deploy. Essa configuração é pública: nunca inclua senhas ou chaves privadas.

O endpoint deve:

- Usar HTTPS e permitir CORS para o domínio da landing page.
- Aceitar `POST` com `Content-Type: application/json`.
- Receber `{ name, email, phone, company }` e realizar a entrega/armazenamento dos contatos no servidor.
- Retornar HTTP 2xx apenas quando tiver aceitado a solicitação. Qualquer resposta fora de 2xx, falha de conexão ou timeout de 15 segundos exibe erro e permite tentar novamente.
- Validar os dados e aplicar controle de abuso no servidor. O campo invisível do cliente é somente uma proteção complementar.

O sucesso confirma a solicitação; não agenda automaticamente um horário. Se usar um provedor com contrato de requisição diferente, ajuste `src/components/ContactForm.tsx` ao contrato dele. Formulários com chave secreta precisam de um backend intermediário.

O telefone `(00) 00000-0000` foi mantido como fornecido na copy, sem link de WhatsApp fictício. Troque pelo número oficial quando estiver disponível. O endereço de e-mail também é o fornecido na copy.

## Testes

```bash
npm ci
npx playwright install chromium --with-deps
npm run build
npm test
```

Se já houver Chromium instalado, é possível usá-lo sem baixar outro navegador:

```bash
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test
```

A suíte verifica navegação, FAQ, menu mobile, ausência de overflow em 320/390/768/1440 px, formulário não configurado, envio e erros com endpoint simulado, preferência por movimento reduzido e acessibilidade WCAG A/AA com axe. Os testes usam o build de produção. O envio real depende da futura configuração do endpoint e não é coberto por uma integração externa neste projeto.

As animações respeitam `prefers-reduced-motion`; o parallax e as animações contínuas são desativados com essa preferência. O menu funciona com teclado/Escape e o FAQ informa seus estados para leitores de tela.
