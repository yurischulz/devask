import { Children, ReactNode } from "react";
import PropTypes from 'prop-types';

import typingImg from '../assets/images/typing.svg';

type QuestionProps = {
  content: string;
  answerContent?: string | undefined;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
  page: string;
}

export function Question({
  content,
  author,
  answerContent = undefined,
  isAnswered = false,
  isHighlighted = false,
  page,
  children
}: QuestionProps) {
  const childrenToArray = Children.toArray(children);
  const likeButton = childrenToArray[0]
  console.log(likeButton);

  return (
    <div className={`question ${isAnswered ? 'answered' : ''} ${isHighlighted ? 'highlighted' : ''}`}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{page === "admin" ? [childrenToArray[0], childrenToArray[1]] : childrenToArray[0]}</div>
      </footer>

      <code className="answer-box">
        {page === "admin" ? childrenToArray[2] : childrenToArray[1]}
      </code>
      {isHighlighted && !isAnswered && <img className="typing" src={typingImg} alt="Respondendo mensagem" />}
    </div>
  );
}