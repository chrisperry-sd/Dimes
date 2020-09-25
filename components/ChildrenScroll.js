/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, FlatList, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function ChildrenScroll({navigation, data, summed}) {
  const [child, setChild] = useState([]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <FlatList
          style={styles.flatListBorder}
          horizontal={true}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ChildParentView', {summed})}>
              <View style={styles.list}>
                <View style={styles.listContainer}>
                  <Text style={styles.text}>{item.Name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    borderRadius: 8,
    flexDirection: 'row',
    margin: 20,
  },
  flatListBorder: {
    borderRadius: 8,
  },
  list: {
    backgroundColor: '#A34861',
    marginRight: 10,
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
  },
  listContainer: {
    margin: 10,
    padding: 10,
    width: 190,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    paddingHorizontal: 2,
    fontSize: 32,
  },
});
