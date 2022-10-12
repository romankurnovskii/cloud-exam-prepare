import { marked } from 'marked';
import parse from 'html-react-parser';


export const parseRawText = (text: string) => {
    return parse(marked.parse(text));
}
