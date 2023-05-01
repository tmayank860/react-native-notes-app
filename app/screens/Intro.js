import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../appStyles/colors';
import RoundIconBtn from '../components/RoundIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Intro = ({onFinish}) => {
  const [userName, setUserName] = useState('');

  const handleOnchangeText = text => {
    setUserName(text);
  };

  const handleSubmit = async () => {
    const user = {name: userName};
    const res = await AsyncStorage.setItem('user', JSON.stringify(user));
    if (onFinish) onFinish();
  };
  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <Text style={styles.titleText}>Enter Your Name to Continue</Text>
        <TextInput
          style={styles.textInput}
          value={userName}
          onChangeText={handleOnchangeText}
          placeholder="Enter Name"
          placeholderTextColor={colors.DARK}
        />
        {userName !== '' && userName.trim().length >= 3 && (
          <View style={styles.roundIconBtn}>
            <RoundIconBtn antIconName="arrowright" onPress={handleSubmit} />
          </View>
        )}
      </View>
    </>
  );
};

export default Intro;

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.GRAY
  },
  titleText: {
    alignSelf: 'flex-start',
    paddingLeft: 25,
    marginBottom: 8,
    opacity: 0.8,
    color: colors.PRIMARY,
    fontSize: 14,
  },
  textInput: {
    borderWidth: 2,
    borderColor: colors.PRIMARY,
    width: width - 50,
    color: colors.PRIMARY,
    padding: 8,
    borderRadius: 10,
    fontSize: 24,
    textAlign: 'center',
  },
  roundIconBtn: {
    // alignSelf: 'flex-end',
  },
});
