#### Thirdpart component

https://github.com/uiwjs/react-markdown-editor

```tsx
import { useState } from "react";
import { MarkdownEditor } from "../../components/MarkdownEditor/MarkdownEditor";

const [answerContent, setAnswerContent] = useState("");

<>
  <MarkdownEditor
    value={answerContent}
    onChange={(editor, data, value) => setAnswerContent(value)}
    height={300}
  />
  <button
    className="button answer-button"
    onClick={() => handleSendQuestionAnswer(question.id, answerContent)}
  >
    Responder
  </button>
</>;
```
