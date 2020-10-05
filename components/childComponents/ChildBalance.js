import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import { colors } from '../../theme';

import piggyBank from '../../myAssets/animations/28913-piggy-bank.json';
import sadFace from '../../myAssets/animations/11865-sad-emoji.json';

export default function Balance({ transactions, totalSpent }) {
  return (
    <TouchableOpacity style={styles.box}>
      <View style={styles.balanceCont}>
        <View>
          <View>
            <Text style={styles.balanceTitle}>Balance</Text>
          </View>
          <View style={styles.balanceCont}>
            <View>
              <Text style={styles.balance}>£ {totalSpent}</Text>
            </View>
          </View>
        </View>
        <View style={totalSpent > 0 ? styles.emojiHappy : styles.emojiSad}>
          <LottieView
            source={totalSpent > 0 ? piggyBank : sadFace}
            autoPlay
            loop
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  balanceCont: {
    flexDirection: 'row',
  },
  box: {
    borderRadius: 8,
    margin: 10,
    height: 100,
    marginTop: 10,
    backgroundColor: colors.blue,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 1,
  },
  balanceTitle: {
    color: colors.white,
    padding: 5,
    marginTop: 10,
    fontSize: 24,
    fontFamily: 'Chilanka-Regular',
  },
  balance: {
    marginBottom: 50,
    marginLeft: 20,
    fontSize: 36,
    fontFamily: 'Chilanka-Regular',
    color: colors.white,
  },
  emojiHappy: {
    width: 150,
    height: 150,
    marginLeft: 20,
  },
  emojiSad: {
    marginLeft: 20,
    width: 100,
    height: 100,
  },
});
