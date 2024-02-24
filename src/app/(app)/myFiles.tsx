import {Card} from '@rneui/base';
import {View, FlatList} from 'react-native';

import MediaListItem from '../../components/MediaListItem';
import useMediaContext from '../../hooks/MediaHook';
import useUserContext from '../../hooks/UserHook';

const MyFiles = () => {
  const {user} = useUserContext();
  const {myMediaArray} = useMediaContext();

  return (
    <View>
      {myMediaArray.length === 0 && (
        <Card>
          <Card.Title>No media uploaded yet.</Card.Title>
        </Card>
      )}
      <FlatList
        data={myMediaArray}
        renderItem={({item}) => <MediaListItem item={item} user={user} />}
      />
    </View>
  );
};

export default MyFiles;
