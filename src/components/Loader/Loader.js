import React from 'react'
import { StyleSheet, ActivityIndicator, View, Text } from 'react-native'

export default function Loader({visible}) {
    return (
        <View style={visible ? styles.container : styles.hide}>
            <ActivityIndicator size="large" color="#0000ff"/>
            <Text style={styles.textLoader}>Logging in...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        opacity: 0.5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    hide: {
        display: 'none'
    },
    textLoader: {
        fontSize: 15,
        paddingLeft: 10,
        paddingTop: 10
    }
})
