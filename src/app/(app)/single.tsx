import {Card, Icon, ListItem} from '@rneui/base';
import {MediaItemWithOwner} from '@sharedTypes/DBTypes';
import {format} from 'date-fns';
import {fi} from 'date-fns/locale';
import {ResizeMode, Video} from 'expo-av';
import {useLocalSearchParams} from 'expo-router';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import Likes from '../../components/Likes';
import Ratings from '../../components/Ratings';

const Single = () => {
  const {item} = useLocalSearchParams<{item: MediaItemWithOwner}>(); // type assertion because expo sdk not fixed yet?

  const [fileType, fileFormat] = item.media_type.split('&#x2F;');

  return (
    <Card>
      <Card.Title style={styles.title}>{item.title}</Card.Title>
      <Card.Divider />
      {fileType === 'image' ? (
        <Card.Image
          source={{uri: 'http:' + item.filename}}
          style={{height: 300}}
          PlaceholderContent={<ActivityIndicator />}
        />
      ) : (
        <Video
          style={{height: 300}}
          source={{uri: 'http:' + item.filename}}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
        />
      )}
      <ListItem bottomDivider>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text>{item.description}</Text>
          <Likes item={item} />
        </View>
      </ListItem>
      <ListItem>
        <Icon name="today" />
        <Text>
          {format(new Date(item.created_at), 'dd.MM.yyyy, HH:mm', {locale: fi})}
        </Text>
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
      <ListItem topDivider>
        <Ratings item={item} />
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
