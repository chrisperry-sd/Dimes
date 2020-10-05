import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../theme';

import BallanceChild from '../components/BalanceChild';
import NewBudgetChild from '../components/NewBudgetChild';

export default function ChildParentView({
  navigation,
  data,
  totalSpent,
  budget,
  deleteBudget,
  isRefreshing,
  onRefresh,
  parentAlerted,
  setParentAlertToBeTrue,
}) {
  return (
    <SafeAreaView style={styles.bg}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor="white"
          />
        }>
        <StatusBar barStyle="light-content" />
        <View style={styles.centerText}>
          <Text style={styles.textLarge}>James</Text>
        </View>
        <View>
          <Text style={styles.text}>Balances</Text>
        </View>
        <View>
          <BallanceChild
            totalSpent={totalSpent}
            navigation={navigation}
            data={data}
          />
        </View>
        <View>
          <Text style={styles.text}>Budgets</Text>
        </View>
        <View style={styles.budgets}>
          <NewBudgetChild
            navigation={navigation}
            budget={budget}
            data={data}
            deleteBudget={deleteBudget}
            parentAlerted={parentAlerted}
            setParentAlertToBeTrue={setParentAlertToBeTrue}
          />
        </View>
        <View style={styles.addBut}>
          <TouchableOpacity onPress={() => navigation.navigate('AddBudget')}>
            <Text style={styles.textAdd}>Add Budget</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.white,
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 19,
  },
  textAdd: {
    color: colors.white,
    fontSize: 19,
  },
  addBut: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 50,
    margin: 10,
    borderRadius: 8,
    backgroundColor: colors.black,
  },

  bg: {
    backgroundColor: colors.black,
    flex: 1,
  },
  textLarge: {
    color: colors.white,
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  centerText: {
    alignItems: 'center',
    marginTop: 10,
  },
  budgets: {
    marginTop: 10,
  },
});
