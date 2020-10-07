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
import AsyncStorage from '@react-native-community/async-storage';
import { colors } from '../myAssets/theme';

import ParentViewSpendingOverview from '../components/ParentViewSpendingOverview';
import ParentViewChildrenList from '../components/ParentViewChildrenList';
import ApiService from '../ApiService';

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
        </View>
        <View>
          <ParentViewSpendingOverview />
        </View>
        <View style={styles.container}>
          <View style={styles.toggleBtn}>
            <Text style={styles.text}>Child&apos;s View</Text>
            <Switch
              style={styles.toggleBtn}
              trackColor={{ false: colors.purple, true: colors.plum }}
              onValueChange={() => {
                navigation.navigate('ChildDashboard');
              }}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={async () => {
          const accessToken = await AsyncStorage.getItem('@accessToken');
          ApiService.logout(accessToken);
          navigation.navigate('Login');
        }}>
        <View style={styles.btn}>
          <Text>Logout</Text>
        </View>
      </TouchableOpacity>
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
  btn: {
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnContainer: {
    width: 150,
    alignSelf: 'center',
  },
});
