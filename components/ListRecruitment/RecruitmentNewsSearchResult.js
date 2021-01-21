import React from 'react'
import { ActivityIndicator, StyleSheet, View, ScrollView, Dimensions, Image } from 'react-native'
// import {Icon} from '../Icon';
import { Block, theme, Text, Icon } from 'galio-framework';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
var timediff = require('timediff');
const { width } = Dimensions.get("screen");

const getDateLeft = (date) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const dayLeft = timediff(date, currentDate, 'D');
    return (dayLeft.days.toString().split('-'))
}

const RecruitmentNewsSearchResult = (props) => {
    const { title, news } = props
    if (news != null) {
        return (
            <Block flex style={styles.blockLastestJobs} >
                <Text style={{ paddingBottom: 25, textTransform: 'uppercase' }} bold size={16}>Kết quả cho {title}</Text>
                {
                    news.map((job, key) => {
                        return (
                            <Block style={styles.jobItem} key={key}>
                                <Block style={styles.wrapImg}>
                                    <Image
                                        style={styles.logoOrg}
                                        source={{
                                            uri: 'https://snack-web-player.s3.us-west-1.amazonaws.com/v2/40/static/media/react-native-logo.79778b9e.png',
                                        }}
                                    />
                                </Block>
                                <Block style={styles.infoOrg}>
                                    {/* 58 letters */}
                                    <Text style={styles.text} bold size={15}>{job.title}</Text>
                                    <Text style={styles.text}>{job.org.org_name}</Text>
                                    <Text style={styles.text}>{job.city} - Còn lại {getDateLeft(job.end_time)} ngày</Text>
                                </Block>
                            </Block>
                        )
                    })
                }
                {
                    news.length < 1 &&
                    <Block center>
                        <Text>Chưa có việc làm theo ngành {title}</Text>
                    </Block>
                }

            </Block>
        )
    }
    else return (
        <Block flex style={styles.blockLastestJobs}>
            <Text style={{ paddingBottom: 25, textTransform: 'uppercase' }} bold size={16}>Chưa có ngành nghề nào</Text>
            <Block style={styles.jobItem}>
                <Block style={styles.wrapImg}>
                    <Image
                        style={styles.logoOrg}
                        source={{
                            uri: 'https://snack-web-player.s3.us-west-1.amazonaws.com/v2/40/static/media/react-native-logo.79778b9e.png',
                        }}
                    />
                </Block>
                <Block style={styles.infoOrg}>
                    {/* 58 letters */}
                    <Text style={styles.text} bold size={15}>sdsdsd</Text>
                    <Text style={styles.text}>Phoenix Vietnam Co, Ltd</Text>
                    <Text style={styles.text}>Đà Nẵng</Text>
                </Block>
            </Block>
        </Block>
    );
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
