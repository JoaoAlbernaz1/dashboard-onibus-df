import type { NavigatorScreenParams } from '@react-navigation/native';

export type LinhasStackParamList = {
  ListaLinhas: undefined;
  DetalhesLinha: { linhaId: string };
};

export type TabParamList = {
  Dashboard: undefined;
  Linhas: NavigatorScreenParams<LinhasStackParamList>;
  Analises: undefined;
};
