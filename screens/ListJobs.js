import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, theme, Text, Icon } from "galio-framework";

import { Card, Header, Button } from "../components";
import articles from "../constants/articles";
const { width } = Dimensions.get("screen");

class ListJobs extends React.Component {
  state = {};
  render() {
    return (
      <Block flex center style={styles.home}>
        <Block style={{ marginBottom: theme.SIZES.BASE }}>
          <Header
            tabs={tabs.categories}
            search
            title="Danh sách việc làm"
            navigation={this.props.navigation}
          />
        </Block>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}
        >
          <Block row flex style={styles.filterBar}>
            <Text style={styles.leftFilterText}>Có 1000 công việc phù hợp</Text>
            <Button
              small
              icon="filter"
              iconFamily="AntDesign"
              color="transparent"
              iconColor={"black"}
              textStyle={{ color: "black" }}
              style={styles.filterButton}
            >
              Filter
            </Button>
          </Block>
          <Block flex>
            <Card item={articles[0]} horizontal />
            <Block flex row>
              <Card
                item={articles[1]}
                style={{ marginRight: theme.SIZES.BASE }}
              />
              <Card item={articles[2]} />
            </Block>
            <Card item={articles[3]} horizontal />
            <Card item={articles[4]} full />
          </Block>
        </ScrollView>
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
    paddingVertical: theme.SIZES.BASE,
  },
  filterBar: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftFilterText: {
    alignItems: "center",
  },
  filterButton: {
    borderWidth: 0.5,
    borderColor: "lightgrey",
    borderRadius: 7,
  },
});

export default ListJobs;
