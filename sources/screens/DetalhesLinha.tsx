import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Cartao from '../components/Cartao';
import GraficoColunas from '../components/GraficoColunas';
import Secao from '../components/Secao';
import {
  arrecadacaoDia,
  arrecadacaoPorOnibus,
  formatarMoeda,
  formatarNumero,
  linhaPorId,
  viagensAtrasadas,
} from '../data/estatisticas';
import { DIAS_SEMANA } from '../data/linhas';
import { cores, espaco, raio } from '../theme/theme';
import type { LinhasStackParamList } from '../routes/types';

type Props = NativeStackScreenProps<LinhasStackParamList, 'DetalhesLinha'>;

export default function DetalhesLinha({ route, navigation }: Props) {
  const linha = linhaPorId(route.params.linhaId);

  useLayoutEffect(() => {
    navigation.setOptions({ title: linha ? `Linha ${linha.codigo}` : 'Detalhes' });
  }, [navigation, linha]);

  if (!linha) {
    return (
      <View style={styles.telaVazia}>
        <Text style={styles.vazio}>Linha não encontrada.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <View style={styles.codigoBox}>
        <Text style={styles.codigo}>{linha.codigo}</Text>
      </View>
      <Text style={styles.origem}>{linha.origem}</Text>
      <Text style={styles.destino}>até {linha.destino}</Text>
      <Text style={styles.operadora}>{linha.empresa}</Text>

      <Secao titulo="Operação" />
      <Cartao>
        <Dado rotulo="Passageiros por dia" valor={formatarNumero(linha.passageirosDia)} />
        <Dado rotulo="Tempo médio de viagem" valor={`${linha.tempoMedioMin} min`} />
        <Dado rotulo="Frota" valor={`${linha.onibus} ônibus`} />
        <Dado
          rotulo="Ocupação média"
          valor={`${linha.ocupacaoMedia}%`}
          barra={linha.ocupacaoMedia}
        />
        <Dado
          rotulo="Viagens com atraso"
          valor={`${linha.percentualAtrasos.toFixed(1)}%`}
          ajuda={`${viagensAtrasadas(linha)} das ${linha.viagensDia} viagens do dia`}
          barra={linha.percentualAtrasos}
          ultimo
        />
      </Cartao>

      <Secao titulo="Arrecadação" />
      <Cartao>
        <View style={styles.destaque}>
          <Text style={styles.destaqueRotulo}>Por dia</Text>
          <Text style={styles.destaqueValor}>{formatarMoeda(arrecadacaoDia(linha))}</Text>
        </View>
        <Dado
          rotulo="Tarifa"
          valor={linha.tarifa.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        />
        <Dado
          rotulo="Por ônibus"
          valor={formatarMoeda(arrecadacaoPorOnibus(linha))}
          ultimo
        />
      </Cartao>

      <Secao titulo="Movimento na semana" />
      <Cartao>
        <GraficoColunas
          dados={linha.passageirosSemana.map((valor, indice) => ({
            rotulo: DIAS_SEMANA[indice],
            valor,
          }))}
          formatar={(valor) => `${(valor / 1000).toFixed(1)}k`}
        />
      </Cartao>
    </ScrollView>
  );
}

function Dado({
  rotulo,
  valor,
  ajuda,
  barra,
  ultimo = false,
}: {
  rotulo: string;
  valor: string;
  ajuda?: string;
  barra?: number;
  ultimo?: boolean;
}) {
  return (
    <View style={[styles.dado, ultimo && styles.dadoUltimo]}>
      <View style={styles.dadoLinha}>
        <Text style={styles.dadoRotulo}>{rotulo}</Text>
        <Text style={styles.dadoValor}>{valor}</Text>
      </View>
      {ajuda ? <Text style={styles.dadoAjuda}>{ajuda}</Text> : null}
      {barra !== undefined ? (
        <View style={styles.trilho}>
          <View style={[styles.preenchimento, { width: `${Math.min(100, barra)}%` }]} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  telaVazia: {
    flex: 1,
    backgroundColor: cores.fundo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  conteudo: { padding: espaco.md, paddingBottom: 110 },
  codigoBox: {
    alignSelf: 'flex-start',
    backgroundColor: cores.primaria,
    borderRadius: raio.sm,
    paddingHorizontal: espaco.sm + 2,
    paddingVertical: 5,
    marginBottom: espaco.md,
  },
  codigo: { color: '#FFFFFF', fontWeight: '700', fontSize: 13, letterSpacing: 0.5 },
  origem: { color: cores.texto, fontSize: 24, fontWeight: '700', letterSpacing: -0.6 },
  destino: { color: cores.textoSecundario, fontSize: 16, marginTop: 2 },
  operadora: { color: cores.textoSecundario, fontSize: 12, marginTop: espaco.sm },
  dado: {
    paddingBottom: espaco.md,
    marginBottom: espaco.md,
    borderBottomWidth: 1,
    borderBottomColor: cores.borda,
  },
  dadoUltimo: { paddingBottom: 0, marginBottom: 0, borderBottomWidth: 0 },
  dadoLinha: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: espaco.sm,
  },
  dadoRotulo: { color: cores.textoSecundario, fontSize: 14, flex: 1 },
  dadoValor: { color: cores.texto, fontSize: 17, fontWeight: '700', letterSpacing: -0.4 },
  dadoAjuda: { color: cores.textoSecundario, fontSize: 12, marginTop: 4 },
  trilho: {
    height: 6,
    borderRadius: 3,
    backgroundColor: cores.superficieClara,
    overflow: 'hidden',
    marginTop: espaco.sm,
  },
  preenchimento: { height: 6, borderRadius: 3, backgroundColor: cores.primaria },
  destaque: {
    paddingBottom: espaco.md,
    marginBottom: espaco.md,
    borderBottomWidth: 1,
    borderBottomColor: cores.borda,
  },
  destaqueRotulo: {
    color: cores.textoSecundario,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  destaqueValor: {
    color: cores.texto,
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -1,
    marginTop: espaco.xs,
  },
  vazio: { color: cores.textoSecundario },
});
