/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';

import ParentDashboard from './screens/ParentDashboardOpt';
import ChildParentView from './screens/ChildParentView';
import Login from './screens/LogIn';
import AddChild from './screens/AddChild';
import ChildAccountView from './screens/ChildAccountView';
import AddBudget from './screens/AddBudget';
import BudgetChild from './components/BudgetChild';
import MockTransactions from './screens/MockTransactions';
import ChildAccountBudgetDisplay from './components/childComponents/ChildAccountBudgetDisplay';
import Categories from './components/childComponents/Categories';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import data from './myAssets/db';
import ApiService from './ApiService';

const Stack = createStackNavigator();

export default function App() {
  const [childBudget, setChildBudget] = useState({});

  useEffect(() => {
    ApiService.getBudgets().then((budgets) => setChildBudget(budgets));
  }, []);

  function createBudget(category, budget) {
    ApiService.postBudget({category, budget}).then((budgets) => {
      // eslint-disable-next-line no-shadow
      setChildBudget((childBudget) => [...childBudget, budgets]);
    });
  }
  const trans = data[0].transactions;
  const summ = trans.reduce(
    (accumulator, current) => accumulator + current.amount,
    0,
  );
  const summed = summ.toFixed(2);

  function getFirstDayOfWeek() {
    const curr = new Date();
    const firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    return firstday.getTime();
  }

  function showThisWeeksTransactions() {
    const thisWeeksTransactions = [];
    for (let i = 0; i < trans.length; i++) {
      if (getFirstDayOfWeek() - new Date(trans[i].Date).getTime() <= 0) {
        thisWeeksTransactions.push(trans[i]);
      }
    }
    return thisWeeksTransactions;
  }
  const thisWeeksTrans = showThisWeeksTransactions();

  const thisWeeksSum = thisWeeksTrans.reduce(
    (accumulator, current) => accumulator + current.amount,
    0,
  );
  const thisWeekSum = thisWeeksSum.toFixed(2);
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
              data={data}
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
              {...props}
              summed={summed}
              thisWeekSum={thisWeekSum}
              thisWeeksTrans={thisWeeksTrans}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Categories" options={{headerShown: false}}>
          {(props) => <Categories thisWeeksTrans={thisWeeksTrans} />}
        </Stack.Screen>

        <Stack.Screen name="ChildParentView" options={{headerShown: false}}>
          {(props) => (
            <ChildParentView
              data={data}
              {...props}
              summed={summed}
              budget={childBudget}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="AddChild" options={{headerShown: false}}>
          {(props) => <AddChild data={data} {...props} summed={summed} />}
        </Stack.Screen>

        <Stack.Screen name="AddBudget" options={{headerShown: false}}>
          {(props) => (
            <AddBudget
              data={data}
              {...props}
              summed={summed}
              createBudget={createBudget}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="MockTransactions" options={{headerShown: false}}>
          {(props) => (
            <MockTransactions
              data={data}
              {...props}
              summed={summed}
              createBudget={createBudget}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="BudgetChild" options={{headerShown: false}}>
          {(props) => <BudgetChild data={data} {...props} summed={summed} />}
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
