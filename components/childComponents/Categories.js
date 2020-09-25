import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import cash from '../../myAssets/images/cash-removebg-preview.png';

export default function Categories({data}) {
  const trans = data[0].transactions;
  function getFirstDayOfWeek() {
    const curr = new Date();
    const firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    return firstday.getTime();
  }
  function showThisWeeksTransactions() {
    const thisWeeksTransactions = [];
    for (let i = 0; i < trans.length; i++) {
      if (getFirstDayOfWeek() - new Date(trans[i].Date).getTime() <= 0) {
        thisWeeksTransactions.push(trans[i]);
      }
    }
    return thisWeeksTransactions;
  }
  const thisWeeksTrans = showThisWeeksTransactions();
  const renderCategory = ({item}) => {
    return (
      <TouchableOpacity>
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
    <ScrollView>
      <View style={styles.container}>
        <FlatList
          style={styles.flatListBorder}
          horizontal={true}
          data={thisWeeksTrans}
          keyExtractor={(item) => item.id}
          renderItem={renderCategory}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    borderRadius: 8,
    flexDirection: 'row',
  },
  flatListBorder: {
    borderRadius: 8,
  },
  list: {
    backgroundColor: '#985f6f',
    marginRight: 10,
    height: 100,
    borderRadius: 8,
    width: 200,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 1,
  },
  listContainer: {
    margin: 10,
  },
  text: {
    color: 'white',
    paddingHorizontal: 2,
    fontSize: 18,
  },
  textSmall: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Chilanka-Regular',
  },
  budgetText: {
    paddingBottom: 8,
  },
  bold: {
    color: 'white',
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
