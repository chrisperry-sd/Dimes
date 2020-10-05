import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme';

export default function Savings({ totalSpent, budget }) {
  return (
    <View>
      <View>
        <Text style={styles.balanceTitle}>Piggy bank</Text>
      </View>
      <View style={styles.box}>
        <View style={styles.savingView}>
          {budget.length > 0 && totalSpent > 0 ? (
            <Text style={styles.savings}>
              Save your remaining money and have £{totalSpent} at the end of the
              week...
            </Text>
          ) : (
            <Text style={styles.savings}>
              Ah, you've overspent. Try to save until your next allowance!
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 8,
    margin: 10,
    height: 'auto',
    marginTop: 10,
    backgroundColor: colors.blue,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 1,
  },
  savingView: {
    marginBottom: 10,
    width: 350,
  },
  balanceTitle: {
    color: colors.white,
    padding: 10,
    marginTop: 10,
    fontSize: 24,
    fontFamily: 'Chilanka-Regular',
  },
  savings: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontSize: 20,
    fontFamily: 'Chilanka-Regular',
    color: colors.white,
  },
});
