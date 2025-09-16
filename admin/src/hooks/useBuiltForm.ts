import { useFetchClient } from '@strapi/admin/strapi-admin';
import { PLUGIN_ID } from '../pluginId';
import { IBuiltForm } from '../types/form';

export interface UseBuiltFormProps {
    getForm: (filters: Record<string, any>) => Promise<IBuiltForm | null>;
    createForm: (data: Record<string, any>) => Promise<IBuiltForm | null>;
    updateForm: (documentId: string, data: Record<string, any>, locale: string) => Promise<IBuiltForm | null>;
    deleteForm: (documentId: string) => Promise<boolean>;
}

export const useBuiltForm = () => {
    const { get, post, put, del } = useFetchClient();

    const getForm = async (filters: Record<string, any> = {}): Promise<IBuiltForm | null> => {
        try {
            const response = await get(`/${PLUGIN_ID}/built-form`, {
                params: { filters },
            });

            if (!response || !response.data || !response.data.data) throw new Error('Failed to fetch form');

            if (!Array.isArray(response.data.data) || response.data.data.length === 0) throw new Error('No form found');

            return response.data.data[0];
        } catch (error) {
            return null;
        }
    };

    const createForm = async (data: Record<string, any>): Promise<IBuiltForm | null> => {
        try {
            const response = await post(`/${PLUGIN_ID}/built-form`, { data: data });

            if (!response || !response.data || !response.data.data) throw new Error('Failed to create form');

            return response.data.data;
        } catch (error) {
            return null;
        }
    };

    const updateForm = async (
        documentId: string,
        data: Record<string, any>,
        locale: string,
    ): Promise<IBuiltForm | null> => {
        try {
            const response = await put(`/${PLUGIN_ID}/built-form/${documentId}?locale=${locale}`, { data: data });

            if (!response || !response.data || !response.data.data) throw new Error('Failed to update form');

            return response.data.data;
        } catch (error) {
            return null;
        }
    };

    const deleteForm = async (documentId: string): Promise<boolean> => {
        try {
            const response = await del(`/${PLUGIN_ID}/built-form/${documentId}`);

            if (response.status !== 204) throw new Error('Failed to delete form');

            return true;
        } catch (error) {
            return false;
        }
    };

    return {
        getForm,
        createForm,
        updateForm,
        deleteForm,
    };
};
