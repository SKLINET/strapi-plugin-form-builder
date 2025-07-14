import { IApp } from '../../../types/app';
import { Flex } from '../../primitives/Flex/Flex';
import { TextAttributes } from './TextAttributes/TextAttributes';
import { LabelAttributes } from './LabelAttributes/LabelAttributes';
import { CheckboxAttributes } from './CheckboxAttributes/CheckboxAttributes';
import { FileAttributes } from './FileAttributes/FileAttributes';
import { SelectAttributes } from './SelectAttributes/SelectAttributes';
import { ConditionInput } from '../../molecules/ConditionInput/ConditionInput';
import { SpecialAttributes } from './SpecialAttributes/SpecialAttributes';
import { TitleAttributes } from './TitleAttributes/TitleAttributes';
import { CheckboxGroupAttributes } from './CheckboxGroupAttributes/CheckboxGroupAttributes';
import { ProductsSelectionAttributes } from './ProductsSelectionAttributes/ProductsSelectionAttributes';
import { AmountAttributes } from './AmountAttributes/AmountAttributes';
import { Switch } from '../../primitives/Switch/Switch';
import { getSystemResource } from '../../../utils/getSystemResorce';

interface FieldAttributesProps {
    app: IApp;
}

const FieldAttributes = ({ app }: FieldAttributesProps) => {
    const { fields, activeField, hideAttributes } = app;
    const field = fields.find((e) => e.id === activeField);

    if (!field) return <></>;

    const renderContent = () => {
        switch (field.type) {
            case 'textinput':
            case 'textarea':
            case 'email':
            case 'phone':
                return <TextAttributes data={field} app={app} />;
            case 'checkbox':
                return <CheckboxAttributes data={field} app={app} />;
            case 'file':
                return <FileAttributes data={field} app={app} />;
            case 'select':
                return <SelectAttributes data={field} app={app} />;
            case 'checkboxGroup':
                return <CheckboxGroupAttributes data={field} app={app} />;
            case 'productsSelection':
                return <ProductsSelectionAttributes data={field} app={app} />;
            case 'amount':
                return <AmountAttributes data={field} app={app} />;
            case 'submit':
            case 'message':
                return <LabelAttributes data={field} app={app} />;
            case 'title':
                return <TitleAttributes data={field} app={app} />;
            case 'special':
                return <SpecialAttributes data={field} app={app} />;
            default:
                return <></>;
        }
    };

    return (
        <Flex direction="column" gap={4} width="auto" grow={1} position="sticky" top="168px">
            {field.type !== 'divider' && (
                <Flex
                    direction="row"
                    flexWrap="wrap"
                    gap={4}
                    bordered
                    rounded="large"
                    padding={8}
                    style={
                        hideAttributes
                            ? { opacity: 0.5, pointerEvents: 'none', overflow: 'hidden', maxHeight: '100px' }
                            : {}
                    }
                >
                    {renderContent()}
                </Flex>
            )}
            {app.config.allowConditions && (
                <Flex direction="column" gap={4} bordered rounded="large" padding={8}>
                    <ConditionInput field={field} app={app} />
                    <Switch
                        name="conditionsEval"
                        value={field.conditionsEval === 'or' ? true : false}
                        onChange={(e) => app.controls.onFieldChange('conditionsEval', e ? 'or' : 'and')}
                        label={getSystemResource('attributes.conditionsEval', app.config.language)}
                        disabled={app.loading}
                        width="calc(50% - 8px)"
                        labels="or/and"
                        config={app.config}
                    />
                </Flex>
            )}
        </Flex>
    );
};

export { FieldAttributes };
