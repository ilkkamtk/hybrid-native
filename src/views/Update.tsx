import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {Button, Card, Input} from '@rneui/base';
import {MediaItem, MediaItemWithOwner} from '@sharedTypes/DBTypes';
import {Video} from 'expo-av';
import {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Alert} from 'react-native';

import useUpdateContext from '../hooks/UpdateHook';
import {useFile, useMedia} from '../hooks/apiHooks';

const Update = ({route}: any) => {
  const item: MediaItemWithOwner = route.params;
  const [fileType, fileFormat] = item.media_type.split('&#x2F;');
  const {putMedia, loading: loadingMedia} = useMedia();
  const {update, setUpdate} = useUpdateContext();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const initValues = {title: item.title, description: item.description};
  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: initValues,
  });

  const onSubmit = async (inputs: Pick<MediaItem, 'title' | 'description'>) => {
    console.log('doUpdate', inputs);
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const mediaResponse = await putMedia(item.media_id, inputs, token);
        console.log(mediaResponse);
        setUpdate(!update);
        navigation.navigate('My Files');
        reset(initValues);
      }
    } catch (error) {
      console.log('Update error', (error as Error).message);
    }
  };

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
            errorMessage={errors.description?.message}
            value={value!} // hölmö virhe, laitoin !
            multiline={true}
            numberOfLines={5}
            style={{height: 120, textAlignVertical: 'top'}}
          />
        )}
        name="description"
      />
      {item && item.media_type.includes('video') ? (
        <Video
          source={{uri: 'http:' + item.filename}}
          style={{height: 300}}
          useNativeControls
          isLooping
        />
      ) : (
        <Card.Image
          source={{
            uri: 'http:' + item.filename,
          }}
        />
      )}
      <Card.Divider />
      <Button
        title="Update"
        onPress={handleSubmit(onSubmit)}
        loading={loadingMedia}
      />
    </Card>
  );
};

export default Update;
