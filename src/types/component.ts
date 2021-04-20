import { FC } from 'react';

export interface ComponentPair<T = any>
{
    id: string;
    component: FC<BaseInputProps>;
    inputData: T;
}

export interface BaseInputProps
{
    inputData: any;
}
