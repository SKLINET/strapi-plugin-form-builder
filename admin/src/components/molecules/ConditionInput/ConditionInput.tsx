import { useState } from 'react';
import { Flex } from '../../primitives/Flex/Flex';
import { Text } from '../../primitives/Text/Text';
import { getSystemResource } from '../../../utils/getSystemResorce';
import { ICondition, IFormField, IOperator, ISelectedOption } from '../../../types/form';
import { IApp } from '../../../types/app';
import { Tag } from '../Tag/Tag';
import { Button } from '../../primitives/Button/Button';
import { v4 as uuidv4 } from 'uuid';
import { SelectButton } from '../SelectButton/SelectButton';
import { FieldIcon } from '../../primitives/FieldIcon/FieldIcon';
import { trimString } from '../../../utils/getShortString';
import { Switch } from '../../primitives/Switch/Switch';
import { TextInput } from '../../primitives/TextInput/TextInput';

interface ConditionInputProps extends Record<string, any> {
    field: IFormField;
    width?: string;
    app: IApp;
}

const ConditionInput = ({
    field,
    width = '100%',
    app: {
        fields,
        controls: { onFieldChange },
        loading,
    },
    ...rest
}: ConditionInputProps) => {
    const conditions = field.conditions || [];

    const [selectedField, setSelectedField] = useState<IFormField | null>(null);
    const [selectedOperator, setSelectedOperator] = useState<IOperator | null>(null);

    const [selectedString, setSelectedString] = useState<string>('');
    const [selectedBool, setSelectedBool] = useState<boolean>(true);
    const [selectedOption, setSelectedOption] = useState<ISelectedOption | null>(null);

    const add = (e: ICondition) => {
        if (loading) return;

        setSelectedField(null);
        setSelectedOperator(null);
        setSelectedString('');
        setSelectedBool(true);
        setSelectedOption(null);

        onFieldChange('conditions', [...conditions, e]);
    };

    const remove = (id: string) => {
        if (loading) return;

        onFieldChange(
            'conditions',
            conditions.filter((e) => e.id !== id),
        );
    };

    const getButtonLabel = (field: IFormField | null, maxLength: number | undefined = undefined): string => {
        if (!field) return getSystemResource('select.field');

        switch (field.type) {
            case 'textinput':
            case 'email':
            case 'phone':
            case 'checkbox':
            case 'select':
            case 'checkboxGroup':
                return trimString(field.label || getSystemResource(`field.item.${field.type}`), maxLength);
            default:
                return getSystemResource('select.field');
        }
    };

    const renderOperatorButton = (operator: IOperator) => {
        const isSelected = selectedOperator === operator;
        return (
            <Button
                key={operator}
                label={getSystemResource(`operator.${operator}`)}
                variant={isSelected ? 'default' : 'tertiary'}
                size="M"
                fullWidth
                disabled={loading}
                onClick={() => {
                    setSelectedOperator(isSelected ? null : operator);

                    setSelectedString('');
                    setSelectedBool(true);
                    setSelectedOption(null);
                }}
            />
        );
    };

    const renderOperators = () => {
        if (!selectedField) return <></>;

        switch (selectedField.type) {
            case 'textinput':
            case 'email':
            case 'phone':
                return (
                    <>
                        {renderOperatorButton('equals')}
                        {renderOperatorButton('not-equals')}
                        {renderOperatorButton('contains')}
                        {renderOperatorButton('not-contains')}
                        {renderOperatorButton('empty')}
                        {renderOperatorButton('not-empty')}
                    </>
                );
            case 'checkbox':
                return <>{renderOperatorButton('equals')}</>;
            case 'checkboxGroup':
                return <>{renderOperatorButton('has-checked')}</>;
            case 'select':
                return (
                    <>
                        {renderOperatorButton('equals')}
                        {renderOperatorButton('not-equals')}
                        {renderOperatorButton('empty')}
                        {renderOperatorButton('not-empty')}
                    </>
                );
            default:
                return <></>;
        }
    };

    const renderOperatorInput = () => {
        if (!selectedField) return <></>;

        return (
            <SelectButton
                buttonLabel={
                    selectedOperator
                        ? getSystemResource(`operator.${selectedOperator}`)
                        : getSystemResource('select.operator')
                }
                buttonVariant={selectedOperator ? 'success-light' : 'tertiary'}
                disabled={loading}
                width="100%"
            >
                <Flex padding={4} gap={2} direction="column">
                    {renderOperators()}
                </Flex>
            </SelectButton>
        );
    };

    const renderValueInput = () => {
        if (!selectedField || !selectedOperator) return <></>;

        switch (selectedField.type) {
            case 'textinput':
            case 'email':
            case 'phone': {
                if (
                    selectedOperator === 'equals' ||
                    selectedOperator === 'not-equals' ||
                    selectedOperator === 'contains' ||
                    selectedOperator === 'not-contains'
                ) {
                    return (
                        <TextInput
                            name="textValue"
                            value={selectedString}
                            onChange={(e) => setSelectedString(e)}
                            disabled={loading}
                        />
                    );
                }
                break;
            }
            case 'checkbox': {
                return (
                    <Switch
                        value={selectedBool}
                        onChange={(e) => setSelectedBool(e)}
                        disabled={loading}
                        labels="checked/unchecked"
                    />
                );
            }
            case 'checkboxGroup': {
                if (selectedOperator === 'has-checked') {
                    return (
                        <SelectButton
                            buttonLabel={
                                selectedOption ? selectedOption.label : getSystemResource('select.placeholder')
                            }
                            buttonVariant={selectedOption ? 'success-light' : 'tertiary'}
                            disabled={loading}
                            width="100%"
                        >
                            <Flex padding={4} gap={2} direction="column">
                                {selectedField.options.map((option) => (
                                    <Button
                                        key={option.key}
                                        label={option.label}
                                        variant={
                                            selectedOption && selectedOption.key === option.key ? 'default' : 'tertiary'
                                        }
                                        size="M"
                                        fullWidth
                                        disabled={loading}
                                        onClick={() =>
                                            setSelectedOption(
                                                selectedOption && selectedOption.key === option.key ? null : option,
                                            )
                                        }
                                    />
                                ))}
                            </Flex>
                        </SelectButton>
                    );
                }
                break;
            }
            case 'select': {
                if (selectedOperator === 'equals' || selectedOperator === 'not-equals') {
                    return (
                        <SelectButton
                            buttonLabel={
                                selectedOption ? selectedOption.label : getSystemResource('select.placeholder')
                            }
                            buttonVariant={selectedOption ? 'success-light' : 'tertiary'}
                            disabled={loading}
                            width="100%"
                        >
                            <Flex padding={4} gap={2} direction="column">
                                {selectedField.options.map((option) => (
                                    <Button
                                        key={option.key}
                                        label={option.label}
                                        variant={
                                            selectedOption && selectedOption.key === option.key ? 'default' : 'tertiary'
                                        }
                                        size="M"
                                        fullWidth
                                        disabled={loading}
                                        onClick={() =>
                                            setSelectedOption(
                                                selectedOption && selectedOption.key === option.key ? null : option,
                                            )
                                        }
                                    />
                                ))}
                            </Flex>
                        </SelectButton>
                    );
                }
                break;
            }
        }

        return <></>;
    };

    const renderSubmitButton = () => {
        if (!selectedField || !selectedOperator) return <></>;

        let isDisabled = false;
        let value: ICondition['value'] = undefined;

        switch (selectedField.type) {
            case 'textinput':
            case 'email':
            case 'phone': {
                if (
                    selectedOperator === 'equals' ||
                    selectedOperator === 'not-equals' ||
                    selectedOperator === 'contains' ||
                    selectedOperator === 'not-contains'
                ) {
                    if (!selectedString) {
                        isDisabled = true;
                    }
                }
                value = selectedString || undefined;
                break;
            }
            case 'checkbox': {
                value = selectedBool || false;
                break;
            }
            case 'checkboxGroup': {
                if (selectedOperator === 'has-checked') {
                    if (!selectedOption) {
                        isDisabled = true;
                    }
                }
                value = selectedOption || undefined;
                break;
            }
            case 'select': {
                if (selectedOperator === 'equals' || selectedOperator === 'not-equals') {
                    if (!selectedOption) {
                        isDisabled = true;
                    }
                }
                value = selectedOption || undefined;
                break;
            }
        }

        return (
            <Button
                label={getSystemResource('add')}
                onClick={() =>
                    add({ id: uuidv4(), fieldId: selectedField.id, operator: selectedOperator, value: value })
                }
                fullWidth
                size="M"
                variant="default"
                disabled={isDisabled}
            />
        );
    };

    return (
        <Flex width={width} {...rest} direction="column" gap={1}>
            <Text color="black" size="xs" label={getSystemResource('attributes.conditions')} />
            <Flex bordered rounded="smallest" padding={4} direction="column" gap={6}>
                {conditions.length > 0 && (
                    <Flex flexWrap="wrap" gap={1}>
                        {conditions.map((condition) => {
                            const getLabel = () => {
                                const field = fields.find((e) => e.id === condition.fieldId) as any;
                                if (!field) return getSystemResource(`deleted.field`);

                                const operatorLabel = getSystemResource(`operator.${condition.operator}`);
                                let valueLabel = '';

                                switch (field.type) {
                                    case 'textinput':
                                    case 'email':
                                    case 'phone':
                                        valueLabel = (condition.value as string) || '';
                                        break;
                                    case 'checkbox':
                                        valueLabel = getSystemResource(
                                            (condition.value as boolean) ? 'checked' : 'unchecked',
                                        ).toLowerCase();
                                        break;
                                    case 'checkboxGroup':
                                    case 'select':
                                        valueLabel = (condition.value as ISelectedOption).label || '';
                                        break;
                                }

                                return `${getButtonLabel(field, 20)} ${operatorLabel} ${trimString(valueLabel, 20)}`;
                            };

                            return <Tag key={condition.id} label={getLabel()} onRemove={() => remove(condition.id)} />;
                        })}
                    </Flex>
                )}
                <Flex gap={3} direction="column">
                    <SelectButton
                        buttonLabel={getButtonLabel(selectedField)}
                        buttonVariant={selectedField ? 'success-light' : 'tertiary'}
                        startIcon={selectedField ? <FieldIcon type={selectedField.type} size="s" /> : undefined}
                        disabled={loading}
                        width="100%"
                    >
                        <Flex padding={4} gap={2} direction="column" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {fields.map((e) => {
                                if (e.id === field.id) return;

                                const isSelected = !!(selectedField && selectedField.id === e.id);

                                switch (e.type) {
                                    case 'textinput':
                                    case 'email':
                                    case 'phone':
                                    case 'checkbox':
                                    case 'select':
                                    case 'checkboxGroup':
                                        return (
                                            <Button
                                                key={e.id}
                                                label={getButtonLabel(e)}
                                                variant={isSelected ? 'default' : 'tertiary'}
                                                size="M"
                                                fullWidth
                                                disabled={loading}
                                                onClick={() => {
                                                    setSelectedField(isSelected ? null : e);
                                                    setSelectedOperator(null);
                                                }}
                                                startIcon={<FieldIcon type={e.type} size="s" />}
                                                shrink={0}
                                            />
                                        );
                                    default:
                                        return null;
                                }
                            })}
                        </Flex>
                    </SelectButton>
                    {renderOperatorInput()}
                    {renderValueInput()}
                    {renderSubmitButton()}
                </Flex>
            </Flex>
        </Flex>
    );
};

export { ConditionInput };
