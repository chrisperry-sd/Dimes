import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { colors } from '../theme';

import ChildBalance from '../components/childComponents/ChildBalance';
import Savings from '../components/childComponents/Savings';
import Categories from '../components/childComponents/Categories';
import NextAllowance from '../components/childComponents/NextAllowance';
import ChildAccountBudgetDisplay from '../components/childComponents/ChildAccountBudgetDisplay';

export default function ChildAccountView({
  child,
  budget,
  totalSpent,
  transactions,
  thisWeeksTransactions,
  isRefreshing,
  onRefresh,
  alerted,
  setAlertToBeTrue,
  alertExpiry,
  setAlertExpiryToTrue,
}) {
  return (
    <ScrollView
      style={styles.bg}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor={colors.white}
        />
      }>
      <SafeAreaView style={styles.screen}>
        <StatusBar />
        <View showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.textBold}>Hey, {child[0].name}</Text>
          </View>
          <View>
            <NextAllowance data={transactions} />
          </View>
          <View>
            <ChildBalance totalSpent={totalSpent} />
          </View>
          <View testID="budgets">
            {budget.length > 0 ? (
              <View style={styles.row}>
                <Text style={styles.text}>Budgets</Text>
              </View>
            ) : null}
          </View>
          <View>
            {budget.length > 0 ? (
              <ChildAccountBudgetDisplay
                alertExpiry={alertExpiry}
                setAlertExpiryToTrue={setAlertExpiryToTrue}
                setAlertToBeTrue={setAlertToBeTrue}
                alerted={alerted}
                data={transactions}
                budget={budget}
              />
            ) : (
              <Text style={styles.text}>
                No budgets have been set this week, see how much you can save...{' '}
              </Text>
            )}
          </View>
          <View>
            <Savings
              totalSpent={totalSpent}
              budget={budget}
              data={transactions}
            />
          </View>
          <View testID="transactions">
            {thisWeeksTransactions.length === 0 ? (
              <Text style={styles.text}>
                You&apos;ve spent nothing so far this week!
              </Text>
            ) : (
              <Text style={styles.text}>
                Look what&apos;s happened in your account this week:
              </Text>
            )}
            <View style={styles.categories}>
              <Categories data={transactions} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    margin: 10,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  bg: {
    backgroundColor: colors.purple,
    flex: 1,
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 32,
    color: colors.white,
    margin: 10,
  },
  categories: {
    marginTop: 20,
  },
  text: {
    color: colors.white,
    fontSize: 24,
    marginLeft: 10,
    marginTop: 10,
    fontFamily: 'Chilanka-Regular',
  },
});
