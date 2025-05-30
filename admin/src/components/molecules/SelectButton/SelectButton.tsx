import { ReactNode } from 'react';
import { Popover } from '@strapi/design-system';
import { Button } from '../../primitives/Button/Button';
import { Flex } from '../../primitives/Flex/Flex';
import { Text } from '../../primitives/Text/Text';

interface SelectButtonProps extends Record<string, any> {
    label?: string;
    buttonLabel: string;
    buttonVariant?: 'success-light' | 'tertiary';
    disabled?: boolean;
    width?: string;
    children: ReactNode;
    startIcon?: ReactNode;
}

const SelectButton = ({
    label,
    buttonLabel,
    buttonVariant = 'tertiary',
    children,
    disabled,
    width = '100%',
    startIcon,
    ...rest
}: SelectButtonProps) => (
    <Flex width={width} {...rest} direction="column" gap={1}>
        {label && <Text color="black" size="xs" label={label} />}
        <Popover.Root>
            <Popover.Trigger>
                <button style={{ width: '100%' }} disabled={disabled}>
                    <Button
                        label={buttonLabel}
                        variant={buttonVariant}
                        size="M"
                        fullWidth
                        startIcon={startIcon}
                        disabled={disabled}
                    />
                </button>
            </Popover.Trigger>
            <Popover.Content>{children}</Popover.Content>
        </Popover.Root>
    </Flex>
);

export { SelectButton };
