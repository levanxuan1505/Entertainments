/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {styles, theme} from '../themes';
import {RootStackParams} from '../navigators/Routers';
var {width, height} = Dimensions.get('window');
import {BookmarkIcon, EyeIcon} from 'react-native-heroicons/solid';
import {ScrollView} from 'react-native-virtualized-view';
import LinearGradient from 'react-native-linear-gradient';
import {View, Text, Dimensions, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {fetchDetailsMoviesOphim, fallbackMoviePoster} from '../API/MoviesDb';
export interface Data {
  id: string;
  password: number;
  slug: string;
}
const MoviesOphimScreen = () => {
  const {params: slug} = useRoute();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [dataOphim, setMovie] = useState([[]]);
  useEffect(() => {
    getMovieDetails(slug);
  }, [slug]);
  const getMovieDetails = useCallback(
    async slug => {
      const data = await fetchDetailsMoviesOphim(slug);
      if (data) {
        setMovie({...data?.episodes[0], ...data?.movie});
      }
    },
    [slug],
  );

  const moviesId = dataOphim?.server_data?.slug && dataOphim?.server_data?.slug;

  const Header = () => {
    const [isFavorite, setFavorite] = useState(false);
    return (
      <View style={{backgroundColor: '#121212'}}>
        <View>
          <View>
            <Image
              source={{
                uri: dataOphim.thumb_url || fallbackMoviePoster,
              }}
              resizeMode="cover"
              style={{
                width: width * 0.6,
                height: height * 0.6,
                right: 0,
                position: 'absolute',
              }}
            />
            <LinearGradient
              colors={[
                'transparent',
                'rgba(23, 23, 23, 0.7)',
                'rgba(23, 23, 23, 1)',
              ]}
              style={{
                right: 0,
                width: width * 0.6,
                height: height * 0.6,
                position: 'absolute',
              }}
              start={{x: 0.3, y: 0.1}}
              end={{x: 0.1, y: 1}}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', paddingTop: 40}}>
          <View
            style={{
              marginLeft: 12,
              width: width * 0.18,
              height: height * 0.1,
              backgroundColor: 'white',
              borderRadius: 5,
              justifyContent: 'space-evenly',
              paddingHorizontal: 30,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <EyeIcon size="28" strokeWidth={2.5} color="green" />
            <Text
              style={{
                fontSize: 22,
                fontWeight: '700',
                fontStyle: 'italic',
                color: 'green',
              }}>
              WATCH
            </Text>
          </View>
          <View
            style={{
              marginLeft: 12,
              width: width * 0.18,
              height: height * 0.1,
              backgroundColor: 'white',
              borderRadius: 5,
              justifyContent: 'space-evenly',
              paddingHorizontal: 20,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <BookmarkIcon size="28" strokeWidth={2.5} color="green" />
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                fontStyle: 'italic',
                color: 'green',
              }}>
              BOOKMARK
            </Text>
          </View>
        </View>
        <View style={{left: 30, paddingTop: 10}}>
          <Text
            numberOfLines={1}
            style={{
              color: 'green',
              fontSize: 38,
              fontWeight: '900',
              fontStyle: 'italic',
              width: width * 0.35,
            }}>
            {dataOphim.name}
          </Text>
          {dataOphim?._id ? (
            <Text
              numberOfLines={1}
              style={{
                color: 'white',
                fontSize: 28,
                fontWeight: '800',
                fontStyle: 'italic',
              }}>
              {dataOphim?.type.charAt(0).toUpperCase() +
                dataOphim?.type.slice(1).toLowerCase() +
                ' '}
              •
              {' ' +
                dataOphim?.status.charAt(0).toUpperCase() +
                dataOphim?.status.slice(1).toLowerCase() +
                ' '}
              •{' ' + dataOphim?.year}
            </Text>
          ) : null}
          <View className="flex-row justify-center mx-4 space-x-2">
            {dataOphim?._id ? (
              <Text
                numberOfLines={1}
                style={{
                  color: 'white',
                  fontSize: 28,
                  fontWeight: '800',
                  fontStyle: 'italic',
                }}>
                {dataOphim?.category[0]?.name} • {dataOphim?.country[0]?.name} •
                {' ' + dataOphim?.view + ' View'}
              </Text>
            ) : null}
          </View>
          <Text
            numberOfLines={3}
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: '800',
              fontStyle: 'italic',
              width: '80%',
            }}>
            {dataOphim?.content}
          </Text>
        </View>
        <Footer />
      </View>
    );
  };
  const [isChoose, setIsChoose] = useState('0');
  const Footer = () => {
    return (
      <>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            left: 30,
            marginBottom: 20,
            marginTop: 40,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 35,
              fontWeight: '800',
              fontStyle: 'italic',
              width: '80%',
            }}>
            <Text>Total Episodes: </Text>
            <Text>
              {dataOphim?.server_data ? dataOphim?.server_data.length : null}
            </Text>
          </Text>
        </View>

        {dataOphim?.server_data ? (
          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              left: 20,
              paddingBottom: 50,
            }}
            // className="flex-row flex-start flex-wrap"
          >
            {dataOphim?.server_data.map((items, index) => {
              console.log(items.link_m3u8);
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setIsChoose(items.name),
                      navigation.navigate('VideoFull', {
                        idVideo: items.link_m3u8,
                      });
                  }}
                  style={{
                    width: width * 0.27,
                    height: height * 0.22,
                    borderRadius: 7,
                    marginBottom: 30,
                    alignItems: 'center',
                    marginHorizontal: 15,
                    paddingHorizontal: 20,
                    justifyContent: 'center',
                    backgroundColor: items.name === isChoose ? 'green' : 'red',
                  }}>
                  <Text
                    style={{
                      fontSize: 70,
                      color: 'white',
                      fontWeight: '900',
                    }}>
                    {items.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : null}
      </>
    );
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className=" bg-neutral-900">
      <Header />
    </ScrollView>
  );
};

export default MoviesOphimScreen;
