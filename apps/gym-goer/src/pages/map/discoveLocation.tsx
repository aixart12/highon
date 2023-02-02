import Geolocation from '@react-native-community/geolocation';
import { Button } from '@react-native-material/core';
import React, { useEffect, useState } from 'react';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Constants } from '../../constants';

export const DiscoveryLocation = () => {
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

  const searchHandler = (data) => {
    setPosition(data);
  };

  const onPressHandler = (data) => {
    console.log(
      '🚀 ~ file: discoveLocation.tsx:26 ~ DiscoveryLocation ~ position',
      position
    );
  };
  return (
    <View style={styles.container}>
      {/* <View style={styles.vwheader} >
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Image source={require('../../Images/left-arrow-red.png')} style={{ height: 25, width: 30, marginTop: 22, marginLeft: 15, }}
                            />
                        </TouchableOpacity>
                        <Text style={styles.txtdisloc}>Discovery Location </Text>
                    </View> */}

      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
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
        <View style={{ marginTop: hp('12%') }}>
          <GooglePlacesAutocomplete
            placeholder="Enter City, State, Country"
            minLength={2} // minimum length of text to search
            fetchDetails={true}
            onPress={(data, details) => searchHandler(data || position)}
            onFail={(error) => console.log(error)}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: Constants.GOOGLE_API_KEY,
              language: 'en', // language of the results
              types: '(cities)', // default: 'geocode'
            }}
            styles={{
              textInputContainer: {
                width: wp('90%%'),
                height: hp('7%'),
                borderRadius: 11,
                borderTopWidth: 0,
                borderBottomWidth: 0,
              },
              textInput: {
                marginLeft: 0,
                marginRight: 0,
                backgroundColor: '#D3D3D3',
              },
              description: {
                fontWeight: 'bold',
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
              powered: {},
            }}
            filterReverseGeocodingByTypes={[
              'locality',
              'administrative_area_level_3',
            ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            predefinedPlacesAlwaysVisible={true}
          />
        </View>
      </View>

      <View style={{ marginTop: 10, marginBottom: 10 }}>
        <TouchableOpacity>
          <Button title="Confirm Location" onPress={onPressHandler}></Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // section: {
  //   flex: 1,
  // },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
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
