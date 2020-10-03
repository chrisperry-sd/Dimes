import React from 'react';
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
import { colors } from '../theme';

import Spent from '../components/Spent';
import ChildrenScroll from '../components/ChildrenScroll';

export default function ParentDashboard({
  navigation,
  data,
  summed,
  thisWeekSum,
  thisWeeksTrans,
  onRefresh,
  isRefreshing,
}) {
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
        <View style={[styles.container, styles.header]}>
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
        <View style={styles.container}>
          <View style={styles.toggleBtn}>
            <Text style={styles.text}>Childs View</Text>
            <Switch
              style={styles.toggleBtn}
              trackColor={{ false: '#767577', true: colors.plum }}
              onValueChange={() => navigation.navigate('ChildAccountView')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    marginRight: 20,
  },
  toggleBtn: {
    margin: 10,
  },
  plusBorder: {
    borderRadius: 50,
    backgroundColor: colors.plum,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
  },
  text: {
    color: colors.white,
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 19,
  },
  bg: {
    backgroundColor: colors.black,
    flex: 1,
  },
  textLarge: {
    color: colors.white,
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 32,
  },
  plus: {
    color: colors.white,
    fontSize: 32,
  },
});
