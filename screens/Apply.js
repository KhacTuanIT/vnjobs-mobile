import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions
} from "react-native";
//galio
import { Block, Text, theme, Button as GaButton } from "galio-framework";
import { Select, Icon, Input, Header, Switch, Loading } from "../components/";
//argon
import { articles, Images, argonTheme } from "../constants/";
import { Card } from "../components/";
import { withNavigation } from "@react-navigation/compat";
import * as DocumentPicker from 'expo-document-picker';
const localStorageUtils = require('../utils/local-store');

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;
import * as API from '../api/endpoints'
const axios = require('axios').default;

export default class Apply extends Component {
    // const { isFocused } = this.props;
    
    constructor(props) {
        super(props)
        this.state={
            exp: 0,
            cv: '',
            cover: '',
            title: '',
            type: '',
            cvFile: {
                uri: '',
                name: '',
                size: ''
            },
            coverFile: {
                uri: '',
                name: '',
                size: ''
            },
        }
    }

    componentDidMount() {
        this.prepare();
    }
    prepare = () => {
        const {route, navigation} = this.props;
        const {item} = route.params;
        this.setState({
            title: item.title,
            type: item.work_type
        })
    }

    chooseFileCV = async() => {
        try {
            const res = await DocumentPicker.getDocumentAsync({
                type: 'pdf/*'
            });
            console.log(
                res.uri,
                res.type, // mime type
                res.name,
                res.size
            );
            if (res.type === 'success') {
                if (res.name !== undefined){
                    this.setState({
                        cvFile: {
                            uri: res.uri,
                            name: res.name,
                            size: res.size
                        }
                    })
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    chooseFileCover = async() => {
        try {
            const res = await DocumentPicker.getDocumentAsync({
                type: 'pdf/*'
            });
            console.log(
                res.uri,
                res.type, // mime type
                res.name,
                res.size
            );
            if (res.type === 'success') {
                if (res.name !== undefined){
                    this.setState({
                        coverFile: {
                            uri: res.uri,
                            name: res.name,
                            size: res.size
                        }
                    })
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    saveFile = async() => {
        const tokenCredential = await localStorageUtils.getTokenFromLS()
        const {route, navigation} = this.props;
        const {item} = route.params;

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenCredential.access_token}`,
        };
        console.log(API.APPLY)
        try {
            const response = await axios({
                method: 'PUT',
                url: API.APPLY,
                headers: headers,
                data: {
                    rn_id: item.id,
                    is_elect: false,
                    cv_path: this.state.cvFile.uri,
                    cover_letter_path: this.state.coverFile.uri,
                    exp_years: this.state.exp
                }
            });
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    handleSendFile = () => {
        this.saveFile()
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    render() {
        const {route} = this.props;
        
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
                        style={{ width, marginTop: '25%' }}
                    >

                        <Block flex style={styles.profileCard}>
                        {/* <Block middle style={styles.avatarContainer}>
                            <Image
                            source={{ uri: Images.ProfilePicture }}
                            style={styles.avatar}
                            />
                        </Block> */}
                        
                            <Block flex>
                                <Block middle style={styles.nameInfo}>
                                    <Text bold size={28} color="#32325D">
                                        {this.state.title}
                                    </Text>
                                    <Text bold size={20} color="#32325D">
                                        {this.state.type}
                                    </Text>
                                </Block>
                            </Block>
                        </Block>
                        <Block flex style={styles.profileBlock}>
                            <Block middle style={styles.profileRow}>
                                <Text style={styles.rowTextLeft} bold size={18} color="#333">Kinh nghiệm</Text>
                                <Input
                                    // style={styles.rowTextRight}
                                    onChangeText={exp => { this.setState({ exp: exp }) }}
                                    value={this.state.exp.toString()}
                                    // error={this.state.errorsState.phone}
                                    right
                                    placeholder=""
                                    
                                    iconContent={
                                        <Block
                                            middle
                                            style={{
                                                width: 20,
                                                height: 20,
                                                borderRadius: 10,
                                                backgroundColor: argonTheme.COLORS.BASE
                                            }}
                                        >
                                            <Icon
                                                size={11}
                                                color={argonTheme.COLORS.ICON}
                                                name="hourglass"
                                                family="AntDesign"
                                            />
                                        </Block>
                                    }
                                />
                                {/* <Text style={styles.rowTextRight} size={16} color="#333"></Text> */}
                            </Block>
                        </Block>
                        <Block flex middle style={styles.profileBlock}>
                            <Block middle style={styles.profileRow}>
                                <Text style={styles.rowTextLeft} bold size={18} color="#333">Thư xin việc</Text>
                                <Text size={16}>{this.state.cvFile.name != '' ? this.state.cvFile.name : 'Chọn file'}</Text>
                                <GaButton 
                                    // round
                                    onlyIcon
                                    // shadowless
                                    icon="archive"
                                    iconFamily="Font-Awesome"
                                    // iconColor={theme.COLORS.BLACK}
                                    iconSize={theme.SIZES.BASE * 1}
                                    // size={'small'}
                                    color={theme.COLORS.WHIYE}
                                    style={[styles.selectFileBtn, styles.shadow]}
                                    onPress={() => this.chooseFileCV()}
                                />
                            </Block>
                        </Block>
                        <Block flex style={styles.profileBlock}>
                            <Block middle style={styles.profileRow}>
                                <Text style={styles.rowTextLeft} bold size={18} color="#333">Thư đề cử</Text>
                                <Text size={16}>{this.state.cvFile.name != '' ? this.state.coverFile.name : 'Chọn file'}</Text>
                                <GaButton 
                                    // round
                                    onlyIcon
                                    // shadowless
                                    icon="archive"
                                    iconFamily="Font-Awesome"
                                    // iconColor={theme.COLORS.BLACK}
                                    iconSize={theme.SIZES.BASE * 1}
                                    // size={'small'}
                                    color={theme.COLORS.WHIYE}
                                    style={[styles.selectFileBtn, styles.shadow]}
                                    onPress={() => this.chooseFileCover()}
                                />    
                            </Block>
                        </Block>
                        <Block flex middle>
                            <GaButton
                            round
                            onlyIcon
                            shadowless
                            icon="save"
                            iconFamily="Font-Awesome"
                            // iconColor={theme.COLORS.BLACK}
                            iconSize={theme.SIZES.BASE * 1}
                            // size={'small'}
                            color={theme.COLORS.WHIYE}
                            style={[styles.editBtn, styles.shadow]}
                            onPress={() => this.handleSendFile()}
                            />
                        </Block>
                        
                    </ScrollView>
                    </ImageBackground>
                </Block>
            </Block>
        );
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
        height: height,
        padding: 0,
        zIndex: 1
    },
    profileBackground: {
    width: width,
    height: height / 2
    },
    profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    // marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
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
    nameInfo: {
    marginTop: 20
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
    blockInfo: {
    marginVertical: 7
    },
    profileBlock: {
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: 3
    },
    profileRow: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center'
    },
    rowTextLeft: {
    flex: 3
    },
    rowTextRight: {
    flex: 5,
    },
    button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2
    },
    social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center"
    },
    editBtn: {
    // width: theme.SIZES.BASE * 3,
    // height: theme.SIZES.BASE * 2.5,
    // borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center"
    },
    selectFileBtn: {
        
    }
});
