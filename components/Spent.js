import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Items from './SpentItems';

import chart from '../myAssets/images/barchat.png';

export default function Spent({ thisWeekSum, data, thisWeeksTrans }) {
  return (
    <View>
      <TouchableOpacity style={styles.box}>
        <View>
          <Image source={chart} style={styles.chart} />
          <Text style={styles.balanceTitle}>Total Spent this week</Text>
        </View>
        <View>
          <Text style={styles.balance}>£ {thisWeekSum}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.itemsStyleMargin}>
        <Items data={data} thisWeeksTrans={thisWeeksTrans} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 8,
    margin: 10,
    height: 200,
    marginTop: 30,
    backgroundColor: 'hsl(218, 32%, 60%)',
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
    marginLeft: 20,
    fontSize: 40,
    fontFamily: 'Raleway-Regular',
    color: 'white',
  },
  itemsStyleMargin: {
    margin: 10,
  },
  chart: {
    position: 'absolute',
    width: 250,
    height: 250,
    marginLeft: 150,
  },
});
