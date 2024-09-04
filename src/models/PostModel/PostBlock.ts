enum PostBlockType {
    CODE = 'CODE',
    IMAGE = 'IMAGE',
    TEXT = 'TEXT',
}

interface PostBlockBase {
    id: string;
    type: PostBlockType;
}

interface PostCodeBlock extends PostBlockBase {
    type: PostBlockType.CODE;
    code: string;
}

interface PostImageBlock extends PostBlockBase {
    type: PostBlockType.IMAGE;
    src: string;
    title: string;
}

interface PostTextBlock extends PostBlockBase {
    type: PostBlockType.TEXT;
    paragraphs: Array<string>;
    title?: string;
}

type PostBlock = PostCodeBlock | PostImageBlock | PostTextBlock;

export default PostBlock;
