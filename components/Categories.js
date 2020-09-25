import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BudgetItems from './BudgetItems';

import pieChart from '../myAssets/images/piechart.png';

const data = [
  {
    id: '1',
    merchant: 'apple',
    price: '20',
    category: ['Phone', 'Bills', 'Electronics'],
  },
  {
    id: '2',
    merchant: 'McDonalds',
    price: '6.89',
    category: ['Food', 'Lunch'],
  },
  {
    id: '3',
    merchant: 'TopMan',
    price: '68.10',
    category: ['Clothing', 'Shopping'],
  },
  {
    id: '4',
    merchant: 'EE',
    price: '59.99',
    category: ['Phone', 'Bills', 'Electronics'],
  },
];

export default function Categories() {
  return (
    <View>
      <TouchableOpacity style={styles.box}>
        <View>
          <Image source={pieChart} style={styles.chart} />
          <Text style={styles.balanceTitle}>Most Used</Text>
        </View>
        <View>
          <Text style={styles.balance} />
        </View>
      </TouchableOpacity>
      <View style={styles.itemsStyleMargin}>
        <BudgetItems />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 8,
    margin: 10,
    height: 200,
    marginTop: 30,
    backgroundColor: 'hsl(218, 32%, 43%)',
  },
  balanceTitle: {
    color: 'white',
    padding: 10,
    marginTop: 10,
    fontSize: 18,
    fontFamily: 'Raleway-Regular',
  },
  balance: {
    marginBottom: 50,
    // marginTop: 20,
    marginLeft: 20,
    fontSize: 40,
    fontFamily: 'Raleway-Regular',
    color: 'white',
  },
  itemsStyleMargin: {
    margin: 10,
  },
  chart: {
    position: 'absolute',
    width: 180,
    height: 180,
    marginLeft: 150,
    margin: 10,
  },
});
