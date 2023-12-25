/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Video from 'react-native-video';
import React, {useRef, useState} from 'react';
import Slider from '@react-native-community/slider';
import {Colors} from '../constants';
const {height} = Dimensions.get('window');

const VideoFullScreen = ({route}) => {
  const {idVideo} = route.params;
  console.log(idVideo);
  const [clicked, setClicked] = useState(true);
  const [pause, setPaused] = useState(true);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const ref = useRef();
  const format = seconds => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    idVideo && (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#000',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setClicked(true);
            const timer = setTimeout(() => {
              setClicked(false);
            }, 5000);
            return () => clearTimeout(timer);
          }}>
          <Video
            ref={ref}
            muted={muted}
            paused={pause}
            audioOnly={false}
            resizeMode="contain"
            pictureInPicture={true}
            style={{width: '100%', height: height}}
            source={{
              uri: idVideo,
            }}
            ignoreSilentSwitch={'ignore'}
            onProgress={x => {
              // console.log(x);
              setProgress(x);
            }}
            // Can be a URL or a local file.
            //  ref={(ref) => {
            //    this.player = ref
            //  }}                                      // Store reference
            //  onBuffer={this.onBuffer}                // Callback when remote video is buffering
            //  onError={this.videoError}

            // Callback when video cannot be loaded
          />
          {clicked && (
            <TouchableOpacity
              activeOpacity={1}
              style={{
                width: '100%',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{padding: 20}}
                  onPress={() => {
                    ref?.current.seek(parseInt(progress.currentTime) - 10);
                  }}>
                  <Image
                    source={require('../assets/images/backward.png')}
                    style={{width: 50, height: 50, tintColor: 'white'}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setPaused(!pause);
                  }}>
                  <Image
                    source={
                      pause
                        ? require('../assets/images/playButton.png')
                        : require('../assets/images/pauseButton.png')
                    }
                    style={{
                      width: 65,
                      height: 65,
                      tintColor: 'white',
                      marginLeft: height / 10,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{padding: 20}}
                  onPress={() => {
                    ref?.current.seek(parseInt(progress?.currentTime) + 10);
                  }}>
                  <Image
                    source={require('../assets/images/forward.png')}
                    style={{
                      width: 50,
                      height: 50,
                      marginLeft: height / 10,
                      tintColor: 'white',
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  bottom: 30,
                  width: '100%',
                  paddingLeft: 30,
                  paddingRight: 30,
                  flexDirection: 'row',
                  alignItems: 'center',
                  position: 'absolute',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: 'white'}}>
                  {progress?.currentTime
                    ? format(progress?.currentTime)
                    : '00:00'}
                </Text>
                <Slider
                  minimumValue={0}
                  style={{width: '90%'}}
                  minimumTrackTintColor={Colors.DEFAULT_GREEN}
                  maximumTrackTintColor={Colors.DEFAULT_GREY}
                  maximumValue={progress?.seekableDuration}
                  onValueChange={x => {
                    ref?.current.seek(x);
                  }}
                  value={progress?.currentTime}
                />
                <Text style={{color: 'white'}}>
                  {progress?.seekableDuration
                    ? format(progress?.seekableDuration)
                    : '00:00'}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </SafeAreaView>
    )
  );
};

export default VideoFullScreen;
