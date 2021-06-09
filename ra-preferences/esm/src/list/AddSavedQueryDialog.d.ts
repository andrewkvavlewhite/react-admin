import { ReactElement } from 'react';
export interface AddSavedQueryDialogProps {
    open: boolean;
    onClose: () => void;
}
export declare const AddSavedQueryDialog: ({ open, onClose, }: AddSavedQueryDialogProps) => ReactElement;
