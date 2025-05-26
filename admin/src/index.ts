import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
import { prefixPluginTranslations } from './utils/prefixPluginTranslations';
import SideBanner from './components/views/SideBanner/SideBanner';

export default {
    register(app: any) {
        app.addMenuLink({
            to: `plugins/${PLUGIN_ID}`,
            icon: PluginIcon,
            intlLabel: {
                id: `${PLUGIN_ID}.side.banner.title`,
                defaultMessage: 'Form builder',
            },
            Component: async () => {
                const { App } = await import('./pages/App');

                return App;
            },
        });

        app.registerPlugin({
            id: PLUGIN_ID,
            initializer: Initializer,
            isReady: false,
            name: PLUGIN_ID,
        });
    },

    bootstrap(app: any) {
        app.getPlugin('content-manager').injectComponent('editView', 'right-links', {
            name: PLUGIN_ID,
            Component: SideBanner,
        });
    },

    async registerTrads(app: any) {
        const { locales } = app;

        const importedTranslations = await Promise.all(
            (locales as string[]).map((locale) => {
                return import(/* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`)
                    .then(({ default: data }) => {
                        return {
                            data: prefixPluginTranslations(data, PLUGIN_ID),
                            locale,
                        };
                    })
                    .catch(() => {
                        return {
                            data: {},
                            locale,
                        };
                    });
            }),
        );

        return importedTranslations;
    },
};
