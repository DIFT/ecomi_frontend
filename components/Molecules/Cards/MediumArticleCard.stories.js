import MediumArticleCard from './MediumArticleCard'

export default {
    title: 'Molecules/Cards/Medium Article Card',
    component: MediumArticleCard,
};

const Template = (args) => <MediumArticleCard {...args} />;

export const Default = Template.bind({});
Default.args = {
    article {
        "title": "Article #1"
    }
};