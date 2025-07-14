'use strict';

export default {
    default: ({ env }) => ({
        language: 'en',
        fields: '*',
        allowConditions: false,
        allowFullWidth: false,
        allowUseOnly: false,
    }),
    validator: (config) => {
        if (config.language !== 'cs' && config.language !== 'en') {
            throw new Error('language has to be "en" or "cs"');
        }
        if (config.fields !== '*' && !Array.isArray(config.fields)) {
            throw new Error('fields has to be "*" or array of fields');
        }
        if (typeof config.allowConditions !== 'boolean') {
            throw new Error('allowConditions has to be boolean');
        }
        if (typeof config.allowFullWidth !== 'boolean') {
            throw new Error('allowFullWidth has to be boolean');
        }
        if (typeof config.allowUseOnly !== 'boolean') {
            throw new Error('allowUseOnly has to be boolean');
        }
    },
};
