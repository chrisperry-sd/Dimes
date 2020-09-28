import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, FlatList, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function BudgetChild({navigation, budget}) {
  const renderBudget = ({item}) => {
    return (
      <TouchableOpacity>
        <View style={styles.list}>
          <View style={styles.listContainer}>
            <View style={styles.budgetText}>
              <Text style={styles.bold}>{item.category}</Text>
            </View>
            <View style={styles.budgetText}>
              <Text style={styles.text}>£ {item.budget}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <FlatList
          style={styles.flatListBorder}
          horizontal={true}
          data={budget}
          keyExtractor={(item) => item.id}
          renderItem={renderBudget}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    margin: 10,
    borderRadius: 8,
    flexDirection: 'row',
  },
  flatListBorder: {
    borderRadius: 8,
  },
  list: {
    backgroundColor: '#985f6f',
    marginRight: 10,
    height: 100,
    borderRadius: 8,
    width: 'auto',
  },
  list1: {
    backgroundColor: '#161925',
    marginRight: 10,
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    borderWidth: 1,
    borderColor: 'white',
  },
  addBudget: {
    backgroundColor: '#161925',
    borderColor: '#985f6f',
    borderWidth: 1,
    marginRight: 10,
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: 'auto',
  },
  listContainer: {
    margin: 10,
  },
  addBudgetContainer: {
    margin: 10,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    paddingHorizontal: 2,
    fontSize: 18,
  },
  bold: {
    color: 'white',
    paddingHorizontal: 2,
    fontSize: 24,
    fontWeight: 'bold',
  },
  budgetText: {
    paddingTop: 5,
  },
});
