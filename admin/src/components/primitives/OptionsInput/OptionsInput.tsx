import { useState } from 'react';
import { ISelectedOption } from '../../../types/form';
import { Tag } from '../../molecules/Tag/Tag';
import { Flex } from '../Flex/Flex';
import { Text } from '../Text/Text';
import { TextInput } from '../TextInput/TextInput';
import { Button } from '../Button/Button';
import { getSystemResource } from '../../../utils/getSystemResorce';
import { labelToJsonAttribute } from '../../../utils/labelToJsonAttribute';

interface OptionsInputProps extends Record<string, any> {
    name: string;
    label?: string;
    value: ISelectedOption[];
    onChange: (e: ISelectedOption[]) => void;
    disabled?: boolean;
    width?: string;
}

const OptionsInput = ({ name, label, value, onChange, disabled, width = '100%', ...rest }: OptionsInputProps) => {
    const [inputValue, setInputValue] = useState('');

    const add = (e: string) => {
        if (disabled || !e) return;

        setInputValue('');

        const key = labelToJsonAttribute(e);

        if (value.some((option) => option.key === key)) return;

        onChange([...value, { key, label: e }]);
    };

    const remove = (e: string) => {
        if (disabled) return;

        onChange(value.filter((option) => option.key !== e));
    };

    return (
        <Flex width={width} {...rest} direction="column" gap={1}>
            {label && <Text color="black" size="xs" label={label} />}
            <Flex bordered rounded="smallest" padding={4} direction="column" gap={6}>
                {value.length > 0 && (
                    <Flex flexWrap="wrap" gap={1}>
                        {value.map((option, i) => (
                            <Tag key={i} label={option.label} onRemove={() => remove(option.key)} />
                        ))}
                    </Flex>
                )}
                <Flex gap={2} direction="row">
                    <TextInput
                        name="text"
                        value={inputValue}
                        onChange={setInputValue}
                        disabled={disabled}
                        placeholder={getSystemResource('option.title')}
                    />
                    <Button
                        label={getSystemResource('add')}
                        onClick={() => add(inputValue)}
                        disabled={disabled || inputValue.length === 0}
                        size="L"
                        variant="default"
                    />
                </Flex>
            </Flex>
        </Flex>
    );
};

export { OptionsInput };
