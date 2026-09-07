import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetalhesLinha from '../screens/DetalhesLinha';
import ListaLinhas from '../screens/ListaLinhas';
import { cores } from '../theme/theme';
import type { LinhasStackParamList } from './types';

const Stack = createNativeStackNavigator<LinhasStackParamList>();

export default function LinhasStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: cores.superficie },
        headerTintColor: cores.texto,
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: cores.fundo },
      }}
    >
      <Stack.Screen name="ListaLinhas" component={ListaLinhas} options={{ headerShown: false }} />
      <Stack.Screen
        name="DetalhesLinha"
        component={DetalhesLinha}
        options={{ title: 'Detalhes da linha', headerBackTitle: 'Linhas' }}
      />
    </Stack.Navigator>
  );
}
