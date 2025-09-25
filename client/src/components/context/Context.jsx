import React, {createContext, useState} from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState("light");
    const [token, setToken] = useState('');
    const [user, setUser] = useState('');
    let [country, setCountry] = useState({
          loading : true,
          data : [],
          error : null
       })

    return (
        <ThemeContext.Provider value={{theme, setTheme, country, setCountry, token, setToken, user, setUser}}>
            {children}
        </ThemeContext.Provider>
    )
}