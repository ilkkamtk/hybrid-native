import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {MediaItemWithOwner} from '@sharedTypes/DBTypes';
import {Text} from 'react-native';
import {ListItem, Avatar} from '@rneui/base';

const MediaListItem = ({item}: {item: MediaItemWithOwner}) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  // replace https with http to avoid network errors in item.thumbnail and item.filename
  item.thumbnail = item.thumbnail.replace('https', 'http');
  item.filename = item.filename.replace('https', 'http');

  return (
    <ListItem
      onPress={() => {
        navigation.navigate('Single', item);
      }}
    >
      <Avatar size={'large'} source={{uri: item.thumbnail}} />
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
        <ListItem.Subtitle ellipsizeMode="tail" numberOfLines={1}>
          {item.description}
        </ListItem.Subtitle>
        <ListItem.Subtitle>
          Posted by: {item.username} on{' '}
          {new Date(item.created_at).toLocaleDateString('fi-FI')}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron color={'black'} />
    </ListItem>
  );
};

export default MediaListItem;
