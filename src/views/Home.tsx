import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {View, FlatList} from 'react-native';

import MediaListItem from '../components/MediaListItem';
import useUpdateContext from '../hooks/UpdateHook';
import {useMedia} from '../hooks/apiHooks';

const Home = () => {
  const {mediaArray, loading} = useMedia();
  const {update, setUpdate} = useUpdateContext();
  const navigation = useNavigation();

  const onRefresh = () => {
    setUpdate(!update);
  };

  // this is to refresh the list when we navigate back to this screen (fix for iOS spinner showing after updating media item)
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setUpdate(!update);
    });

    return unsubscribe;
  }, [navigation, update, setUpdate]);

  console.log('rendering Home');

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
