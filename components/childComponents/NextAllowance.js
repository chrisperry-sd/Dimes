import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme';

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
    <View style={styles.rowContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>{daysLeft}</Text>
      </View>
      <View>
        {daysLeft === 1 ? (
          <Text style={styles.text}>Day until your next allowance</Text>
        ) : (
          <Text style={styles.text}>Days until your next allowance</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  container: {
    backgroundColor: colors.blue,
    borderColor: colors.grey,
    borderRadius: 8,
    margin: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 1,
  },
  text: {
    color: colors.white,
    fontFamily: 'Chilanka-Regular',
    fontSize: 32,
    padding: 20,
  },
});
