'use strict';

export default {
    'built-form': {
        schema: {
            kind: 'collectionType',
            collectionName: 'built-forms',
            info: {
                singularName: 'built-form',
                pluralName: 'built-forms',
                displayName: '📋 Forms',
            },
            pluginOptions: {
                'content-manager': {
                    visible: true,
                },
                'content-type-builder': {
                    visible: true,
                },
                i18n: {
                    localized: true,
                },
            },
            options: {
                draftAndPublish: false,
                comment: '',
            },
            attributes: {
                title: {
                    type: 'string',
                    pluginOptions: {
                        i18n: {
                            localized: true,
                        },
                    },
                    required: true,
                    configurable: false,
                },
                data: {
                    type: 'json',
                    pluginOptions: {
                        i18n: {
                            localized: true,
                        },
                    },
                    configurable: false,
                    visible: true,
                },
            },
        },
    },
};
