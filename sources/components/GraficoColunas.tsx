import { StyleSheet, Text, View } from 'react-native';
import { cores, espaco } from '../theme/theme';

type Coluna = { rotulo: string; valor: number };

type Props = {
  dados: Coluna[];
  formatar?: (valor: number) => string;
  cor?: string;
  legenda?: string;
};

const ALTURA_MAXIMA = 110;

export default function GraficoColunas({ dados, formatar, cor = cores.primaria, legenda }: Props) {
  const maximo = Math.max(...dados.map((coluna) => coluna.valor), 1);
  const indiceMaior = dados.findIndex((coluna) => coluna.valor === maximo);

  return (
    <View>
      <View style={styles.grafico}>
        {dados.map((coluna, indice) => {
          const altura = Math.max(6, (coluna.valor / maximo) * ALTURA_MAXIMA);
          const destaque = indice === indiceMaior;

          return (
            <View key={coluna.rotulo} style={styles.coluna}>
              <Text style={[styles.valor, destaque && styles.valorDestaque]}>
                {formatar ? formatar(coluna.valor) : coluna.valor}
              </Text>
              <View
                style={[
                  styles.barra,
                  { height: altura, backgroundColor: destaque ? cor : cores.superficieClara },
                ]}
              />
            </View>
          );
        })}
      </View>

      <View style={styles.base} />

      <View style={styles.rotulos}>
        {dados.map((coluna, indice) => (
          <Text
            key={coluna.rotulo}
            style={[styles.rotulo, indice === indiceMaior && styles.rotuloDestaque]}
          >
            {coluna.rotulo}
          </Text>
        ))}
      </View>

      {legenda ? <Text style={styles.legenda}>{legenda}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  grafico: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  coluna: { flex: 1, alignItems: 'center' },
  valor: { color: cores.textoSecundario, fontSize: 9, marginBottom: espaco.xs },
  valorDestaque: { color: cores.texto, fontWeight: '700' },
  barra: { width: 20, borderTopLeftRadius: 4, borderTopRightRadius: 4 },
  base: { height: 1, backgroundColor: cores.borda },
  rotulos: { flexDirection: 'row', justifyContent: 'space-between', marginTop: espaco.sm },
  rotulo: { flex: 1, textAlign: 'center', color: cores.textoSecundario, fontSize: 11 },
  rotuloDestaque: { color: cores.texto, fontWeight: '700' },
  legenda: {
    color: cores.textoSecundario,
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: espaco.md,
  },
});
