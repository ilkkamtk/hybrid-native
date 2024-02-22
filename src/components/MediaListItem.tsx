import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {ListItem, Avatar, Icon} from '@rneui/base';
import {MediaItemWithOwner} from '@sharedTypes/DBTypes';
import {formatDistanceToNow} from 'date-fns';

const MediaListItem = ({item}: {item: MediaItemWithOwner}) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  return (
    <ListItem
      onPress={() => {
        navigation.navigate('Single', item);
      }}
    >
      <Avatar size={'large'} source={{uri: 'http:' + item.thumbnail}} />
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
        <ListItem.Subtitle ellipsizeMode="tail" numberOfLines={1}>
          {item.description}
        </ListItem.Subtitle>
        <ListItem.Subtitle>Posted by: {item.username}</ListItem.Subtitle>
        <ListItem.Subtitle>
          {formatDistanceToNow(new Date(item.created_at), {addSuffix: true})}
        </ListItem.Subtitle>
      </ListItem.Content>
      <Icon
        type="ionicon"
        name={item.media_type.includes('image') ? 'image' : 'film'}
      />
      <ListItem.Chevron color={'black'} />
    </ListItem>
  );
};

export default MediaListItem;
