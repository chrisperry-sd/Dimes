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
import { colors } from '../myAssets/theme';

import ChildViewBalance from '../components/ChildViewBalance';
import ChildViewSavings from '../components/ChildViewSavings';
import ChildViewTransactions from '../components/ChildViewTransactions';
import ChildViewAllowance from '../components/ChildViewAllowance';
import ChildViewBudgets from '../components/ChildViewBudgets';

export default function ChildDashboard({
  kids,
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
          <View style={[styles.box, styles.titleBox]}>
            <Text style={styles.textBold}>Hey, {kids[0].name}!</Text>
          </View>
          <View>
            <ChildViewAllowance data={transactions} />
          </View>
          <View>
            <ChildViewBalance totalSpent={totalSpent} />
          </View>
          <View testID="budgets">
            {budget.length > 0 ? (
              <View style={styles.row}>
                <Text style={styles.text}>Your budgets</Text>
              </View>
            ) : null}
          </View>
          <View>
            {budget.length > 0 ? (
              <ChildViewBudgets
                alertExpiry={alertExpiry}
                setAlertExpiryToTrue={setAlertExpiryToTrue}
                setAlertToBeTrue={setAlertToBeTrue}
                alerted={alerted}
                data={transactions}
                budget={budget}
              />
            ) : (
              <View style={styles.box}>
                <Text style={styles.text}>
                  No budgets set this week. Let's see how much we can save!{' '}
                </Text>
              </View>
            )}
          </View>
          <View>
            <ChildViewSavings
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
              <Text style={[styles.text, styles.subtitle]}>
                Look what&apos;s happened in your account this week:
              </Text>
            )}
            <View style={styles.categories}>
              <ChildViewTransactions data={transactions} />
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
