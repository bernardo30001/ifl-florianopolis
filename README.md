# IFL Florianópolis

Landing page institucional em português. HTML, CSS e JavaScript sem dependências de execução. Todos os arquivos para hospedagem estão em `dist/`.

## Visualizar e publicar

Sirva a pasta `dist` em um servidor estático. Para visualizar localmente: `python3 -m http.server 4180 --directory dist` e abra http://localhost:4180. A pasta `dist/` pode ser publicada em hospedagem estática com HTTPS.

Ao mudar o domínio, atualize canonical, og:url, og:image e as URLs no JSON-LD de `dist/index.html`. A imagem social está em `assets/og-image.png`, 1200 × 630 px. O favicon SVG é uma aproximação gráfica e deve ser substituído pelo símbolo vetorial oficial quando disponível.

## Atualizar conteúdo

Edite `dist/content.js`, mantendo aspas, colchetes e vírgulas do JavaScript:

- **Diretoria**: `boardTerm` e array `board`. Cada pessoa tem `name`, `role`, `occupation`, `photo` e `linkedin`. Coloque as fotos WebP em `dist/assets/` e use um caminho como `assets/presidente.webp`. Confira os cargos com a gestão atual. O depoimento está em `presidentQuote` e sua atribuição em `presidentQuoteAuthor`.
- **Eventos**: array `events`, com `title`, `speaker`, `startsAt` no formato ISO com fuso, `location`, `address`, `ticketUrl`, `dateConfirmed`, `image` e `alt`. O evento futuro mais próximo aparece no card e na faixa. Quando começa, sai automaticamente do destaque. Não há agendamento externo necessário. O ano 2026 do evento fornecido foi inferido por 09/11 cair numa segunda-feira e permanece destacado para confirmação. Confirme o ano antes de ativar `dateConfirmed`. A galeria vem do array independente `pastEvents`.
- **Apoiadores**: array `supporters` com `name`, `logo` e `url`. Sem dados, aparece o placeholder. Envie versões de logos já monocromáticas na paleta da marca.
- **FAQ**: array `faq`, com `question`, `answer` e link opcional. As competências e os valores também estão em arrays.
- **Contatos**: `contacts.whatsapp` com país e DDD, somente dígitos; `contacts.email`, `contacts.linkedin` e `contacts.cnpj`. Não use dados fictícios. O Instagram oficial informado já está incluído.

## Ativar os formulários

1. Crie um endpoint HTTPS do Formspree para candidaturas e outro para contatos com a conta oficial do instituto. Formulários compatíveis que aceitem FormData, CORS e resposta HTTP de sucesso também podem ser usados.
2. Preencha `forms.applicationEndpoint` e `forms.contactEndpoint` em `content.js`.
3. Revise e complete a política no bloco `privacyHTML` de `app.js`: responsável, CNPJ, contato de privacidade, finalidade, base legal, fornecedor, eventual transferência internacional, prazo de retenção e procedimento de direitos.
4. Após aprovação pelo instituto, defina `forms.privacyApproved: true` e ajuste a política para a versão aprovada. A flag sozinha não reescreve a minuta.
5. Faça um envio de teste com a equipe responsável para conferir o recebimento. A mensagem de sucesso só aparece após resposta HTTP positiva do serviço. Não existe sucesso simulado. Em caso de falha, os campos são preservados.

Sem endpoint ou política aprovada, os formulários validam os campos mas não enviam os dados. Nenhum dado dos campos é salvo em armazenamento local. O aviso de privacidade salva apenas a preferência de leitura. Não há analytics nem cookies de publicidade nesta versão.

## Assets e informações necessários

- Logo oficial vetorial SVG e símbolo isolado para favicon. O logo PNG fornecido foi convertido em WebP e já está aplicado.
- Fotos autorizadas dos sete membros da diretoria, preferencialmente em WebP, com enquadramento central e nome, cargo, ocupação, LinkedIn e gestão confirmados.
- Depoimento aprovado da presidência e nome para atribuição.
- Fotos autorizadas de eventos, datas e legendas para a galeria. Nenhuma foto genérica é apresentada como evento do instituto.
- Logos monocromáticos e URLs dos apoiadores.
- Link de ingressos Blueticket e confirmação do ano do evento de 09/11, 18h30, CentroSul.
- WhatsApp, e-mail, CNPJ, LinkedIn local se houver e política de privacidade aprovada.
- Perfil, faixa etária, critérios, etapas, períodos e valores da seleção.
- Data de fundação e demais marcos históricos; confirmação dos detalhes do Fórum de 2016 na FIESC.
- Confirmação da frase sobre apoio a candidaturas e da renovação da diretoria a cada ciclo.

Os números opcionais não foram incluídos por ausência de dados. Não há depoimentos ou nomes inventados.

## Créditos e licenças

Logo: arquivo fornecido pelo usuário. Versão raster aplicada, aguardando SVG oficial. Montserrat: Google Fonts, SIL Open Font License, cópia em `dist/assets/OFL.txt`.

Fotografia da Ponte Hercílio Luz: Beto Quissak, Wikimedia Commons, CC BY-SA 4.0. Fonte: https://commons.wikimedia.org/wiki/File:Ponte_Hercilio_Luz_-_Florianopolis_-_Santa_Catarina.jpg . Licença: https://creativecommons.org/licenses/by-sa/4.0/ . A adaptação em `florianopolis.webp` foi redimensionada e convertida, exibida com recorte e overlay azul, e é disponibilizada sob CC BY-SA 4.0. Crédito e links também estão no rodapé. A fotografia representa a cidade, não um evento do IFL.

## Verificação

Confira menu e âncoras, FAQ, seis competências por teclado/toque, seleção de assunto de parceria, estados dos formulários e ausência de rolagem horizontal em 375, 768 e 1280 px. Respeita `prefers-reduced-motion`, tem labels, foco visível, landmarks, diálogo com gerenciamento nativo de foco e links de salto.

A meta Lighthouse >90 requer medição no domínio definitivo; não é uma pontuação garantida. Os arquivos são estáticos, as imagens usam WebP, as fontes ficam hospedadas junto do site e não há bibliotecas de interface externas.
