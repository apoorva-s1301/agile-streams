import React, {createContext, useContext, useReducer} from 'react';

export const StateContext = createContext();

//Wrapper StateProvider function for user authentication
export const StateProvider = ({ reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
);

//Export StateContext
export const useStateValue = () => useContext(StateContext);