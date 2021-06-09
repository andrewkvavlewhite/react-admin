import { FC } from 'react';
declare const SaveRowButton: FC<Props>;
export interface Props {
    dirty: boolean;
    handleSubmit: () => void;
    invalid: boolean;
    quitEditMode?: () => void;
    saving?: boolean;
    undoable?: boolean;
}
export default SaveRowButton;
