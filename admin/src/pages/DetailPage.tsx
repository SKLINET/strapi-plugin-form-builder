import { useState, useEffect } from 'react';
import { useBuiltForm } from '../hooks/useBuiltForm';
import { Page } from '@strapi/strapi/admin';
import { Flex } from '../components/primitives/Flex/Flex';
import { IBuiltForm } from '../types/form';
import Builder from '../components/views/Builder/Builder';
import { getLocale } from '../utils/getLocale';

const DetailPage = () => {
    const [form, setForm] = useState<IBuiltForm | null>(null);
    const [loaded, setLoaded] = useState(false);

    const controls = useBuiltForm();

    // Initial form fetch
    useEffect(() => {
        const fetchForm = async () => {
            const documentId = window.location.pathname.split('/').pop()?.split('?')[0];

            const form = await controls.getForm({
                documentId: documentId,
                locale: getLocale(),
            });

            setForm(form);
            setLoaded(true);
        };

        fetchForm();
    }, []);

    if (!loaded) return <Page.Loading />;

    if (!form)
        return (
            <Flex minHeight="100svh" direction="column" alignItems="center" justifyContent="center">
                <Page.Error />
            </Flex>
        );

    return <Builder form={form} controls={controls} updateForm={(e) => setForm(e)} />;
};

export { DetailPage };
