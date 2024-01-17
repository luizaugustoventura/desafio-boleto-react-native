# Desafio React Native: Leitura de boletos

Projeto desenvolvido a partir do [desafio Pumpkin React Native](https://canyon-buffer-51b.notion.site/Teste-T-cnico-Desenvolvedor-React-Native-0829bbe6d01642228248a20761bad87e). Para o desenvolvimento, foi utilizado o Expo SDK 49.

## Utilização

O aplicativo permite com que o usuário leia um código de barras com a câmera ou insira a linha digitável manualmente. O aplicativo foi delimitado para ler códigos de barras de 44 ou 46 dígitos e, ao inserir a linha digitável do boleto manualmente, a mesma deve conter 47 dígitos. Caso estes critérios não sejam obedecidos, o aplicativo mostrará uma mensagem de erro.

## Funcionamento

1. Ao ler o código de barras ou inserir a linha digitável, pressione o botão **"AVANÇAR"**.
2. O aplicativo processará o código de pagamento
2.1 Sucesso: o aplicativo exibirá o valor do documento e a data de vencimento, além de habilitar o botão **"PAGAR"**
2.2 Erro: O aplicativo exibirá uma mensagem com o erro em questão e não habilitará o botão **"PAGAR"**
3. Pressione o botão **"PAGAR"**
3.1: Sucesso: O aplicativo exibirá uma mensagem dizendo que o boleto foi pago com sucesso, caso ainda esteja dentro do prazo de vencimento
3.2: Erro: O aplicativo exibirá uma mensagem de erro no pagamento, caso o boleto esteja vencido

## Execução

### Emulador
1. Na pasta do projeto no terminal, digite: `npx expo start`
2. Execute o emulador Android/iOS
3. No terminal com o Expo em execução, pressione **a**
4. Aguarde o carregamento do bundle para que o aplicativo inicie

### Dispositivo físico

1. Na pasta do projeto no terminal, digite: `npx expo start`
2. Instale o aplicativo **Expo Go** no seu dispositivo físico através da App Store/Google Play
3. Abra o aplicativo **Expo Go** no seu dispositivo e pressione o botão **"Scan QR Code"**
4. Aponte a câmera do seu dispositivo físico para o QR Code exibido no terminal do Expo na sua máquina
5. Aguarde o carregamento do bundle para que o aplicativo inicie