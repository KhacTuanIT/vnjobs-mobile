import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Text } from 'react-native';
import { Block, Icon, theme } from 'galio-framework';

import { Card } from '../components';
import articles from '../constants/articles';
import ArButton from '../components/Button';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { width } = Dimensions.get('screen');

class Home extends React.Component {
  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
          <TouchableOpacity style={styles.moreBar}>
            <Text style={styles.textBar}>News</Text>
            <Icon style={styles.buttonBar} name="ios-arrow-forward" family="Ionicon" sizes={16} color="#2254df"/>
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrolls}>
            <Block flex row style={styles.blockArticles}>
              <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} />
              <Card item={articles[2]} />
            </Block>
          </ScrollView>
        </Block>
        <Block flex>
          <TouchableOpacity style={styles.moreBar}>
            <Text style={styles.textBar}>Companies</Text>
            <Icon style={styles.buttonBar} name="ios-arrow-forward" family="Ionicon" sizes={16} color="#2254df"/>
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrolls}>
            <Block flex row style={styles.blockArticles}>
              <Card item={articles[4]} style={{ marginRight: theme.SIZES.BASE }} />
              <Card item={articles[0]} />
            </Block>
          </ScrollView>
        </Block>
      </ScrollView>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE/2,
  },
  moreBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    opacity: 0.6,
    paddingVertical: 10,
    margin: 0
  },
  textBar: {
    flex: 4,
    fontSize: 18
  },
  buttonBar: {
    flex: 1,
    textAlign: 'right',
    textAlignVertical: 'center',
    paddingHorizontal: 10,
  },
  scrolls: {
    marginTop: 0,
    paddingTop: 0
  },
  blockArticles: {
    width: 500
  }
});

export default Home;
