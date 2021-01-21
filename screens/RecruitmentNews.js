import React, { Component } from 'react'
import {
    ScrollView,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    ImageBackground,
    Dimensions,
    TouchableOpacity
  } from "react-native";
  //galio
import { Block, Text, theme } from "galio-framework";
import { Button, Icon } from "../components";
//argon
import { articles, Images, argonTheme } from "../constants/";
import { Card } from "../components/";
import { HeaderHeight } from "../constants/utils";
const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
import * as API from "../api/endpoints"
import { or } from 'react-native-reanimated';
const axios = require('axios').default;
  
const localStorageUtils = require('../utils/local-store');
// const { width } = Dimensions.get("screen");

// const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

export default class RecruitmentNews extends Component {
    constructor(props) {
        super(props);
        this.state={
            news: null,
            titleApp:"Recruitment News",
            orgId: 0,
            authorId: 0,
            majorId: 0,
            title: '',
            content: '',
            address: '',
            city: '',
            startTime: null,
            endTime: null,
            interviewStartTime: null,
            interviewEndTime: null,
            author: '',
            major: '',
            workType: '',
            organizationName: '',
            startDateApply: '',
            endDateApply: '',
            organization: {
                orgName: '',
                phone: '',
                description: '',
                tax_id: '',
                address: '',
                logo: ''
            }
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
          titleApp: this.state.title,
        };
    };

