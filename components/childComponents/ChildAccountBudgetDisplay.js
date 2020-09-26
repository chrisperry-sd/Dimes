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
  // .filter(
  //   (transaction) =>
  //     new Date(transaction.Date).getTime() -
  //       new Date(budgett[i].Date).getTime() <=
  //     0,
  // )

  // this function takes array of budgets and it filters all current transactions by catgeories matching to budget category
  // so we end up with an array of objects which are transactions of the same catgeory as the budgets.
  const filteredTransactionsByCategory = [];
  function filterTransByCategory(budgett) {
    for (let i = 0; i < budgett.length; i++) {
      const cat = budgett[i].category.toLowerCase();
      // console.log('new Date(budgett[i].Date).getTime(): ', transactions[i].Date);
      const trans = transactions
        .filter((transaction) => transaction.category.toLowerCase() === cat)
        .filter(
          (transs) =>
            new Date(budgett[i].date).getTime() -
              new Date(transs.Date).getTime() <=
            0,
        );
      if (trans.length > 0) {
        filteredTransactionsByCategory.push(trans);
      }
    }
    return filteredTransactionsByCategory;
  }
  const cats = filterTransByCategory(budget); // this holds an array of transaction objects that took place after the budget was set..
  console.log('cats: ', cats); // should be empty

  const sums = []; // sum of all the transaction that took place after the budget was set
  for (let i = 0; i < cats.length; i++) {
    let catName = cats[i][0].category;
    let sum = cats[i].reduce((acc, current) => acc + current.amount, 0);
    sums[i] = {category: catName, amount: parseInt(sum.toFixed(2), 10)};
  }
  const budgets = []; // probably dont need to do this but formats it nicer..
  for (let i = 0; i < budget.length; i++) {
    let catName = budget[i].category;
    let sum = budget[i].budget;
    budgets[i] = {category: catName, amount: sum};
  }

  const budgetsArray = [];
  for (let i = 0; i < budgets.length; i++) {
    let catName = budgets[i].category;
    let sum = budgets[i].amount;
    if (!sums[i]) {
      budgetsArray[i] = {category: catName, amount: sum, remaining: sum};
    } else {
      if (
        sums[i].category.toLowerCase() === budgets[i].category.toLowerCase()
      ) {
        const summd = budgets[i].amount + sums[i].amount;
        budgetsArray[i] = {category: catName, amount: sum, remaining: summd};
      }
    }
  }
  console.log('budgetsArray: ', budgetsArray);
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
