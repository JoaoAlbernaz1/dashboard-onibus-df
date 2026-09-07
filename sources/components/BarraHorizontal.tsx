import { StyleSheet, Text, View } from 'react-native';
import { cores, espaco } from '../theme/theme';

type Props = {
  posicao?: number;
  rotulo: string;
  descricao?: string;
  valorTexto: string;
  proporcao: number;
  cor?: string;
  ultimo?: boolean;
};

export default function BarraHorizontal({
  posicao,
  rotulo,
  descricao,
  valorTexto,
  proporcao,
  cor = cores.primaria,
  ultimo = false,
}: Props) {
  const largura = Math.max(6, Math.min(100, proporcao * 100));

  return (
    <View style={[styles.item, ultimo && styles.itemUltimo]}>
      <View style={styles.linhaTopo}>
        {posicao ? (
          <View style={styles.posicao}>
            <Text style={styles.posicaoTexto}>{posicao}</Text>
          </View>
        ) : null}

        <View style={styles.textos}>
          <Text style={styles.rotulo} numberOfLines={1}>
            {rotulo}
          </Text>
          {descricao ? (
            <Text style={styles.descricao} numberOfLines={1}>
              {descricao}
            </Text>
          ) : null}
        </View>

        <Text style={styles.valor}>{valorTexto}</Text>
      </View>

      <View style={styles.trilho}>
        <View style={[styles.preenchimento, { width: `${largura}%`, backgroundColor: cor }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingBottom: espaco.md,
    marginBottom: espaco.md,
    borderBottomWidth: 1,
    borderBottomColor: cores.borda,
  },
  itemUltimo: { paddingBottom: 0, marginBottom: 0, borderBottomWidth: 0 },
  linhaTopo: { flexDirection: 'row', alignItems: 'center', marginBottom: espaco.sm, gap: espaco.sm },
  posicao: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: cores.superficieClara,
    alignItems: 'center',
    justifyContent: 'center',
  },
  posicaoTexto: { color: cores.texto, fontSize: 11, fontWeight: '700' },
  textos: { flex: 1 },
  rotulo: { color: cores.texto, fontSize: 14, fontWeight: '600' },
  descricao: { color: cores.textoSecundario, fontSize: 11, marginTop: 2 },
  valor: { color: cores.texto, fontSize: 15, fontWeight: '700', letterSpacing: -0.3 },
  trilho: { height: 6, borderRadius: 3, backgroundColor: cores.superficieClara, overflow: 'hidden' },
  preenchimento: { height: 6, borderRadius: 3 },
});
