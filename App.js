/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';

import ParentDashboard from './screens/ParentDashboardOpt';
import ChildParentView from './screens/ChildParentView';
import Login from './screens/LogIn';
import AddChild from './screens/AddChild';
import ChildAccountView from './screens/ChildAccountView';
import AddBudget from './screens/AddBudget';
import BudgetChild from './components/BudgetChild';
import ChildAccountBudgetDisplay from './components/childComponents/ChildAccountBudgetDisplay';
import Categories from './components/childComponents/Categories';
import IndividualAccountTransactions from './screens/IndividualAccountTransactions';
import BalanceChild from './components/BalanceChild';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import data from './myAssets/db';
import ApiService from './ApiService';

const Stack = createStackNavigator();

export default function App() {
  const [childBudget, setChildBudget] = useState({});
  const [transactions, setTransactions] = useState({});

  useEffect(() => {
    ApiService.getBudgets().then((budgets) => setChildBudget(budgets));
  }, []);
  useEffect(() => {
    ApiService.getTransactions().then((trans) => setTransactions(trans));
  }, []);
  function createBudget(category, budget, expiry) {
    ApiService.postBudget({category, budget, expiry}).then((budgets) => {
      // eslint-disable-next-line no-shadow
      setChildBudget((childBudget) => [...childBudget, budgets]);
    });
  }
  function getSum() {
  if (transactions.length) {
    const summ = transactions.reduce(
      (accumulator, current) => accumulator + current.amount,
      0,
      );
       return summ.toFixed(2);
    }
  }
  const summed = getSum(); // sum of all transactions to display current balance
  function getFirstDayOfWeek() {
    const curr = new Date();
    const firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    return firstday.getTime();
  }
  function thisWeeksTrans() {
    if (transactions.length) {
    return transactions.filter(transaction => (getFirstDayOfWeek() - new Date(transaction.date).getTime() <= 0));
    };
  };
    const thisWeeksTransactions = thisWeeksTrans()
  function thisWeeksSum() {
    if (thisWeeksTransactions) {
      return thisWeeksTransactions.reduce( // sum of all transactions this week
        (accumulator, current) => accumulator + current.amount,
        0).toFixed(2);
      }
  } 
  const WeeksSum = thisWeeksSum()
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen name="ChildAccountView" options={{headerShown: false}}>
          {(props) => (
            <ChildAccountView
            transactions={transactions}
            data={data}
              {...props}
              summed={summed}
              budget={childBudget}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="ChildAccountBudgetDisplay"
          options={{headerShown: false}}>
          {(props) => (
            <ChildAccountBudgetDisplay
              data={transactions}
              {...props}
              summed={summed}
              budget={childBudget}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="ParentDashboard" options={{headerShown: false}}>
          {(props) => (
            <ParentDashboard
              data={data}
              transactions={transactions}
              {...props}
              summed={summed}
              thisWeekSum={WeeksSum}
              thisWeeksTrans={thisWeeksTransactions}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Categories" options={{headerShown: false}}>
          {(props) => <Categories thisWeeksTrans={thisWeeksTrans} />}
        </Stack.Screen>

        <Stack.Screen name="ChildParentView" options={{headerShown: false}}>
          {(props) => (
            <ChildParentView
              data={transactions}
              {...props}
              summed={summed}
              budget={childBudget}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="AddChild" options={{headerShown: false}}>
          {(props) => <AddChild data={transactions} {...props} summed={summed} />}
        </Stack.Screen>

        <Stack.Screen name="AddBudget" options={{headerShown: false}}>
          {(props) => (
            <AddBudget
              data={transactions}
              {...props}
              summed={summed}
              createBudget={createBudget}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="IndividualAccountTransactions"
          options={{headerShown: false}}>
          {(props) => (
            <IndividualAccountTransactions
              data={transactions}
              {...props}
              summed={summed}
              createBudget={createBudget}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="BalanceChild" options={{headerShown: false}}>
          {(props) => (
            <BalanceChild
              data={transactions}
              {...props}
              summed={summed}
              createBudget={createBudget}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="BudgetChild" options={{headerShown: false}}>
          {(props) => <BudgetChild data={transactions} {...props} summed={summed} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#161925',
    flex: 1,
  },
});
