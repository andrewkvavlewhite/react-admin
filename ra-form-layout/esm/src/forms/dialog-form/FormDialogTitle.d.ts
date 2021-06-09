import { MouseEventHandler, ReactElement } from 'react';
import { DialogTitleProps } from '@material-ui/core';
import { Record } from 'react-admin';
interface FormDialogTitleProps extends Omit<DialogTitleProps, 'title'> {
    defaultTitle?: string;
    onClose: MouseEventHandler;
    record?: Partial<Record>;
    title?: ReactElement | string;
}
declare const FormDialogTitle: (props: FormDialogTitleProps) => ReactElement;
export default FormDialogTitle;
