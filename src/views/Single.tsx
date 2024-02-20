import {Card, Icon, ListItem} from '@rneui/base';
import {MediaItemWithOwner} from '@sharedTypes/DBTypes';
import {ResizeMode, Video} from 'expo-av';
import {ActivityIndicator, StyleSheet, Text} from 'react-native';

const Single = ({route}: any) => {
  console.log('route', route.params);
  const item: MediaItemWithOwner = route.params;
  const [fileType, fileFormat] = item.media_type.split('&#x2F;');

  return (
    <Card>
      <Card.Title style={styles.title}>{item.title}</Card.Title>
      <Card.Divider />
      {fileType === 'image' ? (
        <Card.Image
          source={{uri: item.filename}}
          style={{height: 300}}
          PlaceholderContent={<ActivityIndicator />}
        />
      ) : (
        <Video
          style={{height: 300}}
          source={{
            uri: item.filename,
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
        />
      )}
      <ListItem>
        <Text>{item.description}</Text>
      </ListItem>
      <ListItem>
        <Icon name="today" />
        <Text>{new Date(item.created_at).toLocaleString('fi-FI')}</Text>
      </ListItem>
      <ListItem>
        <Icon name="person" />
        <Text>{item.username}</Text>
      </ListItem>
      <ListItem>
        <Icon name="save" />
        <Text>
          {Math.round(item.filesize / 1024)} kB, {fileFormat}
        </Text>
      </ListItem>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default Single;
