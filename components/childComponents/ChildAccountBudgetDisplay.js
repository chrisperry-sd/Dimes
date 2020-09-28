import React from 'react';
import {ScrollView, View, Text, FlatList, StyleSheet, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function ChildAccountBudgetDisplay({
  navigation,
  budget,
  data,
  summed,
}) {
  const createAlert = () =>
  Alert.alert(
    "No budget left 😱",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: false }
  );
  console.log('data: ', data);
  console.log('budget: ', budget);
  
  // this function takes array of budgets and it filters all current transactions by catgeories matching to budget category.
  // then filters that array by all transactions that happened after the budget was set..
  // so we end up with an array of objects which are transactions of the same category as the budgets.
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
  const cats = filterTransByCategory(budget); // this holds an array of transaction objects that took place after the budget was set..
console.log('filteredTransactionsByCategory: ', filteredTransactionsByCategory);
  console.log('cats: ', cats);
  const sums = []; // sum of all the transaction that took place after the budget was set
  for (let i = 0; i < cats.length; i++) {
    let catName = cats[i][0].category;
    let sum = cats[i].reduce((acc, current) => acc + current.amount, 0);
    sums[i] = {category: catName, amount: sum.toFixed(2)};
  }

  console.log('sums: ', sums);
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
        const summd = parseInt(budgets[i].amount, 10) + parseInt(sums[i].amount, 10);
        if (summd >= 0) createAlert();
        budgetsArray[i] = {category: catName, amount: sum, remaining: summd};
      }
    }
  }

  const renderBudget = ({item, index}) => {
    return (
      <TouchableOpacity onPress={createAlert}>
        <View style={item.remaining > 0 ? styles.list : styles.listNegative}>
          <View style={styles.listContainer}>
            <View style={styles.budgetText}>
              <Text style={item.remaining > 0 ? styles.bold : styles.boldNegative}>{item.category}</Text>
            </View>
            <View style={styles.budgetText}>
              <Text style={item.remaining > 0 ? styles.text : styles.textNegative}>£ {item.amount}</Text>
            </View>
            <View style={styles.budgetText}>
              <Text style={item.remaining > 0 ? styles.small : styles.negative}>
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
  listNegative: {
    backgroundColor: '#653239',
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
    color: 'navy',
    paddingHorizontal: 2,
    fontSize: 18,
    fontFamily: 'Chilanka-Regular',
  },
  textNegative: {
    color: 'white',
    paddingHorizontal: 2,
    fontSize: 18,
    fontFamily: 'Chilanka-Regular',
  },
  small: {
    color: 'navy',
    paddingHorizontal: 2,
    fontSize: 12,
    fontFamily: 'Chilanka-Regular',
  },
  bold: {
    color: 'navy',
    paddingHorizontal: 2,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Chilanka-Regular',
  },
  boldNegative: {
    color: 'white',
    paddingHorizontal: 2,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Chilanka-Regular',
  },
  budgetText: {
    paddingTop: 5,
  },
  negative: {
    color: 'white',
    paddingHorizontal: 2,
    fontSize: 12,
    fontFamily: 'Chilanka-Regular',
  }
});
