import React, { useEffect, useState, useContext } from 'react';
import { ParentContext } from '../ParentContext';

import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../myAssets/theme';

export default function ParentViewBalance({ navigation }) {
  const { state, setState } = useContext(ParentContext);

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const currentBalance = state.transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0,
    );
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
        onPress={() => navigation.navigate('ParentViewTransactions')}>
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
    marginTop: 30,
    backgroundColor: colors.blue,
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
    marginLeft: 20,
    fontSize: 40,
    fontFamily: 'Raleway-Regular',
    color: colors.white,
  },
  text: {
    marginBottom: 50,
    marginLeft: 20,
    fontSize: 20,
    fontFamily: 'Raleway-Regular',
    color: colors.white,
  },
});

// justifyContent: 'center',
// alignItems: 'center'
