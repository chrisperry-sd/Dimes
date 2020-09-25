import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import pig from '../../myAssets/images/pig1-removebg-preview.png';

export default function Savings({transactions}) {
  return (
    <TouchableOpacity style={styles.box}>
      <View>
        <Text style={styles.balanceTitle}>Savings/Piggy Bank</Text>
      </View>
      <View>
        <Image source={pig} style={styles.chart} />
        <Text style={styles.balance}>$ Amount compared to budgets</Text>
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
  chart: {
    position: 'absolute',
    width: 150,
    height: 150,
    marginLeft: 250,
  },
});
