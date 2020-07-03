import React, { FunctionComponent } from 'react';

import styled from 'styled-components';

export interface RowLayoutProps
{
    rows: {
        components: ComponentPair[];
    }[];
}

interface ItemContainerProps
{
    width: string;
}

export interface ComponentPair
{
    component: FunctionComponent<BaseInputProps>;
    inputData: any;
}

interface ItemProps {
    width: string;
    pair: ComponentPair;
}

export interface BaseInputProps
{
    inputData: any;
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const RowContainer = styled.div`
    width: 100%
`;

const ItemContainer = styled.div<ItemContainerProps>`
    width: ${(props: ItemContainerProps): string => props.width};
    display: inline-flex;
    padding: 0;
`;

const Item: FunctionComponent<ItemProps> = (props: ItemProps) => (
    <ItemContainer width={props.width}>
        <props.pair.component inputData={props.pair.inputData}/>
    </ItemContainer>
)

export const RowLayout: FunctionComponent<RowLayoutProps> = (props: RowLayoutProps) =>
    (
        <Container>
            {
                props.rows.map((row, index) =>
                {
                    const itemWidth = (`${100 / row.components.length}%`);

                    return <RowContainer key={index}>
                        {
                            row.components.map((pair, rowIndex) =>
                                (
                                    <Item key={rowIndex} width={itemWidth} pair={pair}/>
                                ))
                        }
                    </RowContainer>;
                })
            }
        </Container>
    );

