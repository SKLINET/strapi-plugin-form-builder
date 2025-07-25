import { IApp } from '../../../../types/app';
import { getSystemResource } from '../../../../utils/getSystemResorce';
import { labelToJsonAttribute } from '../../../../utils/labelToJsonAttribute';
import { NumberInput } from '../../../primitives/NumberInput/NumberInput';
import { SelectMultipleNested } from '../../../primitives/SelectMultipleNested/SelectMultipleNested';
import { Switch } from '../../../primitives/Switch/Switch';
import { TextInput } from '../../../primitives/TextInput/TextInput';

interface FileAttributesProps {
    data: {
        type: 'file';
        name: string | null;
        label: string | null;
        placeholder: string | null;
        required: boolean;
        maxFileCount: number | null;
        allowedFileTypes: string[] | null;
        maxFileSize: number | null;
        useOnly: boolean;
        onFullWidth: boolean;
    };
    app: IApp;
}

const FileAttributes = ({
    data: { name, label, placeholder, required, maxFileCount, allowedFileTypes, maxFileSize, useOnly, onFullWidth },
    app: {
        controls: { onFieldChange },
        loading,
        config,
    },
}: FileAttributesProps) => (
    <>
        <TextInput
            name="name"
            value={name || ''}
            onChange={(e) => onFieldChange('name', e)}
            label={getSystemResource('attributes.name', config.language)}
            placeholder={labelToJsonAttribute(label || '')}
            disabled={loading}
            hint={getSystemResource('attributes.name.hint', config.language)}
        />
        <TextInput
            name="label"
            value={label || ''}
            onChange={(e) => onFieldChange('label', e)}
            label={getSystemResource('attributes.label', config.language)}
            disabled={loading}
        />
        <TextInput
            name="placeholder"
            value={placeholder || ''}
            onChange={(e) => onFieldChange('placeholder', e)}
            label={getSystemResource('attributes.placeholder', config.language)}
            disabled={loading}
        />
        <SelectMultipleNested
            name="allowedFileTypes"
            value={allowedFileTypes || []}
            onChange={(e) => onFieldChange('allowedFileTypes', e)}
            label={getSystemResource('attributes.allowedFileTypes', config.language)}
            disabled={loading}
            options={[
                {
                    label: getSystemResource('images', config.language),
                    children: [
                        { label: 'JPEG', value: 'image/jpeg' },
                        { label: 'PNG', value: 'image/png' },
                        { label: 'GIF', value: 'image/gif' },
                        { label: 'SVG', value: 'image/svg+xml' },
                    ],
                },
                {
                    label: getSystemResource('files', config.language),
                    children: [
                        { label: 'Zip', value: 'application/zip' },
                        { label: 'PDF', value: 'application/pdf' },
                        { label: 'Word', value: 'application/msword' },
                        { label: 'Excel', value: 'application/vnd.ms-excel' },
                        { label: 'PowerPoint', value: 'application/vnd.ms-powerpoint' },
                        { label: 'Text', value: 'text/plain' },
                        { label: 'JSON', value: 'application/json' },
                        { label: 'CSV', value: 'text/csv' },
                    ],
                },
                {
                    label: getSystemResource('audios', config.language),
                    children: [
                        { label: 'MP3', value: 'audio/mpeg' },
                        { label: 'WAV', value: 'audio/wav' },
                    ],
                },
                {
                    label: getSystemResource('videos', config.language),
                    children: [
                        { label: 'MP4', value: 'video/mp4' },
                        { label: 'AVI', value: 'video/x-msvideo' },
                    ],
                },
            ]}
            config={config}
        />
        <NumberInput
            name="maxFileCount"
            value={maxFileCount || undefined}
            onChange={(e) => onFieldChange('maxFileCount', e)}
            label={getSystemResource('attributes.maxFileCount', config.language)}
            disabled={loading}
            width="calc(50% - 8px)"
        />
        <NumberInput
            name="maxFileSize"
            value={maxFileSize || undefined}
            onChange={(e) => onFieldChange('maxFileSize', e)}
            label={getSystemResource('attributes.maxFileSize', config.language)}
            disabled={loading}
            width="calc(50% - 8px)"
        />
        <Switch
            name="required"
            value={required}
            onChange={(e) => onFieldChange('required', e)}
            label={getSystemResource('attributes.required', config.language)}
            disabled={loading}
            width="calc(50% - 8px)"
            config={config}
        />
        {config.allowFullWidth && (
            <Switch
                name="onFullWidth"
                value={onFullWidth || false}
                onChange={(e) => onFieldChange('onFullWidth', e)}
                label={getSystemResource('attributes.onFullWidth', config.language)}
                disabled={loading}
                width="calc(50% - 8px)"
                config={config}
            />
        )}
        {config.allowUseOnly && (
            <Switch
                name="useOnly"
                value={useOnly}
                onChange={(e) => onFieldChange('useOnly', e)}
                label={getSystemResource('attributes.useOnly', config.language)}
                disabled={loading}
                width="calc(50% - 8px)"
                config={config}
            />
        )}
    </>
);

export { FileAttributes };
