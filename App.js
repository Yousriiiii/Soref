import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import BottomBar from "./BottomBar";
import ShowRef from "./ShowRef";

const Stack = createStackNavigator();

const App = () => {
    return (
      <NavigationContainer initialRouteName="BottomBar">
        <Stack.Navigator>
          <Stack.Screen name="BottomBar" component={BottomBar} options={{headerShown: false}} />
          <Stack.Screen name="ShowRef" component={ShowRef} options={{headerShown: false}} />
        </Stack.Navigator>
        </NavigationContainer>
      );
}

export default App;
