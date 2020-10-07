import React, { useContext, useEffect, useState } from 'react';
import { ParentContext } from '../ParentContext';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { colors } from '../myAssets/theme';
import moment from 'moment';

import ChildViewBalance from '../components/ChildViewBalance';
import ChildViewSavings from '../components/ChildViewSavings';
import ChildViewTransactions from '../components/ChildViewTransactions';
import ChildViewAllowance from '../components/ChildViewAllowance';
import ChildViewBudgets from '../components/ChildViewBudgets';

// FILTER DATA FOR SELECTED CHILD'S name

export default function ChildDashboard({ name }) {
  const { state, setState } = useContext(ParentContext);
  const [transactionsThisWeek, setTransactionsThisWeek] = useState([]);
  const [balance, setBalance] = useState(0);

  //this weeks transactions

  useEffect(() => {
    const today = new Date();
    const oneWeekAgo = moment(today).subtract(7, 'days').toDate();
    const recentSpending = state.transactions
      .filter(
        (transaction) =>
          new Date(transaction.transactionDate).getTime() >= oneWeekAgo,
      )
      .sort((a, b) => {
        new Date(b.transactionDate) - new Date(a.transactionDate);
      });
    setTransactionsThisWeek(recentSpending);
    const currentBalance = state.transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0,
    );
    setBalance(currentBalance);
  }, []);

  return (
    <ScrollView
      style={styles.bg}
      refreshControl={
        <RefreshControl
          // refreshing={isRefreshing}
          // onRefresh={onRefresh}
          tintColor={colors.white}
        />
      }>
      <SafeAreaView style={styles.screen}>
        <StatusBar />
        <View showsVerticalScrollIndicator={false}>
          <View style={[styles.box, styles.titleBox]}>
            <Text style={styles.textBold}>
              Hey, {state.kids['5f7dca79ac51601ad2d33d3e'].name}!
            </Text>
          </View>
          <View>
            <ChildViewAllowance />
          </View>
          <View>
            <ChildViewBalance balance={balance} />
          </View>
          <View testID="budgets">
            {state.budgets.length > 0 ? (
              <View style={styles.row}>
                <Text style={styles.text}>Your budgets</Text>
              </View>
            ) : null}
          </View>
          <View>
            {state.budgets.length > 0 /* <ChildViewBudgets /> */ ? null : (
              <View style={styles.box}>
                <Text style={styles.text}>
                  No budgets set this week. Let's see how much we can save!{' '}
                </Text>
              </View>
            )}
          </View>
          <View>
            <ChildViewSavings balance={balance} />
          </View>
          <View testID="transactions">
            {transactionsThisWeek.length === 0 ? (
              <Text style={styles.text}>
                You&apos;ve spent nothing so far this week!
              </Text>
            ) : (
              <Text style={[styles.text, styles.subtitle]}>
                Look what&apos;s happened in your account this week:
              </Text>
            )}
            <View style={styles.categories}>
              <ChildViewTransactions
                transactionsThisWeek={transactionsThisWeek}
              />
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
  box: {
    borderRadius: 8,
    margin: 10,
    backgroundColor: colors.black,
    padding: 10,
  },
  titleBox: {
    backgroundColor: colors.white,
  },
  bg: {
    backgroundColor: colors.purple,
    flex: 1,
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 38,
    paddingTop: 10,
    paddingLeft: 10,
    color: colors.purple,
    margin: 10,
    fontFamily: 'Chilanka-Regular',
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
  subtitle: {
    fontSize: 24,
  },
});
