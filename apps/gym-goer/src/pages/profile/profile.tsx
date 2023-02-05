import { Box, Text } from '@react-native-material/core';
import React from 'react';
import { SafeAreaView, View, TextInput, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { ActivityLogTable } from './table/activitylogTable';
import { useRoute } from '@react-navigation/native';
import { User } from '../../interface/user';

export const UserProfile = () => {
  const [QRvalue, setQRValue] = React.useState('');
  const [QRImage, setQRImage] = React.useState('');

  // const ref = React.useRef();

  const route = useRoute();

  const userValue: User = route.params;
  setQRValue(userValue.uuid);
  return (
    <SafeAreaView>
      <View style={styles.sectionContainer}>
        <Text style={styles.userName}>Name of the User</Text>
        <View style={styles.qrCode}>
          <QRCode
            size={150}
            value={QRvalue ? QRvalue : 'Dhruv'}
            logo={{ uri: QRImage }}
            logoSize={60}
            logoBackgroundColor="white"
            // getRef={ref}
          />
        </View>

        <View style={styles.code}>
          <Text style={styles.codeText}>User Code</Text>
          <Box>
            <Text style={styles.codeBox}>{QRvalue}</Text>
          </Box>
        </View>
      </View>
      <View style={styles.table}>
        <Text style={styles.tableHeader}>Entry Log</Text>

        <View>
          <ActivityLogTable />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // width: '60',
    padding: 10,
    marginTop: 32,
    backgroundColor: '#FCE205',
    borderRadius: 20,
    margin: 20,
    // marginRight: 10,
    // paddingHorizontal: 24,
  },
  qrCode: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
  },
  userName: {
    marginVertical: 10,
    fontSize: 20,
    color: 'white',
  },
  code: {
    marginTop: 10,
    alignItems: 'center',
  },
  codeBox: {
    backgroundColor: 'white',
    paddingHorizontal: 50,
    fontSize: 20,
    borderRadius: 10,
    paddingVertical: 5,
    marginVertical: 5,
  },
  codeText: {
    color: 'white',
    fontSize: 20,
  },
  table: {
    backgroundColor: '#631fa4',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    marginHorizontal: 20,
    padding: 10,
    marginTop: 2,
    height: '100%',
    alignItems: 'center',
  },
  tableHeader: {
    fontSize: 20,
    color: 'white',
  },
});
