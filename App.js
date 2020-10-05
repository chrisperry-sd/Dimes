import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './screens/LogIn';
import AddChild from './screens/AddChild';
import AddBudget from './screens/AddBudget';
import ParentDashboard from './screens/ParentDashboard';
import ChildAccountView from './screens/ChildAccountView';
import IndividualChildSummary from './screens/IndividualChildSummary';
import IndividualAccountTransactions from './screens/IndividualAccountTransactions';

import ApiService from './ApiService';

const Stack = createStackNavigator();

export default function App() {
  const [alerted, setAlerted] = useState(false);
  const [parentAlerted, setParentAlerted] = useState(false);
  const [alertExpiry, setAlertExpiry] = useState(false);

  const [kids, setKids] = useState([{ name: 'James' }]);
  const [budgets, setBudgets] = useState({});
  const [transactions, setTransactions] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);

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
    ApiService.getBudgets().then((newBudgets) => setBudgets(newBudgets));
  }, []);
  useEffect(() => {
    ApiService.getTransactions().then((trans) => setTransactions(trans));
  }, []);

  function createBudget(category, budget, expiry) {
    ApiService.postBudget({ category, budget, expiry }).then((newBudgets) => {
      setBudgets((oldBudgets) => [...oldBudgets, newBudgets]);
    });
  }
  function deleteBudget(id) {
    ApiService.deleteBudget(id).then(() => {
      setBudgets((newBudgets) =>
        newBudgets.filter((budget) => budget._id !== id),
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
    } else {
      return 0;
    }
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
              {...props}
              setAlertExpiryToTrue={setAlertExpiryToTrue}
              alertExpiry={alertExpiry}
              alerted={alerted}
              setAlertToBeTrue={setAlertToBeTrue}
              isRefreshing={isRefreshing}
              onRefresh={onRefresh}
              transactions={transactions}
              kids={kids}
              totalSpent={totalSpent}
              budget={budgets}
              thisWeeksTransactions={thisWeeksTransactions}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="ParentDashboard" options={options}>
          {(props) => (
            <ParentDashboard
              {...props}
              isRefreshing={isRefreshing}
              onRefresh={onRefresh}
              kids={kids}
              setKids={setKids}
              transactions={transactions}
              totalSpent={totalSpent}
              totalSpentThisWeek={totalSpentThisWeek}
              thisWeeksTrans={thisWeeksTransactions}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="IndividualChildSummary" options={options}>
          {(props) => (
            <IndividualChildSummary
              {...props}
              setParentAlertToBeTrue={setParentAlertToBeTrue}
              parentAlerted={parentAlerted}
              isRefreshing={isRefreshing}
              onRefresh={onRefresh}
              data={transactions}
              kids={kids}
              totalSpent={totalSpent}
              budget={budgets}
              deleteBudget={deleteBudget}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="AddChild" options={options}>
          {(props) => (
            <AddChild {...props} data={transactions} totalSpent={totalSpent} />
          )}
        </Stack.Screen>

        <Stack.Screen name="AddBudget" options={options}>
          {(props) => (
            <AddBudget
              {...props}
              data={transactions}
              totalSpent={totalSpent}
              createBudget={createBudget}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="IndividualAccountTransactions" options={options}>
          {(props) => (
            <IndividualAccountTransactions
              {...props}
              data={transactions}
              totalSpent={totalSpent}
              createBudget={createBudget}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
