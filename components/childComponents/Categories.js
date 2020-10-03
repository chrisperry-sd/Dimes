import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../theme';

import cash from '../../myAssets/images/cash-removebg-preview.png';

export default function Categories({ data }) {
  const trans = data;
  function getFirstDayOfWeek() {
    const curr = new Date();
    const firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    return firstday.getTime();
  }
  function showThisWeeksTransactions() {
    const thisWeeksTransactions = [];
    for (let i = 0; i < trans.length; i++) {
      if (getFirstDayOfWeek() - new Date(trans[i].date).getTime() <= 0) {
        thisWeeksTransactions.push(trans[i]);
      }
    }
    return thisWeeksTransactions.sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    );
  }
  const thisWeeksTrans = showThisWeeksTransactions();
  const renderCategory = ({ item }) => {
    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.list}>
          <View style={styles.listContainer}>
            <View style={styles.budgetText}>
              <Text style={styles.bold}>{item.merchant}</Text>
            </View>
            <Text style={styles.text}>£ {item.amount}</Text>
            <Image source={cash} style={styles.img} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      style={styles.flatListBorder}
      horizontal={true}
      data={thisWeeksTrans}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderCategory}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 8,
    borderRadius: 8,
    flexDirection: 'row',
  },
  flatListBorder: {
    borderRadius: 8,
  },
  list: {
    backgroundColor: colors.plum,
    marginRight: 10,
    height: 100,
    borderRadius: 8,
    width: 200,
    shadowColor: colors.black,
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 1,
  },
  listContainer: {
    margin: 10,
  },
  text: {
    color: colors.white,
    paddingHorizontal: 2,
    fontSize: 18,
  },
  budgetText: {
    paddingBottom: 8,
  },
  bold: {
    color: colors.white,
    paddingHorizontal: 2,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Chilanka-Regular',
  },
  img: {
    position: 'absolute',
    width: 50,
    height: 50,
    marginTop: 25,
    marginLeft: 130,
  },
});
