'use strict';

import builtFormRoutes from './built-form-routes';
import configRoutes from './config-routes';

export default {
    type: 'admin',
    routes: [...builtFormRoutes, ...configRoutes],
};
