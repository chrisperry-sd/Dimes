import React, { useEffect, useState, useContext } from 'react';
import { ParentContext } from '../ParentContext';

import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../myAssets/theme';

export default function ParentViewBalance({ navigation, kidId }) {
  const { state } = useContext(ParentContext);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const currentBalance = state.transactions
      .filter((transaction) => transaction.kidId === kidId)
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    setBalance(currentBalance);
  }, []);
  return (
    <View style={styles.box}>
      <View>
        <Text style={styles.balanceTitle}>Total balance</Text>
      </View>
      <View>
        <Text style={styles.balance}>£ {balance}</Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ParentViewTransactions', { kidId: kidId })
        }>
        <View>
          <Text style={styles.text}>&rarr; View all transactions</Text>
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
    marginTop: 15,
    backgroundColor: colors.blue,
  },
  balanceTitle: {
    color: colors.white,
    padding: 10,
    marginTop: 10,
    fontSize: 24,
    fontFamily: 'Raleway-Regular',
  },
  balance: {
    marginBottom: 50,
    marginLeft: 20,
    fontSize: 40,
    fontFamily: 'Raleway-Regular',
    color: colors.white,
  },
  text: {
    marginBottom: 50,
    marginLeft: 20,
    fontSize: 16,
    color: colors.white,
  },
});

// justifyContent: 'center',
// alignItems: 'center'
