import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

type SpinnerData = {
  isActive: boolean;
};

const SpinnerContext = createContext<{
  spinner: SpinnerData;
  activate: Dispatch<SetStateAction<void>>;
  deactivate: Dispatch<SetStateAction<void>>;
}>({
  spinner: {
    isActive: false,
  },
  activate: () => null,
  deactivate: () => null,
});

// Custom hook to access the user context
export const useSpinner = () => {
  return useContext(SpinnerContext);
};

export const SpinnerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [spinner, setSpinner] = useState<SpinnerData>({ isActive: false });

  const activate = () => setSpinner({ isActive: true });
  const deactivate = () => setSpinner({ isActive: false });

  return (
    <SpinnerContext.Provider
      value={{
        activate,
        deactivate,
        spinner,
      }}>
      {children}
    </SpinnerContext.Provider>
  );
};
