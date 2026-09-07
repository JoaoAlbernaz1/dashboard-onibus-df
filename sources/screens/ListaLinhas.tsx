import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatarCompacto } from '../data/estatisticas';
import { LINHAS, Linha } from '../data/linhas';
import { cores, espaco, raio } from '../theme/theme';
import type { LinhasStackParamList } from '../routes/types';

type Props = NativeStackScreenProps<LinhasStackParamList, 'ListaLinhas'>;

type Ordenacao = 'passageiros' | 'atrasos' | 'codigo';

const ORDENACOES: { chave: Ordenacao; rotulo: string }[] = [
  { chave: 'passageiros', rotulo: 'Movimento' },
  { chave: 'atrasos', rotulo: 'Atrasos' },
  { chave: 'codigo', rotulo: 'Código' },
];

export default function ListaLinhas({ navigation }: Props) {
  const [busca, setBusca] = useState('');
  const [ordenacao, setOrdenacao] = useState<Ordenacao>('passageiros');

  const linhas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    const filtradas = LINHAS.filter((linha) =>
      `${linha.codigo} ${linha.origem} ${linha.destino} ${linha.empresa}`
        .toLowerCase()
        .includes(termo)
    );

    return filtradas.sort((a, b) => {
      if (ordenacao === 'passageiros') return b.passageirosDia - a.passageirosDia;
      if (ordenacao === 'atrasos') return b.percentualAtrasos - a.percentualAtrasos;
      return a.codigo.localeCompare(b.codigo);
    });
  }, [busca, ordenacao]);

  const renderItem = ({ item }: { item: Linha }) => (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={0.6}
      onPress={() => navigation.navigate('DetalhesLinha', { linhaId: item.id })}
    >
      <View style={styles.itemTopo}>
        <View style={styles.codigoBox}>
          <Text style={styles.codigo}>{item.codigo}</Text>
        </View>
        <View style={styles.itemTextos}>
          <Text style={styles.origem} numberOfLines={1}>
            {item.origem}
          </Text>
          <Text style={styles.destino} numberOfLines={1}>
            até {item.destino}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={cores.textoSecundario} />
      </View>

      <View style={styles.metricas}>
        <Metrica valor={formatarCompacto(item.passageirosDia)} rotulo="passageiros" />
        <Metrica valor={String(item.onibus)} rotulo="ônibus" />
        <Metrica valor={`${item.tempoMedioMin} min`} rotulo="por viagem" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.tela} edges={['top']}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Linhas</Text>

        <View style={styles.busca}>
          <Ionicons name="search" size={17} color={cores.textoSecundario} />
          <TextInput
            style={styles.input}
            placeholder="Buscar linha"
            placeholderTextColor={cores.textoSecundario}
            value={busca}
            onChangeText={setBusca}
          />
          {busca.length > 0 ? (
            <TouchableOpacity onPress={() => setBusca('')} hitSlop={8}>
              <Ionicons name="close-circle" size={17} color={cores.textoSecundario} />
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.filtros}>
          {ORDENACOES.map((opcao) => {
            const ativo = opcao.chave === ordenacao;
            return (
              <TouchableOpacity
                key={opcao.chave}
                style={[styles.chip, ativo && styles.chipAtivo]}
                onPress={() => setOrdenacao(opcao.chave)}
                activeOpacity={0.7}
              >
                <Text style={[styles.chipTexto, ativo && styles.chipTextoAtivo]}>
                  {opcao.rotulo}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <FlatList
        data={linhas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhuma linha encontrada.</Text>}
      />
    </SafeAreaView>
  );
}

function Metrica({ valor, rotulo }: { valor: string; rotulo: string }) {
  return (
    <View style={styles.metrica}>
      <Text style={styles.metricaValor}>{valor}</Text>
      <Text style={styles.metricaRotulo}>{rotulo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  cabecalho: { paddingHorizontal: espaco.md, paddingTop: espaco.sm },
  titulo: {
    color: cores.texto,
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: -0.8,
    marginBottom: espaco.lg,
  },
  busca: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaco.sm,
    backgroundColor: cores.superficieClara,
    borderRadius: raio.md,
    paddingHorizontal: espaco.md,
    height: 44,
  },
  input: { flex: 1, color: cores.texto, fontSize: 14 },
  filtros: { flexDirection: 'row', gap: espaco.sm, marginTop: espaco.md },
  chip: {
    paddingHorizontal: espaco.md,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  chipAtivo: { backgroundColor: cores.primaria, borderColor: cores.primaria },
  chipTexto: { color: cores.textoSecundario, fontSize: 12, fontWeight: '600' },
  chipTextoAtivo: { color: '#FFFFFF' },
  lista: { padding: espaco.md, paddingBottom: 110, gap: espaco.sm },
  item: {
    borderRadius: raio.md,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: espaco.md,
  },
  itemTopo: { flexDirection: 'row', alignItems: 'center', gap: espaco.sm },
  codigoBox: {
    backgroundColor: cores.superficieClara,
    borderRadius: raio.sm,
    paddingHorizontal: espaco.sm,
    paddingVertical: 6,
    minWidth: 54,
    alignItems: 'center',
  },
  codigo: { color: cores.texto, fontWeight: '700', fontSize: 13 },
  itemTextos: { flex: 1 },
  origem: { color: cores.texto, fontSize: 15, fontWeight: '600' },
  destino: { color: cores.textoSecundario, fontSize: 12, marginTop: 2 },
  metricas: {
    flexDirection: 'row',
    marginTop: espaco.md,
    paddingTop: espaco.md,
    borderTopWidth: 1,
    borderTopColor: cores.borda,
  },
  metrica: { flex: 1 },
  metricaValor: { color: cores.texto, fontSize: 15, fontWeight: '700', letterSpacing: -0.3 },
  metricaRotulo: { color: cores.textoSecundario, fontSize: 10, marginTop: 2 },
  vazio: { color: cores.textoSecundario, textAlign: 'center', marginTop: espaco.xl },
});
