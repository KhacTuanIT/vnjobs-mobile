import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { View, Text } from 'react-native'
import SideMenuDrawer from './AppNavigator'

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <SideMenuDrawer />
        </NavigationContainer>
    )
}
