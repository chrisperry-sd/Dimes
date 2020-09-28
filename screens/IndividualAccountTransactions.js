import React from 'react';
import {
  ScrollView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import moment from 'moment';


export default function IndividualAccountTransactions ({ data }) {
  const renderCategory = ({ item }) => {
    return (
      <View style={styles.list}>
        <View style={styles.listContainer}>
          <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
            <View style={styles.budgetText}>
              <Text style={styles.bold}>{item.merchant}</Text>
            </View>
            <View style={styles.budgetText}>
              <Text style={styles.boldSmall}>{item.category}</Text>
            </View>
          </View>

          <View style={styles.balAndDate}>
            <Text style={styles.text}>£ {item.amount}</Text>
            <Text style={styles.text}>{moment(item.date).format('ddd MMM Do')}</Text>
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
          keyExtractor={(item) => item.id}
          renderItem={renderCategory}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161925',
  },
  view: {
    margin: 10,
    alignItems: 'center',
  },
  list: {
    backgroundColor: '#985f6f',
    margin: 10,
    borderRadius: 8,
    width: 350,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 0 },
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
  },
  budgetText: {
    paddingBottom: 8,
  },
  bold: {
    color: 'white',
    paddingHorizontal: 2,
    fontSize: 24,
    fontWeight: 'bold',
  },
  boldSmall: {
    color: 'white',
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
