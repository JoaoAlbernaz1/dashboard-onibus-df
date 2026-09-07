import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabRouter from './sources/routes/TabRouter';
import { cores } from './sources/theme/theme';

const tema = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: cores.fundo,
    card: cores.fundo,
    text: cores.texto,
    border: cores.borda,
    primary: cores.primaria,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={tema}>
        <StatusBar style="dark" />
        <TabRouter />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
