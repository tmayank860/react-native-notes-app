import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import Intro from './app/screens/Intro';
import NoteScreen from './app/screens/NoteScreen';
const App = () => {
  const [user, setUser] = useState({});
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');
    const userDetails = JSON.parse(result);
    if (userDetails) {
      setUser(userDetails);
    }
  };
  useEffect(() => {
    findUser();
  }, []);

  return user?.name ? (
    <NoteScreen userName={user?.name} />
  ) : (
    <Intro onFinish={findUser} />
  );
};

export default App;
