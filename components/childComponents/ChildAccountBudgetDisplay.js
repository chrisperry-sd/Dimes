import React from 'react';
import {ScrollView, View, Text, FlatList, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function ChildAccountBudgetDisplay({
  navigation,
  budget,
  data,
  summed,
}) {
  const transactions = data[0].transactions;

  function getFirstDayOfWeek() {
    const curr = new Date();
    const firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    return firstday.getTime();
  }

  function showThisWeeksTransactions() {
    const thisWeeksTransactions = [];
    for (let i = 0; i < transactions.length; i++) {
      if (getFirstDayOfWeek() - new Date(transactions[i].Date).getTime() <= 0) {
        thisWeeksTransactions.push(transactions[i]);
      }
    }
    return thisWeeksTransactions;
  }
  const thisWeeksTrans = showThisWeeksTransactions();

  function filterTransByCategory(budgett) {
    const categories = [];
    for (let i = 0; i < budgett.length; i++) {
      const cat = budgett[i].category.toLowerCase();
      categories.push(
        thisWeeksTrans.filter(
          (transaction) => transaction.category.toLowerCase() === cat,
        ),
      );
    }
    return categories;
  }
  const cats = filterTransByCategory(budget);
  const sums = [];
  for (let i = 0; i < cats.length; i++) {
    let catName = cats[i][0].category;
    let sum = cats[i].reduce((acc, current) => acc + current.amount, 0);
    sums[i] = {category: catName, amount: parseInt(sum.toFixed(2), 10)};
  }
  const budgets = [];
  for (let i = 0; i < budget.length; i++) {
    let catName = budget[i].category;
    let sum = budget[i].budget;
    budgets[i] = {category: catName, amount: sum};
  }
  const budgetsArray = [];
  for (let i = 0; i < sums.length; i++) {
    let catName = budgets[i].category;

    let sum = budgets[i].amount;

    if (sums[i].category.toLowerCase() === budgets[i].category.toLowerCase()) {
      const summd = budgets[i].amount + sums[i].amount;
      budgetsArray[i] = {category: catName, amount: sum, remaining: summd};
    }
  }
  const renderBudget = ({item, index}) => {
    return (
      <TouchableOpacity>
        <View style={styles.list}>
          <View style={styles.listContainer}>
            <View style={styles.budgetText}>
              <Text style={styles.bold}>{item.category}</Text>
            </View>
            <View style={styles.budgetText}>
              <Text style={styles.text}>£ {item.amount}</Text>
            </View>
            <View style={styles.budgetText}>
              <Text style={styles.small}>
                You have £{item.remaining} left of budget
              </Text>
              <Text style={styles.small}>progress bar?</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <FlatList
          style={styles.flatListBorder}
          horizontal={true}
          data={budgetsArray}
          keyExtractor={(item) => item.id}
          renderItem={renderBudget}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    margin: 10,
    borderRadius: 8,
    flexDirection: 'row',
  },
  flatListBorder: {
    borderRadius: 8,
  },
  list: {
    backgroundColor: '#BBE1C3',
    marginRight: 10,
    height: 'auto',
    borderRadius: 8,
    width: 'auto',
    shadowColor: 'grey',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 1,
  },
  listContainer: {
    margin: 10,
  },
  addBudgetContainer: {
    margin: 10,
    alignItems: 'center',
  },
  text: {
    color: 'grey',
    paddingHorizontal: 2,
    fontSize: 18,
    fontFamily: 'Chilanka-Regular',
  },
  small: {
    color: 'grey',
    paddingHorizontal: 2,
    fontSize: 12,
    fontFamily: 'Chilanka-Regular',
  },
  bold: {
    color: 'grey',
    paddingHorizontal: 2,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Chilanka-Regular',
  },
  budgetText: {
    paddingTop: 5,
  },
});
