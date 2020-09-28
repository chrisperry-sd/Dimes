import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  RefreshControl,
} from 'react-native';

import ChildBalance from '../components/childComponents/ChildBalance';
import Savings from '../components/childComponents/Savings';
import Categories from '../components/childComponents/Categories';
import NextAllowance from '../components/childComponents/NextAllowance';
import ChildAccountBudgetDisplay from '../components/childComponents/ChildAccountBudgetDisplay';
import ChartComp from '../components/childComponents/ChartComp';

export default function ChildAccountView({data, budget, summed, transactions}) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };
  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    wait(2000).then(() => setIsRefreshing(false));
  }, []);

  return (
    <View style={styles.bg}>
      <SafeAreaView style={styles.screen}>
        <StatusBar />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor="white"
            />
          }>
          <View>
            <Text style={styles.textBold}>Hey {data[0].Name}</Text>
          </View>
          <View>
            <NextAllowance data={transactions} />
          </View>
          <View>
            <Text style={styles.text}>Budgets</Text>
          </View>
          <View>
            <ChildAccountBudgetDisplay data={transactions} budget={budget} />
          </View>
          <View>
            <ChildBalance summed={summed} />
          </View>
          <View>
            <Savings summed={summed} budget={budget} data={transactions}/>
          </View>
          <View>
            <Text style={styles.text}>
              Look what you've spent money on this week
            </Text>
            <View style={styles.categories}>
              <Categories data={transactions} />
            </View>
          </View>
          <View>
            <ChartComp />
          </View>
          <View>
            <Text />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    margin: 10,
    padding: 10,
  },
  bg: {
    backgroundColor: '#7698B3',
    flex: 1,
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 32,
    color: 'white',
  },
  categories: {
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 24,
    marginLeft: 10,
    marginTop: 10,
    fontFamily: 'Chilanka-Regular',
  },
});
