import {Dispatch, SetStateAction, createContext, useState} from 'react';

type UpdateContextType = {
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  newItems: boolean;
  setNewItems: Dispatch<SetStateAction<boolean>>;
};

const UpdateContext = createContext<UpdateContextType | null>(null);

const UpdateProvider = ({children}: {children: React.ReactNode}) => {
  const [update, setUpdate] = useState<boolean>(false);
  const [newItems, setNewItems] = useState(false);

  return (
    <UpdateContext.Provider value={{update, setUpdate, newItems, setNewItems}}>
      {children}
    </UpdateContext.Provider>
  );
};

export {UpdateProvider, UpdateContext};
