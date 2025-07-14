import { useFetchClient } from '@strapi/strapi/admin';
import { useEffect, useState } from 'react';
import { PLUGIN_ID } from '../pluginId';
import { IFormField } from '../types/form';

export interface IConfig {
    language: 'cs' | 'en';
    fields: '*' | IFormField['type'][];
    allowConditions: boolean;
    allowFullWidth: boolean;
    allowUseOnly: boolean;
}

export const useConfig = () => {
    const [config, setConfig] = useState<IConfig | null>(null);

    const { get } = useFetchClient();

    useEffect(() => {
        const getPluginConfig = async () => {
            const res = await get(`/${PLUGIN_ID}/config`);

            setConfig(res.data);
        };
        getPluginConfig();
    }, []);

    return config;
};
