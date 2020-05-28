import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

export interface RowLayoutProps {
    columns: {
        components: ComponentPair[]
    }[];
}

interface RowContainerProps {
    width: string;
}

export interface ComponentPair {
    component: FunctionComponent<BaseInputProps>;
    inputData: any;
}

export interface BaseInputProps
{
    inputData: any;
}

const Container = styled.div`
    width: 100%;
    display: inline-flex;
`

const RowContainer = styled.div<RowContainerProps>`
    width: ${(props: RowContainerProps): string => props.width};
    display: flex;
    flex-direction: column;
`

export const RowLayout: FunctionComponent<RowLayoutProps> = (props: RowLayoutProps) =>{
    const columnWidth = ((100 / props.columns.length) + '%');
    
    return (
        <Container>
            {
                props.columns.map((column) => {
                    return <RowContainer width={columnWidth}>
                        {
                            column.components.map((pair) => {
                                return (
                                    <pair.component inputData={pair.inputData}/>
                                );
                            })
                        }
                    </RowContainer>
                })
            }
            </Container>
    )
        
}

