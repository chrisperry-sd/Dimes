import React from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { colors } from '../../theme';

export default function ChildAccountBudgetDisplay({
  budget,
  data,
  alerted,
  setAlertToBeTrue,
  setAlertExpiryToTrue,
  alertExpiry,
}) {
  function alertedNoBudget() {
    wait(1000).then(() => createAlert());
  }
  function alertedMinusBudget() {
    wait(1000).then(() => minusAlert());
  }
  function alertedBudgetExpiry() {
    wait(1000).then(() => expiryAlert());
  }
  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };
  const createAlert = () =>
    Alert.alert('Alert', 'No budget left 😱', [
      { text: 'OK', onPress: () => setAlertToBeTrue() },
    ]);
  const minusAlert = () =>
    Alert.alert(
      'Alert!',
      'Looks like you have overspent, we can talk about it later',
      [{ text: 'OK', onPress: () => setAlertToBeTrue() }],
    );
  const expiryAlert = () =>
    Alert.alert('Alert!', 'A budget has expired 😀', [
      { text: 'OK', onPress: () => setAlertExpiryToTrue() },
    ]);

  const budgets = [];
  budget.forEach(function (a) {
    if (!this[a.category]) {
      this[a.category] = {
        category: a.category,
        amount: 0,
        date: a.date,
        expiry: a.expiry,
        display: a.display,
        alerted: a.alerted,
        id: a._id,
      };
      budgets.push(this[a.category]);
    }
    this[a.category].amount += a.budget;
  }, Object.create(null));

  // this function takes array of the budgets budgets and filters all current transactions by catgeories matching to the budget category.
  // then filters that array by all transactions that happened after the budget was set..
  const filteredTransactionsByCategory = [];
  function filterTransByCategory(budgett) {
    for (let i = 0; i < budgett.length; i++) {
      const cat = budgett[i].category.toLowerCase();
      const trans = data
        .filter((transaction) => transaction.category.toLowerCase() === cat)
        .filter(
          (transs) =>
            new Date(budgett[i].date).getTime() -
              new Date(transs.date).getTime() <=
            0,
        );
      if (trans.length > 0) {
        filteredTransactionsByCategory.push(trans);
      }
    }
    return filteredTransactionsByCategory;
  }
  const cats = filterTransByCategory(budgets); // this holds an array of transaction objects that took place after the budget was set..

  const sums = []; // sum of all the transaction that took place after the budget was set
  for (let i = 0; i < cats.length; i++) {
    let catName = cats[i][0].category;
    let sum = cats[i].reduce((acc, current) => acc + current.amount, 0);
    sums[i] = { category: catName, amount: sum.toFixed(2), id: cats[i]._id };
  }

  const budgetsArray = [];
  for (let i = 0; i < budgets.length; i++) {
    let catName = budgets[i].category;
    let sum = budgets[i].amount;
    if (!sums[i]) {
      if (budgets[i].display) {
        budgetsArray[i] = {
          category: catName,
          amount: sum,
          remaining: sum,
          display: budgets[i].display,
          expiry: budgets[i].expiry,
          id: budgets[i].id,
        }; //add id
      }
    } else {
      if (
        sums[i].category.toLowerCase() === budgets[i].category.toLowerCase()
      ) {
        let summed =
          parseInt(budgets[i].amount, 10) + parseInt(sums[i].amount, 10);
        if (summed === 0 && !alerted) {
          alertedNoBudget();
        }
        if (summed < 0 && !alerted) {
          alertedMinusBudget();
        }
        budgetsArray[i] = {
          category: catName,
          amount: sum,
          remaining: summed,
          display: budgets[i].display,
          expiry: budgets[i].expiry,
          id: budgets[i].id,
        }; //add id
      } else {
        return null;
      }
    }
  }
  const renderBudget = ({ item, index }) => {
    if (
      new Date().getTime() - new Date(item.expiry).getTime() >= 0 &&
      !alertExpiry
    ) {
      return alertedBudgetExpiry();
    } else {
      return (
        <View style={item.remaining > 0 ? styles.list : styles.listNegative}>
          <View style={styles.listContainer}>
            <View style={styles.budgetText}>
              <Text
                style={item.remaining > 0 ? styles.bold : styles.boldNegative}>
                {item.category}
              </Text>
            </View>
            <View style={styles.budgetText}>
              <Text
                style={item.remaining > 0 ? styles.text : styles.textNegative}>
                £ {item.amount}
              </Text>
            </View>
            <View style={styles.budgetText}>
              {item.remaining > 0 ? (
                <Text
                  style={item.remaining > 0 ? styles.small : styles.negative}>
                  You have £{item.remaining} left of budget
                </Text>
              ) : (
                <Text
                  style={item.remaining > 0 ? styles.small : styles.negative}>
                  You've spent £ {item.remaining.toString().slice(1)} too much
                </Text>
              )}
            </View>
          </View>
        </View>
      );
    }
  };
  return (
    <FlatList
      style={styles.container}
      numColumns={2}
      data={budgetsArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderBudget}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    flexDirection: 'row',
  },
  list: {
    backgroundColor: colors.green,
    margin: 5,
    height: 100,
    borderRadius: 8,
    width: 187,
    shadowColor: colors.grey,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 1,
  },
  listNegative: {
    backgroundColor: colors.plum,
    margin: 5,
    height: 100,
    borderRadius: 8,
    width: 187,
    shadowColor: colors.grey,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 1,
  },
  listContainer: {
    margin: 10,
  },
  text: {
    color: colors.black,
    paddingHorizontal: 2,
    fontSize: 18,
    fontFamily: 'Chilanka-Regular',
  },
  textNegative: {
    color: colors.white,
    paddingHorizontal: 2,
    fontSize: 18,
    fontFamily: 'Chilanka-Regular',
    textDecorationLine: 'line-through',
  },
  small: {
    color: colors.black,
    paddingHorizontal: 2,
    fontSize: 12,
    fontFamily: 'Chilanka-Regular',
  },
  bold: {
    color: colors.black,
    paddingHorizontal: 2,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Chilanka-Regular',
  },
  boldNegative: {
    color: colors.white,
    paddingHorizontal: 2,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Chilanka-Regular',
    textDecorationLine: 'line-through',
  },
  budgetText: {
    paddingTop: 5,
  },
  negative: {
    color: colors.white,
    paddingHorizontal: 2,
    fontSize: 12,
    fontFamily: 'Chilanka-Regular',
  },
});
