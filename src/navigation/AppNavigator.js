import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from '../views/Home/Home';
import Signin from '../views/Signin/Signin';
import UserInformation from '../views/User/UserInformation';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'

const HomeNavigator = createStackNavigator();
function HomeStack({navigation}) {
    return (
        <HomeNavigator.Navigator
            initialRouteName="Home"
            screenOptions={{ gestureEnabled: false }}
        >
            <HomeNavigator.Screen 
                name="Home"
                component={Home}
                options={{
                    headerRight: () => (
                        <TouchableOpacity style={styles.buttonBars} onPress={() => navigation.openDrawer()}>
                            <Icon name="bars" size={25} />
                        </TouchableOpacity>
                    ),
                }}
            />
        </HomeNavigator.Navigator>
    )
}

const UserNavigator = createStackNavigator();
function UserStack() {
    return (
        <HomeNavigator.Navigator
            initialRouteName="User"
            screenOptions={{ gestureEnabled: false }}
        >
            <HomeNavigator.Screen 
                name="User"
                component={UserInformation}
            />
        </HomeNavigator.Navigator>
    )
}

const SignInNavigator = createStackNavigator();
function SignInStack() {
    return (
        <SignInNavigator.Navigator
            initialRouteName="LogIn"
            screenOptions={{ gestureEnabled: false }}
        >
            <SignInNavigator.Screen 
                name="LogIn"
                component={Signin}
                options={{title: "Log In"}}
            />
        </SignInNavigator.Navigator>
    )
}

const AppNavigator = createBottomTabNavigator();
function AppTab() {
    return (
        <AppNavigator.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'Home') {
                    iconName = 'menu-outline'
                } else if (route.name === 'User') {
                    iconName = 'person-circle-outline'
                }
    
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={26} color={color} />;
            },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                labelStyle: { fontSize: 14 }
            }}
        >
            <AppNavigator.Screen 
                name="Home" 
                component={HomeStack}
            />
            <AppNavigator.Screen 
                name="User" 
                component={UserStack} 
            />
        </AppNavigator.Navigator>
    )
}

const SideNavigator = createDrawerNavigator();
function SideMenuDrawer() {
    return (
        <SideNavigator.Navigator>
            <SideNavigator.Screen name="Home" component={AppTab} />
            <SideNavigator.Screen name="LogIn" component={SignInStack} options={{title: "Log In"}}/>
        </SideNavigator.Navigator>
    )
}

export default SideMenuDrawer;

const styles = StyleSheet.create({
    buttonBars: {
        paddingHorizontal: 10,
        paddingTop: 7
    }
})