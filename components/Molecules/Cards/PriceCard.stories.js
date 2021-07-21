import PriceCard from './PriceCard'

export default {
    title: 'Molecules/Cards/Price Cards',
    component: PriceCard,
};

const Template = (args) => <PriceCard {...args} />;

export const Positive = Template.bind({});
Positive.args = {
    label: 'OMI Price',
    value: 22.349,
    suffix: "$"
};

export const Negative = Template.bind({});
Negative.args = {
    label: 'OMI Price',
    value: -12.344,
    prefix: "%"
};