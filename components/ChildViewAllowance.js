import React, { useContext } from 'react';
import { ParentContext } from '../ParentContext';

import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../myAssets/theme';

import moment from 'moment';

export default function ChildViewAllowance({ kidId }) {
  const { state } = useContext(ParentContext);

  function findAllowanceDate(frequency, date) {
    let allowance;
    if (frequency === 'monthly') {
      allowance = moment(date).add(1, 'months');
    } else if (frequency === 'fortnightly') {
      allowance = moment(date).add(14, 'days');
    } else {
      allowance = moment(date).add(7, 'days');
    }
    return allowance.toDate();
  }

  var nextAllowance = findAllowanceDate(
    state.kids[kidId].allowanceFrequency,
    state.kids[kidId].allowanceDate,
  );
  var today = moment();
  const daysLeft = moment(nextAllowance).diff(today, 'days');

  return (
    <View style={styles.rowContainer}>
      <View style={styles.container}>
        <Text style={[styles.text, styles.number]}>
          {daysLeft} {daysLeft === 1 ? 'day' : 'days'}
        </Text>
      </View>
      <View style={styles.subtitle}>
        <Text style={styles.text}>until your next allowance</Text>
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
  subtitle: {
    width: '70%',
  },
  text: {
    color: colors.white,
    fontFamily: 'Chilanka-Regular',
    fontSize: 24,
    padding: 20,
  },
  number: {
    fontSize: 36,
  },
});
