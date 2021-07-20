import { storiesOf } from "@storybook/react"
import Footer from "./Footer"

const defaultProps = {
    classes: ''
}

storiesOf('Footer', module).add('default', () => <Footer {...defaultProps} />)