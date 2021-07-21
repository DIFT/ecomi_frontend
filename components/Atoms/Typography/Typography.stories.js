import Typography from './Typography';

export default {
    title: 'Atoms/Typography',
    component: Typography,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
};

const Template = (args) => <Typography {...args}>Test</Typography>;

export const Primary = Template.bind({});
Primary.args = {
    classes: 'font-size-biggggg',
    label: 'Display',
};