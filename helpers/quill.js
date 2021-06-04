export const insertStar = () => {
    const cursorPosition = this.quill.getSelection().index
    this.quill.insertText(cursorPosition, "★")
    this.quill.setSelection(cursorPosition + 1)
}

export const QuillModules  = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6] }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
    ]
}

export const QuillFormats = [
    'header',
    'font',
    'size',
    'bold',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
]

