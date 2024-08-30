import { Profile } from "../profiles";

enum PostBlockType {
    CODE = 'CODE',
    IMAGE = 'IMAGE',
    TEXT = 'TEXT',
}

const PostTagsMap = Object.freeze({
    ALL: 'ALL',
    IT: 'IT',
    SCIENCE: 'SCIENCE',
    ECONOMICS: 'ECONOMICS',
});
  
type PostTagsKey = (typeof PostTagsMap)[keyof typeof PostTagsMap];
  
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

interface Post {
    id: string;
    title: string;
    subtitle: string;
    img: string;
    views: number;
    createdAt: number;
    tags: Array<PostTagsKey>;
    blocks: Array<PostBlock>;
    profile?: Profile;
    profileId?: string;
    userId?: string;
}

export {
    PostBlock,
    PostTagsKey,
    PostTagsMap,
    PostBlockType,
    Post,
}
