import {Card} from '@rneui/base';
import {Button} from '@rneui/themed';
import {Redirect} from 'expo-router';
import {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import useUserContext from '../hooks/UserHook';

const Login = () => {
  const [toggleRegister, setToggleRegister] = useState<boolean>(false);
  const {handleAutoLogin, user} = useUserContext();

  useEffect(() => {
    handleAutoLogin();
  }, []);

  // if user is logged in, redirect to home which is the tabs view
  if (user) {
    return <Redirect href="/(app)/(tabs)" />;
  }

  return (
    <TouchableOpacity
      onPress={() => Keyboard.dismiss()}
      style={{flex: 1}}
      activeOpacity={1}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1, justifyContent: 'center'}}
      >
        {toggleRegister ? (
          <RegisterForm setToggleRegister={setToggleRegister} />
        ) : (
          <LoginForm />
        )}

        <Card>
          <Button
            color="secondary"
            onPress={() => {
              setToggleRegister(!toggleRegister);
            }}
          >
            {toggleRegister ? 'or login' : 'or register'}
          </Button>
        </Card>
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

export default Login;
