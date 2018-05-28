import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Animated,
  View } from 'react-native';

const header_max_height = 120
const header_min_height = 70
const profile_image_max_height = 80
const profile_image_min_height = 40

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      scrollY: new Animated.Value(0)
    }
  }
  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, header_max_height - header_min_height],
      outputRange: [header_max_height, header_min_height],
      extrapolate: 'clamp'
    })
    const profileImageHeight = this.state.scrollY.interpolate({
      inputRange: [0, header_max_height - header_min_height],
      outputRange: [profile_image_max_height, profile_image_min_height],
      extrapolate: 'clamp'
    })
    const profileImageMarginTop = this.state.scrollY.interpolate({
      inputRange: [0, header_max_height - header_min_height],
      outputRange: [header_max_height - (profile_image_max_height / 2), header_max_height + 5],
      extrapolate: 'clamp'
    })
    const headerZindex = this.state.scrollY.interpolate({
      inputRange: [0, header_max_height - header_min_height],
      outputRange: [0.01, 1],
      extrapolate: 'clamp'
    })
    const headerTitleBottom = this.state.scrollY.interpolate({
      inputRange: [0, header_max_height - header_min_height,
        header_max_height-header_min_height + 5 + profile_image_min_height,
        header_max_height-header_min_height + 5 + profile_image_min_height + 26
      ],
      outputRange: [-20, -20, -20, 0],
      extrapolate: 'clamp'
    })

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.header, {height: headerHeight, zIndex: headerZindex}]}>
          <Animated.View style={[styles.headerTitle, {
            bottom: headerTitleBottom
          }]}>
              <Text style={styles.headerTitleText}>Xcxerxes</Text>
          </Animated.View>
        </Animated.View>
        <ScrollView style={styles.scrollView}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
          )}
        >
          <Animated.View style={[styles.imageWrapper, {
            height: profileImageHeight,
            width: profileImageHeight,
            borderRadius: profile_image_max_height / 2,
            marginTop: profileImageMarginTop
          }]}>
            <Image
            source={require('./src/assets/images/experiencesCategory.png')}
            style={styles.img}/>
          </Animated.View>
          <Text style={styles.username}>Xcxerxes</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'lightskyblue'
  },
  scrollView: {
    flex: 1
  },
  imageWrapper: {
    borderColor: 'white',
    borderWidth: 3,
    overflow: 'hidden',
    marginLeft: 10
  },
  img: {
    width: null,
    height: null,
    flex: 1
  },
  username: {
    fontWeight: '600',
    fontSize: 26,
    paddingLeft: 18
  },
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0
  },
  headerTitleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    lineHeight: 24,
    textAlign: 'center'
  }
});
