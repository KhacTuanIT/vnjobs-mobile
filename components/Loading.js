import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

export default function Loading(props) {
    const message = () => {
        return props.message ? props.message : 'Đang tải dữ liệu ....'
    }
    return (
        <View style={styles.wrapper}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>{message()}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        zIndex: 999,
        flex: 1,
        color: '#0000ff',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        opacity: 1
    }
})
