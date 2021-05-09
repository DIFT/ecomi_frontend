import Carousel from 'react-elastic-carousel'

const BrandsBlock = () => {

    const brands = [
        { name: 'Batman', asset: './assets/images/brands/batman.jpg' },
        { name: 'Street Fighter', asset: './assets/images/brands/street-fighter.jpg' },
        { name: 'Warner Brothers', asset: './assets/images/brands/warner-brothers.jpg' },
        { name: 'Jurassic Park', asset: './assets/images/brands/jurassic-park.jpg' },
        { name: 'Superman', asset: './assets/images/brands/superman.jpg' },
        { name: 'Tokidoki', asset: './assets/images/brands/tokidoki.jpg' },
        { name: 'CBS', asset: './assets/images/brands/cbs.jpg' },
        { name: 'Cartoon Network', asset: './assets/images/brands/cartoon-network.jpg' },
        { name: 'Mermicorno', asset: './assets/images/brands/mermicorno.jpg' },
        { name: 'Star Trek - The Next Generation', asset: './assets/images/brands/star-trek_the-next-generation.jpg' },
        { name: 'Adventure Time', asset: './assets/images/brands/adventure-time.jpg' },
        { name: 'Donutella', asset: './assets/images/brands/donutella.jpg' },
        { name: 'Star Trek - Picard', asset: './assets/images/brands/star-trek_picard.jpg' },
        { name: 'Powerpuff Girls', asset: './assets/images/brands/powerpuff-girls.jpg' },
        { name: 'Unicorno', asset: './assets/images/brands/unicorno.jpg' },
        { name: 'We Bare Bears', asset: './assets/images/brands/we-bare-bears.jpg' },
        { name: 'Cactus Friends', asset: './assets/images/brands/cactus-friends.jpg' },
        { name: 'Star Trek - Discovery', asset: './assets/images/brands/star-trek_discovery.jpg' },
        { name: 'Tuzki', asset: './assets/images/brands/tuzki.jpg' },
        { name: 'Capcom', asset: './assets/images/brands/capcom.jpg' },
        { name: 'DC Collectibles', asset: './assets/images/brands/dc-collectibles.jpg' },
        { name: 'Harley Quinn', asset: './assets/images/brands/harley-quinn.jpg' },
        { name: 'Monster Hunters', asset: './assets/images/brands/monster-hunters.jpg' },
        { name: 'The Joker', asset: './assets/images/brands/the-joker.jpg' },
        { name: 'Monster Hunter - World Iceborne', asset: './assets/images/brands/monster-hunter_world-iceborne.jpg' },
    ]

    const breakpoints = [
        { width: 440, itemsToShow: 1},
        { width: 450, itemsToShow: 3},
        { width: 550, itemsToShow: 6},
        { width: 1280, itemsToShow: 12},
        { width: 1536, itemsToShow: 12 }
    ]

    return(
        <section className={`bg-white text-center border-t border-b px-10 relative`}>
            <span className={`cursor-pointer absolute -top-4`} data-tip={`Announced Feb 20th 2020 <a href="https://medium.com/ecomi/huge-international-licenses-announced-for-ve-ve-d84f747c96ce" target="_blank" class="text-blue-400">https://medium.com/ecomi/huge-international-licenses-announced-for-ve-ve-d84f747c96ce</a>`} data-html={true} data-event='click focus'>
                <lord-icon
                    animation="click"
                    palette="#34D399"
                    size={'30px'}
                    params="30"
                    className={`inline`}
                    src={`./assets/icons/24-approved-checked/24-approved-checked-solid.json`}>
                </lord-icon>
            </span>
            <ul>
                <Carousel
                    breakPoints={breakpoints}
                    itemPadding={[20, 20]}
                    pagination={false}
                >
                    {brands && brands.map((brand, index) => (
                        <li key={index}>
                            <img src={brand.asset} alt={brand.name} title={brand.name} className={`opacity-70`}/>
                        </li>
                    ))}
                </Carousel>
            </ul>
        </section>
    )
}

export default BrandsBlock