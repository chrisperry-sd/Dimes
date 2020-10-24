import React from 'react';

import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../myAssets/theme';

import cash from '../myAssets/images/cash-removebg-preview.png';

export default function ChildViewTransactions({ transactionsThisWeek }) {
  const renderTransaction = ({ item }) => {
    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.list}>
          <View style={styles.listContainer}>
            <View style={styles.budgetText}>
              <Text style={styles.bold}>{item.merchant}</Text>
            </View>
            <Text style={styles.text}>
              {item.amount > 0 ? `+ £${item.amount}` : `- £${-1 * item.amount}`}
            </Text>
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
      data={transactionsThisWeek}
      keyExtractor={(item, index) => item._id}
      renderItem={renderTransaction}
      testID="weeklyTransactions"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    flexDirection: 'row',
  },
  flatListBorder: {
    borderRadius: 8,
    marginHorizontal: 10,
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
