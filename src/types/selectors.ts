export type SelectorReturn<ActionType, T> = {
    type: ActionType;
    payload: T;
};
