/* eslint-disable react/prop-types */
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';

export const ProviderWrapperComponent: FC = (props) =>
    (
        <Provider store={store}>
            {props.children}
        </Provider>
    );

