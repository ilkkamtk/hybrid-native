import AsyncStorage from '@react-native-async-storage/async-storage';
import {ListItem, Avatar, Icon, Button} from '@rneui/base';
import {MediaItemWithOwner, UserWithNoPassword} from '@sharedTypes/DBTypes';
import {formatDistanceToNow} from 'date-fns';
import {useRouter} from 'expo-router';
import {Alert, View} from 'react-native';

import useUpdateContext from '../hooks/UpdateHook';
import {useMedia} from '../hooks/apiHooks';

const MediaListItem = ({
  item,
  user = null,
}: {
  item: MediaItemWithOwner;
  user?: UserWithNoPassword | null;
}) => {
  const {deleteMedia} = useMedia();
  const {update, setUpdate} = useUpdateContext();
  const router = useRouter();

  // separate function for confirm dialog
  const confirmDelete = () =>
    new Promise((resolve) => {
      Alert.alert(
        'Delete',
        'Are you sure you want to delete this media?',
        [
          {
            text: 'Cancel',
            onPress: () => resolve(false),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => resolve(true),
          },
        ],
        {cancelable: false},
      );
    });

  const deleteHandler = async () => {
    const cnf = await confirmDelete();

    console.log(cnf);

    if (!cnf) {
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        return;
      }
      const result = await deleteMedia(item.media_id, token);
      Alert.alert(result.message);
      setUpdate(!update);
    } catch (e) {
      console.error('delete failed', (e as Error).message);
    }
  };

  return (
    <ListItem
      onPress={() => {
        router.push({pathname: '/single', params: item});
      }}
    >
      <Avatar size={'large'} source={{uri: 'http:' + item.thumbnail}} />
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
        <ListItem.Subtitle ellipsizeMode="tail" numberOfLines={1}>
          {item.description}
        </ListItem.Subtitle>
        <ListItem.Subtitle>Posted by: {item.username}</ListItem.Subtitle>
        <ListItem.Subtitle>
          {formatDistanceToNow(new Date(item.created_at), {addSuffix: true})}
        </ListItem.Subtitle>
      </ListItem.Content>
      {user ? (
        <View style={{flexDirection: 'column'}}>
          <Button
            onPress={() => {
              // navigation.navigate('Update', item);
            }}
          >
            <Icon type="ionicon" name="create" color="white" />
          </Button>
          <Button color="error" onPress={deleteHandler}>
            <Icon type="ionicon" name="trash" color="white" />
          </Button>
        </View>
      ) : (
        <>
          <Icon
            type="ionicon"
            name={item.media_type.includes('image') ? 'image' : 'film'}
          />
          <ListItem.Chevron color={'black'} />
        </>
      )}
    </ListItem>
  );
};

export default MediaListItem;
