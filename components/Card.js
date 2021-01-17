import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Icon, Text, theme } from 'galio-framework';

import { argonTheme } from '../constants';


class Card extends React.Component {
  render() {
    const { navigation, item, horizontal, full, style, ctaColor, imageStyle } = this.props;
    
    const imageStyles = [
      full ? styles.fullImage : styles.horizontalImage,
      imageStyle
    ];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];

    return (
      <Block row={horizontal} card flex style={cardContainer}>
        <TouchableWithoutFeedback onPress={({route}) => navigation.navigate('RecruitmentNews', {news: item})}>
          <Block flex style={imgContainer}>
            <Image source={{uri: item.image}} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback style={styles.bottomCard} onPress={({route}) => navigation.navigate('RecruitmentNews', {news: item})}>
          <Block flex space="between" style={styles.cardDescription}>
            <Block flex space="between" style={styles.cardDetail}>
              {item.start_time && <Block flex style={styles.timeCard}>
                <Text size={11} style={styles.time}>{item.start_time}</Text>
                <Text size={11} style={styles.time}>{item.end_time}</Text>
              </Block>}
              <Text size={15} style={styles.cardTitle}>{item.title ? item.title : item.org_name}</Text>
              {item.address && <Text style={styles.address} size={12}>{item.address}</Text>}
            </Block>
            <Text size={12} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.ACTIVE} bold>Xem chi tiết</Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
}

const styles = StyleSheet.create({
  cardDetail: {

  },
  bottomCard: {

  },
  timeCard: {
    flexDirection: 'row'
  },
  time: {
    flex: 1,
    color: '#df4732'
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 16
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 3
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  address: {
    color: '#7f7f7f'
  }
});

export default withNavigation(Card);