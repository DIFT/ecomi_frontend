import Badge from './Badge';

export default {
    title: 'Atoms/Badge',
    component: Badge,
};

const Template = (args) => <Badge {...args}>Uncommon</Badge>;

export const Default = Template.bind({});
Default.args = {
    classes: 'bg-gray-500',
};