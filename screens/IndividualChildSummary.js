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

import BalanceChild from '../components/BalanceChild';
import NewBudgetChild from '../components/NewBudgetChild';

export default function IndividualChildSummary({
  navigation,
  transactions,
  totalSpent,
  budget,
  deleteBudget,
  isRefreshing,
  onRefresh,
  parentAlerted,
  setParentAlertToBeTrue,
  kids,
}) {
  return (
    <SafeAreaView style={styles.bg}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={colors.white}
          />
        }>
        <StatusBar barStyle="light-content" />
        <View style={styles.centerText}>
          <Text style={styles.textLarge}>{kids[0].name}</Text>
        </View>
        <View>
          <Text style={styles.text}>Balances</Text>
        </View>
        <View>
          <BalanceChild
            totalSpent={totalSpent}
            navigation={navigation}
            kids={kids}
          />
        </View>
        <View>
          <Text style={styles.text}>Budgets</Text>
        </View>
        <View style={styles.budgets}>
          <NewBudgetChild
            navigation={navigation}
            transactions={transactions}
            budget={budget}
            kids={kids}
            deleteBudget={deleteBudget}
            parentAlerted={parentAlerted}
            setParentAlertToBeTrue={setParentAlertToBeTrue}
          />
        </View>
        <View style={styles.addBut}>
          <TouchableOpacity onPress={() => navigation.navigate('AddBudget')}>
            <Text style={styles.textAdd}>&rarr; Add Budget</Text>
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
