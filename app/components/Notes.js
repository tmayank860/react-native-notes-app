import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../appStyles/colors';

const bgArray = ['#f7d44c', '#eb7a53', '#98b7db','#a8d672','#F6ECC9']
const Notes = ({data, listItemClicked}) => {
    const Item = ({item}) => (
       <TouchableOpacity style={[styles.item, {backgroundColor : bgArray[Math.floor(Math.random() * bgArray.length)]}]} onPress={() => {listItemClicked(item)}}>
         <View >
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.desc}>{item?.desc}</Text>
        </View>
       </TouchableOpacity>
      );
  return (
   <FlatList 
   data = {data}
   renderItem={({item}) => <Item item={item} />}
   keyExtractor={item => item.id}
   numColumns={2}
   />
  )
}

export default Notes
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    item: {
        backgroundColor: '#F6ECC9',
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 3,
        flex: 0.5,
        borderRadius: 20,
        height: 200,
        alignItems: 'flex-start',
      },
      title: {
        fontSize: 24,
        color: colors.DARK,
        fontWeight: 'bold'
      },
      desc: {
        fontSize: 18,
        color: colors.DARK
      },
})