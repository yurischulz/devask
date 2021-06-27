import MarkdownEditor from '@uiw/react-markdown-editor';

type AnswerProps = {
  answerContent: string | undefined;
  setAnswerContent: Function;
}

type EditorProps = {
  display: {
    maxLine: {
      text: string;
    }
  }
}

export function AnswerBox({
  answerContent,
  setAnswerContent
}: AnswerProps) {
  return (
    <MarkdownEditor
      value={answerContent}
      onChange={(editor: EditorProps, data: string | undefined, value: string | undefined) => setAnswerContent(value)}
      height={300}
    />
  );
}