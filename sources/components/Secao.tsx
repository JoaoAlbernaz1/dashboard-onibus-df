import { StyleSheet, Text, View } from 'react-native';
import { cores, espaco } from '../theme/theme';

type Props = { titulo: string; explicacao?: string };

// Cabeçalho padrão de seção: rótulo curto em caixa alta e uma linha
// explicando, em português simples, o que aquele bloco mostra.
export default function Secao({ titulo, explicacao }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      {explicacao ? <Text style={styles.explicacao}>{explicacao}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: espaco.xl, marginBottom: espaco.sm },
  titulo: {
    color: cores.texto,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  explicacao: {
    color: cores.textoSecundario,
    fontSize: 13,
    lineHeight: 18,
    marginTop: espaco.xs,
  },
});
