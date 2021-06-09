import { FC, ReactElement } from 'react';
import { CreateProps, ListProps, Record } from 'react-admin';
export declare const dataProvider: import("react-admin").DataProvider;
export declare const sexChoices: {
    id: string;
    name: string;
}[];
export declare const languageChoices: {
    id: string;
    name: string;
}[];
export declare const CustomerTitle: ({ record, }: {
    record?: Record;
}) => ReactElement;
export declare const CustomerForm: FC;
export declare const CustomerCreate: FC<CreateProps>;
export declare const CustomerList: FC<ListProps>;
