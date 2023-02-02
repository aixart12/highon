import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Text,
  TextInput,
} from '@react-native-material/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../../interface/types';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { createUser } from '../../apis/user.apis';
import { useMutation } from 'react-query';

type RegistrationInput = {
  name: string;
  email: string;
  uuid: string;
  password: string;
};

type RegistrationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Registration'
>;

export const Registration: FC<RegistrationScreenProps> = (navigation) => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const createUserMutation = useMutation((data: any) => createUser(data));
  const onSubmit: SubmitHandler<RegistrationInput> = (data) => {
    console.log(data);
    createUserMutation.mutate(data, {
      onSuccess: (data) => {
        navigation.navigation.push('Map');
      },
      onError: (e) => console.log(e),
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>TESTAPP</Text>
      <Box style={styles.formContainer}>
        <Flex style={styles.form}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="name"
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="name"
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="email"
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="user name"
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="uuid"
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="password"
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          <Button
            style={styles.button}
            tintColor="#631fa4"
            title="REGISTER NOW"
            onPress={handleSubmit(onSubmit)}
          />
        </Flex>
        <HStack style={{ alignItems: 'center' }}>
          <Divider style={{ width: '40%', borderColor: 'white' }} />
          <Text style={{ margin: 10 }}>or</Text>
          <Divider style={{ width: '40%', borderColor: 'white' }} />
        </HStack>
        <Button
          style={styles.button}
          tintColor="#631fa4"
          title="LOGIN"
          onPress={() => navigation.navigation.push('Login')}
        />
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  header: {
    marginTop: 40,
    fontSize: 30,
    color: '#631fa4',
  },
  formContainer: {
    width: '100%',
    marginTop: 20,
    height: '100%',
    marginHorizontal: 0,
    padding: 20,
    backgroundColor: '#631fa4',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
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
    borderRadius: 20,
  },
});
