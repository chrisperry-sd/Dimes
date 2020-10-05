import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ParentDashboard from './screens/ParentDashboard';
import ChildParentView from './screens/ChildParentView';
import Login from './screens/LogIn';
import AddChild from './screens/AddChild';
import ChildAccountView from './screens/ChildAccountView';
import AddBudget from './screens/AddBudget';
import ChildAccountBudgetDisplay from './components/childComponents/ChildAccountBudgetDisplay';
import Categories from './components/childComponents/Categories';
import IndividualAccountTransactions from './screens/IndividualAccountTransactions';
import BalanceChild from './components/BalanceChild';

import ApiService from './ApiService';

const Stack = createStackNavigator();

export default function App() {
  const [alerted, setAlerted] = useState(false);
  const [parentAlerted, setParentAlerted] = useState(false);
  const [alertExpiry, setAlertExpiry] = useState(false);

  const [childBudget, setChildBudget] = useState({});
  const [transactions, setTransactions] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [child, setChild] = useState([{ name: 'James' }]);

  function setAlertExpiryToTrue() {
    setAlertExpiry(true);
  }
  function setAlertToBeTrue() {
    setAlerted(true);
  }
  function setParentAlertToBeTrue() {
    setParentAlerted(true);
  }
  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };
  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    wait(2000).then(() =>
      ApiService.getTransactions()
        .then((trans) => setTransactions(trans))
        .then(() => setIsRefreshing(false)),
    );
  }, []);

  useEffect(() => {
    ApiService.getBudgets().then((budgets) => setChildBudget(budgets));
  }, []);
  useEffect(() => {
    ApiService.getTransactions().then((trans) => setTransactions(trans));
  }, []);

  function createBudget(category, budget, expiry) {
    ApiService.postBudget({ category, budget, expiry }).then((budgets) => {
      setChildBudget((childBudget) => [...childBudget, budgets]);
    });
  }
  function deleteBudget(id) {
    ApiService.deleteBudget(id).then(() => {
      setChildBudget((budgets) =>
        budgets.filter((budget) => budget._id !== id),
      );
    });
  }

  function sumTransactions() {
    if (transactions.length) {
      const total = transactions.reduce(
        (accumulator, current) => accumulator + current.amount,
        0,
      );
      return total.toFixed(2);
    } else return 0;
  }
  const totalSpent = sumTransactions();

  function getFirstDayOfWeek() {
    const curr = new Date();
    const firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    return firstday.getTime();
  }
  function thisWeeksTrans() {
    if (transactions.length) {
      return transactions.filter(
        (transaction) =>
          new Date(transaction.date).getTime() >= getFirstDayOfWeek(),
      );
    }
  }
  const thisWeeksTransactions = thisWeeksTrans();

  function thisWeeksSum() {
    if (thisWeeksTransactions) {
      return thisWeeksTransactions
        .filter((trans) => trans.merchant !== 'Bank')
        .reduce((accumulator, current) => accumulator + current.amount, 0)
        .toFixed(2);
    }
  }
  const totalSpentThisWeek = -1 * thisWeeksSum();

  const options = { headerShown: false };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={options} />
        <Stack.Screen name="ChildAccountView" options={options}>
          {(props) => (
            <ChildAccountView
              setAlertExpiryToTrue={setAlertExpiryToTrue}
              alertExpiry={alertExpiry}
              alerted={alerted}
              setAlertToBeTrue={setAlertToBeTrue}
              isRefreshing={isRefreshing}
              onRefresh={onRefresh}
              transactions={transactions}
              child={child}
              {...props}
              totalSpent={totalSpent}
              budget={childBudget}
              thisWeeksTransactions={thisWeeksTransactions}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="ChildAccountBudgetDisplay" options={options}>
          {(props) => (
            <ChildAccountBudgetDisplay
              data={transactions}
              child={child}
              {...props}
              totalSpent={totalSpent}
              budget={childBudget}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="ParentDashboard" options={options}>
          {(props) => (
            <ParentDashboard
              isRefreshing={isRefreshing}
              onRefresh={onRefresh}
              child={child}
              transactions={transactions}
              {...props}
              totalSpent={totalSpent}
              totalSpentThisWeek={totalSpentThisWeek}
              thisWeeksTrans={thisWeeksTransactions}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Categories" options={options}>
          {(props) => <Categories thisWeeksTrans={thisWeeksTrans} />}
        </Stack.Screen>

        <Stack.Screen name="ChildParentView" options={options}>
          {(props) => (
            <ChildParentView
              setParentAlertToBeTrue={setParentAlertToBeTrue}
              parentAlerted={parentAlerted}
              isRefreshing={isRefreshing}
              onRefresh={onRefresh}
              data={transactions}
              child={child}
              {...props}
              totalSpent={totalSpent}
              budget={childBudget}
              deleteBudget={deleteBudget}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="AddChild" options={options}>
          {(props) => (
            <AddChild data={transactions} {...props} totalSpent={totalSpent} />
          )}
        </Stack.Screen>

        <Stack.Screen name="AddBudget" options={options}>
          {(props) => (
            <AddBudget
              data={transactions}
              {...props}
              totalSpent={totalSpent}
              createBudget={createBudget}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="IndividualAccountTransactions" options={options}>
          {(props) => (
            <IndividualAccountTransactions
              data={transactions}
              {...props}
              totalSpent={totalSpent}
              createBudget={createBudget}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="BalanceChild" options={options}>
          {(props) => (
            <BalanceChild
              data={transactions}
              {...props}
              totalSpent={totalSpent}
              createBudget={createBudget}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
