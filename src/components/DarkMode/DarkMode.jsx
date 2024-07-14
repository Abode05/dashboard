import React, { useEffect, useState } from 'react'

const DarkMode = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")
    const elemant = document.documentElement;
    useEffect(() => {
        localStorage.setItem("theme", theme);
        if (theme === 'dark') {
            elemant.classList.add('dark');
            elemant.classList.remove('light');
        } else {
            elemant.classList.add('light');
            elemant.classList.remove('dark');
        }
    }, [theme, elemant])
     const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

  return (
      <div>
          
    </div>
  )
}

export default DarkMode