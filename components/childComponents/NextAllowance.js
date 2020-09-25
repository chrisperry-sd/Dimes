import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function getMonthDaysLeft() {
  const date = new Date();
  return (
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() -
    date.getDate()
  );
}

const daysLeft = getMonthDaysLeft();

export default function NextAllowance() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{daysLeft} days until next allowance</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // margin: 10,
    // borderWidth: 2,
    backgroundColor: 'hsl(218, 32%, 43%)',
    borderColor: 'grey',
    borderRadius: 8,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 1,
  },
  text: {
    color: 'white',
    fontFamily: 'Chilanka-Regular',
    fontSize: 32,
    padding: 10,
  },
});
