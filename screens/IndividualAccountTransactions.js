import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import moment from 'moment';
import { colors } from '../theme';

export default function IndividualAccountTransactions({ data }) {
  const renderCategory = ({ item }) => {
    return (
      <View style={styles.list}>
        <View style={styles.listContainer}>
          <View style={styles.itemContainer}>
            <View style={styles.budgetText}>
              <Text style={styles.bold}>{item.merchant}</Text>
            </View>
            <View style={styles.budgetText}>
              <Text style={styles.boldSmall}>{item.category}</Text>
            </View>
          </View>

          <View style={styles.balAndDate}>
            <Text style={styles.text}>£ {item.amount}</Text>
            <Text style={styles.text}>
              {moment(item.date).format('ddd MMM Do')}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <FlatList
          style={styles.flatListBorder}
          data={data.sort((a, b) => {
            return new Date(b.Date) - new Date(a.Date);
          })}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCategory}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  view: {
    margin: 10,
    alignItems: 'center',
    flex: 1,
  },
  list: {
    backgroundColor: colors.plum,
    margin: 10,
    borderRadius: 8,
    width: 350,
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
  },
  boldSmall: {
    color: colors.white,
    paddingHorizontal: 2,
    fontSize: 16,
    fontWeight: 'bold',
  },
  balAndDate: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
});
