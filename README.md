# Dashboard das Linhas de Ônibus do DF

Aplicativo React Native (Expo + TypeScript) desenvolvido para a atividade de **React Navigation**.
Traz um painel de indicadores da rede de ônibus do Distrito Federal, lista de linhas, tela de
detalhes e análises visuais dos dados. Todos os dados são fictícios e ficam armazenados
localmente no projeto (`sources/data/linhas.ts`).

## Como rodar

```bash
npm install
npx expo start
```

Depois leia o QR Code com o app **Expo Go** (Android/iOS) ou pressione `a` para abrir no emulador
Android.

## Navegação

O app usa **React Navigation** com duas navegações combinadas (aninhadas):

```
NavigationContainer
└── Tab.Navigator (bottom-tabs, barra customizada)
    ├── Painel      → Dashboard
    ├── Linhas      → Stack.Navigator
    │                 ├── ListaLinhas
    │                 └── DetalhesLinha   (navegação entre telas)
    └── Análises    → Analises
```

### Customização das abas

A barra de abas padrão foi substituída por uma barra própria através da prop `tabBar` do
`Tab.Navigator` (`sources/routes/BarraDeAbas.tsx`). A implementação usa o `BottomTabBarProps`
(`state`, `descriptors`, `navigation`) e traz:

- barra flutuante arredondada, com sombra e cores do tema do app;
- ícones do Ionicons que trocam entre versão preenchida (aba ativa) e contornada (inativa);
- rótulo exibido apenas na aba ativa, dentro de uma "pílula" colorida;
- badge com a quantidade de linhas monitoradas na aba **Linhas**;
- emissão correta dos eventos `tabPress` / `tabLongPress` e suporte a `safe area`.

## Telas

| Tela | Arquivo | Conteúdo |
| --- | --- | --- |
| **1. Dashboard** | `sources/screens/Dashboard.tsx` | Indicadores gerais (passageiros/dia, frota, tempo médio, atrasos, arrecadação), ranking das linhas com mais passageiros e das linhas com mais atrasos. Tocar em uma linha leva direto para os detalhes dela (navegação entre abas com `screen`/`params`). |
| **2. Lista de Linhas** | `sources/screens/ListaLinhas.tsx` | `FlatList` com código, origem, destino, quantidade de ônibus, passageiros, tempo médio e percentual de atrasos. Tem busca por texto e ordenação por passageiros, atrasos ou código. Tocar em um item abre a tela de detalhes. |
| **3. Detalhes da Linha** | `sources/screens/DetalhesLinha.tsx` | Empresa, região, acessibilidade, passageiros, tempo médio, percentual de atrasos (com número de viagens atrasadas), ocupação média, frota, viagens/dia, arrecadação diária, arrecadação por ônibus, projeção mensal, gráfico de passageiros por dia da semana e horários de operação. |
| **4. Análises** | `sources/screens/Analises.tsx` | Quatro análises visuais: arrecadação total da rede (com ticket médio e receita por ônibus), linhas com maior arrecadação, arrecadação por ônibus, arrecadação por empresa operadora e demanda por dia da semana. |

## Estrutura do projeto

```
App.tsx                       NavigationContainer + tema claro (preto, branco e cinza)
sources/
├── components/               Cartao, Indicador, BarraHorizontal, GraficoColunas
├── data/
│   ├── linhas.ts             12 linhas fictícias do DF (dados locais)
│   └── estatisticas.ts       cálculos e formatações (totais, rankings, moeda)
├── routes/
│   ├── TabRouter.tsx         Tab.Navigator com a barra customizada
│   ├── BarraDeAbas.tsx       barra de abas customizada
│   ├── LinhasStack.tsx       Stack da aba Linhas
│   └── types.ts              tipagem das rotas e parâmetros
├── screens/                  Dashboard, ListaLinhas, DetalhesLinha, Analises
└── theme/theme.ts            cores, espaçamentos e raios
```

Os gráficos (barras horizontais e colunas) foram feitos apenas com `View` e `StyleSheet`, sem
bibliotecas externas de gráficos.

## Dependências principais

- `expo` / `react-native`
- `@react-navigation/native`
- `@react-navigation/bottom-tabs`
- `@react-navigation/native-stack`
- `react-native-screens`, `react-native-safe-area-context`
- `@expo/vector-icons` + `expo-font`
