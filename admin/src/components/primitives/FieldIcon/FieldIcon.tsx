import { Italic, Paragraph, Mail, Phone, SealCheck, Cursor, List } from '@strapi/icons';
import { IFormField } from '../../../types/form';

interface FieldIconProps {
    type: IFormField['type'];
    size?: 's' | 'm';
}

const FieldIcon = ({ type, size = 'm' }: FieldIconProps) => {
    const props = size === 'm' ? { width: '24px', height: '24px' } : { width: '16px', height: '16px' };

    switch (type) {
        case 'textinput':
            return <Italic {...props} />;
        case 'textarea':
            return <Paragraph {...props} />;
        case 'email':
            return <Mail {...props} />;
        case 'phone':
            return <Phone {...props} />;
        case 'checkbox':
            return <SealCheck {...props} />;
        case 'submit':
            return <Cursor {...props} />;
        case 'message':
            return <List {...props} />;
        default:
            return <Italic {...props} />;
    }
};

export { FieldIcon };
