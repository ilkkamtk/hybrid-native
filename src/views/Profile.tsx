import {Button, Card} from '@rneui/themed';

import {useUserContext} from '../hooks/ContextHooks';

const Profile = () => {
  const {handleLogout} = useUserContext();
  return (
    <Card>
      <Button onPress={handleLogout}>Logout</Button>
    </Card>
  );
};

export default Profile;
