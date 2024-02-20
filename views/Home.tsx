import {MediaItemWithOwner} from '@sharedTypes/DBTypes';
import React, {useState} from 'react';
import {FlatList, Text, View} from 'react-native';

import MediaModal from '../components/MediaModal';
import MediaRow from '../components/MediaRow';
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
        renderItem={({item}) => (
          <MediaRow
            item={item}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            setModalVisible={setModalVisible}
          />
        )}
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
