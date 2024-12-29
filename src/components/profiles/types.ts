export interface FormData {
    name: string;
    email: string;
    phone: string;
    profilePicture?: string;
    [key: string]: any;
}

export interface AdditionalField {
    label: string;
    name: string;
    value: string;
    type?: string;
    disabled?: boolean;
}