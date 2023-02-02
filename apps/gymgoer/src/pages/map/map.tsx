import Geolocation from '@react-native-community/geolocation';
import { Flex, Text } from '@react-native-material/core';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Platform, PermissionsAndroid } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export const Map = () => {
  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  useEffect(() => {
    async function requestPermissions() {
      // if (Platform.OS === 'ios') {
      //   const auth = await Geolocation.requestAuthorization("whenInUse");
      //   if(auth === "granted") {
      //      // do something if granted...
      //   }
      // }

      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // do something if granted...
          Geolocation.getCurrentPosition((pos) => {
            const crd = pos.coords;
            setPosition({
              latitude: crd.latitude,
              longitude: crd.longitude,
              latitudeDelta: 0.0421,
              longitudeDelta: 0.0421,
            });
          });
        }
      }
    }
    requestPermissions();
  }, []);

  console.log('🚀 ~ file: map.tsx:15 ~ Map ~ position', position);

  return (
    <Flex>
      <MapView
        style={styles.map}
        initialRegion={position}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
      >
        <Marker
          title="Yor are here"
          description="This is a description"
          coordinate={position}
        />
      </MapView>
      <GooglePlacesAutocomplete
        styles={styles.search}
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: 'AIzaSyBKr6j2VqBCIMx1H0hZDRHbUCGmhYod508',
          language: 'en',
        }}
      />
    </Flex>
  );
};

// const styles = StyleSheet.create({
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

//   return (
//     // <View style={styles.section}>
//     // <MapView
//     //   provider={PROVIDER_GOOGLE} // remove if not using Google Maps
//     //   style={styles.map}
//     //   region={{
//     //     latitude: 37.78825,
//     //     longitude: -122.4324,
//     //     latitudeDelta: 0.015,
//     //     longitudeDelta: 0.0121,
//     //   }}
//     // >
//     //   <Text>HI Dhruv</Text>
//     // </MapView>
//     <MapView
//   region={this.state.region}
//   onRegionChange={this.onRegionChange}
// >
//   {this.state.markers.map((marker, index) => (
//     <Marker
//       key={index}
//       coordinate={marker.latlng}
//       title={marker.title}
//       description={marker.description}
//     />
//   ))}
// </MapView>
//     // </View>
//   );
// };

const styles = StyleSheet.create({
  // section: {
  //   flex: 1,
  // },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '60%',
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 5,
    padding: 4,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  search: {
    marginTop: '20%',
  },
  wrapper: {
    flex: 1,
  },
});
