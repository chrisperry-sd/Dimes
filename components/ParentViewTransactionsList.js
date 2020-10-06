import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../myAssets/theme';

// filter our data by the last 30 days...

export default function ParentViewTransactionsList({ thisWeeksTrans }) {
  return (
    <View>
      <View style={styles.container}>
        <FlatList
          style={styles.flatListBorder}
          horizontal={true}
          data={
            thisWeeksTrans
              ? thisWeeksTrans.sort((a, b) => {
                  return (
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                  );
                })
              : null
          }
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
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
    backgroundColor: colors.plum,
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
    color: colors.white,
    paddingHorizontal: 2,
    fontSize: 18,
  },
});