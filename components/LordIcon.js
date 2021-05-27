import lottie from 'lottie-web';
import {defineLordIconElement} from 'lord-icon-element';

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
