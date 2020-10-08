import React, { useContext } from 'react';
import { ParentContext } from '../ParentContext';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../myAssets/theme';

import ParentViewBalance from '../components/ParentViewBalance';
import ParentViewBudgetsList from '../components/ParentViewBudgetsList';

export default function ParentViewChildSummary({ navigation }) {
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
        <View style={styles.centerText}>
          <Text style={styles.textLarge}>
            {state.kids['5f7dca79ac51601ad2d33d3e'].name}
          </Text>
        </View>
        <View>
          <Text style={styles.text}>Balances</Text>
        </View>
        <View>
          <ParentViewBalance navigation={navigation} />
        </View>
        <View>
          <Text style={styles.text}>Budgets</Text>
        </View>
        <View style={styles.budgets}>
          {/* <ParentViewBudgetsList navigation={navigation} /> */}
        </View>
        <View style={[styles.button, styles.edit]}>
          <Text style={styles.textAdd}>&rarr; Scroll to edit a budget</Text>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('AddBudget')}>
            <Text style={styles.textAdd}>&darr; Click to add a budget</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.white,
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 19,
  },
  textAdd: {
    color: colors.white,
    fontSize: 19,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    height: 50,
    margin: 10,
    borderRadius: 8,
    backgroundColor: colors.purple,
  },
  edit: {
    backgroundColor: colors.grey,
    color: colors.white,
  },
  bg: {
    backgroundColor: colors.black,
    flex: 1,
  },
  textLarge: {
    color: colors.white,
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  centerText: {
    alignItems: 'center',
    marginTop: 10,
  },
  budgets: {
    marginTop: 10,
  },
});
