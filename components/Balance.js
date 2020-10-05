import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Balance() {
  return (
    <TouchableOpacity style={styles.box}>
      <View>
        <Text style={styles.balanceTitle}>Total Balance</Text>
      </View>
      <View>
        <Text style={styles.balance}>£10, 098.78</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 8,
    margin: 10,
    height: 200,
    marginTop: 30,
    backgroundColor: 'hsl(218, 32%, 43%)',
  },
  balanceTitle: {
    color: 'white',
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
    color: 'white',
  },
});

// justifyContent: 'center',
// alignItems: 'center'
