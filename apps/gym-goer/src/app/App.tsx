/* eslint-disable jsx-a11y/accessible-emoji */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Registration } from '../pages/resigtration/registration';
import { LoginScreen } from '../pages/login/login';
import { RootStackParamList } from '../interface/types';
import { DiscoveryLocation } from '../pages/map/discoveLocation';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserProfile } from '../pages/profile/profile';
import { AdminProfile } from '../pages/admin/profile';

const Stack = createNativeStackNavigator<RootStackParamList>();

const queryClient = new QueryClient();
export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Registration"
            component={Registration}
            options={{ title: 'Welcome' }}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Map" component={DiscoveryLocation} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="AdminProfile" component={AdminProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
