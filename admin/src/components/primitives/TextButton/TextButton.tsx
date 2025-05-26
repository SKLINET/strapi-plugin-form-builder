import { TextButton as StrapiTextButton } from '@strapi/design-system';
import { nbsp } from '../../../utils/nbsp';

interface TextButtonProps extends Record<string, any> {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
}

const TextButton = ({ label, onClick, disabled, loading, startIcon, endIcon, ...rest }: TextButtonProps) => (
    <StrapiTextButton
        onClick={onClick}
        disabled={disabled}
        loading={loading}
        startIcon={startIcon}
        endIcon={endIcon}
        {...rest}
    >
        {nbsp(label)}
    </StrapiTextButton>
);

export { TextButton };
