import '../styles/globals.css'
import { RouterContext } from  'next/dist/next-server/lib/router-context';

export const parameters = {
    backgrounds: {
        default: 'ECOMI',
        values: [
            {
                name: 'ECOMI',
                value: '#353A40'
            },
            {
                name: 'VEVE',
                value: '#CCC',
            },
        ],
    },
};

export const decorators = [
    (Story) => (
        <RouterContext.Provider value={{
            push: () => Promise.resolve(),
            replace: () => Promise.resolve(),
            prefetch: () => Promise.resolve()
        }}>
            <Story />
        </RouterContext.Provider>
    ),
];