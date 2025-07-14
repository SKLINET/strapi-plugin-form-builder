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
        const allowedLanguages = ['en', 'cs', 'sk', 'de', 'fr', 'es'];

        if (typeof config.language !== 'string' || !allowedLanguages.includes(config.language)) {
            throw new Error(`language must be one of: ${allowedLanguages.join(', ')}`);
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
