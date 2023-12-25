// styles.js

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  header: {
    width: 48,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    top: 0,
  },
  headerLeftView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerRightView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    top: -80,
    width: 35,
    height: 35,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
    // position: 'absolute',
  },
  menuTabs: {
    paddingVertical: 12,
  },
  tabText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
  },
  logoRight: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 20,
  },
  video: {
    height: 550,
    width: '100%',
    marginLeft: 20,
  },
  transparentView: {
    top: 0,
    left: 20,
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  movieTitle: {
    fontSize: 35,
    color: 'green',
    marginLeft: 30,
    fontWeight: '800',
    paddingTop: 0,
  },
  movieDetails: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
    marginLeft: 30,
    fontStyle: 'italic',
  },
  bannerButtonView: {
    flexDirection: 'row',
    left: 30,
    marginTop: 20,
  },
  playButton: {
    width: 120,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
  },
  infoButton: {
    width: 120,
    height: 40,
    marginLeft: 20,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    backgroundColor: '#C0C0C0',
    justifyContent: 'space-evenly',
  },
  listingView: {
    width: '100%',
    // marginTop: 20,
  },
  heading: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
    marginLeft: 30,
    marginBottom: 10,
  },
  recentItemsList: {
    width: 196,
    height: 100,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  recentItems: {
    width: 196,
    height: 100,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default styles;
