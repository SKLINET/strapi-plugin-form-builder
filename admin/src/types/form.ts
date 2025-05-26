export interface IBuiltForm {
    id: number;
    documentId: string;
    title: string;
    data: IFormField[] | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export type IFormField = {
    id: string;
    type: 'textinput' | 'textarea' | 'email' | 'phone' | 'checkbox' | 'submit' | 'message';
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
          type: 'checkbox';
          name: string | null;
          label: string | null;
          placeholder: string | null;
          required: boolean;
      }
    | {
          type: 'submit';
          label: string | null;
      }
    | {
          type: 'message';
          label: string | null;
      }
);
