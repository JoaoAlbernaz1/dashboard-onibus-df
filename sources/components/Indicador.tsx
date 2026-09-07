import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { cores, espaco, raio } from '../theme/theme';

type Props = {
  icone: keyof typeof Ionicons.glyphMap;
  rotulo: string;
  valor: string;
  unidade?: string;
  explicacao?: string;
};

export default function Indicador({ icone, rotulo, valor, unidade, explicacao }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <Ionicons name={icone} size={13} color={cores.textoSecundario} />
        <Text style={styles.rotulo}>{rotulo}</Text>
      </View>

      <View style={styles.linhaValor}>
        <Text style={styles.valor}>{valor}</Text>
        {unidade ? <Text style={styles.unidade}>{unidade}</Text> : null}
      </View>

      {explicacao ? <Text style={styles.explicacao}>{explicacao}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexBasis: '46%',
    backgroundColor: cores.superficie,
    borderRadius: raio.md,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: espaco.md,
  },
  topo: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  rotulo: {
    color: cores.textoSecundario,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  linhaValor: { flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: espaco.sm },
  valor: { color: cores.texto, fontSize: 26, fontWeight: '700', letterSpacing: -0.8 },
  unidade: { color: cores.textoSecundario, fontSize: 13, fontWeight: '600' },
  explicacao: { color: cores.textoSecundario, fontSize: 11, lineHeight: 15, marginTop: 6 },
});
