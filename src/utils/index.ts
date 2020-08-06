export function removeItem<T extends any>(arr: T[], item: T): T[]
{
    return arr.filter((f) => f !== item);
}

export function insert<T extends any>(arr: T[], index: number, ...newItems: T[]): T[]
{
    return [
        ...arr.slice(0, index),
        ...newItems,
        ...arr.slice(index),
    ];
}

// eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
export function NOOP(): void {}
