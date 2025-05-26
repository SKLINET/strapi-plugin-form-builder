import { useIntl } from 'react-intl';
import { getTranslation } from './getTranslation';

export const getSystemResource = (key: string) => {
    const { formatMessage } = useIntl();

    return formatMessage({
        id: getTranslation(key),
        defaultMessage: `{${key}}`,
    });
};
