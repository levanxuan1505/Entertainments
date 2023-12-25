/* eslint-disable react-native/no-inline-styles */
var {width, height} = Dimensions.get('window');
import FastImage from 'react-native-fast-image';
import {fallbackMoviePoster} from '../../API/MoviesDb';
import {View, Dimensions, StyleSheet} from 'react-native';
import React, {Suspense, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {imageOphim, fetchMoviesOphim} from '../../API/MoviesDb';

//
const HomeHeaderComponent = () => {
  const [data, setTrendingMovies] = useState([]);
  useEffect(() => {
    getTrendingMovies();
  }, []);
  const getTrendingMovies = async () => {
    const data = await fetchMoviesOphim(1);
    if (data && data.items) {
      setTrendingMovies(data.items);
    }
  };
  const [index, setIndex] = React.useState(data.length / 2);
  const isCarousel = React.useRef(null);
  return (
    <View
      style={{
        left: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
      }}>
      <Carousel
        data={data}
        loop={true}
        firstItem={1}
        autoplay={true}
        sliderWidth={width}
        ref={isCarousel}
        autoplayInterval={5000}
        itemWidth={width}
        inactiveSlideScale={0.9}
        inactiveSlideOpacity={0.8}
        onSnapToItem={index => setIndex(index)}
        loopClonesPerSide={data.length - 1}
        slideStyle={{display: 'flex', alignItems: 'center'}}
        renderItem={({item}) => <MovieCard item={item} />}
      />
      {/* <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 10,
          marginHorizontal: -10,
          backgroundColor: 'rgba(0, 0, 0, 0.92)',
        }}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.5}
        tappableDots={true}
      /> */}
    </View>
  );
};

const MovieCard = ({item}) => {
  return (
    <Suspense>
      <TouchableOpacity>
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
      </TouchableOpacity>
    </Suspense>
  );
};
export default HomeHeaderComponent;
const styles = StyleSheet.create({
  Image: {
    borderRadius: 10,
    width: width * 0.9,
    height: height * 0.625,
  },
});
