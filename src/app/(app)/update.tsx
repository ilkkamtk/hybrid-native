import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Card, Input, Text} from '@rneui/base';
import {MediaItem} from '@sharedTypes/DBTypes';
import {Video} from 'expo-av';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {Controller, useForm} from 'react-hook-form';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

import useMediaContext from '../../hooks/MediaHook';
import useUpdateContext from '../../hooks/UpdateHook';
import {useMedia} from '../../hooks/apiHooks';

const Update = () => {
  const {myMediaArray} = useMediaContext();
  const {id} = useLocalSearchParams<{id: string}>();
  const item = myMediaArray.find((m) => m.media_id === Number(id));
  if (!item) {
    return <Text>Media not found</Text>;
  }
  const {putMedia, loading: loadingMedia} = useMedia();
  const {update, setUpdate} = useUpdateContext();
  const router = useRouter();

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
        router.back();
        reset(initValues);
      }
    } catch (error) {
      console.log('Update error', (error as Error).message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
    </TouchableWithoutFeedback>
  );
};

export default Update;
