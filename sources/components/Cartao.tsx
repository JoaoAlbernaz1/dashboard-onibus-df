import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { cores, espaco, raio } from '../theme/theme';

type Props = { children: ReactNode; style?: ViewStyle };

export default function Cartao({ children, style }: Props) {
  return <View style={[styles.cartao, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  cartao: {
    backgroundColor: cores.superficie,
    borderRadius: raio.md,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: espaco.md,
  },
});
