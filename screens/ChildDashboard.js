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

  //this weeks transactions

  useEffect(() => {
    const today = new Date();
    const oneWeekAgo = moment(today).subtract(7, 'days').getTime();
    const recentSpending = state.transactions.filter(
      (transaction) =>
        new Date(transaction.transactionDate).getTime >= oneWeekAgo,
    );
    setTransactionsThisWeek(recentSpending);
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
            <Text style={styles.textBold}>Hey, {state.kids[name].name}!</Text>
          </View>
          <View>
            <ChildViewAllowance />
          </View>
          <View>
            <ChildViewBalance />
          </View>
          <View testID="budgets">
            {budgets.length > 0 ? (
              <View style={styles.row}>
                <Text style={styles.text}>Your budgets</Text>
              </View>
            ) : null}
          </View>
          <View>
            {budgets.length > 0 ? (
              <ChildViewBudgets />
            ) : (
              <View style={styles.box}>
                <Text style={styles.text}>
                  No budgets set this week. Let's see how much we can save!{' '}
                </Text>
              </View>
            )}
          </View>
          <View>
            <ChildViewSavings />
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
              <ChildViewTransactions />
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
