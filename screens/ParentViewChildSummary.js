import React, { useContext } from 'react';
import { ParentContext } from '../ParentContext';

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
import { colors } from '../myAssets/theme';
import moment from 'moment';

import ParentViewBalance from '../components/ParentViewBalance';
import ParentViewBudgetsList from '../components/ParentViewBudgetsList';

export default function ParentViewChildSummary({ route, navigation }) {
  const { kidId } = route.params;
  const { state } = useContext(ParentContext);

  function findAllowanceDate(frequency, date) {
    let allowance;
    if (frequency === 'monthly') {
      allowance = moment(date).add(1, 'months');
    } else if (frequency === 'fortnightly') {
      allowance = moment(date).add(14, 'days');
    } else {
      allowance = moment(date).add(7, 'days');
    }
    return allowance.toDate();
  }

  var nextAllowance = findAllowanceDate(
    state.kids[kidId].allowanceFrequency,
    state.kids[kidId].allowanceDate,
  );
  var today = moment();
  const daysLeft = moment(nextAllowance).diff(today, 'days');

  return (
    <SafeAreaView style={styles.bg}>
      <ScrollView
        refreshControl={
          <RefreshControl
            // refreshing={isRefreshing}
            // onRefresh={onRefresh}
            tintColor={colors.white}
          />
        }>
        <StatusBar barStyle="light-content" />
        <View style={styles.centerText}>
          <Text style={styles.textLarge}>{state.kids[kidId].name}</Text>
        </View>
        <View>
          <Text style={styles.text}>Allowance</Text>
        </View>
        <View style={[styles.summaryContainer]}>
          <Text style={styles.summary}>
            {state.kids[kidId].name}&apos;s allowance is in {''}
            {daysLeft} days.
          </Text>
          <Text style={styles.summarySmall}>
            Currently, they get a{' '}
            {state.kids[kidId].allowanceFrequency.toLowerCase()} allowance of £
            {state.kids[kidId].allowanceAmount}.
          </Text>
        </View>
        <View>
          <Text style={styles.text}>Balances</Text>
        </View>
        <View>
          <ParentViewBalance navigation={navigation} kidId={kidId} />
        </View>
        <View>
          <Text style={styles.text}>Budgets</Text>
        </View>
        <View style={styles.budgets}>
          <ParentViewBudgetsList navigation={navigation} kidId={kidId} />
        </View>
        <View style={[styles.button, styles.edit]}>
          <Text style={styles.textAdd}>&rarr; Scroll to edit a budget</Text>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddBudget', { kidId: kidId })}>
            <Text style={styles.textAdd}>&darr; Click to add a budget</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.white,
    marginTop: 15,
    paddingLeft: 10,
    fontSize: 19,
  },
  textAdd: {
    color: colors.white,
    fontSize: 19,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    height: 50,
    margin: 10,
    borderRadius: 8,
    backgroundColor: colors.purple,
  },
  edit: {
    backgroundColor: colors.grey,
    color: colors.white,
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
  summaryContainer: {
    margin: 10,
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: colors.purple,
  },
  summary: {
    fontFamily: 'Raleway-Regular',
    padding: 5,
    color: colors.white,
    fontSize: 24,
  },
  summarySmall: {
    padding: 5,
    color: colors.white,
    fontSize: 16,
  },
});
