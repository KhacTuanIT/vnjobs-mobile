import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

class Profile extends React.Component {
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
                        jessicaj@example.com
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
                        223-562-142
                      </Text>
                      <Text size={12} color={argonTheme.COLORS.TEXT}>Phone</Text>
                    </Block>
                  </Block>
                </Block>
                <Block flex>
                  <Block middle style={styles.nameInfo}>
                    <Text bold size={28} color="#32325D">
                      Jessica Jones, 27
                    </Text>
                  </Block>
                </Block>
              </Block>
              <Block flex style={styles.profileBlock}>
                <Block style={styles.profileRow}>
                  <Text style={styles.rowTextLeft} bold size={18} color="#333">Address</Text>
                  <Text style={styles.rowTextRight} size={16} color="#333">Los Angles, US</Text>
                </Block>
              </Block>
              <Block flex style={styles.profileBlock}>
                <Block style={styles.profileRow}>
                  <Text style={styles.rowTextLeft} bold size={18} color="#333">Bio</Text>
                  <Text style={styles.rowTextRight} size={16} color="#333">
                    Its hands were holograms that altered to match the convolutions of the room where, ded to consist entirely of meticulous reconstruction’s of garments.
                  </Text>
                </Block>
              </Block>
              <Block flex style={styles.profileBlock}>
                <Block style={styles.profileRow}>
                  <Text style={styles.rowTextLeft} bold size={18} color="#333">Facebook</Text>
                  <Text style={styles.rowTextRight} size={16} color="#333">
                    https://fb.com/jessicaj.27
                  </Text>
                </Block>
              </Block>
              <Block flex style={styles.profileBlock}>
                <Block style={styles.profileRow}>
                  <Text style={styles.rowTextLeft} bold size={18} color="#333">LinkedIn</Text>
                  <Text style={styles.rowTextRight} size={16} color="#333">
                    https://linkedIn.com/jessicaj.27
                  </Text>
                </Block>
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
  }
});

export default Profile;
