import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions
} from "react-native";
//galio
import { Block, Text, theme } from "galio-framework";
//argon
import { articles, Images, argonTheme } from "../constants/";
import { Card } from "../components/";

const { width } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

const Apply = ({navigation, route}) => {
        // const { isFocused } = this.props;
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
                    <Block middle style={styles.avatarContainer}>
                        <Image
                        source={{ uri: Images.ProfilePicture }}
                        style={styles.avatar}
                        />
                    </Block>
                    <Block style={styles.info}>
                        <Block row middle style={styles.blockInfo}>
                        <Block middle>
                            <Text
                            bold
                            size={18}
                            color="#525F7F"
                            style={{ marginBottom: 4 }}
                            >
                            {this.state.email}
                            </Text>
                            <Text size={12} color={argonTheme.COLORS.TEXT}>Email</Text>
                        </Block>
                        </Block>
                        <Block row middle style={styles.blockInfo}>
                        <Block middle>
                            <Text
                            bold
                            size={18}
                            color="#525F7F"
                            style={{ marginBottom: 4 }}
                            >
                            {!this.state.phone ? 'Chưa cập nhật' : this.state.phone}
                            </Text>
                            <Text size={12} color={argonTheme.COLORS.TEXT}>Số điện thoại</Text>
                        </Block>
                        </Block>
                    </Block>
                    <Block flex>
                        <Block middle style={styles.nameInfo}>
                        <Text bold size={28} color="#32325D">
                            {this.state.lastName + ' ' + this.state.firstName}
                        </Text>
                        </Block>
                    </Block>
                    <Block flex middle>
                        <GaButton
                        round
                        onlyIcon
                        shadowless
                        icon="edit"
                        iconFamily="Font-Awesome"
                        // iconColor={theme.COLORS.BLACK}
                        iconSize={theme.SIZES.BASE * 1}
                        // size={'small'}
                        color={theme.COLORS.WHIYE}
                        style={[styles.editBtn, styles.shadow]}
                        onPress={() => this.navigateToScreen('EditProfile')}
                        />
                    </Block>
                    </Block>
                    <Block flex style={styles.profileBlock}>
                    <Block style={styles.profileRow}>
                        <Text style={styles.rowTextLeft} bold size={18} color="#333">Ngày sinh</Text>
                        <Text style={styles.rowTextRight} size={16} color="#333">{this.state.dob}</Text>
                    </Block>
                    </Block>
                    <Block flex style={styles.profileBlock}>
                    <Block style={styles.profileRow}>
                        <Text style={styles.rowTextLeft} bold size={18} color="#333">Địa chỉ</Text>
                        <Text style={styles.rowTextRight} size={16} color="#333">{this.state.address}</Text>
                    </Block>
                    </Block>
                    <Block flex style={styles.profileBlock}>
                    <Block style={styles.profileRow}>
                        <Text style={styles.rowTextLeft} bold size={18} color="#333">Bio</Text>
                        <Text style={styles.rowTextRight} size={16} color="#333">
                        {this.state.bio}
                        </Text>
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
});
export default Apply
