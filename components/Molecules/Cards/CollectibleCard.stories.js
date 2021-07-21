import CollectibleCard from './CollectibleCard'
import { storiesOf } from '@storybook/react'
import { WithFigma } from 'storybook-addon-figma'


export default {
    title: 'Molecules/Cards/Collectible Cards',
    component: CollectibleCard,
};

const Template = (args) => <CollectibleCard {...args} />;

const collectible = {
    "name":"Test Collectible #1",
    "storePrice": 39.99,
    "rarity": "COMMON",
    "image": {
        "url": "https://d11unjture0ske.cloudfront.net/collectible_type_image.2574a367-7ea1-4f57-be52-f226c2ed6e70.e1a956ec-023b-48c9-9bda-1ec01e6fca44.full.jpeg",
        "direction": "PORTRAIT"
    },
    "slug": "89-batman",
    "editionType": "FA"
}

export const Common = Template.bind({});
Common.args = {
    collectible
};

export const Uncommon = Template.bind({});
Uncommon.args = {
    collectible: {
        ...collectible,
        "rarity": "UNCOMMON"
    }
};

export const Rare = Template.bind({});
Rare.args = {
    collectible: {
        ...collectible,
        "rarity": "RARE"
    }
};

export const Ultra_Rare = Template.bind({});
Ultra_Rare.args = {
    collectible: {
        ...collectible,
        "rarity": "ULTRA_RARE"
    }
};

export const Secret_Rare = Template.bind({});
Secret_Rare.args = {
    collectible: {
        ...collectible,
        "rarity": "SECRET_RARE"
    }
};
