import {View, FlatList} from 'react-native';

import MediaListItem from '../components/MediaListItem';
import useUpdateContext from '../hooks/UpdateHook';
import {useMedia} from '../hooks/apiHooks';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const {mediaArray, loading} = useMedia();
  const {update, setUpdate} = useUpdateContext();
  const navigation = useNavigation();

  const onRefresh = () => {
    setUpdate(!update);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setUpdate(!update);
    });

    return unsubscribe;
  }, [navigation, update, setUpdate]);

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
