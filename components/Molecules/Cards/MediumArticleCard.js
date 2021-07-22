import moment from "moment"
import {truncate} from "../../../utils"
import ArrowRight from "../../Misc/Icons/ArrowRight";

const MediumArticleCard = ({ article }) => {
    return(
        <article className="max-w-sm px-5">
            <a href={article.link} target={"_blank"} className={`rounded-lg overflow-hidden block`}>
                <figure className={`relative z-10 overflow-hidden h-48 rounded-3xl`}>
                    <img src={article.thumbnail} alt={article.title} width={"100%"}  />
                </figure>
                <figcaption className={`relative -z-1`}>
                    <div className={`flex items-center -mt-4 pt-5 pb-2 px-6 bg-gray-900 overflow-hidden rounded-b-3xl relative z-1`}>
                        <div className="flex-auto">
                            <h6 className={`block font-semibold py-2 text-white`}>{truncate(article.title, 30)}</h6>
                        </div>
                        <div className="flex-auto">
                            <ArrowRight classes={`text-white float-right`} />
                        </div>
                    </div>
                    <div className={`-mt-4 pt-4 pb-1 px-6 bg-white overflow-hidden rounded-b-3xl`}>
                        <h6 className={`block font-semibold py-2 text-gray-500`}>{moment(article.pubDate).fromNow()}</h6>
                    </div>
                </figcaption>
            </a>
        </article>
    )
}

export default MediumArticleCard