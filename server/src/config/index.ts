'use strict';

export default {
    default: ({ env }) => ({
        language: 'en',
        fields: '*',
    }),
    validator: (config) => {
        if (config.language !== 'cs' && config.language !== 'en') {
            throw new Error('language has to be "en" or "cs"');
        }
        if (config.fields !== '*' && !Array.isArray(config.fields)) {
            throw new Error('fields has to be "*" or array of fields');
        }
    },
};
