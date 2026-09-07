import { LINHAS, Linha, DIAS_SEMANA } from './linhas';

export const arrecadacaoDia = (linha: Linha) => linha.passageirosDia * linha.tarifa;

export const arrecadacaoPorOnibus = (linha: Linha) => arrecadacaoDia(linha) / linha.onibus;

export const viagensAtrasadas = (linha: Linha) =>
  Math.round((linha.viagensDia * linha.percentualAtrasos) / 100);

const soma = (valores: number[]) => valores.reduce((total, valor) => total + valor, 0);

export const totalPassageiros = soma(LINHAS.map((l) => l.passageirosDia));
export const totalOnibus = soma(LINHAS.map((l) => l.onibus));
export const totalViagens = soma(LINHAS.map((l) => l.viagensDia));
export const totalLinhas = LINHAS.length;
export const totalArrecadacao = soma(LINHAS.map(arrecadacaoDia));

export const tempoMedioGeral = Math.round(soma(LINHAS.map((l) => l.tempoMedioMin)) / totalLinhas);
export const atrasoMedioGeral = soma(LINHAS.map((l) => l.percentualAtrasos)) / totalLinhas;
export const ocupacaoMediaGeral = Math.round(soma(LINHAS.map((l) => l.ocupacaoMedia)) / totalLinhas);

export const topPassageiros = (quantidade = 3) =>
  [...LINHAS].sort((a, b) => b.passageirosDia - a.passageirosDia).slice(0, quantidade);

export const topAtrasos = (quantidade = 3) =>
  [...LINHAS].sort((a, b) => b.percentualAtrasos - a.percentualAtrasos).slice(0, quantidade);

export const topArrecadacao = (quantidade = 5) =>
  [...LINHAS].sort((a, b) => arrecadacaoDia(b) - arrecadacaoDia(a)).slice(0, quantidade);

export const topArrecadacaoPorOnibus = (quantidade = 5) =>
  [...LINHAS].sort((a, b) => arrecadacaoPorOnibus(b) - arrecadacaoPorOnibus(a)).slice(0, quantidade);

export const passageirosPorDiaDaSemana = () =>
  DIAS_SEMANA.map((dia, indice) => ({
    dia,
    valor: soma(LINHAS.map((linha) => linha.passageirosSemana[indice])),
  }));

export const linhaPorId = (id: string) => LINHAS.find((linha) => linha.id === id);

export const formatarMoeda = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

export const formatarNumero = (valor: number) => valor.toLocaleString('pt-BR');

export const formatarCompacto = (valor: number) =>
  valor >= 1000 ? (valor / 1000).toFixed(1).replace('.', ',') + ' mil' : String(valor);
