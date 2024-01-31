/**
 * 修改主题
 * @param value {boolean} 传入 true 或 false
 */
function changeTheme(value) {
    if (value) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
}

export {changeTheme};
