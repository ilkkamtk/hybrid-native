import {Button, Card, Input} from '@rneui/themed';
import {Dispatch, SetStateAction} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Alert} from 'react-native';

import {useUser} from '../hooks/apiHooks';

const RegisterForm = ({
  setToggleRegister,
}: {
  setToggleRegister: Dispatch<SetStateAction<boolean>>;
}) => {
  const {postUser, getUsernameAvailable, getEmailAvailable} = useUser();
  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
    },
    mode: 'onBlur',
  });

  const doRegister = async (inputs: {
    username: string;
    password: string;
    confirmPassword?: string;
    email: string;
  }) => {
    delete inputs.confirmPassword;
    try {
      await postUser(inputs);
      Alert.alert('Registration successful, please log in.');
      setToggleRegister(false);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return (
    <Card>
      <Card.Title>Registration</Card.Title>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          minLength: {value: 3, message: 'min length is 3 characters'},
          validate: async (value) => {
            try {
              const {available} = await getUsernameAvailable(value);
              console.log('username available?', value, available);
              return available ? available : 'Username taken';
            } catch (error) {
              console.log((error as Error).message);
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.username?.message}
            autoCapitalize="none"
          />
        )}
        name="username"
      />
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          minLength: {value: 5, message: 'min length is 5 characters'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            errorMessage={errors.password?.message}
          />
        )}
        name="password"
      />
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          validate: (value) => {
            const {password} = getValues();
            // console.log('getValues password', password);
            return value === password ? true : 'Passwords dont match!';
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Confirm password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            errorMessage={errors.confirmPassword?.message}
          />
        )}
        name="confirmPassword"
      />
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          pattern: {
            // TODO: add better regexp for email
            value: /\S+@\S+\.\S+$/,
            message: 'must be a valid email',
          },
          validate: async (value) => {
            try {
              const {available} = await getEmailAvailable(value);
              console.log('email available?', value, available);
              return available ? available : 'Email taken';
            } catch (error) {
              console.log((error as Error).message);
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.email?.message}
            autoCapitalize="none"
          />
        )}
        name="email"
      />
      <Button title="Register" onPress={handleSubmit(doRegister)} />
    </Card>
  );
};

export default RegisterForm;
