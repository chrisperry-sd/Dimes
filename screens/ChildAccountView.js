import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';

import ChildBalance from '../components/childComponents/ChildBalance';
import Savings from '../components/childComponents/Savings';
import Categories from '../components/childComponents/Categories';
import NextAllowance from '../components/childComponents/NextAllowance';
import ChildAccountBudgetDisplay from '../components/childComponents/ChildAccountBudgetDisplay';

export default function ChildAccountView({data, budget}) {
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
            <Text style={styles.textBold}>Hi {data[0].Name}</Text>
          </View>
          <View>
            <NextAllowance data={data} />
          </View>
          <View>
            <Text style={styles.text}>budgets</Text>
          </View>
          <View>
            <ChildAccountBudgetDisplay data={data} budget={budget} />
          </View>
          <View>
            <ChildBalance data={data} />
          </View>
          <View>
            <Savings data={data} />
          </View>
          <View>
            <Text style={styles.text}>
              Look what you've spent money on this week
            </Text>
            <View style={styles.categories}>
              <Categories data={data} />
            </View>
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
