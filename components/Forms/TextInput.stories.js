import { storiesOf } from "@storybook/react"
import TextInput from "./TextInput"

const defaultProps = {
    classes: '',
    setInputValue: () => {}
}

const populatedProps = {
    inputValue: 'John Doe',
    setInputValue: () => {}
}

storiesOf('TextInput', module)
    .add('Default', () => <TextInput {...defaultProps} />)
    .add('Populated', () => <TextInput {...populatedProps} />, {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/vgdmmzfRIeeDgieM7snqOb/CCS-Design-System?node-id=28%3A87"
        }
    })