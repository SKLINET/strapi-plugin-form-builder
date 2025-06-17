import { useState } from 'react';
import { IProduct } from '../../../types/form';
import { Tag } from '../../molecules/Tag/Tag';
import { Flex } from '../Flex/Flex';
import { Text } from '../Text/Text';
import { TextInput } from '../TextInput/TextInput';
import { Button } from '../Button/Button';
import { getSystemResource } from '../../../utils/getSystemResorce';
import { labelToJsonAttribute } from '../../../utils/labelToJsonAttribute';
import { NumberInput } from '../NumberInput/NumberInput';

interface ProductsInputProps extends Record<string, any> {
    name: string;
    label?: string;
    value: IProduct[];
    onChange: (e: IProduct[]) => void;
    disabled?: boolean;
    width?: string;
}

const ProductsInput = ({ name, label, value, onChange, disabled, width = '100%', ...rest }: ProductsInputProps) => {
    const [inputValue, setInputValue] = useState('');
    const [inputPrice, setInputPrice] = useState<number | undefined>(undefined);

    const add = (name: string, price: number) => {
        if (disabled || !name) return;

        setInputValue('');
        setInputPrice(undefined);

        const id = labelToJsonAttribute(name);

        if (value.some((option) => option.id === id)) return;

        onChange([...value, { id: id, name: name, label: name, price: price }]);
    };

    const remove = (e: string) => {
        if (disabled) return;

        onChange(value.filter((option) => option.id !== e));
    };

    return (
        <Flex width={width} {...rest} direction="column" gap={1}>
            {label && <Text color="black" size="xs" label={label} />}
            <Flex bordered rounded="smallest" padding={4} direction="column" gap={6}>
                {value.length > 0 && (
                    <Flex flexWrap="wrap" gap={1}>
                        {value.map((option, i) => (
                            <Tag
                                key={i}
                                label={option.label + ` - ${option.price}`}
                                onRemove={() => remove(option.id)}
                            />
                        ))}
                    </Flex>
                )}
                <Flex gap={2} direction="row" alignItems="flex-end">
                    <TextInput
                        name="text"
                        value={inputValue}
                        onChange={setInputValue}
                        disabled={disabled}
                        label={getSystemResource('product.name')}
                    />
                    <NumberInput
                        name="price"
                        value={inputPrice}
                        onChange={(e) => setInputPrice(Math.max(e || 0, 0))}
                        disabled={disabled}
                        label={getSystemResource('product.price')}
                        width="300px"
                    />
                    <Button
                        label={getSystemResource('add')}
                        onClick={() => add(inputValue, inputPrice || 0)}
                        disabled={disabled || inputValue.length === 0}
                        size="L"
                        variant="default"
                    />
                </Flex>
            </Flex>
        </Flex>
    );
};

export { ProductsInput };
