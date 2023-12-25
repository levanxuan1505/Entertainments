// styles.js

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  profileView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  imageAdd: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
    tintColor: 'green',
  },
  text: {
    fontSize: 40,
    color: 'white',
  },
});

export default styles;
