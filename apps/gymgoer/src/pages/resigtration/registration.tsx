import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Text,
  TextInput,
} from '@react-native-material/core';

export const Registration = () => {
  return (
    <>
      <Text>TESTAPP</Text>
      <Box>
        <Flex>
          <TextInput label="username"></TextInput>
          <TextInput></TextInput>
          <TextInput></TextInput>
          <TextInput></TextInput>
          <Button title="REGISTER NOW" />
        </Flex>
        <HStack style={{ alignItems: 'center' }}>
          <Divider style={{ width: '40%' }} />
          <Text style={{ margin: 10 }}>or</Text>
          <Divider style={{ width: '40%' }} />
        </HStack>
      </Box>
    </>
  );
};
