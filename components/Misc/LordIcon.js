import lottie from 'lottie-web'
import {defineLordIconElement} from 'lord-icon-element'

defineLordIconElement(lottie.loadAnimation);

export const LinkIcon = () => (
    <lord-icon
        animation="morph"
        target="a"
        palette="#CCCCCC;#ff2696;"
        size={'20px'}
        params="20"
        src="/assets/icons/11-link-unlink-morph/11-link-unlink-morph-solid.json"
    />
)

export const CollectibleIcon = ({
                                    size = '50px',
                                    type = 'outline',
                                    params = '50',
                                    palette = '#cccccc;#3C82F6',
                                    classes = 'inline'
                                }) => (
    <lord-icon
        target={`a`}
        animation="loop"
        palette={palette}
        size={size}
        params={params}
        className={classes}
        src={`/assets/icons/108-box-package-open-close-morph/108-box-package-open-close-morph-${type}.json`}>
    </lord-icon>
)

export const TokenomicsIcon = ({
                                   size = '50px',
                                   type = 'outline',
                                   params = '50',
                                   palette = '#cccccc;#3C82F6',
                                   classes = 'inline'
                               }) => (
    <lord-icon
        target={`a`}
        animation="loop"
        palette={palette}
        size={size}
        params={params}
        className={classes}
        src={`/assets/icons/298-coins/298-coins-${type}.json`}>
    </lord-icon>
)

export const MarketplaceIcon = ({
                                    size = '50px',
                                    type = 'outline',
                                    params = '50',
                                    palette = '#cccccc;#3C82F6',
                                    classes = 'inline'
                                }) => (
    <lord-icon
        target={`a`}
        animation="loop"
        palette={palette}
        size={size}
        params={params}
        className={classes}
        src={`/assets/icons/119-law-judge/119-law-judge-${type}.json`}>
    </lord-icon>
)

export const CheckIcon = ({
                              size = '30px',
                              type = 'outline',
                              params = '100',
                              palette="#ffffff;#ffffff;",
                              classes = 'inline'
                          }) => (
    <lord-icon
        animation="click"
        palette={palette}
        size={size}
        params={params}
        className={classes}
        src={`/assets/icons/24-approved-checked/24-approved-checked-${type}.json`}>
    </lord-icon>
)

export const ChatIcon = ({
                             size = '50px',
                             type = 'outline',
                             params = '50',
                             palette = '#cccccc;#3C82F6',
                             classes = 'inline'
                         }) => (
    <lord-icon
        target={`a`}
        animation="loop"
        palette={palette}
        size={size}
        params={params}
        className={classes}
        src={`/assets/icons/202-chat/202-chat-${type}.json`}>
    </lord-icon>
)

export const ThumbIcon = ({
                              size = '50px',
                              type = 'solid',
                              params = '50',
                              palette = '#cccccc;#3C82F6',
                              classes
                          }) => (
    <lord-icon
        target={`button`}
        animation="loop"
        palette={palette}
        size={size}
        params={params}
        class={classes}
        src={`/assets/icons/267-like-thumb-up/267-like-thumb-up-${type}.json`}>
    </lord-icon>
)

export const QuestionIcon = ({
                                 animation = 'click',
                                 size = '50px',
                                 type = 'solid',
                                 params = '50',
                                 palette = '#cccccc;#3C82F6',
                                 classes
                             }) => (
    <lord-icon
        target={`button`}
        animation={animation}
        palette={palette}
        size={size}
        params={params}
        class={classes}
        src={`/assets/icons/424-question-bubble/424-question-bubble-${type}.json`}>
    </lord-icon>
)

export const BellIcon = ({
                             size = '50px',
                             type = 'solid',
                             params = '50',
                             palette = '#cccccc;#3C82F6',
                             classes
                         }) => (
    <lord-icon
        target={`button`}
        animation="loop"
        palette={palette}
        size={size}
        params={params}
        class={classes}
        src={`/assets/icons/193-bell-notification/193-bell-notification-${type}.json`}>
    </lord-icon>
)



export const AddCommentIcon = ({
                                   size = '50px',
                                   type = 'solid',
                                   params = '50',
                                   palette = '#cccccc;#3C82F6',
                                   classes
                               }) => (
    <lord-icon
        target={`button`}
        animation="loop"
        palette={palette}
        size={size}
        params={params}
        className={classes}
        src={`/assets/icons/207-chat-message-plus/207-chat-message-plus-${type}.json`}>
    </lord-icon>
)

export const AvatarIcon = ({
                               size = '90px',
                               type = 'outline',
                               params = '50',
                               palette = '#ffffff;#3C82F6',
                               classes = 'inline'
                           }) => (
    <lord-icon
        target={`a`}
        animation="loop"
        palette={palette}
        size={size}
        params={params}
        className={classes}
        src={`/assets/icons/21-avatar/21-avatar-${type}.json`}>
    </lord-icon>
)

export const DonateIcon = ({
                               size = '90px',
                               type = 'outline',
                               params = '50',
                               palette = '#ffffff;#3C82F6',
                               classes = 'inline'
                           }) => (
    <lord-icon
        target={`a`}
        animation="auto"
        palette={palette}
        size={size}
        params={params}
        className={classes}
        src={`/assets/icons/1016-donate-sign/1016-donate-sign-${type}.json`}>
    </lord-icon>
)

export const CloseIcon = ({
                              size = '90px',
                              type = 'outline',
                              params = '50',
                              palette = '#ffffff;#3C82F6',
                              classes = 'inline'
                          }) => (
    <lord-icon
        target={`a`}
        animation="loop"
        palette={palette}
        size={size}
        params={params}
        className={classes}
        src={`/assets/icons/38-error-cross-simple/38-error-cross-simple-${type}.json`}>
    </lord-icon>
)


export const MenuIcon = () => (
    <lord-icon
        target={`button`}
        animation="click"
        palette="#cccccc;#3C82F6"
        size={'50px'}
        params="50"
        className={`inline`}
        src={`/assets/icons/321-menu-7-morph/321-menu-7-morph.json`}>
    </lord-icon>
)