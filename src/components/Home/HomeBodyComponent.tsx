/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {Suspense, memo} from 'react';
import {RootStackParams} from '../../navigators/Routers';
import {imageOphim} from '../../API/MoviesDb';
// import {FlashList} from '@shopify/flash-list';
const {width, height} = Dimensions.get('window');
import FastImage from 'react-native-fast-image';
import {fallbackMoviePoster} from '../../API/MoviesDb';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FlashList} from '@shopify/flash-list';

interface Props {
  data: any;
}
const Array = [
  {
    id: 1,
    title: 'Trending',
  },
  {
    id: 2,
    title: 'UpComing',
  },
  {
    id: 3,
    title: 'TopRated',
  },
  {
    id: 4,
    title: 'Now Playing',
  },
  {
    id: 5,
    title: 'Popular',
  },
  {
    id: 6,
    title: 'Maybe You Love',
  },
  {
    id: 7,
    title: 'Because You Watched Titanic',
  },
  {
    id: 8,
    title: 'Just For You',
  },
  {
    id: 9,
    title: 'Good Film Today',
  },
  {
    id: 10,
    title: 'Fantasy Adventure Movies',
  },
  {
    id: 11,
    title: 'Movies Theater',
  },
  {
    id: 12,
    title: 'Disney',
  },
  {
    id: 13,
    title: 'Movies For Kids',
  },
  {
    id: 14,
    title: 'Special Anime',
  },
  {
    id: 15,
    title: 'Special Anime',
  },
  {
    id: 16,
    title: 'HBO TopRated',
  },
  {
    id: 17,
    title: 'HBO GO',
  },
  {
    id: 18,
    title: 'Asian Drama Max',
  },
  {
    id: 19,
    title: 'American Movies',
  },
  {
    id: 20,
    title: 'The World Around Us',
  },
];
const HomeBodyComponent: React.FC<Props> = ({data}) => {
  console.log(data.pagination.currentPage);
  const styles = StyleSheet.create({
    ImageView: {
      marginRight: 10,
      height: height * 0.28,
      borderRadius: 10,
    },
    Image: {
      width: width * 0.26,
      height: height * 0.23,
    },
  });
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const Movies = memo(({item}) => {
    return (
      item &&
      item.origin_name && (
        <Suspense>
          <TouchableOpacity
            onPress={() => navigation.push('MoviesOphim', item.slug)}>
            <View style={styles.ImageView} className="space-y-1 w-full mr-1">
              <FastImage
                source={{
                  uri:
                    imageOphim(item?.thumb_url) ||
                    imageOphim(item?.poster_url) ||
                    fallbackMoviePoster,
                  headers: {Authorization: 'someAuthToken'},
                  priority: FastImage.priority.normal,
                  cache: FastImage.cacheControl.immutable,
                }}
                defaultSource={require('../../assets/images/Progress.png')}
                resizeMode={FastImage.resizeMode.cover}
                style={styles.Image}
              />
              <View>
                <Text
                  numberOfLines={1}
                  style={{
                    paddingLeft: 5,
                    width: width * 0.24,
                    fontSize: 16,
                    fontWeight: '500',
                    color: 'white',
                    fontStyle: 'italic',
                  }}
                  // className="text-neutral-300 ml-1"
                >
                  {item?.origin_name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Suspense>
      )
    );
  });
  const getItem = (data, index) => {
    return data[index];
  };
  return (
    data.pagination.currentPage &&
    data.pagination.currentPage > 0 && (
      <>
        <View style={{left: 72}} className="left-20 mb-3 space-y-1 w-full">
          <View
            style={{
              marginHorizontal: 2,
              marginVertical: 5,
              paddingTop: 5,
              left: 10,
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
            // className="mx-2 flex-row justify-between items-center"
          >
            <Text
              style={{
                fontSize: 28,
                fontWeight: '800',
                color: 'white',
                fontStyle: 'italic',
              }}
              // className="text-white font-Primary text-[25px]"
            >
              {Array.map(item => {
                if (item.id === data.pagination.currentPage) {
                  return item.title;
                }
              })}
            </Text>
          </View>
          {/* 
          <View className="px-[8px]">
            {data.items && data.items.length > 0 && (
              <VirtualizedList
                data={data}
                horizontal={true}
                getItem={getItem}
                initialNumToRender={3}
                disableVirtualization={true}
                keyExtractor={item => item._id}
                getItemCount={data => data.length}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}: any) => <Movies item={item} />}
              />
            )}
          </View> */}

          <View style={{marginRight: 65}}>
            {data.items && data.items.length > 0 && (
              <FlashList
                data={data.items.slice(0, 15)}
                horizontal={true}
                estimatedItemSize={10}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}: any) => <Movies item={item} />}
              />
            )}
          </View>
        </View>
      </>
    )
  );
};

export default memo(HomeBodyComponent);
