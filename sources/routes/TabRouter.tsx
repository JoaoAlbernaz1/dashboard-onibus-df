import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Analises from '../screens/Analises';
import Dashboard from '../screens/Dashboard';
import LinhasStack from './LinhasStack';
import BarraDeAbas from './BarraDeAbas';
import type { TabParamList } from './types';
import { LINHAS } from '../data/linhas';

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabRouter() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      tabBar={(props) => <BarraDeAbas {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} options={{ tabBarLabel: 'Painel' }} />
      <Tab.Screen
        name="Linhas"
        component={LinhasStack}
        options={{ tabBarLabel: 'Linhas', tabBarBadge: LINHAS.length }}
      />
      <Tab.Screen name="Analises" component={Analises} options={{ tabBarLabel: 'Análises' }} />
    </Tab.Navigator>
  );
}
