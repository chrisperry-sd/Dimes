import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

// filter our data by the last 30 days...

export default function SpentItems({data, thisWeeksTrans}) {
  return (
    <View>
      <View style={styles.container}>
        <FlatList
          style={styles.flatListBorder}
          horizontal={true}
          data={thisWeeksTrans ? thisWeeksTrans.sort((a, b) => {
            return new Date(b.date) - new Date(a.date) ;
          }) : null}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <TouchableOpacity>
              <View style={styles.list}>
                <View style={styles.listContainer}>
                  <Text style={styles.text}>{item.merchant}</Text>
                  <Text style={styles.text}>£{item.amount}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    borderRadius: 8,
  },
  flatListBorder: {
    borderRadius: 8,
  },
  list: {
    backgroundColor: '#A34861',
    marginRight: 10,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
  },
  listContainer: {
    margin: 10,
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    paddingHorizontal: 2,
    fontSize: 18,
  },
});
