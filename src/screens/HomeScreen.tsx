/* eslint-disable react-native/no-inline-styles */
import {View, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from '../css/HomeScreenStyle';
// import Video, {VideoRef} from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import Iconss from 'react-native-vector-icons/Fontisto';
import Iconsss from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {RootStackParams} from '../navigators/Routers';
import {setData, setLoading, incrementPage} from '../toolkit/store';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {FlashList} from '@shopify/flash-list';
import HomeBodyComponent from '../components/Home/HomeBodyComponent';
import HomeHeaderComponent from '../components/Home/HomeHeaderComponent';

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const dispatch = useDispatch();

  const [recentIndex, setRecentIndex] = useState(0);
  const [trendingIndex, setTrendingIndex] = useState(2);
  const {data, isLoading, page} = useSelector(state => state.scroll);

  const fetchData = useCallback(async () => {
    if (page > 20) return;
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${page}`,
      );
      const newData = response.data;
      dispatch(setData(newData));
      dispatch(incrementPage());
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEndReached = useCallback(() => {
    if (!isLoading) {
      fetchData();
    }
  }, [fetchData, isLoading]);

  const renderFooter = () => {
    if (!isLoading) return null;

    return (
      <View style={{paddingVertical: 40}}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  };

  return (
    data &&
    data.length > 0 && (
      <>
        <View style={styles.container}>
          <FlashList
            data={data}
            // onEndthreshold={10}
            estimatedItemSize={10}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.1}
            ListHeaderComponent={HomeHeaderComponent}
            // keyExtractor={item => item?.items[0]?._id.toString()}
            // extraData={item => item?.items[0]?._id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => <HomeBodyComponent data={item} />}
            ListFooterComponent={renderFooter}
          />

          <View style={styles.header}>
            <TouchableOpacity>
              <Image
                source={require('../assets/logo/netflix.png')}
                style={styles.logo}
                resizeMode="center"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuTabs}>
              <Icon name="search" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuTabs}>
              <Icon name="home" size={28} color="green" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuTabs}>
              <Icons name="tv" size={26} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuTabs}>
              <Iconsss name="favorite" size={28} color="red" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuTabs}>
              <Iconss name="film" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuTabs}>
              <Icons name="settings-sharp" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </>
    )
  );
};

export default HomeScreen;
