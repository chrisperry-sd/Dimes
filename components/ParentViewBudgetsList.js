import React, { useContext, useEffect, useState } from 'react';
import { ParentContext } from '../ParentContext';

import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../myAssets/theme';

export default function ParentViewBudgetsList({ navigation, kidId }) {
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
      <View>
        <View style={styles.listNegative}>
          <View style={styles.listContainer}>
            <View style={styles.rowContainer}>
              <View style={styles.budgetText}>
                <Text
                  style={
                    item.remaining > 0 ? styles.bold : styles.boldNegative
                  }>
                  {item.category}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EditBudget', { _id: item._id })
                }>
                <View style={styles.budgetText}>
                  <Text style={styles.bold}>✏️</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.budgetText}>
              <Text style={styles.textNegative}>£{item.amount}</Text>
            </View>
            <View style={styles.budgetText}>
              {item.remaining > 0 ? (
                <Text style={styles.negative}>
                  {state.kids[kidId].name} has £{item.remaining} left to spend
                </Text>
              ) : (
                <Text style={styles.negative}>
                  {state.kids[kidId].name} has spent £{item.remaining * -1} too
                  much
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View>
      <View style={styles.container}>
        <FlatList
          style={styles.flatListBorder}
          horizontal={true}
          data={detailedBudgets}
          keyExtractor={(item, index) => item._id}
          renderItem={renderBudget}
        />
      </View>
    </View>
  );
}

// function alertedNoBudget() {
//   wait(1000).then(() => createAlert());
// }
// function alertedMinusBudget() {
//   wait(1000).then(() => minusAlert());
// }
// const wait = (timeout) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, timeout);
//   });
// };
// const createAlert = () =>
//   Alert.alert('Alert', 'No remaining budget', [
//     { text: 'OK', onPress: () => setParentAlertToBeTrue() },
//   ]);
// const minusAlert = () =>
//   Alert.alert('Alert!', `${kids[0].name} has overspent`, [
//     { text: 'OK', onPress: () => setParentAlertToBeTrue() },
//   ]);

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginBottom: 20,
    borderRadius: 8,
    flexDirection: 'row',
  },
  flatListBorder: {
    borderRadius: 8,
  },
  listNegative: {
    backgroundColor: colors.plum,
    marginRight: 10,
    height: 'auto',
    borderRadius: 8,
    width: 'auto',
    shadowColor: colors.plum,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 1,
  },
  listContainer: {
    margin: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textNegative: {
    color: colors.white,
    paddingHorizontal: 2,
    fontSize: 18,
  },
  bold: {
    fontFamily: 'Raleway-Regular',
    color: colors.white,
    paddingHorizontal: 2,
    fontSize: 24,
    fontWeight: 'bold',
  },
  boldNegative: {
    fontFamily: 'Raleway-Regular',
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
    fontSize: 16,
  },
});
