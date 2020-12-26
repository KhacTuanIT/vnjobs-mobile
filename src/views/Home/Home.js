import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RecruitmentTag from '../../components/RecruitmentTag/RecruitmentTag'

export default function Home() {
    return (
        <View style={styles.homeScreen}>
            <RecruitmentTag />
        </View>
    )
}

const styles = StyleSheet.create({
    homeScreen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    }
})
