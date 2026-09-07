import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BarraHorizontal from '../components/BarraHorizontal';
import Cartao from '../components/Cartao';
import Indicador from '../components/Indicador';
import Secao from '../components/Secao';
import {
  atrasoMedioGeral,
  formatarCompacto,
  formatarMoeda,
  formatarNumero,
  ocupacaoMediaGeral,
  tempoMedioGeral,
  topAtrasos,
  topPassageiros,
  totalArrecadacao,
  totalLinhas,
  totalOnibus,
  totalViagens,
  totalPassageiros,
} from '../data/estatisticas';
import { cores, espaco } from '../theme/theme';
import type { TabParamList } from '../routes/types';

export default function Dashboard() {
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();
  const maisPassageiros = topPassageiros(3);
  const maisAtrasos = topAtrasos(3);

  const abrirLinha = (linhaId: string) =>
    navigation.navigate('Linhas', { screen: 'DetalhesLinha', params: { linhaId } });

  return (
    <SafeAreaView style={styles.tela} edges={['top']}>
      <ScrollView contentContainerStyle={styles.conteudo} showsVerticalScrollIndicator={false}>
        <Text style={styles.marca}>Mobilidade DF</Text>
        <Text style={styles.titulo}>Painel da rede</Text>

        <Cartao style={styles.destaque}>
          <Text style={styles.destaqueRotulo}>Passageiros no dia</Text>
          <Text style={styles.destaqueValor}>{formatarNumero(totalPassageiros)}</Text>
          <Text style={styles.destaqueDetalhe}>
            {totalLinhas} linhas · {formatarNumero(totalViagens)} viagens
          </Text>
        </Cartao>

        <View style={styles.grade}>
          <Indicador icone="bus-outline" rotulo="Frota" valor={String(totalOnibus)} unidade="ônibus" />
          <Indicador
            icone="time-outline"
            rotulo="Tempo médio"
            valor={String(tempoMedioGeral)}
            unidade="min"
          />
          <Indicador
            icone="warning-outline"
            rotulo="Atrasos"
            valor={`${atrasoMedioGeral.toFixed(1)}%`}
          />
          <Indicador
            icone="wallet-outline"
            rotulo="Arrecadação"
            valor={formatarMoeda(totalArrecadacao)}
          />
        </View>

        <Secao titulo="Mais movimentadas" />
        <Cartao>
          {maisPassageiros.map((linha, indice) => (
            <TouchableOpacity key={linha.id} activeOpacity={0.6} onPress={() => abrirLinha(linha.id)}>
              <BarraHorizontal
                posicao={indice + 1}
                rotulo={`${linha.codigo} · ${linha.origem}`}
                valorTexto={formatarCompacto(linha.passageirosDia)}
                proporcao={linha.passageirosDia / maisPassageiros[0].passageirosDia}
                ultimo={indice === maisPassageiros.length - 1}
              />
            </TouchableOpacity>
          ))}
        </Cartao>

        <Secao titulo="Mais atrasadas" />
        <Cartao>
          {maisAtrasos.map((linha, indice) => (
            <TouchableOpacity key={linha.id} activeOpacity={0.6} onPress={() => abrirLinha(linha.id)}>
              <BarraHorizontal
                posicao={indice + 1}
                rotulo={`${linha.codigo} · ${linha.origem}`}
                valorTexto={`${linha.percentualAtrasos.toFixed(1)}%`}
                proporcao={linha.percentualAtrasos / maisAtrasos[0].percentualAtrasos}
                ultimo={indice === maisAtrasos.length - 1}
              />
            </TouchableOpacity>
          ))}
        </Cartao>

        <Text style={styles.rodape}>Ocupação média da rede: {ocupacaoMediaGeral}%</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: espaco.md, paddingBottom: 110 },
  marca: {
    color: cores.textoSecundario,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  titulo: {
    color: cores.texto,
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: -0.8,
    marginTop: espaco.xs,
    marginBottom: espaco.lg,
  },
  destaque: { marginBottom: espaco.sm },
  destaqueRotulo: {
    color: cores.textoSecundario,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  destaqueValor: {
    color: cores.texto,
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: -1.5,
    marginVertical: espaco.xs,
  },
  destaqueDetalhe: { color: cores.textoSecundario, fontSize: 12 },
  grade: { flexDirection: 'row', flexWrap: 'wrap', gap: espaco.sm },
  rodape: {
    color: cores.textoSecundario,
    fontSize: 12,
    textAlign: 'center',
    marginTop: espaco.xl,
  },
});
