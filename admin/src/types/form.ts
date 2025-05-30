export interface IBuiltForm {
    id: number;
    documentId: string;
    title: string;
    data: IFormField[] | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface ISelectedOption {
    key: string;
    label: string;
}

export interface ICondition {
    id: string;
    fieldId: string;
    operator: IOperator;
    value: string | boolean | ISelectedOption | undefined;
}

export type IOperator = 'equals' | 'not-equals' | 'contains' | 'not-contains' | 'empty' | 'not-empty';

export type IFormField = {
    id: string;
    conditions?: ICondition[];
    type:
        | 'textinput'
        | 'textarea'
        | 'email'
        | 'phone'
        | 'file'
        | 'select'
        | 'checkbox'
        | 'submit'
        | 'title'
        | 'message'
        | 'divider';
} & (
    | {
          type: 'textinput';
          name: string | null;
          label: string | null;
          placeholder: string | null;
          required: boolean;
      }
    | {
          type: 'textarea';
          name: string | null;
          label: string | null;
          placeholder: string | null;
          required: boolean;
      }
    | {
          type: 'email';
          name: string | null;
          label: string | null;
          placeholder: string | null;
          required: boolean;
      }
    | {
          type: 'phone';
          name: string | null;
          label: string | null;
          placeholder: string | null;
          required: boolean;
      }
    | {
          type: 'file';
          name: string | null;
          label: string | null;
          placeholder: string | null;
          required: boolean;
          maxFileCount: number | null;
          allowedFileTypes: string[] | null;
          maxFileSize: number | null;
      }
    | {
          type: 'select';
          name: string | null;
          label: string | null;
          placeholder: string | null;
          required: boolean;
          options: ISelectedOption[];
      }
    | {
          type: 'checkbox';
          name: string | null;
          label: string | null;
          required: boolean;
      }
    | {
          type: 'submit';
          label: string | null;
      }
    | {
          type: 'title';
          label: string | null;
      }
    | {
          type: 'message';
          label: string | null;
      }
    | {
          type: 'divider';
      }
);
