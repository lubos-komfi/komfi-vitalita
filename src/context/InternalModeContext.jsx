import React, { createContext, useContext, useState } from 'react';

const InternalModeContext = createContext();

export const InternalModeProvider = ({ children }) => {
    const [showInternal, setShowInternal] = useState(true);
    return (
        <InternalModeContext.Provider value={{ showInternal, setShowInternal }}>
            {children}
        </InternalModeContext.Provider>
    );
};

export const useInternalMode = () => useContext(InternalModeContext);
