import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Signin from '../views/Signin/Signin'
import Home from '../views/Home/Home'

const Stack = createStackNavigator()

export default function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="SignIn"
                component={Signin}
                options={{
                    title: 'Sign In',
                    headerStyle: {
                      backgroundColor: '#f4511e'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
            />
            <Stack.Screen 
                name="Home"
                component={Home}
                options={{ 
                    title: "VNJobs"
                }}
            />
        </Stack.Navigator>
    )
}
