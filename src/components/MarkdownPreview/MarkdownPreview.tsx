import MarkdownPreview from '@uiw/react-markdown-preview';

import './styles.scss';

export type EditorProps = {
  display: {
    maxLine: {
      text: string;
    }
  }
}

export { MarkdownPreview };