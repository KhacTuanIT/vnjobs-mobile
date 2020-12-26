import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function TabButton({name = '', color = '#dfdfdf', onPress}) {
    return (
        <TouchableOpacity style={styles.tabButton}>
            <Icon name={name} color={color} size={40} solid  />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    tabButton: {
        width: 45,
        height: 45,
        alignItems: 'center',
        textAlignVertical: 'center',
        flex: 1,
    }
})
