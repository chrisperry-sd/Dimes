import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { colors } from '../myAssets/theme';

import piggyBank from '../myAssets/animations/28913-piggy-bank.json';
import sadFace from '../myAssets/animations/11865-sad-emoji.json';

export default function ChildViewBalance({ balance }) {
  return (
    <View>
      <Text style={styles.balanceTitle}>Your balance</Text>
      <View style={styles.balanceCont}>
        <View style={styles.box}>
          <Text style={styles.balance}>£{balance}</Text>
        </View>
      </View>
      <LottieView
        source={balance > 0 ? piggyBank : sadFace}
        autoPlay={true}
        loop={true}
        width={160}
        height={160}
        style={styles.animation}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  balanceCont: {
    flexDirection: 'row',
  },
  box: {
    borderRadius: 8,
    margin: 10,
    height: 'auto',
    width: '60%',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    backgroundColor: colors.plum,
    shadowRadius: 3,
    elevation: 1,
  },
  balanceTitle: {
    color: colors.white,
    padding: 5,
    marginTop: 10,
    marginLeft: 5,
    fontSize: 24,
    fontFamily: 'Chilanka-Regular',
  },
  balance: {
    marginLeft: 20,
    paddingVertical: 20,
    fontSize: 36,
    fontFamily: 'Chilanka-Regular',
    color: colors.white,
  },
  animation: {
    position: 'absolute',
    marginLeft: 80,
  },
});
