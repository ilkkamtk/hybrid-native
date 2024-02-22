import {Card} from '@rneui/base';
import {View, FlatList} from 'react-native';

import MediaListItem from '../components/MediaListItem';
import useUserContext from '../hooks/UserHook';
import {useMedia} from '../hooks/apiHooks';

const MyFiles = () => {
  const {user} = useUserContext();
  const {mediaArray} = useMedia(user);

  return (
    <View>
      {mediaArray.length === 0 && (
        <Card>
          <Card.Title>No media uploaded yet.</Card.Title>
        </Card>
      )}
      <FlatList
        data={mediaArray}
        renderItem={({item}) => <MediaListItem item={item} />}
      />
    </View>
  );
};

export default MyFiles;
