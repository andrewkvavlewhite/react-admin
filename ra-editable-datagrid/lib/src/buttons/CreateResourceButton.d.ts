import { FC, ComponentProps } from 'react';
import { Button } from '@material-ui/core';
declare type Props = ComponentProps<typeof Button> & {
    resource: string;
};
declare const CreateResourceButton: FC<Props>;
export default CreateResourceButton;
