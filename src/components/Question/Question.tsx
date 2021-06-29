import { Children, ReactNode } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';

import typingImg from '../../assets/images/typing.svg';

import './styles.scss';

export type QuestionProps = {
  /** Dados do usuário obtido através da conta Google */
  author: {
    name: string;
    avatar: string;
  }
  /** Exibe o conteúdo da pergunta */
  content: string;
  /** Define o tipo da página */
  page: string;
  /** Exibe o conteúdo da resposta */
  answerContent?: string | undefined;
  /** Componentes recebidos como children */
  children?: ReactNode;
  /** Define se a pergunta foi respondida */
  isAnswered?: boolean;
  /** Define se a pergunta está sendo respondida */
  isHighlighted?: boolean;
}

/**
 * ### Exibição do card de perguntas.
 *
 * Exibe o card de perguntas em três variações:
 * 
 * - **Pergunta cadastrada:**
 * ```
 * isHighlited: false
 * isAnswered: false
 * ```
 * - **Pergunta sendo respondida:**
 * ```
 * isHighlited: true
 * isAnswered: false
 * ```
 * - **Pergunta respondida:**
 * ```
 * isHighlited: true
 * isAnswered: true
 * ```
 */
export function Question({
  content,
  author,
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
      <MarkdownPreview source={content} className="wmde-question" />
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