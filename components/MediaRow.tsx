import {MediaItemWithOwner} from '@sharedTypes/DBTypes';
import {Image, View, Text, TouchableOpacity} from 'react-native';

import {useUpdateContext, useUserContext} from '../hooks/ContextHooks';
import {useMedia} from '../hooks/apiHooks';

const MediaRow = ({
  item,
  selectedItem,
  setSelectedItem,
  setModalVisible,
}: {
  item: MediaItemWithOwner;
  selectedItem: MediaItemWithOwner | null;
  setSelectedItem: React.Dispatch<
    React.SetStateAction<MediaItemWithOwner | null>
  >;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {user} = useUserContext();
  const {deleteMedia} = useMedia();
  const {update, setUpdate} = useUpdateContext();

  // replace https with http to avoid network errors in item.thumbnail and item.filename
  item.thumbnail = item.thumbnail.replace('https', 'http');
  item.filename = item.filename.replace('https', 'http');

  const deleteHandler = async () => {
    const cnf = confirm('Are you sure you want to delete this media?');
    if (!cnf) {
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const result = await deleteMedia(item.media_id, token);
      alert(result.message);
      setUpdate(!update);
    } catch (e) {
      console.error('delete failed', (e as Error).message);
    }
  };

  return (
    <View>
      <Image source={{uri: item.thumbnail}} style={{width: 100, height: 100}} />
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>{new Date(item.created_at).toLocaleString('fi-FI')}</Text>
      <Text>{item.filesize}</Text>
      <Text>{item.media_type.replace('&#x2F;', '/')}</Text>
      <Text>{item.username}</Text>

      <View>
        <TouchableOpacity
          onPress={() => {
            setSelectedItem(item);
            setModalVisible(true);
          }}
        >
          <Text>View</Text>
        </TouchableOpacity>
        {user &&
          (user.user_id === item.user_id || user.level_name === 'Admin') && (
            <>
              <TouchableOpacity>
                <Text>Modify</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>Delete</Text>
              </TouchableOpacity>
            </>
          )}
      </View>
    </View>
  );
};

export default MediaRow;
