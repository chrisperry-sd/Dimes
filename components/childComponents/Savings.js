import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import pig from '../../myAssets/images/pig1-removebg-preview.png';
import { colors } from '../../theme';

export default function Savings({ totalSpent, budget }) {
  return (
    <TouchableOpacity style={styles.box}>
      <View>
        <Text style={styles.balanceTitle}>Piggy Bank</Text>
      </View>
      <View>
        <Image source={pig} style={styles.chart} />
        <View style={styles.savingView}>
          {budget.length > 0 && totalSpent > 0 ? (
            <Text style={styles.savings}>
              Save your remaining budget and have £ {totalSpent}
            </Text>
          ) : (
            <Text style={styles.savings}>
              Ahh, you've over spent. Try to save until your next allowance!
            </Text>
          )}
          <View style={styles.remaining}>
            {budget.length > 0 ? null : (
              <Text style={styles.savingsLarge}> You have £{totalSpent}</Text>
            )}
            {budget.length > 0 && totalSpent > 0 ? (
              <Text style={styles.savings}>at the end of the week..</Text>
            ) : null}
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
  remaining: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 250,
  },
  balanceTitle: {
    color: colors.white,
    padding: 10,
    marginTop: 10,
    fontSize: 24,
    fontFamily: 'Chilanka-Regular',
  },
  savings: {
    marginLeft: 20,
    fontSize: 24,
    fontFamily: 'Chilanka-Regular',
    color: colors.green,
  },
  savingsLarge: {
    margin: 10,
    fontSize: 32,
    fontFamily: 'Chilanka-Regular',
    color: colors.green,
  },
  chart: {
    position: 'absolute',
    width: 100,
    height: 100,
    marginLeft: '75%',
    marginTop: '10%',
  },
});
