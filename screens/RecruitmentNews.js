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
  
// const { width } = Dimensions.get("screen");

// const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;
const categories = [
    {
      title: "Music Album",
      description:
        "Rock music is a genre of popular music. It developed during and after the 1960s in the United Kingdom.",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?fit=crop&w=840&q=80",
      price: "$125"
    },
    {
      title: "Events",
      description:
        "Rock music is a genre of popular music. It developed during and after the 1960s in the United Kingdom.",
      image:
        "https://images.unsplash.com/photo-1543747579-795b9c2c3ada?fit=crop&w=840&q=80",
      price: "$35"
    }
];

export default class RecruitmentNews extends Component {
    constructor(props) {
        super(props);
        this.state={
            title:"Recruitment News"
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
          title: this.state.title,
        };
    };
    render() {
        
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
                                            COMPANY'S INFORMATION
                                        </Button>
                                    </Block>
                                </Block>
                                <Block flex>
                                    <Block middle>
                                        <Text size={16} color={argonTheme.COLORS.TEXT} style={styles.companyName}>TT Technology Group</Text>
                                    </Block>
                                    <Block middle style={styles.nameInfo}>
                                        <Text bold size={22} color="#32325D">
                                        Full-Stack ReactJS/NodeJS
                                        </Text>
                                        <Text size={18} color="#32325D" style={{ marginTop: 10 }}>
                                            <Icon 
                                                name="ios-aperture"
                                                family="Ionicon"
                                                size={18} 
                                                // color="#77ff97"
                                            /> Da Nang
                                        </Text>
                                    </Block>
                                </Block>
                            </Block>
                            <Block flex style={styles.jobIntroduction}>
                                <Block  style={styles.rowJobIntroductio}>
                                    <Text bold size={22} color="#777" style={styles.titleBlock}>
                                        Job Description
                                    </Text>
                                    <Text size={16} color="#32325D" style={{ marginTop: 5 }}>
                                        - Code from SPA to HTML/CSS/JS (required perfect pixel)
                                    </Text>
                                    <Text size={16} color="#32325D" style={{ marginTop: 5 }}>
                                        - Do thing that relate to UI of Website
                                    </Text>
                                    <Text size={16} color="#32325D" style={{ marginTop: 5 }}>
                                        - Update Website content
                                    </Text>
                                    <Text size={16} color="#32325D" style={{ marginTop: 5 }}>
                                        - Do another thing that follow require
                                    </Text>
                                </Block>
                            </Block>
                            <Block flex style={styles.jobIntroduction}>
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
                            </Block>
                            <Block flex style={styles.jobIntroduction}>
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
                            </Block>
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
                                            Time
                                        </Text>
                                        <Text size={14} color="#32325D" style={styles.textFeature}>
                                            Full-time 
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
                                            Address
                                        </Text>
                                        <Text size={14} color="#32325D" style={styles.textFeature}>
                                            123 Nui Thanh st, Hai Chau ds.
                                        </Text>
                                    </Block>
                                </Block>
                            </Block>
                            <Block flex style={styles.jobIntroduction}>
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
                            </Block>
                            <Block flex style={styles.jobIntroduction}>
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
                            </Block>
                            <Block flex style={styles.jobIntroduction}>
                                <Block middle style={styles.rowJobIntroductio}>
                                    <Text bold size={16} color="#777">
                                        Expire apply:
                                    </Text>
                                    <Text bold size={16} color="#dd325D" style={{ marginTop: 5 }}>
                                        12-02-2021
                                    </Text>
                                </Block>
                            </Block>
                            <Block flex style={styles.endPage}></Block>
                            
                        </ScrollView>
                        <Block middle style={styles.blockApply}>
                            <TouchableOpacity style={styles.btnApply} activeOpacity={0.5}>
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
