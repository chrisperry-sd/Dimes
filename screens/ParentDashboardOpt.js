/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';

import Spent from '../components/Spent';
import ChildrenScroll from '../components/ChildrenScroll';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default function ParentDashboard({
  navigation,
  data,
  summed,
  thisWeekSum,
  thisWeeksTrans,
}) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    wait(2000).then(() => setIsRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.bg}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor="white"
          />
        }>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <View>
            <Text style={styles.textLarge}>Children</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('AddChild')}>
            <View style={styles.plusBorder}>
              <Text style={styles.plus}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.home}>
          <ChildrenScroll navigation={navigation} data={data} summed={summed} />
        </View>
        <View>
          <Text style={styles.textLarge}>Overview</Text>
        </View>
        <View>
          <Text style={styles.text}>Spending</Text>
        </View>
        <View>
          <Spent
            thisWeekSum={thisWeekSum}
            data={data}
            thisWeeksTrans={thisWeeksTrans}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.toggleBtn}>
            <Text style={styles.text}>Childs View</Text>
            <Switch
              style={styles.toggleBtn}
              trackColor={{false: '#767577', true: '#A34861'}}
              onValueChange={() => navigation.navigate('ChildAccountView')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 20,
  },
  toggleBtn: {
    margin: 10,
  },
  plusBorder: {
    borderRadius: 50,
    backgroundColor: '#A34861',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
  },
  text: {
    color: 'white',
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 19,
  },
  bg: {
    backgroundColor: '#161925',
    flex: 1,
  },
  textLarge: {
    color: 'white',
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 32,
  },
  plus: {
    color: 'white',
    fontSize: 32,
  },
});
