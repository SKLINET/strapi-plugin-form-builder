import { IconButton as StrapiIconButton } from '@strapi/design-system';

interface IconButtonProps extends Record<string, any> {
    icon: React.ReactNode;
    onClick?: () => void;
    variant: 'default' | 'secondary' | 'tertiary' | 'success' | 'success-light' | 'danger' | 'danger-light' | 'ghost';
    size: 'S' | 'M' | 'L';
    disabled?: boolean;
}

const IconButton = ({ icon, onClick, variant, size, disabled, ...rest }: IconButtonProps) => (
    <StrapiIconButton variant={variant} onClick={onClick} size={size} disabled={disabled} {...rest}>
        {icon}
    </StrapiIconButton>
);

export { IconButton };
