import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ChildAccountBudgetDisplay ({ budget, data }) {
  const [show, setshow] = useState([]);
  const [budgetss, setbudgets] = useState([]);

  const createAlert = () =>
    Alert.alert(
      "No budget left 😱",
    );
  const minusAlert = () =>
    Alert.alert(
      "You've over spent.. lets talk about it later",
    );
  const alertExpiry = () =>
    Alert.alert(
      "One of your budgets expired.. Well done on not over spending!!",
    );

  const budgets = []
  budget.forEach(function (a) {
    if (!this[a.category]) {
      this[a.category] = { category: a.category, amount: 0, date: a.date, expiry: a.expiry, display: a.display, alerted: a.alerted };
      budgets.push(this[a.category]);
    }
    this[a.category].amount += a.budget;
  }, Object.create(null));

  // this function takes array of the budgets budgets and filters all current transactions by catgeories matching to the budget category.
  // then filters that array by all transactions that happened after the budget was set..
  const filteredTransactionsByCategory = [];
  function filterTransByCategory (budgett) {
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
  console.log('sums: ', sums);
  const budgetsArray = [];
  for (let i = 0; i < budgets.length; i++) {
    let catName = budgets[i].category;
    let sum = budgets[i].amount;
    if (new Date().getTime() - new Date(budget[i].expiry).getTime() >= 0) { // atm if any expire dont display
      alertExpiry();
      return null;
    }
    if (!sums[i]) {
      if (budgets[i].display) {
        budgetsArray[i] = { category: catName, amount: sum, remaining: sum, display: budgets[i].display, expiry: budgets[i].expiry }; //add id
      }
    } else {
      if (
        sums[i].category.toLowerCase() === budgets[i].category.toLowerCase() && budgets[i].display
      ) {
        const summd = parseInt(budgets[i].amount, 10) + parseInt(sums[i].amount, 10);
        if (summd === 0) {
          createAlert();
        }
        if (summd < 0) {
          minusAlert();
        }
        budgetsArray[i] = { category: catName, amount: sum, remaining: summd, display: budgets[i].display, expiry: budgets[i].expiry }; //add id
      }
      else return null;
    }
  }
  useEffect(() => {
    setbudgets(budgetsArray)
  }, [])

  const renderBudget = ({ item, index }) => {
    return (
      <TouchableOpacity>
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
    <View style={styles.container}>
      <FlatList
        style={styles.flatListBorder}
        numColumns={2}
        data={budgetsArray}
        keyExtractor={(item) => item.id}
        renderItem={renderBudget}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 10,
    // margin: 10,
    borderRadius: 8,
    flexDirection: 'row',
  },
  flatListBorder: {
    borderRadius: 8,
  },
  list: {
    backgroundColor: '#BBE1C3',
    margin: 5,
    height: 100,
    borderRadius: 8,
    width: 187,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 1,
  },
  listNegative: {
    backgroundColor: '#A34861',
    margin: 5,
    height: 100,
    borderRadius: 8,
    width: 187,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 1,
  },
  listContainer: {
    margin: 10,
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
    textDecorationLine: 'line-through'
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
