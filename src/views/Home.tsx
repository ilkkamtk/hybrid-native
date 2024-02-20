import {MediaItemWithOwner} from '@sharedTypes/DBTypes';
import {useState} from 'react';
import {Text, View, FlatList} from 'react-native';

import MediaListItem from '../components/MediaListItem';
import MediaModal from '../components/MediaModal';
import {useMedia} from '../hooks/apiHooks';

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MediaItemWithOwner | null>(
    null,
  );
  const {mediaArray} = useMedia();

  return (
    <View>
      <Text>My Media</Text>
      <FlatList
        data={mediaArray}
        renderItem={({item}) => <MediaListItem item={item} />}
      />
      <MediaModal
        item={selectedItem}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default Home;
