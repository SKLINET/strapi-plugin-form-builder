export const getLocale = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const locale = urlParams.get('plugins[i18n][locale]');

    return locale || 'en';
};
