import { IConfig } from '../hooks/useConfig';
import { IBuiltForm, IFormField } from './form';

export interface IApp {
    form: Omit<IBuiltForm, 'data'>;
    fields: IFormField[];
    activeField: string | null;
    unsavedChanges: boolean;
    loading: boolean;
    hideAttributes: boolean;
    controls: {
        addField: (type: IFormField['type']) => void;
        removeField: (id: string) => void;
        focusField: (id: string | null) => void;
        moveFieldUp: () => void;
        moveFieldDown: () => void;
        onFieldChange: (key: string, value: any) => void;
        saveForm: () => void;
        toggleAttributes: () => void;
    };
    locale: string;
    config: IConfig;
}
