'use strict';

import { PLUGIN_ID } from '../utils/pluginId';

export default ({ strapi }) => {
    return {
        getConfig() {
            return strapi.config.get('plugin::' + PLUGIN_ID);
        },
    };
};
