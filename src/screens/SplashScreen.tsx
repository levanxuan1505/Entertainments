/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import styles from '../css/SplashScreenStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const [focused, setFocused] = useState(-1);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select Profile:</Text>
      <View style={styles.profileView}>
        <TouchableOpacity
          onFocus={() => {
            setFocused(0);
          }}
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={{borderWidth: focused === 0 ? 2 : 0, borderColor: 'white'}}>
          <Image
            source={require('../assets/logo/user1.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onFocus={() => {
            setFocused(1);
          }}
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={{borderWidth: focused === 1 ? 2 : 0, borderColor: 'white'}}>
          <Image
            source={require('../assets/logo/user2.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onFocus={() => {
            setFocused(2);
          }}
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={{borderWidth: focused === 2 ? 2 : 0, borderColor: 'white'}}>
          <Image
            source={require('../assets/logo/user3.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onFocus={() => {
            setFocused(3);
          }}
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={{borderWidth: focused === 3 ? 2 : 0, borderColor: 'white'}}>
          <Image
            source={require('../assets/logo/user4.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onFocus={() => {
            setFocused(4);
          }}
          style={{borderWidth: focused === 4 ? 2 : 0, borderColor: 'white'}}>
          <Image
            source={require('../assets/logo/add.png')}
            style={styles.imageAdd}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SplashScreen;
