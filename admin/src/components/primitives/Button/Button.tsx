import { Button as StrapiButton } from '@strapi/design-system';
import { nbsp } from '../../../utils/nbsp';

interface ButtonProps extends Record<string, any> {
    label: string;
    onClick?: () => void;
    variant: 'default' | 'secondary' | 'tertiary' | 'success' | 'success-light' | 'danger' | 'danger-light' | 'ghost';
    size: 'S' | 'M' | 'L';
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
}

const Button = ({ label, onClick, variant, size, disabled, loading, fullWidth, startIcon, endIcon, ...rest }: ButtonProps) => (
    <StrapiButton
        variant={variant}
        onClick={onClick}
        size={size}
        disabled={disabled}
        loading={loading}
        fullWidth={fullWidth}
        startIcon={startIcon}
        endIcon={endIcon}
        {...rest}
    >
        {nbsp(label)}
    </StrapiButton>
);

export { Button };
