import Geolocation from '@react-native-community/geolocation';
import { Button } from '@react-native-material/core';
import React, { FC, useEffect, useState } from 'react';
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
import { useMutation } from 'react-query';
import { updateLocation } from '../../apis/user.apis';

import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../interface/types';
import { User } from '../../interface/user';

type DiscoveryLocationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Registration'
>;

export const DiscoveryLocation: FC<DiscoveryLocationScreenProps> = (
  navigation
) => {
  const route = useRoute();

  const userValue: User = { ...route.params };
  console.log('🚀 ~ file: discoveLocation.tsx:35 ~ userValue', userValue.id);

  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  useEffect(() => {
    async function requestPermissions() {
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
  const createUpdateLocationMutation = useMutation((e: any) =>
    updateLocation(e.userId, e.data)
  );

  const onPressHandler = (e) => {
    createUpdateLocationMutation.mutate(
      {
        userId: userValue.id,
        data: { ...userValue, location: JSON.stringify(position.latitude) },
      },
      {
        onSuccess: (userData) => {
          navigation.navigation.push('UserProfile', userData);
        },
        onError: (e) => console.log(e),
      }
    );
  };
  return (
    <View style={styles.container}>
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
        <View>
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
                backgroundColor: 'white',
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

      <View style={styles.buttonBox}>
        <TouchableOpacity>
          <Button
            style={styles.button}
            title="Confirm Location"
            onPress={onPressHandler}
            tintColor="#631fa4"
          ></Button>
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
    // justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 5,
    padding: 20,
    backgroundColor: '#631fa4',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop: '30%',
    height: '80%',
    backgroundColor: 'red',
    alignItems: 'center',
    margin: 20,
    borderRadius: 20,
  },
  search: {
    width: '80%',
    backgroundColor: 'red',
  },
  searchBox: {
    marginTop: '20%',
    width: '100%',
  },
  button: {
    marginHorizontal: 5,
    backgroundColor: 'white',
  },
  buttonBox: {
    position: 'absolute',
    bottom: 20,
  },
});
