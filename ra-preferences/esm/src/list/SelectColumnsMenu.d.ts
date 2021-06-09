import { ReactElement, FC } from 'react';
declare const SelectColumnsMenu: FC<SelectColumnsMenuProps>;
export interface SelectColumnsMenuProps {
    preference: string;
    columns: {
        [key: string]: ReactElement;
    };
    className?: string;
}
export default SelectColumnsMenu;
