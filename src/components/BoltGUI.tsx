import { ButtonInputComponent, Label, TextInputComponent, BlankInputComponent } from './inputs';
import React, { Component } from 'react';

import { MainPanel } from './panels/MainPanel';
import { TabData } from './panels/ContentPanel';
import goodboyLogo from '../assets/goodboy-logo.png';
import { render } from 'react-dom';

export interface BoltProps
{
    stage?: any; // this will be the reference object for the game if needed
}

export interface BoltState
{
    expandedX: boolean;
    expandedY: boolean;
    activeTab: number;
}

export class BoltGUI extends Component<BoltProps, BoltState>
{
    private tabs: TabData[] = [];

    constructor(props: BoltProps)
    {
        super(props);
        this.state = {
            expandedX: true,
            expandedY: true,
            activeTab: 0,
        };

        const logInputChange = (value:any) => console.log(value);

        this.tabs.push({
            title: 'Example',
            id: 'E',
            // idColour: 'red',
            elements: [
                {
                    rows: [
                        {
                            components: [
                                { component: Label, inputData: { label: 'Hello world! Welcome to Bolt.gui', textAlign: 'center' }},
                            ]
                        },
                    ]
                },
                {
                    label: 'Button example',
                    rows: [
                        {
                            components: [
                                {
                                    component: ButtonInputComponent, inputData: {
                                    buttonText: 'Clicky',
                                    callOnClick: () => { console.log('ive been clicked')},
                                    inputWidth: '98%'
                                }}
                            ]
                        },
                    ]
                },
                {
                    label: 'Two buttons',
                    rows: [
                        {
                            components: [
                                {
                                    component: ButtonInputComponent, inputData: {
                                    buttonText: 'Option 1',
                                    callOnClick: () => { console.log('ive been clicked')},
                                    inputWidth: '95%'
                                }},
                                {
                                    component: ButtonInputComponent, inputData: {
                                    buttonText: 'Option 2',
                                    callOnClick: () => { console.log('ive been clicked')},
                                    inputWidth: '95%'
                                }}
                            ]
                        },
                    ]
                },
                {
                    label: 'Text input',
                    rows: [
                        {
                            components: [
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, inputWidth: '95%', inputType: 'text' }},
                            ]
                        },
                    ]
                },
                {
                    label: 'Number input',
                    rows: [
                        {
                            components: [
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, inputWidth: '95%', inputType: 'number' }},
                            ]
                        },
                    ]
                },
                {
                    label: 'Password input',
                    rows: [
                        {
                            components: [
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, inputWidth: '95%', inputType: 'password' }},
                            ]
                        },
                    ]
                },
                {
                    label: 'Text area',
                    rows: [
                        {
                            components: [
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, inputWidth: '96%', inputType: 'textarea' }},
                            ]
                        },
                    ]
                },

            ],
        })
        this.tabs.push({
            title: 'Level Data',
            elements: [
                {
                    label: '2D Position',
                    rows: [
                        {
                            components: [
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, label: 'x', inputWidth: '95%' }},
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, label: 'y', inputWidth: '95%' }}
                            ]
                        }
                    ]
                },
                {
                    label: '3D Position',
                    rows: [
                        {
                            components: [
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, label: 'x', inputWidth: '92%' }},
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, label: 'y', inputWidth: '92%' }},
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, label: 'z', inputWidth: '92%' }}
                            ]
                        }
                    ]
                },
                {
                    rows: [
                        {
                            components: [
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, label: 'r', inputWidth: '90%' }},
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, label: 'g', inputWidth: '90%' }},
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, label: 'b', inputWidth: '90%' }},
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, label: 'a', inputWidth: '90%' }}
                            ]
                        }
                    ]
                },
                {
                    label: 'Login',
                    rows: [
                        {
                            components: [
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, label: 'username', inputWidth: '92%' }},
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, label: 'password', inputWidth: '92%', inputType: 'password' }}
                            ]
                        },
                        {
                            components: [
                                {
                                    component: ButtonInputComponent, inputData: {
                                    buttonText: 'Submit',
                                    callOnClick: () => { console.log('callback fired for login process')},
                                    inputWidth: '98%',
                                }}
                            ]
                        }
                    ]
                }
            ],
        })
        this.tabs.push({
            title: 'Vanity Tab',
            tabImg: goodboyLogo,
            imgAlt: 'hellooooo',
            elements: [
                {
                    label: 'Button example',
                    rows: [
                        {
                            components: [
                                {
                                    component: ButtonInputComponent, inputData: {
                                    imgSrc: goodboyLogo,
                                    imgAlt: 'test',
                                    inputBackgroundColour: 'red',
                                    buttonText: 'Clicky',
                                    callOnClick: () => { console.log('ive been clicked')}
                                }}
                            ]
                        },
                    ]
                },
                {
                    label: 'Twin Button',
                    rows: [
                        {
                            components: [
                                {
                                    component: ButtonInputComponent, inputData: {
                                    imgSrc: goodboyLogo,
                                    imgAlt: 'test',
                                    inputBackgroundColour: 'green',
                                    buttonText: 'Clicky',
                                    callOnClick: () => { console.log('ive been clicked')}
                                }},
                                {
                                    component: ButtonInputComponent, inputData: {
                                    imgSrc: goodboyLogo,
                                    imgAlt: 'test',
                                    inputBackgroundColour: 'purple',
                                    disabled: true,
                                    buttonText: 'Clicky',
                                    callOnClick: () => { console.log('ive been clicked')}
                                }}
                            ]
                        },
                    ]
                }
            ],
        })
        this.tabs.push({
            title: 'SoundBoy Data',
            id: 'S',
            elements: [
                {
                    label: 'Multi-row',
                    rows: [
                        {
                            components: [
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, inputWidth: '98%'}}
                            ]
                        },
                        {
                            components: [
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, inputWidth: '98%'}},
                                { component: BlankInputComponent, inputData: {}}
                            ]
                        },
                        {
                            components: [
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, inputWidth: '90%'}},
                                { component: BlankInputComponent, inputData: {}},
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, inputWidth: '90%'}},
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, inputWidth: '90%'}}
                            ]
                        },
                        {
                            components: [
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, inputWidth: '92%'}},
                                {
                                    component: ButtonInputComponent, inputData: {
                                    buttonText: 'button',
                                    callOnClick: () => { console.log('ive been clicked')},
                                    inputHeight: '21px'
                                }},
                            ]
                        },
                        {
                            components: [
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, inputWidth: '95%'}},
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, inputWidth: '95%'}},
                            ]
                        },
                        {
                            components: [
                                { component: TextInputComponent, inputData: { callOnChange: logInputChange, inputWidth: '98%'}}
                            ]
                        },
                    ]
                },
                {
                    label: 'Use Bolt',
                    rows: [
                        {
                            components: [
                                {
                                    component: ButtonInputComponent, inputData: {
                                    inputBackgroundColour: 'green',
                                    buttonText: 'yes',
                                    callOnClick: () => { console.log('ive been clicked')},
                                    inputWidth: '97%',
                                    inputHeight: '36px'
                                }},
                                {
                                    component: ButtonInputComponent, inputData: {
                                    inputBackgroundColour: 'red',
                                    buttonText: 'No',
                                    callOnClick: () => { console.log('ive been clicked')},
                                    inputWidth: '97%',
                                    inputHeight: '36px',
                                }},
                                {
                                    component: ButtonInputComponent, inputData: {
                                    buttonText: 'Maybe?',
                                    callOnClick: () => { console.log('ive been clicked')},
                                    inputWidth: '97%',
                                    inputHeight: '36px'
                                }}                            
                            ]
                        }
                    ]
                },
            ],
        })
    }

    // public componentWillMount()
    // {
    // }

    // public componentWillUnmount()
    // {

    // }

    public render(): JSX.Element
    {
        return (
            <MainPanel
                expandedX={this.state.expandedX}
                expandedY={this.state.expandedY}
                expandYCallBack={this.toggleExpandedY.bind(this)}
                setActiveTabCallBack={this.setActiveTab.bind(this)}
                tabData={this.tabs}
                activeTabIndex={this.state.activeTab}
            />
        );
    }

    public toggleExpandedX(): void
    {
        this.setState({ expandedX: !this.state.expandedX });
    }

    public toggleExpandedY(): void
    {
        this.setState({ expandedY: !this.state.expandedY });
    }

    public setActiveTab(newState: number): void
    {
        this.setState({ activeTab: newState});
    }

    // STATIC MEMBERS --------------------------------------------------

    public static init(): void // (editor: Editor) - this is where we would pass in the game
    {
        let element = document.getElementById('editor-holder');

        if (!element)
        {
            element = document.createElement('div');
            element.id = 'editor-holder';
            document.body.appendChild(element);
        }
        render(<BoltGUI/>, element);
    }
}
