import { FC } from 'react';
import { OptionText, OptionTextElement } from 'react-admin';
export declare const DualListInputItem: FC<{
    choice: any;
    disableValue?: string;
    onMove: (event: MouseEvent, item: any) => void;
    onToggleSelection: (event: MouseEvent, item: any) => void;
    optionValue?: string;
    optionText?: OptionTextElement | OptionText | string;
    selected: boolean;
    translateChoice?: boolean;
}>;
