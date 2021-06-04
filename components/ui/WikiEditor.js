import React from 'react'
import ReactQuill from "react-quill";

const CiteSourceButton = () => <span className={`text-black`}>$$$</span>;

const Link = ReactQuill.Quill.import('formats/link');

class CustomLink extends Link {
    static create(value) {
        const node = super.create(value);

        const citeSource = document.createElement('a')
        citeSource.setAttribute('src', this.sanitize(value));
        node.appendChild(citeSource);

        return node;
    }

    static sanitize(url) {
        return Link.sanitize(url);
    }
}
CustomLink.blotName = 'citeSource'
CustomLink.className = 'citeSource'
CustomLink.tagName = 'A'

ReactQuill.Quill.register('formats/video', CustomLink);


function citeSource() {
    const cursorPosition = this.quill.getSelection().index;
    this.quill.insertText(cursorPosition, "★");
    // this.quill.insertEmbed(10, 'image', 'https://quilljs.com/images/cloud.png');
    // this.quill.setSelection(cursorPosition + 1);
    // var range = quill.getSelection();
    // if (range) {
    //     if (range.length == 0) {
    //         console.log('User cursor is at index', range.index);
    //     } else {
    //         var text = quill.getText(range.index, range.length);
    //         console.log('User has highlighted: ', text);
    //     }
    // } else {
    //     console.log('User cursor is not in editor');
    // }
}

const CustomToolbar = () => (
    <div id="toolbar">
        <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
            <option value="1" />
            <option value="2" />
            <option selected />
        </select>
        <button className="ql-bold" />
        <button className="ql-blockquote" />
        <button className="ql-link" />
        <button className="ql-image" />
        <button className="ql-video" />
        <button className="ql-citeSource">
        </button>
    </div>
);

class WikiEditor extends React.Component {
    constructor (props) {
        console.log('props is: ', props)
        super(props)
        this.state = { editorHtml: this.props.value, theme: 'snow' }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange (html) {
        this.setState({ editorHtml: html });
        this.props.handleBody(html)
    }

    render() {
        return (
            <div>
                <CustomToolbar />
                <ReactQuill
                    theme={this.state.theme}
                    onChange={this.handleChange}
                    value={this.state.editorHtml}
                    modules={{
                        toolbar: {
                            container: "#toolbar",
                            handlers: {
                                citeSource: citeSource
                            }
                        },
                        clipboard: {
                            matchVisual: false,
                        }
                    }}
                    formats={[
                        'header', 'font', 'size',
                        'bold', 'italic', 'underline', 'strike', 'blockquote',
                        'list', 'bullet', 'indent',
                        'link', 'image', 'video', 'citeSource'
                    ]}
                    bounds={'.app'}
                    placeholder={this.props.placeholder}
                />
            </div>
        )
    }
}

export default WikiEditor