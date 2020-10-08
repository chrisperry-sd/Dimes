import React, { useContext } from 'react';
import { ParentContext } from '../ParentContext';

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
import { colors } from '../myAssets/theme';

import ParentViewChildrenList from '../components/ParentViewChildrenList';
import ParentViewSpendingOverview from '../components/ParentViewSpendingOverview';
import ParentViewTransactionsList from '../components/ParentViewTransactionsList';

//UPDATE TO HAVE ONE SWITCH FOR EACH CHILD"S VIEW

export default function ParentDashboard({ navigation }) {
  const { state, setState } = useContext(ParentContext);

  return (
    <SafeAreaView style={styles.bg}>
      <ScrollView
        refreshControl={
          <RefreshControl
            // refreshing={isRefreshing}
            // onRefresh={onRefresh}
            tintColor={colors.white}
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
          <ParentViewChildrenList navigation={navigation} />
        </View>
        <View>
          <Text style={styles.textLarge}>Overview</Text>
        </View>
        <View>
          <Text style={styles.text}>Spending</Text>
          <ParentViewSpendingOverview />
        </View>
        <View>
          <Text style={styles.text}>Transactions</Text>
          <ParentViewTransactionsList />
        </View>
        <View style={styles.dashContainer}>
          <Text style={styles.textLarge}>Child&apos;s view</Text>

          {Object.keys(state.kids).map((kid) => (
            <View style={styles.toggleSection} key={kid}>
              <Text style={styles.text}>
                {state.kids[kid].name}&apos;s dashboard
              </Text>
              <Switch
                style={styles.toggleBtn}
                trackColor={{ false: colors.purple, true: colors.plum }}
                onValueChange={() =>
                  navigation.navigate('ChildDashboard', { kidId: kid })
                }
              />
            </View>
          ))}
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
  dashContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  header: {
    marginRight: 20,
  },
  toggleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    margin: 10,
    backgroundColor: colors.purple,
    width: '95%',
  },
  toggleBtn: {
    margin: 15,
    backgroundColor: colors.purple,
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
    marginTop: 20,
    paddingLeft: 10,
    fontSize: 32,
  },
  plus: {
    color: colors.white,
    fontSize: 32,
  },
});