    getData = async (url) => {

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${tokenCredential.access_token}`,
        };
        try {
            const response = await axios({
                method: 'GET',
                url,
                headers: headers,
            });
            return response
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.prepareRecruitmentNews()
    }

    prepareRecruitmentNews = () => {
        
        const {route, navigation} = this.props
        const {news} = route.params
        
        const startDateApply = this.renderDateTime(news.start_time)
        const endDateApply = this.renderDateTime(news.end_time)
        const interviewStartTime = this.renderDateTime(news.interview_start_time)
        const interviewEndTime = this.renderDateTime(news.interview_end_time)
        this.setState({
            news,
            orgId: news.org_id,
            authorId: news.author_id,
            majorId: news.major_id,
            title: news.title,
            content: news.content,
            address: news.address,
            city: news.city,
            startTime: news.start_time,
            endTime: news.end_time,
            workType: news.work_type,
            interviewStartTime,
            interviewEndTime,
            startDateApply,
            endDateApply
        })
        
        this.prepareExtraData(news.author_id, news.major_id, news.org_id)
    }

    prepareExtraData = (authorId, majorId, orgId) => {
        var organization = {   
            orgName: '',
            phone: '',
            description: '',
            tax_id: '',
            address: '',
            logo: ''
        }
        if (orgId != 0) {
            const url = `${API.LIST_ORGANIZATION}/${orgId}`
            this.getData(url)
            .then(res => {
                this.setState({
                    organization :{
                        orgName: res.data.org_name,
                        phone: res.data.phone,
                        description: res.data.description,
                        tax_id: res.data.tax_id,
                        address: res.data.address,
                        logo: res.data.logo_path
                    }
                })
            }).catch(err => console.log("ERROR PREPARE RN: " + err))
        }
        else {
            this.setState({
                organizationName: 'Organization'
            })
        }
        // if (authorId != 0) {
        //     const url = `${API.USER}/${authorId}`
        //     this.getData(url)
        //     .then(res => {
        //         console.log(res)
        //         this.setState({
        //             author: res.data.first_name + res.data.last_name,
        //         })
        //     }).catch(err => console.log("ERROR PREPARE RN: " + err))
        // }
        // else {
            this.setState({
                author: 'Author'
            })
        // }
        if (majorId != 0) {
            const url = `${API.LIST_ORGANIZATION}/${majorId}`
            this.getData(url)
            .then(res => this.setState({
                major: res.major_name,
            })).catch(err => console.log("ERROR PREPARE RN: " + err))
        }
        else {
            this.setState({
                major: 'Major'
            })
        }
    } 

    renderDateTime = (date) => {
        var t = date.split(/[- :]/);
        var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
        return this.getNumberFromDate(d.getDate()) + "-" + this.getNumberFromMonth(d.getMonth()) + "-" + d.getFullYear()
    }

    getNumberFromDate = (index) => {
        const days = [ '00',
                '01', '02', '03', '04', '05', '06', '07', '08', '09', 
                '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', 
                '10', '21', '22', '23', '24', '25', '26', '27', '28', '29', 
                '30', '31']
        return days[index]
    }

    getNumberFromMonth = (index) => {
        const months = [
                '01', '02', '03', '04', '05', '06', '07', '08', '09', 
                '10', '11', '12']
        return months[index]
    }

    applyJob = async () => {
        const tokenCredential = localStorageUtils.getTokenFromLS()
        tokenCredential.access_token = tokenCredential.access_token != '' ? tokenCredential.access_token : '';
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenCredential.access_token}`,
        };
        const url = `${API.LIST_RECRUITMENT_NEWS}/${this.state.news.id}`
        console.log(url)
        try {
            const response = await axios({
                method: 'PUT',
                url,
                headers: headers,
                data: {
                    org_id: this.state.orgId,
                    author_id: this.state.authorId,
                    major_id: this.state.majorId,
                    title: this.state.title,
                }
            });
            return response
        } catch (error) {
            console.log(error)
        }
    }

    updateApplyJob = () => {
        console.log("[OnUpdate]")
        let rn = null
        this.applyJob()
            .then(res => {
                console.log(res)
                rn = res.recruitmentNews
                if (rn != null) {
                    console.log(res.message)
                }
            })
            .catch(err => console.log(err))
    }

    render() {
        const {
            news,
            organizationName, 
            author, 
            major, 
            title, 
            workType, 
            content, 
            address, 
            city, 
            startDateApply, 
            endDateApply, 
            interviewStartTime, 
            interviewEndTime, 
            organization} = this.state
        const {navigation, route} = this.props
        console.log(news)
        return (
            <Block flex style={styles.profile}>
                <Block flex>
                    <ImageBackground
                        source={Images.ProfileBackground}
                        style={styles.profileContainer}
                        imageStyle={styles.profileBackground}
                    >
                        <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ width, paddingTop: '5%', paddingBottom: '5%' }}
                        >
                            <Block flex style={styles.profileCard}>
                                <Block middle style={styles.avatarContainer}>
                                    <Image
                                        source={Images.Logo}
                                        style={styles.avatar}
                                        size={124}
                                    />
                                </Block>
                                <Block style={styles.info}>
                                    <Block
                                        middle
                                        row
                                        space="evenly"
                                        style={{ marginTop: 20, paddingBottom: 24 }}
                                    >
                                        <Button
                                        style={{ backgroundColor: argonTheme.COLORS.INFO }}
                                        >
                                            <Text size={16} bold color="#fff">
                                                CHI TIẾT CÔNG TY
                                            </Text>
                                        </Button>
                                    </Block>
                                </Block>
                                <Block flex>
                                    <Block middle>
                                        <Text size={16} color={argonTheme.COLORS.TEXT} style={styles.companyName}>{organization.orgName != '' ? organization.orgName : organizationName}</Text>
                                    </Block>
                                    <Block middle style={styles.nameInfo}>
                                        <Text bold size={22} color="#32325D">
                                        {title}
                                        </Text>
                                        <Text size={18} color="#32325D" style={{ marginTop: 10 }}>
                                            <Icon 
                                                name="ios-aperture"
                                                family="Ionicon"
                                                size={18} 
                                                // color="#77ff97"
                                            /> {city}
                                        </Text>
                                        <Text size={18} color="#32325D" style={{ marginTop: 10 }}>
                                            <Icon 
                                                name="thumb-tack"
                                                family="Font-Awesome"
                                                size={18} 
                                                // color="#77ff97"
                                            /> {author}
                                        </Text>
                                    </Block>
                                </Block>
                            </Block>
                            <Block flex style={styles.jobIntroduction}>
                                <Block  style={styles.rowJobIntroductio}>
                                    <Text bold size={22} color="#777" style={styles.titleBlock}>
                                        Mô tả công việc
                                    </Text>
                                    {/* <Text size={16} color="#32325D" style={{ marginTop: 5 }}>
                                        - Code from SPA to HTML/CSS/JS (required perfect pixel)
                                    </Text>
                                    <Text size={16} color="#32325D" style={{ marginTop: 5 }}>
                                        - Do thing that relate to UI of Website
                                    </Text>
                                    <Text size={16} color="#32325D" style={{ marginTop: 5 }}>
                                        - Update Website content
                                    </Text> */}
                                    <Text size={16} color="#32325D" style={{ marginTop: 5 }}>
                                        {content}
                                    </Text>
                                </Block>
                            </Block>
                            {/* <Block flex style={styles.jobIntroduction}>
                                <Block  style={styles.rowJobFeatures}>
                                    <Icon
                                        name="ios-wallet"
                                        family="Ionicon"
                                        size={45}
                                        color={"black"}
                                        style={styles.iconFeature}
                                    />
                                    <Block  style={styles.rowFeatures}>
                                        <Text bold size={16} color="#777" style={[styles.titleFeature, styles.titleBlock]}>
                                            Salary
                                        </Text>
                                        <Text size={14} color="#32325D" style={styles.textFeature}>
                                            Up to $1200 
                                        </Text>
                                    </Block>
                                </Block>
                            </Block> */}
                            {/* <Block flex style={styles.jobIntroduction}>
                                <Block  style={styles.rowJobFeatures}>
                                    <Icon
                                        name="ios-ribbon"
                                        family="Ionicon"
                                        size={45}
                                        color={"black"}
                                        style={styles.iconFeature}
                                    />
                                    <Block  style={styles.rowFeatures}>
                                        <Text bold size={16} color="#777" style={[styles.titleFeature, styles.titleBlock]}>
                                            Graduation
                                        </Text>
                                        <Text size={14} color="#32325D" style={styles.textFeature}>
                                            Collage/Uni 
                                        </Text>
                                    </Block>
                                </Block>
                            </Block> */}
                            <Block flex style={styles.jobIntroduction}>
                                <Block  style={styles.rowJobFeatures}>
                                    <Icon
                                        name="ios-time"
                                        family="Ionicon"
                                        size={45}
                                        color={"black"}
                                        style={styles.iconFeature}
                                    />
                                    <Block  style={styles.rowFeatures}>
                                        <Text bold size={16} color="#777" style={[styles.titleFeature, styles.titleBlock]}>
                                            Tính chất công việc
                                        </Text>
                                        <Text size={14} color="#32325D" style={styles.textFeature}>
                                            {workType}
                                        </Text>
                                    </Block>
                                </Block>
                            </Block>
                            <Block flex style={styles.jobIntroduction}>
                                <Block  style={styles.rowJobFeatures}>
                                    <Icon
                                        name="ios-navigate"
                                        family="Ionicon"
                                        size={45}
                                        color={"black"}
                                        style={styles.iconFeature}
                                    />
                                    <Block  style={styles.rowFeatures}>
                                        <Text bold size={16} color="#777" style={[styles.titleFeature, styles.titleBlock]}>
                                            Địa chỉ
                                        </Text>
                                        <Text size={14} color="#32325D" style={styles.textFeature}>
                                            {address}
                                        </Text>
                                    </Block>
                                </Block>
                            </Block>
                            {/* <Block flex style={styles.jobIntroduction}>
                                <Block middle style={styles.rowJobIntroductio}>
                                    <Text bold size={22} color="#777">
                                        Job Skill
                                    </Text>
                                    <Block middle>
                                        <Icon
                                            name="ios-code"
                                            family="Ionicon"
                                            size={45}
                                            color={"black"}
                                        />
                                        <Text size={16} color="#32325D" style={{ marginTop: 5 }}>
                                            ReactJS
                                        </Text>
                                    </Block>
                                    
                                </Block>
                            </Block> */}
                            {/* <Block flex style={styles.jobIntroduction}>
                                <Block  style={styles.rowJobIntroductio}>
                                    <Text bold size={22} color="#777" style={styles.titleBlock}>
                                        Benefit
                                    </Text>
                                    <Text size={16} color="#32325D" style={{ marginTop: 5 }}>
                                        - Its hands were holograms that altered to match the convolutions of the car’s floor.
                                    </Text>
                                    <Text size={16} color="#32325D" style={{ marginTop: 5 }}>
                                        - Its hands were holograms that altered to match the convolutions of the car’s floor.
                                    </Text>
                                </Block>
                            </Block> */}
                            <Block flex style={styles.jobIntroduction}>
                                <Block middle style={styles.rowJobIntroductio}>
                                    <Text bold size={16} color="#777">
                                        Thời gian nộp đơn:
                                    </Text>
                                    <Text bold size={16} color="#dd325D" style={{ marginTop: 5 }}>
                                        {startDateApply}
                                    </Text>
                                </Block>
                                <Block middle style={styles.rowJobIntroductio}>
                                    <Text bold size={16} color="#777">
                                        Hạn nộp đơn:
                                    </Text>
                                    <Text bold size={16} color="#dd325D" style={{ marginTop: 5 }}>
                                        {endDateApply}
                                    </Text>
                                </Block>
                            </Block>
                            <Block flex style={styles.jobIntroduction}>
                                <Block middle style={styles.rowJobIntroductio}>
                                    <Text bold size={16} color="#777">
                                        Thời gian phỏng vấn:
                                    </Text>
                                    <Text bold size={16} color="#dd325D" style={{ marginTop: 5 }}>
                                        {interviewStartTime} đến {interviewEndTime}
                                    </Text>
                                </Block>
                            </Block>
                            <Block flex style={styles.endPage}></Block>
                            
                        </ScrollView>
                        <Block middle style={styles.blockApply}>
                            <TouchableOpacity style={styles.btnApply} activeOpacity={0.5} onPress={({route}) => navigation.navigate('Apply', {item: news})}>
                                <Block flex middle style={styles.endApplyBlock}>
                                    <Icon style={styles.iconApply} name="ios-checkbox-outline" family="Ionicon" size={45} />
                                    <Text style={styles.textApply} bold size={16} color="#333">APPLY</Text>
                                </Block>
                            </TouchableOpacity>
                        </Block>
                    </ImageBackground>
                </Block>
            </Block>
        )
    }
}

