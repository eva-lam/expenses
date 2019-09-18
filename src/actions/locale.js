

export const localeSet= lang =>({
    type: 'LOCALE_SET',
    lang
})
export const setLocale = lang=>(dispatch)=>{
    localStorage.lang = lang; 
    dispatch(localeSet(lang));
}