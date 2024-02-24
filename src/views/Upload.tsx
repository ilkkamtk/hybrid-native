import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {Button, Card, Input} from '@rneui/base';
import {Video} from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Alert} from 'react-native';

import useUpdateContext from '../hooks/UpdateHook';
import {useFile, useMedia} from '../hooks/apiHooks';

const Upload = () => {
  const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(
    null,
  );
  const {postExpoFile, loading} = useFile();
  const {postMedia, loading: loadingMedia} = useMedia();
  const {update, setUpdate} = useUpdateContext();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const initValues = {title: '', description: ''};
  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: initValues,
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.6,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result);
    }
  };

  const onSubmit = async (inputs: {title: string; description: string}) => {
    console.log('doUpload', inputs);
    if (!image) {
      Alert.alert('No image selected');
      return;
    }
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const fileResponse = await postExpoFile(image.assets![0].uri, token);
        console.log(fileResponse);
        const mediaResponse = await postMedia(fileResponse, inputs, token);
        console.log(mediaResponse);
        setUpdate(!update);
        navigation.navigate('Home');

        resetForm();
      }
    } catch (error) {
      console.log('Upload error', (error as Error).message);
    }
  };

  const resetForm = () => {
    setImage(null);
    reset(initValues);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      resetForm();
    });

    return unsubscribe;
  }, []);

  return (
    <Card>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.title?.message}
          />
        )}
        name="title"
      />

      <Controller
        control={control}
        rules={{
          minLength: 5,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.description?.message}
            multiline={true}
            numberOfLines={5}
            style={{height: 120, textAlignVertical: 'top'}}
          />
        )}
        name="description"
      />
      {image && image.assets![0].mimeType?.includes('video') ? (
        <Video
          source={{uri: image.assets![0].uri}}
          style={{height: 300}}
          useNativeControls
          isLooping
        />
      ) : (
        <Card.Image
          onPress={pickImage}
          source={{
            uri: image
              ? image.assets![0].uri
              : 'https://via.placeholder.com/150',
          }}
        />
      )}
      <Card.Divider />
      <Button
        title="Upload"
        onPress={handleSubmit(onSubmit)}
        loading={loading || loadingMedia}
      />
      <Card.Divider />
      <Button color="secondary" title="Reset" onPress={resetForm} />
    </Card>
  );
};

export default Upload;
