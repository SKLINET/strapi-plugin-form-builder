import type { Core } from '@strapi/strapi';
import { PLUGIN_ID } from './utils/pluginId';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
    strapi.customFields.register({
        name: 'form-message-view',
        plugin: PLUGIN_ID,
        type: 'json',
    });
};

export default register;
