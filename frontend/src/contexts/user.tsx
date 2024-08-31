import React, { createContext, useState, useContext, ReactNode } from "react";

export interface UserData {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}

const UserContext = createContext<{
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
}>({
  user: null,
  setUser: () => null,
});

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
