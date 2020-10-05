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
        <LottieView
          source={totalSpent > 0 ? piggyBank : sadFace}
          autoPlay
          width={150}
          height={150}
          style={styles.animation}
        />
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
    height: 'auto',
    marginTop: 10,
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
    marginBottom: 50,
    marginLeft: 20,
    fontSize: 36,
    fontFamily: 'Chilanka-Regular',
    color: colors.white,
  },
  animation: {
    position: 'absolute',
    marginLeft: 80,
  },
});
