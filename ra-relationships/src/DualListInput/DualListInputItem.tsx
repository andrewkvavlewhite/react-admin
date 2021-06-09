import * as React from 'react';
import { FC } from 'react';
import { useChoices, OptionText, OptionTextElement } from 'react-admin';
import { ListItem, ListItemText } from '@material-ui/core';
import get from 'lodash/get';

export const DualListInputItem: FC<{
    choice: any;
    disableValue?: string;
    onMove: (event: MouseEvent, item: any) => void;
    onToggleSelection: (event: MouseEvent, item: any) => void;
    optionValue?: string;
    optionText?: OptionTextElement | OptionText | string;
    selected: boolean;
    translateChoice?: boolean;
}> = ({
    choice,
    disableValue,
    onMove,
    onToggleSelection,
    optionText,
    optionValue,
    selected,
    translateChoice,
}) => {
    const { getChoiceText, getChoiceValue } = useChoices({
        optionText,
        optionValue,
        translateChoice,
    });

    const handleToggleItemSelection = (event): void => {
        onToggleSelection(event, choice);
    };

    const handleMoveItem = (event): void => {
        onMove(event, choice);
    };

    const text = getChoiceText(choice);

    return (
        <ListItem
            button
            component="li"
            onClick={handleToggleItemSelection}
            onDoubleClick={handleMoveItem}
            key={getChoiceValue(choice)}
            aria-selected={selected}
            selected={selected}
            disabled={get(choice, disableValue)}
            role="option"
        >
            {typeof text === 'string' ? (
                <ListItemText>{text}</ListItemText>
            ) : (
                text
            )}
        </ListItem>
    );
};
