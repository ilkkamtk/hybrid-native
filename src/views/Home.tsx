import {View, FlatList} from 'react-native';

import MediaListItem from '../components/MediaListItem';
import useUpdateContext from '../hooks/UpdateHook';
import {useMedia} from '../hooks/apiHooks';

const Home = () => {
  const {mediaArray, loading} = useMedia();
  const {update, setUpdate} = useUpdateContext();

  const onRefresh = () => {
    setUpdate(!update);
  };

  return (
    <View>
      <FlatList
        data={mediaArray}
        renderItem={({item}) => <MediaListItem item={item} />}
        refreshing={loading}
        onRefresh={onRefresh}
      />
    </View>
  );
};

export default Home;
