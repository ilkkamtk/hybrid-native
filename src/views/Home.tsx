import {View, FlatList} from 'react-native';

import MediaListItem from '../components/MediaListItem';
import {useMedia} from '../hooks/apiHooks';

const Home = () => {
  const {mediaArray} = useMedia();

  return (
    <View>
      <FlatList
        data={mediaArray}
        renderItem={({item}) => <MediaListItem item={item} />}
      />
    </View>
  );
};

export default Home;
