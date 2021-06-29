import MarkdownEditor from '@uiw/react-markdown-editor';

import './styles.scss';

export type EditorProps = {
  display: {
    maxLine: {
      text: string;
    }
  }
}

export { MarkdownEditor };