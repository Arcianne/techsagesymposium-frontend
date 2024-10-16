// internal dependencies
import { GENERAL } from "../constants/general.js"

const theme = document.getElementById("theme");
const toggleThemeButton = document.getElementById("toggle-theme-button")

toggleThemeButton.addEventListener("click", themeToggle)

function themeToggle() {
    if(theme.href == GENERAL.LIGHT_THEME_LINK){
        theme.href = GENERAL.DARK_THEME_LINK
        localStorage.setItem('theme', 'dark')
    } else {
        theme.href = GENERAL.LIGHT_THEME_LINK
        localStorage.setItem('theme', 'light')
    }
}

if(localStorage.getItem('theme') === 'dark') {
    theme.href = GENERAL.DARK_THEME_LINK
}
