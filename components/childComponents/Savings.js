import { CurrentRenderContext } from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import pig from '../../myAssets/images/pig1-removebg-preview.png';

export default function Savings({summed, budget, data}) {
  const budgetAmounts = budget.reduce(
    (accumulator, current) => accumulator + current.budget,
    0,
  );
const remaninigAfterBudgetSpent = summed - budgetAmounts;
console.log('budget: ', budget);
console.log('budget: ', summed);


  return (
    <TouchableOpacity style={styles.box}>
      <View>
        <Text style={styles.balanceTitle}>Savings/Piggy Bank</Text>
      </View>
      <View>
        <Image source={pig} style={styles.chart} />
        <View style={styles.savingView}>
        {budget.length > 0 && summed > 0 ? 
          <Text style={styles.savings}>
            Save your remaining budget and have £ {summed}
          </Text> :  <Text style={styles.savings}>
          Ahh, you've over spent. Try to save until your next allowance!
        </Text> }
          <View style={styles.remaining}>
          {budget.length > 0 ?
            null
            : 
            <Text style={styles.savingsLarge}> You have £{summed}</Text>}
            {budget.length > 0 && summed > 0? 
            <Text style={styles.savings}>at the end of the week..</Text>
            :
            null}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 8,
    margin: 10,
    height: 200,
    marginTop: 10,
    backgroundColor: 'hsl(218, 32%, 43%)',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 1,
  },
  savingView: {
    marginBottom: 10,
    width: 350,
  },
  remaining: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 250,
    // margin: 10,
  },
  balanceTitle: {
    color: 'white',
    padding: 10,
    marginTop: 10,
    fontSize: 24,
    fontFamily: 'Chilanka-Regular',
  },
  balance: {
    marginLeft: 20,
    fontSize: 16,
    fontFamily: 'Chilanka-Regular',
    color: 'white',
  },
  savings: {
    marginLeft: 20,
    fontSize: 24,
    fontFamily: 'Chilanka-Regular',
    color: '#BBE1C3',
  },
  // savingsLeft: {
  //   fontSize: 24,
  //   fontFamily: 'Chilanka-Regular',
  //   color: '#BBE1C3',
  // },
  savingsLarge: {
    margin: 10,
    fontSize: 32,
    fontFamily: 'Chilanka-Regular',
    color: '#BBE1C3',
  },
  chart: {
    position: 'absolute',
    width: 150,
    height: 150,
    marginLeft: 250,
  },
});