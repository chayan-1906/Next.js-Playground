export const items = Array.from({length: 10000}, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
}));

export type Item = typeof items[number];
