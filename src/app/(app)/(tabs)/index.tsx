import {View, FlatList} from 'react-native';

import MediaListItem from '../../../components/MediaListItem';
import useMediaContext from '../../../hooks/MediaHook';
import useUpdateContext from '../../../hooks/UpdateHook';

const Home = () => {
  const {mediaArray, loading} = useMediaContext();
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
