import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../appStyles/colors';

const RoundIconBtn = ({antIconName, size, color, onPress, style}) => {
  return (
    <Icon
      style={[styles.icon, {...style}]}
      name={antIconName}
      color={color || colors.LIGHT}
      size={size || 24}
      onPress={onPress}
    />
  );
};

export default RoundIconBtn;

const styles = StyleSheet.create({
  icon: {
    marginRight: 20,
    padding: 15,
    marginTop: 20,
    backgroundColor: colors.PRIMARY,
    borderRadius: 50,
    elevation: 5,
  },
});
