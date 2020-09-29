import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ChildAccountBudgetDisplay ({ budget, data, deleteBudget, parentAlerted, setParentAlertToBeTrue}) {
  function alertedNoBudget () {
    wait(1000).then(() => createAlert());
  }
  function alertedMinusBudget () {
    wait(1000).then(() => minusAlert());
  }
  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };
  const createAlert = () =>
    Alert.alert(
      "Alert",
      "0 remaiining budget",
      [
        { text: "OK", onPress: () => setParentAlertToBeTrue()}
      ],
    );
  const minusAlert = () =>
  Alert.alert(
    "Alert!",
    "James has over spent",
    [
      { text: "OK", onPress: () => setParentAlertToBeTrue() }
    ],
  );

  const budgets = []
  budget.forEach(function (a) {
    if (!this[a.category]) {
      this[a.category] = { category: a.category, amount: 0, date: a.date, expiry: a.expiry, display: a.display, alerted: a.alerted, id: a._id };
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
    sums[i] = { category: catName, amount: sum.toFixed(2) };
  }
  // if budgets[i]. expiry date has expired or its a new week set display to false, else show etc...
  // if (new Date(date.now()) - new Date(budget[i]expiry) < 0) budget[i].display = false
  const budgetsArray = [];
  for (let i = 0; i < budgets.length; i++) {
    let catName = budgets[i].category;
    let sum = budgets[i].amount;
    if (budget[i].display && new Date().getTime() - new Date(budget[i].expiry).getTime() >= 0) { // if its expired and display is true

    }
    if (!sums[i]) {
      
        budgetsArray[i] = { category: catName, amount: sum, remaining: sum, display: budgets[i].display, expiry: budgets[i].expiry, id: budgets[i].id };
      
    } else {
      if (
        sums[i].category.toLowerCase() === budgets[i].category.toLowerCase()
      ) {
        const summd = parseInt(budgets[i].amount, 10) + parseInt(sums[i].amount, 10);
        if (summd === 0 && !parentAlerted) {
          alertedNoBudget();
        }
        if (summd < 0 && !parentAlerted) {
          alertedMinusBudget()
        }
        budgetsArray[i] = { category: catName, amount: sum, remaining: summd, display: budgets[i].display, expiry: budgets[i].expiry, id: budgets[i].id };
      }
      else return null;
    }
  }  
  const renderBudget = ({ item, index }) => {
    if (item.display) {
    return (
      <View>
        <View style={styles.listNegative}>
          <View style={styles.listContainer}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <View style={styles.budgetText}>
                <Text style={item.remaining > 0 ? styles.bold : styles.boldNegative}>{item.category}</Text>
              </View>
              <TouchableOpacity onPress={deleteBudget.bind(null, item.id)}>
              <View style={styles.budgetText}>
                <Text style={styles.bold}>🗑</Text>
              </View>
              </TouchableOpacity>
            </View>
            <View style={styles.budgetText}>
              <Text style={styles.textNegative}>£ {item.amount}</Text>
            </View>
            <View style={styles.budgetText}>
            {item.remaining > 0 ?
              <Text style={styles.negative}>
                James has £{item.remaining} left of budget
              </Text> : <Text style={styles.negative}>
              James has spent £ {item.remaining.toString().slice(1)} too much 
            </Text>}
            </View>
          </View>
        </View>
      </View>
    )};
  };
  return (
    <View>
      <View style={styles.container}>
        <FlatList
          style={styles.flatListBorder}
          horizontal={true}
          data={budgetsArray}
          keyExtractor={ (item, index) => index.toString() }
          renderItem={renderBudget}
        />
      </View>
    </View>
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
  listNegative: {
    backgroundColor: '#A34861',
    marginRight: 10,
    height: 'auto',
    borderRadius: 8,
    width: 'auto',
    shadowColor: '#A34861',
    shadowOffset: { width: 0, height: 0 },
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
  },
  textNegative: {
    color: 'white',
    paddingHorizontal: 2,
    fontSize: 18,
  },
  small: {
    color: 'navy',
    paddingHorizontal: 2,
    fontSize: 12,
  },
  bold: {
    color: 'white',
    paddingHorizontal: 2,
    fontSize: 24,
    fontWeight: 'bold',
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
  }
});
