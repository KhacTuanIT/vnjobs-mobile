import React from 'react'
import { ActivityIndicator, StyleSheet, View, ScrollView, Dimensions, Image } from 'react-native'
// import {Icon} from '../Icon';
import { Block, theme, Text, Icon } from 'galio-framework';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
import { TouchableOpacity } from 'react-native-gesture-handler';
var timediff = require('timediff');
const { width } = Dimensions.get("screen");

const getDateLeft = (date) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const dayLeft = timediff(date, currentDate, 'D');
    return (dayLeft.days.toString().split('-'))
}

const RecruitmentNewsSearchResult = (props) => {
    const { news, navigation, route } = props
    return (
        <TouchableOpacity 
            style={styles.jobItem} 
            onPress={ () =>  {navigation.navigate('RecruitmentNews', {news: news}) }}
        >
            <Block style={styles.wrapImg}>
                <Image
                    style={styles.logoOrg}
                    source={{
                        uri: 'https://snack-web-player.s3.us-west-1.amazonaws.com/v2/40/static/media/react-native-logo.79778b9e.png',
                    }}
                />
            </Block>
            <Block style={styles.infoOrg}>
                <Text style={styles.text} bold size={15}>{news.title}</Text>
                <Text style={styles.text}>{news.org.org_name}</Text>
                <Text style={styles.text}>{news.city} - Còn lại {getDateLeft(news.end_time)} ngày</Text>
            </Block>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    blockLastestJobs: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 15,
        paddingRight: 10,
        borderRadius: 7,
        backgroundColor: 'white',
        marginBottom: 20,
    },
    jobItem: {
        flexDirection: 'row',
        flex: 1,
        paddingTop: 12,
        paddingBottom: 12,
        // backgroundColor: 'lightpink',
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderTopColor: 'lightgrey',
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0
    },
    wrapImg: {
        height: 80,
        maxHeight: 80,
        flex: 1,
        // backgroundColor: 'lightblue',
    },
    logoOrg: {
        height: '100%',
        // backgroundColor: 'lightblue',
        width: '100%'
    },
    infoOrg: {
        // backgroundColor: 'lightcyan',
        paddingLeft: 10,
        justifyContent: 'center',
        flex: 3,

    },
    text: {
        lineHeight: 20,
        flexShrink: 1,
        // flex: 'wrap'
    }
})

export default RecruitmentNewsSearchResult;
