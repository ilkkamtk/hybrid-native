import {Button} from '@rneui/themed';
import {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {useUserContext} from '../hooks/ContextHooks';

const Login = () => {
  const [toggleRegister, setToggleRegister] = useState<boolean>(false);
  const {handleAutoLogin} = useUserContext();

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => Keyboard.dismiss()}
      style={{flex: 1}}
      activeOpacity={1}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {toggleRegister ? (
          <RegisterForm setToggleRegister={setToggleRegister} />
        ) : (
          <LoginForm />
        )}
        <Button
          onPress={() => {
            setToggleRegister(!toggleRegister);
          }}
        >
          {toggleRegister ? 'or login' : 'or register'}
        </Button>
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

export default Login;
