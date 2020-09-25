import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Balance({transactions, data}) {
  const trans = data[0].transactions;
  const summ = trans.reduce(
    (accumulator, current) => accumulator + current.amount,
    0,
  );
  const summed = summ.toFixed(2);
  return (
    <TouchableOpacity style={styles.box}>
      <View>
        <Text style={styles.balanceTitle}>Balance</Text>
      </View>
      <View style={styles.balanceCont}>
        <Text style={styles.balance}>£ {summed}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  balanceCont: {
    marginLeft: 32,
  },
  box: {
    borderRadius: 8,
    margin: 10,
    height: 100,
    marginTop: 10,
    backgroundColor: 'hsl(218, 32%, 43%)',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 1,
  },
  balanceTitle: {
    color: 'white',
    padding: 10,
    marginTop: 10,
    fontSize: 18,
    fontFamily: 'Chilanka-Regular',
  },
  balance: {
    marginBottom: 50,
    // marginTop: 20,
    marginLeft: 20,
    fontSize: 40,
    fontFamily: 'Chilanka-Regular',
    color: 'white',
  },
});
