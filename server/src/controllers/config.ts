'use strict';

import { PLUGIN_ID } from '../utils/pluginId';

export default {
    getConfig: async (ctx) => {
        const config = await strapi.plugin(PLUGIN_ID).service('config').getConfig();
        ctx.send(config);
    },
};
