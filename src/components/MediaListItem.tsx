import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {ListItem, Avatar, Icon, Button} from '@rneui/base';
import {MediaItemWithOwner, UserWithNoPassword} from '@sharedTypes/DBTypes';
import {formatDistanceToNow} from 'date-fns';
import {View} from 'react-native';

const MediaListItem = ({
  item,
  user = null,
}: {
  item: MediaItemWithOwner;
  user?: UserWithNoPassword | null;
}) => {
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
      {user ? (
        <View style={{flexDirection: 'column'}}>
          <Button
            onPress={() => {
              navigation.navigate('Update', item);
            }}
          >
            <Icon type="ionicon" name="create" color="white" />
          </Button>
          <Button color="error">
            <Icon type="ionicon" name="trash" color="white" />
          </Button>
        </View>
      ) : (
        <>
          <Icon
            type="ionicon"
            name={item.media_type.includes('image') ? 'image' : 'film'}
          />
          <ListItem.Chevron color={'black'} />
        </>
      )}
    </ListItem>
  );
};

export default MediaListItem;
