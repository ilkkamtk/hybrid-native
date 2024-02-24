import {MediaItemWithOwner} from '@sharedTypes/DBTypes';
import {createContext, useEffect, useState} from 'react';
import {useMedia} from '../hooks/apiHooks';
import useUpdateContext from '../hooks/UpdateHook';
import useUserContext from '../hooks/UserHook';

type MediaContextType = {
  mediaArray: MediaItemWithOwner[];
  setMediaArray: React.Dispatch<React.SetStateAction<MediaItemWithOwner[]>>;
  myMediaArray: MediaItemWithOwner[];
  setMyMediaArray: React.Dispatch<React.SetStateAction<MediaItemWithOwner[]>>;
  loading: boolean;
};

const MediaContext = createContext<MediaContextType>({
  mediaArray: [],
  setMediaArray: () => {},
  myMediaArray: [],
  setMyMediaArray: () => {},
  loading: false,
});

const MediaProvider = ({children}: {children: React.ReactNode}) => {
  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);
  const [myMediaArray, setMyMediaArray] = useState<MediaItemWithOwner[]>([]);

  const {getMedia, loading} = useMedia();
  const {update} = useUpdateContext();
  const {user} = useUserContext();

  useEffect(() => {
    const fetchMedia = async () => {
      const media = await getMedia();
      if (media) {
        setMediaArray(media);
      }
    };
    fetchMedia();
  }, [update]);

  useEffect(() => {
    const fetchMyMedia = async () => {
      const media = await getMedia(user);
      if (media) {
        setMyMediaArray(media);
      }
    };
    fetchMyMedia();
  }, [update, user]);

  return (
    <MediaContext.Provider
      value={{
        mediaArray,
        setMediaArray,
        myMediaArray,
        setMyMediaArray,
        loading,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export {MediaProvider, MediaContext};
