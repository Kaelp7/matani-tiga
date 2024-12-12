import { createContext, useEffect, useState } from 'react'
export const ThemeContext = createContext()

// eslint-disable-next-line react/prop-types
const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        if(theme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme])

    const toggleTheme = () => {
        setTheme(theme === "light" ? 'dark' : 'light')
    }
  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider