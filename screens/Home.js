import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Text } from 'react-native';
import { Block, Icon, theme } from 'galio-framework';

import {Card, HightLight} from '../components';
// import CardOrganization from '../components/CardOrganization';
import articles from '../constants/articles';
import ArButton from '../components/Button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loading from '../components/Loading';
const { width } = Dimensions.get('screen');
import * as API from "../api/endpoints"
const axios = require('axios').default;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      organizations: [],
      recruitmentNews: [],
      majors: []
    }
  }

  getAPI = async (url) => {
    const validStatusCode = 200
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }

    try {
      const response = await axios({
        method: 'GET',
        url,
        headers
      })
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    if (this.state.organizations.length <= 0) {
      console.log("Dang load ne")
      this.getAPI(API.LIST_ORGANIZATION)
        .then(res => this.setState({
          organizations: res
        }))
        .catch(error => console.log(error))
    }
    if (this.state.recruitmentNews.length <= 0) {
      console.log("Load tiep ne")
      this.getAPI(API.LIST_RECRUITMENT_NEWS)
        .then(res => this.setState({
          recruitmentNews: res,
          isLoading: false
        }))
        .catch(err => console.log(err))
    }
    if (this.state.majors.length <= 0) {
      console.log("Load met nghi")
      this.getAPI(API.LIST_MAJOR)
        .then(res => this.setState({
          recruitmentNews: res,
          isLoading: false
        }))
        .catch(err => console.log(err))
    }
  }

  renderItem = (value) => {
    var rs = null;
    
    if (value != null) {
      const data = value.data;
      if (data != null) {
        if (data.length > 0) {
          rs = data.map((item, index) => {
            return (
              <Card item={item} key={index} style={styles.cardItem} />
            )
          })
        }
        else {
          return (
            <Block style={styles.notFound}>
              <Text style={styles.textNotFound}>Không tìm thấy dữ liệu cho mục này</Text>
            </Block>
          )
        }
      }
      else {
        return (
          <Block style={styles.notFound}>
            <Text style={styles.textNotFound}>Không tìm thấy dữ liệu cho mục này</Text>
          </Block>
        )
      }
    }
    return (<Block flex row style={styles.blockArticles}>
      {rs}
    </Block>)
  }

  renderOrgs = (value) => {
    var rs = null;
    
    if (value != null) {
      const data = value.data;
      if (data != null) {
        if (data.length > 0) {
          rs = data.map((item, index) => {
            return (
              <Organization item={item} key={index} style={styles.cardItem} />
            )
          })
        }
        else {
          return (
            <Block style={styles.notFound}>
              <Text style={styles.textNotFound}>Không tìm thấy dữ liệu cho mục này</Text>
            </Block>
          )
        }
      }
      else {
        return (
          <Block style={styles.notFound}>
            <Text style={styles.textNotFound}>Không tìm thấy dữ liệu cho mục này</Text>
          </Block>
        )
      }
    }
  
    return (<Block flex row style={styles.blockArticles}>
      {rs}
    </Block>)
  }
    
  renderHightLight = (value) => {
    const rs = [];
    const data = value.data;
    if (data != null) {
      if (data.length > 0) {
        // rs = data.map((item, index) => {
          
        //   return (
        //     <Organization item={item} key={index} style={styles.cardItem} />
        //   )
        // })
        for (let i = 0; i < data.length > 3 ? 3 : data.length; i++) {
          rs.push(<HightLight item={data[i]} />)
        }
      }
      else {
        return (
          <Block style={styles.notFound}>
            <Text style={styles.textNotFound}>Không tìm thấy dữ liệu cho mục này</Text>
          </Block>
        )
      }
    }
    else {
      return (
        <Block style={styles.notFound}>
          <Text style={styles.textNotFound}>Không tìm thấy dữ liệu cho mục này</Text>
        </Block>
      )
    }
    return (<Block flex row style={styles.blockArticles}>
      {rs}
    </Block>)
  }

  renderArticles = () => {
    const {organizations, recruitmentNews} = this.state
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
          <TouchableOpacity style={styles.moreBar}>
            <Text style={styles.textBar}>Bài tuyển dụng mới</Text>
            <Icon style={styles.buttonBar} name="ios-arrow-forward" family="Ionicon" sizes={16} color="#2254df"/>
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrolls}>
            {this.renderItem(recruitmentNews)}
          </ScrollView>
        </Block>
        <Block flex>
          <TouchableOpacity style={styles.moreBar}>
            <Text style={styles.textBar}>Công ty</Text>
            <Icon style={styles.buttonBar} name="ios-arrow-forward" family="Ionicon" sizes={16} color="#2254df"/>
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrolls}>
            {this.renderItem(organizations)}
          </ScrollView>
        </Block>
        <Block flex>
          <Text style={styles.textHightlight}>Nổi bật dành cho bạn</Text> 
          {this.renderHightLight(recruitmentNews)}
        </Block>
      </ScrollView>
    )
  }

  render() {
    let { isLoading } = this.state;
    // return (<Block flex center style={styles.home}>
    //   {this.renderArticles()}
    // </Block>)
    if (isLoading) {
      return (<Loading />)
    } else {
      return (<Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>)
    }
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
    // width: 500
  },
  cardItem: { 
    marginRight: theme.SIZES.BASE,
    minWidth: 250,
    maxWidth: 280
  },
  notFound: {
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#dddddd',
    width: 370
  },
  textNotFound: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textHightlight: {
    fontSize: 17,
    color: '#575757'
  }
});

export default Home;
