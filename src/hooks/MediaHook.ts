// ContextHooks.ts
import {useContext} from 'react';

import {MediaContext} from '../contexts/MediaContext';

// Current recommendation is to use custom hook instead of the context directly
// this way we don't have errors when UserContext is not defined or null (thats why we have the if statement)

const useMediaContext = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMediaContext must be used within an UpdateProvider');
  }

  return context;
};

export default useMediaContext;
