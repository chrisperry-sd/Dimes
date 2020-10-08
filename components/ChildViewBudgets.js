import React, { useContext, useEffect, useState } from 'react';
import { ParentContext } from '../ParentContext';

import { View, Text, FlatList, StyleSheet } from 'react-native';
import { colors } from '../myAssets/theme';

export default function ChildViewBudgets({ kidId }) {
  const { state } = useContext(ParentContext);
  const [detailedBudgets, setDetailedBudgets] = useState([]);

  useEffect(() => {
    // create local array of budgets for current allowance period
    const currentBudgets = state.budgets.filter(
      (budget) =>
        budget.kidId === kidId && new Date() <= new Date(budget.expiryDate),
    );

    // determine transaction spending in each category
    const totalSpentByCategory = {};
    state.transactions
      .filter((transaction) => transaction.kidId === kidId)
      .forEach((transaction) => {
        if (totalSpentByCategory[transaction.budgetCategory]) {
          totalSpentByCategory[transaction.budgetCategory] +=
            transaction.amount;
        } else {
          totalSpentByCategory[transaction.budgetCategory] = transaction.amount;
        }
      });

    // add a property to track transaction overspending for each budget
    currentBudgets.forEach((budget) => {
      if (totalSpentByCategory[budget.category] < 0) {
        budget.remaining =
          budget.amount + totalSpentByCategory[budget.category];
      } else {
        budget.remaining = budget.amount;
      }
    });
    setDetailedBudgets(currentBudgets);
  }, []);

  const renderBudget = ({ item, index }) => {
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
              <Text style={item.remaining > 0 ? styles.small : styles.negative}>
                You have £{item.remaining} left of budget
              </Text>
            ) : (
              <Text style={item.remaining > 0 ? styles.small : styles.negative}>
                You've spent £ {item.remaining.toString().slice(1)} too much
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  };
  return (
    <FlatList
      style={styles.container}
      numColumns={2}
      data={detailedBudgets}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderBudget}
    />
  );
}

// function alertedNoBudget() {
//   wait(1000).then(() => createAlert());
// }
// function alertedMinusBudget() {
//   wait(1000).then(() => minusAlert());
// }
// function alertedBudgetExpiry() {
//   wait(1000).then(() => expiryAlert());
// }
// const wait = (timeout) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, timeout);
//   });
// };
// const createAlert = () =>
//   Alert.alert('Alert', 'No budget left 😱', [
//     { text: 'OK', onPress: () => setAlertToBeTrue() },
//   ]);
// const minusAlert = () =>
//   Alert.alert(
//     'Alert!',
//     'Looks like you have overspent, we can talk about it later',
//     [{ text: 'OK', onPress: () => setAlertToBeTrue() }],
//   );
// const expiryAlert = () =>
//   Alert.alert('Alert!', 'A budget has expired 😀', [
//     { text: 'OK', onPress: () => setAlertExpiryToTrue() },
//   ]);

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
