import { useState, useEffect } from 'react';
import { unstable_useContentManagerContext as useContentManagerContext } from '@strapi/strapi/admin';
import { Divider } from '@strapi/design-system';
import { Expand } from '@strapi/icons';
import { getLocale } from '../../../utils/getLocale';
import { IBuiltForm } from '../../../types/form';
import { useBuiltForm } from '../../../hooks/useBuiltForm';
import { getSystemResource } from '../../../utils/getSystemResorce';
import { Box } from '../../primitives/Box/Box';
import { Text } from '../../primitives/Text/Text';
import { Button } from '../../primitives/Button/Button';
import { useConfig } from '../../../hooks/useConfig';

const SideBanner = () => {
    const config = useConfig();

    const [form, setForm] = useState<IBuiltForm | null>(null);
    const [loading, setLoading] = useState(false);

    const controls = useBuiltForm();

    const locale = getLocale();

    // Initial form fetch
    useEffect(() => {
        const fetchForm = async () => {
            setLoading(true);

            const documentId = window.location.pathname.split('/').pop()?.split('?')[0];

            const form = await controls.getForm({
                documentId: documentId,
                locale: locale,
            });

            setForm(form);
            setLoading(false);
        };

        fetchForm();
    }, [locale]);

    const context = useContentManagerContext();

    // Show side banner only on built-form content
    if (context?.contentType?.uid !== 'plugin::form-builder.built-form') return <></>;

    // Disable button when entity is not created
    const disabled = !context?.id || !form;

    if (!config) return <></>;

    return (
        <Box marginTop={4}>
            <Box>
                <Divider />
            </Box>
            <Text
                size="sm"
                variant="sigma"
                color="gray"
                label={getSystemResource('side.banner.title', config.language)}
                marginTop={4}
            />
            <Button
                onClick={() =>
                    window.open(
                        `/admin/plugins/form-builder/${context.id}?plugins%5Bi18n%5D%5Blocale%5D=${locale}`,
                        '_self',
                    )
                }
                variant="default"
                size="S"
                startIcon={<Expand />}
                disabled={disabled}
                fullWidth
                loading={loading}
                label={getSystemResource('side.banner.button', config.language)}
                marginTop={3}
            />
        </Box>
    );
};

export default SideBanner;
