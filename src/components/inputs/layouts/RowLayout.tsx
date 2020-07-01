import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

export interface RowLayoutProps {
    rows: {
        components: ComponentPair[]
    }[];
}

interface ItemContainerProps {
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
    display: flex;
    flex-direction: column;
`

const RowContainer = styled.div`
    width: 100%
`

const ItemContainer = styled.div<ItemContainerProps>`
    width: ${(props: ItemContainerProps): string => props.width};
    display: inline-flex;
    padding: 0;
`

export const RowLayout: FunctionComponent<RowLayoutProps> = (props: RowLayoutProps) =>{    
    return (
        <Container>
            {
                props.rows.map((row, index) => {
                    const itemWidth = ((100 / row.components.length) + '%');
                    return <RowContainer key={index}>
                        {
                            row.components.map((pair, rowIndex) => {
                                return (
                                    <ItemContainer key={rowIndex} width={itemWidth}>
                                        <pair.component inputData={pair.inputData}/>
                                    </ItemContainer>
                                );
                            })
                        }
                    </RowContainer>
                })
            }
            </Container>
    );
}

