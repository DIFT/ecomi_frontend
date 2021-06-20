import React from 'react';

import UserGrowthChart from '../components/metrics/charts/UserGrowthChart'

export default {
    title: 'UserGrowthChart', 
    component: UserGrowthChart,
    displayName: 'what',
    argTypes: {
        backgroundColor: { control: 'color' },
    },
}


const Template = (args) => <UserGrowthChart  {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    primary: true,
    label: 'Button',
};