const styles = StyleSheet.create({
    profile: {
        // marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
        // marginBottom: -HeaderHeight * 2,
        flex: 1
    },
    profileContainer: {
        width: width,
        // height: height,
        padding: 0,
        zIndex: 200
    },
    profileBackground: {
        width: width,
        height: height / 4
    },
    profileCard: {
        // position: "relative",
        padding: theme.SIZES.BASE,
        marginHorizontal: theme.SIZES.BASE,
        marginTop: 65,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        backgroundColor: theme.COLORS.WHITE,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 8,
        shadowOpacity: 0.2,
        zIndex: 100
    },
    info: {
        paddingHorizontal: 40
    },
    avatarContainer: {
        position: "relative",
        marginTop: -80
    },
    avatar: {
        width: 124,
        height: 124,
        borderRadius: 62,
        borderWidth: 0
    },
    companyName: {
        marginTop: 5
    },
    nameInfo: {
        marginTop: 5
    },
    divider: {
        width: "90%",
        borderWidth: 1,
        borderColor: "#E9ECEF"
    },
    thumb: {
        borderRadius: 4,
        marginVertical: 4,
        alignSelf: "center",
        width: thumbMeasure,
        height: thumbMeasure
    },
    jobIntroduction: {
        marginTop: 5,
        backgroundColor: theme.COLORS.WHITE,
        padding: theme.SIZES.BASE,
        marginHorizontal: theme.SIZES.BASE,
    },
    endPage: {
        height: 65,
        flex: 1,
        marginBottom: 15
    },
    rowJobFeatures: {
        flexDirection: 'row'
    },
    iconFeature: {
        width: 45,
        height: 45,
        flex: 1
    },
    rowFeatures: {
        flex: 5,
        justifyContent: 'center'
    },
    titleBlock: {
        color: '#575757'
    },
    blockApply: {
        height: 55,
        backgroundColor: theme.COLORS.WHITE,
        width: '100%',
        position: 'absolute',
        left: 0,
        bottom: 0
    },
    endApplyBlock: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconApply: {
        marginHorizontal: 10
    }
})
