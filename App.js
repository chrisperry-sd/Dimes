/* eslint no-console: 0 */
import React, { useState, useEffect, useMemo } from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Login from './screens/Login';
import SignUp from './screens/SignUp';
import AddChild from './screens/AddChild';
import AddBudget from './screens/AddBudget';
import ParentDashboard from './screens/ParentDashboard';
import ChildDashboard from './screens/ChildDashboard';
import ParentViewChildSummary from './screens/ParentViewChildSummary';
import ParentViewTransactions from './screens/ParentViewTransactions';

import ApiService from './ApiService';
import { ParentContext } from './ParentContext';

export default function App() {
  const [state, setState] = useState({
    user: {},
    kids: {},
    budgets: [],
    transactions: [],
  });

  const providerValue = useMemo(() => ({ state, setState }), [state, setState]);

  const retrieveUserInfo = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('@accessToken');
      if (accessToken) {
        const userInfo = await ApiService.loadUserDetails(accessToken);
        const { _id, username, isKid } = userInfo;
        setState((prevState) => ({
          ...prevState,
          user: { _id, username, isKid },
        }));
      }
    } catch (error) {
      console.log(
        '---> Unable to retrieve access token and/or user data',
        error,
      );
    }
  };

  useEffect(() => {
    retrieveUserInfo();
    const id = state.user._id;
    if (id) {
      ApiService.getBudgets(id)
        .then((newBudgets) =>
          setState((prevState) => ({ ...prevState, budgets: newBudgets })),
        )
        .catch((error) => console.log('---> Error loading budget data', error));
      ApiService.getTransactions(id)
        .then((newTransactions) =>
          setState((prevState) => ({
            ...prevState,
            transactions: newTransactions,
          })),
        )
        .catch((error) =>
          console.log('---> Error loading transaction data', error),
        );
      if (!state.user.isKid) {
        ApiService.getKids(id)
          .then((newKids) => {
            const allKids = {};
            newKids.forEach((kid) => {
              const {
                _id,
                name,
                userId,
                parentId,
                allowanceAmount,
                allowanceFrequency,
                allowanceDate,
              } = kid;
              allKids[_id] = {
                _id,
                name,
                userId,
                parentId,
                allowanceAmount,
                allowanceFrequency,
                allowanceDate,
              };
            });
            setState((prevState) => ({ ...prevState, kids: allKids }));
          })
          .catch((error) => console.log('---> Error loading kids data', error));
      }
      console.log('---> state.user', state.user);
      console.log('---> state.kids', state.kids);
      console.log('---> state.transactions', state.transactions);
      console.log('---> state.budgets', state.budgets);
    }
  }, [state.user._id]);

  return (
    <NavigationContainer>
      <ParentContext.Provider value={providerValue}>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="AddChild" component={AddChild} />
          <Stack.Screen name="AddBudget" component={AddBudget} />
          <Stack.Screen name="ParentDashboard" component={ParentDashboard} />
          <Stack.Screen
            name="ParentViewChildSummary"
            component={ParentViewChildSummary}
          />
          <Stack.Screen
            name="ParentViewTransactions"
            component={ParentViewTransactions}
          />
          <Stack.Screen name="ChildDashboard" component={ChildDashboard} />
        </Stack.Navigator>
      </ParentContext.Provider>
    </NavigationContainer>
  );
}

//  const [alerted, setAlerted] = useState(false);
// const [parentAlerted, setParentAlerted] = useState(false);
// const [alertExpiry, setAlertExpiry] = useState(false);
// const [isRefreshing, setIsRefreshing] = useState(false);

// function setAlertExpiryToTrue() {
//   setAlertExpiry(true);
// }
// function setAlertToBeTrue() {
//   setAlerted(true);
// }
// function setParentAlertToBeTrue() {
//   setParentAlerted(true);
// }
// const wait = (timeout) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, timeout);
//   });
// };
// const onRefresh = useCallback(async () => {
//   setIsRefreshing(true);
//   wait(2000).then(() =>
//     ApiService.getTransactions()
//       .then((trans) => setTransactions(trans))
//       .then(() => setIsRefreshing(false)),
//   );
// }, []);
