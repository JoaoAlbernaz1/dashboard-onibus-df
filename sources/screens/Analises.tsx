import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BarraHorizontal from '../components/BarraHorizontal';
import Cartao from '../components/Cartao';
import GraficoColunas from '../components/GraficoColunas';
import Secao from '../components/Secao';
import {
  arrecadacaoDia,
  arrecadacaoPorOnibus,
  formatarMoeda,
  passageirosPorDiaDaSemana,
  topArrecadacao,
  topArrecadacaoPorOnibus,
  totalArrecadacao,
  totalOnibus,
} from '../data/estatisticas';
import { cores, espaco } from '../theme/theme';

export default function Analises() {
  const porLinha = topArrecadacao(4);
  const porOnibus = topArrecadacaoPorOnibus(4);
  const porDia = passageirosPorDiaDaSemana();

  const receitaPorOnibus = totalArrecadacao / totalOnibus;

  return (
    <SafeAreaView style={styles.tela} edges={['top']}>
      <ScrollView contentContainerStyle={styles.conteudo} showsVerticalScrollIndicator={false}>
        <Text style={styles.titulo}>Análises</Text>

        <Cartao>
          <Text style={styles.destaqueRotulo}>Arrecadação da rede</Text>
          <Text style={styles.destaqueValor}>{formatarMoeda(totalArrecadacao)}</Text>
          <Text style={styles.destaqueDetalhe}>
            {formatarMoeda(receitaPorOnibus)} por ônibus
          </Text>
        </Cartao>

        <Secao titulo="Maior arrecadação" explicacao="Receita gerada por cada linha em um dia." />
        <Cartao>
          {porLinha.map((linha, indice) => (
            <BarraHorizontal
              key={linha.id}
              posicao={indice + 1}
              rotulo={`${linha.codigo} · ${linha.origem}`}
              valorTexto={formatarMoeda(arrecadacaoDia(linha))}
              proporcao={arrecadacaoDia(linha) / arrecadacaoDia(porLinha[0])}
              ultimo={indice === porLinha.length - 1}
            />
          ))}
        </Cartao>

        <Secao
          titulo="Arrecadação por ônibus"
          explicacao="Receita da linha dividida pelo tamanho da frota."
        />
        <Cartao>
          {porOnibus.map((linha, indice) => (
            <BarraHorizontal
              key={linha.id}
              posicao={indice + 1}
              rotulo={`${linha.codigo} · ${linha.onibus} ônibus`}
              valorTexto={formatarMoeda(arrecadacaoPorOnibus(linha))}
              proporcao={arrecadacaoPorOnibus(linha) / arrecadacaoPorOnibus(porOnibus[0])}
              ultimo={indice === porOnibus.length - 1}
            />
          ))}
        </Cartao>

        <Secao
          titulo="Movimento na semana"
          explicacao="Passageiros transportados pela rede em cada dia."
        />
        <Cartao>
          <GraficoColunas
            dados={porDia.map((item) => ({ rotulo: item.dia, valor: item.valor }))}
            formatar={(valor) => `${Math.round(valor / 1000)}k`}
          />
        </Cartao>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: espaco.md, paddingBottom: 110 },
  titulo: {
    color: cores.texto,
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: -0.8,
    marginBottom: espaco.lg,
  },
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
});
