import { Typography } from '@strapi/design-system';
import { nbsp } from '../../../utils/nbsp';

type TextProps = Record<string, any> & {
    label: string;
    size: 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
    color: 'black' | "gray";
    width?: string;
};

const Text = ({ label, size, color, width = '100%', ...rest }: TextProps) => {
    const getVariant = () => {
        switch (size) {
            case 'xxl':
                return 'alpha';
            case 'xl':
                return 'beta';
            case 'lg':
                return 'delta';
            case 'md':
                return 'epsilon';
            case 'sm':
                return 'omega';
            case 'xs':
                return 'pi';
            default:
                return 'delta';
        }
    };

    const getColor = () => {
        switch (color) {
            case 'black':
                return 'neutral900';
            case 'gray':
                return 'neutral600';
            default:
                return 'neutral900';
        }
    };

    return (
        <Typography
            display="block"
            width={width}
            variant={getVariant()}
            textColor={getColor()}
            fontWeight={size === 'xxl' ? 700 : 600}
            {...rest}
        >
            {nbsp(label)}
        </Typography>
    );
};

export { Text };
