import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SpentItems from './SpentItems';
import { colors } from '../theme';

import chart from '../myAssets/images/barchat.png';

export default function Spent({ totalSpentThisWeek, thisWeeksTrans }) {
  return (
    <View>
      <TouchableOpacity style={styles.box}>
        <View>
          <Image source={chart} style={styles.chart} />
          <Text style={styles.balanceTitle}>Total spent this week</Text>
        </View>
        <View>
          <Text style={styles.balance}>£ {totalSpentThisWeek}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.itemsStyleMargin}>
        <SpentItems thisWeeksTrans={thisWeeksTrans} />
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
    backgroundColor: colors.purple,
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
