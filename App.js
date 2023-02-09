import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MainPage from './MainPage';
import SettingsPage from './SettingsPage';
import { Ionicons, Entypo } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Main"
          component={MainPage}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Entypo name="man" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsPage}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Entypo name="book" size={24} color="black" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
