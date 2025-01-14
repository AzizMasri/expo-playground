import Index from '@/app';
import Signin from '@/app/(root)/(tabs)/signin';
import { useUser } from '@/contexts/userContext';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();
export function Router() {
    const user = useUser();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {user.current == null ? (
                    <Stack.Screen
                        name="Login"
                        component={Signin}
                        options={{ title: 'Login' }}
                    />
                ) : (
                    <Stack.Screen
                        name="Home"
                        component={Index}
                        options={{ title: 'Home' }}
                    />
                )}

            </Stack.Navigator>
        </NavigationContainer>
    );
}
