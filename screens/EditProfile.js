import React from "react";
import {
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
    ImageBackground,
    Platform,
    TextInput,
    View,
    Button
} from "react-native";
import { Block, Text, Button as GaButton, theme } from "galio-framework";
import { Select, Icon, Input, Header, Switch } from "../components/";

import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import * as API from "../api/endpoints"
import localStorageUtils from '../utils/local-store';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Toast from 'react-native-toast-message';

const axios = require('axios').default;

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: null,
            last_name: null,
            dob: null,
            email: null,
            phone: null,
            address: null,
            bio: null,
            // social_facebook: null,
            // social_linkedin: null,
            //
            userFromLocal: {},
            isDatePickerVisible: false,
        }

        this.prepareData()
    }

    async prepareData() {
        const userLocal = await localStorageUtils.getUserFromStore();
        this.setState({
            userFromLocal: userLocal,
            first_name: userLocal.user.first_name,
            last_name: userLocal.user.last_name,
            dob: userLocal.user.dob,
            email: userLocal.user.email,
            phone: userLocal.user.phone,
            address: userLocal.user.address,
            bio: userLocal.user.bio,
            // social_facebook: userLocal.user.social_facebook,
            // social_linkedin: userLocal.user.social_linkedin,
        })
    }


    handleConfirm = (date) => {
        this.setState({ isDatePickerVisible: false })
        const convertedToDate = new Date(date).toJSON().slice(0, 10);
        this.setState({ dob: convertedToDate })
    };


    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true })
    };

    async updateUserData() {

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.state.userFromLocal.access_token}`,
        };

        try {
            const response = await axios({
                method: 'PUT',
                url: API.USER,
                headers: headers,
                data: {
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    dob: this.state.dob,
                    email: this.state.email,
                    phone: this.state.phone,
                    address: this.state.address,
                    bio: this.state.bio,
                    // social_facebook: this.state.social_facebook,
                    // social_linkedin: this.state.social_linkedin,
                }
            });
            console.log(response.status);
            if (response.status === 200) {
                console.log(response);
                Toast.show({
                    text1: response.data.message,
                });
            }
        } catch (error) {
            this.setState({ loginButtonText: 'SIGN IN' })
            console.log('Error: ' + error);
            console.log(error.response);

            console.log(error.message);
            if (error.response) {
                if (error.response.status === 401 || error.response.status === 422 || error.response.status === 403) {

                }
                else if (error.response.status === 500) {

                }
            }
            else if (error.message === 'Network Error') {

            }
        }
    }

    componentDidMount(){}

    render() {
        return (
            <Block flex style={styles.profile}>
                <Block style={{zIndex: 9999999}}>
                    <Toast ref={(ref) => Toast.setRef(ref)} />
                    
                </Block>

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
                                <Block middle style={styles.avatarContainer}>
                                    <Image
                                        source={{ uri: Images.ProfilePicture }}
                                        style={styles.avatar}
                                    />
                                </Block>
                                <Block style={styles.info}>
                                    <Block row middle style={styles.blockInfo}>
                                        <Block left>
                                            <Text
                                                bold
                                                size={18}
                                                color="#525F7F"
                                                style={{ marginBottom: 4 }}
                                            >
                                            </Text>
                                            <Text bold size={18} color="#32325D">Email</Text>
                                            <Block style={styles.inputText}>
                                                <Input
                                                    error
                                                    right
                                                    placeholder="Error Input"
                                                    onChangeText={email => { this.setState({ email: email }) }}
                                                    value={this.state.email}
                                                    iconContent={
                                                        <Block
                                                            middle
                                                            style={{
                                                                width: 20,
                                                                height: 20,
                                                                borderRadius: 10,
                                                                backgroundColor: argonTheme.COLORS.INPUT_ERROR
                                                            }}
                                                        >
                                                            <Icon
                                                                size={11}
                                                                color={argonTheme.COLORS.ICON}
                                                                name="support"
                                                                family="ArgonExtra"
                                                            />
                                                        </Block>
                                                    }
                                                />
                                            </Block>
                                        </Block>
                                    </Block>
                                    <Block row middle style={styles.blockInfo}>
                                        <Block left>
                                            <Text
                                                bold
                                                size={18}
                                                color="#525F7F"
                                                style={{ marginBottom: 4 }}
                                            >

                                            </Text>
                                            <Text bold size={18} color="#32325D">Số điện thoại</Text>
                                            <Block style={styles.inputText}>
                                                <Input
                                                    onChangeText={phone => { this.setState({ phone: phone }) }}
                                                    value={this.state.phone}
                                                    error
                                                    right
                                                    placeholder="Error Input"
                                                    iconContent={
                                                        <Block
                                                            middle
                                                            style={{
                                                                width: 20,
                                                                height: 20,
                                                                borderRadius: 10,
                                                                backgroundColor: argonTheme.COLORS.INPUT_ERROR
                                                            }}
                                                        >
                                                            <Icon
                                                                size={11}
                                                                color={argonTheme.COLORS.ICON}
                                                                name="support"
                                                                family="ArgonExtra"
                                                            />
                                                        </Block>
                                                    }
                                                />
                                            </Block>
                                        </Block>
                                    </Block>
                                </Block>
                                <Block flex>
                                    <Block style={[styles.profileRow, styles.tach2]}>
                                        <Text color="#32325D" bold size={18}>
                                            Họ
                            </Text>
                                        <Text color="#32325D" bold size={18}>
                                            Tên
                            </Text>
                                    </Block>
                                    <Block style={styles.profileRow}>
                                        <Block style={styles.divisionTwoInput}>
                                            <Input
                                                onChangeText={last_name => { this.setState({ last_name: last_name }) }}
                                                value={this.state.last_name}
                                                error
                                                right
                                                placeholder="Error Input"
                                                iconContent={
                                                    <Block
                                                        middle
                                                        style={{
                                                            width: 20,
                                                            height: 20,
                                                            borderRadius: 10,
                                                            backgroundColor: argonTheme.COLORS.INPUT_ERROR
                                                        }}
                                                    >
                                                        <Icon
                                                            size={11}
                                                            color={argonTheme.COLORS.ICON}
                                                            name="support"
                                                            family="ArgonExtra"
                                                        />
                                                    </Block>
                                                }
                                            />
                                        </Block>
                                        <Block style={styles.divisionTwoInput}>
                                            <Input
                                                onChangeText={first_name => { this.setState({ first_name: first_name }) }}
                                                value={this.state.first_name}
                                                error
                                                right
                                                placeholder="Error Input"
                                                iconContent={
                                                    <Block
                                                        middle
                                                        style={{
                                                            width: 20,
                                                            height: 20,
                                                            borderRadius: 10,
                                                            backgroundColor: argonTheme.COLORS.INPUT_ERROR
                                                        }}
                                                    >
                                                        <Icon
                                                            size={11}
                                                            color={argonTheme.COLORS.ICON}
                                                            name="support"
                                                            family="ArgonExtra"
                                                        />
                                                    </Block>
                                                }
                                            />
                                        </Block>
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
                                        onPress={() => this.updateUserData()}
                                    />
                                </Block>
                            </Block>
                            <Block flex style={styles.profileBlock}>
                                <Block flex>
                                    <Block left style={styles.nameInfo}>
                                        <Text color="#32325D" bold size={18}>
                                            Ngày sinh
                                        </Text>
                                        <Block style={styles.inputText}>
                                            <View>
                                                <Button title="Change DOB" onPress={() => this.showDatePicker()} />
                                                <Input
                                                    value={this.state.dob}
                                                    right
                                                    onPress={() => this.showDatePicker()}

                                                    iconContent={
                                                        <Block
                                                            middle
                                                            style={{
                                                                width: 20,
                                                                height: 20,
                                                                borderRadius: 10,
                                                                backgroundColor: argonTheme.COLORS.INPUT_ERROR
                                                            }}
                                                        >
                                                            <Icon
                                                                size={11}
                                                                color={argonTheme.COLORS.ICON}
                                                                name="calendar"
                                                                family="AntDesign"
                                                                onPress={() => this.showDatePicker()}
                                                            />
                                                        </Block>
                                                    }
                                                />
                                                <DateTimePickerModal
                                                    // value={new Date()}
                                                    isVisible={this.state.isDatePickerVisible}
                                                    mode="date"
                                                    onConfirm={this.handleConfirm}
                                                    onCancel={() => this.setState({ isDatePickerVisible: false })}
                                                />
                                            </View>
                                        </Block>
                                    </Block>
                                </Block>
                            </Block>
                            <Block flex style={styles.profileBlock}>
                                <Block flex>
                                    <Block left style={styles.nameInfo}>
                                        <Text color="#32325D" bold size={18}>
                                            Địa chỉ
                                        </Text>
                                        <Block style={styles.inputText}>
                                            <Input
                                                onChangeText={address => { this.setState({ address: address }) }}
                                                value={this.state.address}
                                                error
                                                right
                                                placeholder="Error Input"
                                                iconContent={
                                                    <Block
                                                        middle
                                                        style={{
                                                            width: 20,
                                                            height: 20,
                                                            borderRadius: 10,
                                                            backgroundColor: argonTheme.COLORS.INPUT_ERROR
                                                        }}
                                                    >
                                                        <Icon
                                                            size={11}
                                                            color={argonTheme.COLORS.ICON}
                                                            name="support"
                                                            family="ArgonExtra"
                                                        />
                                                    </Block>
                                                }
                                            />
                                        </Block>
                                    </Block>
                                </Block>
                            </Block>
                            <Block left style={styles.profileBlock}>
                                <Text color="#32325D" bold size={18}>
                                    Giới thiệu bản thân
                        </Text>
                                <Block style={styles.inputText}>
                                    <TextInput
                                        // error
                                        // right
                                        onChangeText={bio => { this.setState({ bio: bio }) }}
                                        value={this.state.bio}
                                        placeholder="Error Input"
                                        multiline={true}
                                        numberOfLines={10}
                                        iconContent={
                                            <Block
                                                middle
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    borderRadius: 10,
                                                    backgroundColor: argonTheme.COLORS.INPUT_ERROR
                                                }}
                                            >
                                                <Icon
                                                    size={11}
                                                    color={argonTheme.COLORS.ICON}
                                                    name="support"
                                                    family="ArgonExtra"
                                                />
                                            </Block>
                                        }
                                    />
                                </Block>
                            </Block>
                            <Block row center space="between">
                                <Block flex middle right>
                                    <GaButton
                                        round
                                        onlyIcon
                                        shadowless
                                        icon="facebook"
                                        iconFamily="Font-Awesome"
                                        iconColor={theme.COLORS.WHITE}
                                        iconSize={theme.SIZES.BASE * 1.625}
                                        color={theme.COLORS.FACEBOOK}
                                        style={[styles.social, styles.shadow]}
                                    />
                                </Block>
                                <Block flex middle center>
                                    <GaButton
                                        round
                                        onlyIcon
                                        shadowless
                                        icon="linkedin"
                                        iconFamily="Font-Awesome"
                                        iconColor={theme.COLORS.WHITE}
                                        iconSize={theme.SIZES.BASE * 1.625}
                                        color={theme.COLORS.LINKEDIN}
                                        style={[styles.social, styles.shadow]}
                                    />
                                </Block>
                                <Block flex middle left>
                                    <GaButton
                                        round
                                        onlyIcon
                                        shadowless
                                        icon="github"
                                        iconFamily="Font-Awesome"
                                        iconColor={theme.COLORS.WHITE}
                                        iconSize={theme.SIZES.BASE * 1.625}
                                        color={theme.COLORS.GITHUB}
                                        style={[styles.social, styles.shadow]}
                                    />
                                </Block>
                            </Block>
                            {/* <Block flex style={styles.profileBlock}>
                    <Block style={styles.profileRow}>
                      <Text style={styles.rowTextLeft} bold size={18} color="#333">LinkedIn</Text>
                      <Text style={styles.rowTextRight} size={16} color="#333">
                        {this.state.social_linkedin}
                      </Text>
                    </Block>
                  </Block> */}
                        </ScrollView>
                    </ImageBackground>
                </Block>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    profile: {
        marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
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
        marginTop: 65,
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
        flex: 2
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
    inputText: {
        width: width - theme.SIZES.BASE * 4
    },
    divisionTwoInput: {
        // width: width - theme.SIZES.BASE 
        width: width / 2.4,
        padding: 2
    },
    tach2: {
        justifyContent: 'space-around'
    }
});


export default EditProfile;