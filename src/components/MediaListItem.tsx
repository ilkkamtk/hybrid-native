import {MediaItemWithOwner} from '@sharedTypes/DBTypes';
import {Image, Text, TouchableOpacity} from 'react-native';

const MediaListItem = ({
  item,
  setSelectedItem,
  setModalVisible,
}: {
  item: MediaItemWithOwner;
  setSelectedItem: React.Dispatch<
    React.SetStateAction<MediaItemWithOwner | null>
  >;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // replace https with http to avoid network errors in item.thumbnail and item.filename
  item.thumbnail = item.thumbnail.replace('https', 'http');
  item.filename = item.filename.replace('https', 'http');

  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedItem(item);
        setModalVisible(true);
      }}
    >
      <Image style={{width: 200, height: 200}} source={{uri: item.thumbnail}} />
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>{new Date(item.created_at).toLocaleString('fi-FI')}</Text>
      <Text>
        {item.filesize} {item.media_type.replace('&#x2F;', '/')}
      </Text>
      <Text>Uploaded by: {item.username}</Text>
    </TouchableOpacity>
  );
};

export default MediaListItem;
