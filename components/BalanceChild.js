import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../theme';

export default function BalanceChild({ navigation, totalSpent, data }) {
  return (
    <View style={styles.box}>
      <View>
        <Text style={styles.balanceTitle}>Total Balance</Text>
      </View>
      <View>
        <Text style={styles.balance}>£ {totalSpent}</Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('IndividualAccountTransactions', { data })
        }>
        <View>
          <Text style={styles.text}>View all transactions</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 8,
    margin: 10,
    height: 200,
    marginTop: 30,
    backgroundColor: colors.black,
  },
  balanceTitle: {
    color: colors.white,
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
    color: colors.white,
  },
  text: {
    marginBottom: 50,
    // marginTop: 20,
    marginLeft: 20,
    fontSize: 20,
    fontFamily: 'Raleway-Regular',
    color: colors.white,
  },
});

// justifyContent: 'center',
// alignItems: 'center'
