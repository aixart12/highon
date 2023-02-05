import {
  Box,
  Button,
  Flex,
  HStack,
  TextInput,
} from '@react-native-material/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { useMutation } from 'react-query';
import { loginUser } from '../../apis/user.apis';
import { RootStackParamList } from '../../interface/types';

type LoginInput = {
  name: string;
  email: string;
  uuid: string;
  password: string;
};

type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Registration'
>;

export const LoginScreen: FC<LoginScreenProps> = (navigation) => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const createUserMutation = useMutation((data: any) => loginUser(data));

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    createUserMutation.mutate(data, {
      onSuccess: (userData) => {
        if (userData.isAdmin) {
          navigation.navigation.push('AdminProfile');
        } else {
          navigation.navigation.push('Map', (data = userData));
        }
      },
      onError: (e) => console.log(e),
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>TESTAPP</Text>
      <Box style={styles.box}>
        <HStack style={styles.hstack}>
          <Button title="USER" />
          <Button title="OWNER" />
        </HStack>
        <Flex>
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
            title="LOGIN"
            onPress={handleSubmit(onSubmit)}
          />
        </Flex>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  header: {
    marginTop: 30,
    fontSize: 30,
  },
  box: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    width: '100%',
    height: '100%',
    marginTop: 20,
    backgroundColor: '#631fa4',
  },
  hstack: {
    marginVertical: 20,
    justifyContent: 'space-around',
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
