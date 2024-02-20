import {MediaItemWithOwner} from '@sharedTypes/DBTypes';
import {ResizeMode, Video} from 'expo-av';
import {StyleSheet, Text, View} from 'react-native';
import AsyncImage from '../components/AsyncImage';

const Single = ({route}: any) => {
  console.log('route', route.params);
  const item: MediaItemWithOwner = route.params.item;
  const [fileType, fileFormat] = item.media_type.split('&#x2F;');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      {fileType === 'image' ? (
        <AsyncImage style={styles.image} source={{uri: item.filename}} />
      ) : (
        <Video
          style={styles.image}
          source={{
            uri: item.filename,
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
        />
      )}
      <Text>
        Uploaded at: {new Date(item.created_at).toLocaleString('fi-FI')} by
        user: {item.username}
      </Text>
      <Text>{item.description}</Text>
      <Text>
        {Math.round(item.filesize / 1024)} kB, {fileFormat}
      </Text>
    </View>
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
