import { Button, Text } from '@react-native-material/core';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import { addLogUsingUuid, getAllLogs } from '../../apis/logs.api';
import { ActivityLogTable } from './table/activitylogTable';

export const AdminProfile = () => {
  // const ref = React.useRef();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const addLogMutation = useMutation((data: any) => addLogUsingUuid(data));

  const onSubmit: SubmitHandler<{ uuid: string }> = (data) => {
    console.log(data);
    addLogMutation.mutate(data, {
      onSuccess: (userData) => {
        console.log(
          '🚀 ~ file: profile.tsx:38 ~ AdminProfile ~ userData',
          userData
        );
        reset();
      },
    });
  };
  return (
    <SafeAreaView>
      <View style={styles.sectionContainer}>
        <Text style={styles.userName}>Name of the User</Text>
        <View>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="username"
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="uuid"
          />
          <Button
            style={styles.button}
            tintColor="#631fa4"
            title="ADD LOG"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
      <View style={styles.table}>
        <Text style={styles.tableHeader}>Entry Log</Text>

        <View style={{ width: '100%', padding: 0 }}>
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
    width: '100%',
  },
  tableHeader: {
    fontSize: 20,
    color: 'white',
  },
  button: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: 'white',
  },
  form: {
    gap: 3,
  },
  textInput: {
    textAlign: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
  },
});
