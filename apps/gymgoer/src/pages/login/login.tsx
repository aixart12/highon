import {
  Box,
  Button,
  Flex,
  HStack,
  TextInput,
} from '@react-native-material/core';
import { Text } from 'react-native';

export const LoginScreen = () => {
  return (
    <>
      <Text>TESTAPP</Text>
      <Box>
        <HStack>
          <Button title="USER" />
          <Button title="OWNER" />
        </HStack>
        <Flex>
          <TextInput label="username"></TextInput>
          <TextInput></TextInput>
          <Button title="LOGIN" />
        </Flex>
      </Box>
    </>
  );
};
