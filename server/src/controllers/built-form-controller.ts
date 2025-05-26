'use strict';

import { factories } from '@strapi/strapi';

const { createCoreController } = factories;

export default createCoreController('plugin::form-builder.built-form');
