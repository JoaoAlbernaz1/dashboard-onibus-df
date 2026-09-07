import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cores, espaco, raio } from '../theme/theme';

// Barra de abas customizada: substitui a barra padrão do bottom-tabs
// usando a prop `tabBar` do Tab.Navigator.
const ICONES: Record<string, { ativo: keyof typeof Ionicons.glyphMap; inativo: keyof typeof Ionicons.glyphMap }> = {
  Dashboard: { ativo: 'stats-chart', inativo: 'stats-chart-outline' },
  Linhas: { ativo: 'bus', inativo: 'bus-outline' },
  Analises: { ativo: 'pie-chart', inativo: 'pie-chart-outline' },
};

export default function BarraDeAbas({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, espaco.md) }]}>
      <View style={styles.barra}>
        {state.routes.map((route, indice) => {
          const { options } = descriptors[route.key];
          const rotulo =
            typeof options.tabBarLabel === 'string'
              ? options.tabBarLabel
              : (options.title ?? route.name);
          const ativo = state.index === indice;
          const icones = ICONES[route.name] ?? { ativo: 'ellipse', inativo: 'ellipse-outline' };

          const aoPressionar = () => {
            const evento = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!ativo && !evento.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const aoPressionarLongo = () => {
            navigation.emit({ type: 'tabLongPress', target: route.key });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={ativo ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={aoPressionar}
              onLongPress={aoPressionarLongo}
              activeOpacity={0.85}
              style={[styles.aba, ativo && styles.abaAtiva]}
            >
              <Ionicons
                name={ativo ? icones.ativo : icones.inativo}
                size={20}
                color={ativo ? '#FFFFFF' : cores.textoSecundario}
              />
              {ativo ? <Text style={styles.rotulo}>{rotulo}</Text> : null}
              {options.tabBarBadge != null && !ativo ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeTexto}>{options.tabBarBadge}</Text>
                </View>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingHorizontal: espaco.md,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  barra: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: cores.superficie,
    borderRadius: raio.lg + 8,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 3 },
      default: {},
    }),
  },
  aba: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: espaco.md,
    borderRadius: raio.lg,
  },
  abaAtiva: { backgroundColor: cores.primaria },
  rotulo: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  badge: {
    position: 'absolute',
    top: 4,
    right: espaco.sm,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    borderRadius: 8,
    backgroundColor: cores.perigo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeTexto: { color: '#FFFFFF', fontSize: 9, fontWeight: '800' },
});
