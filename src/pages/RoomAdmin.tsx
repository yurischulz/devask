import { Fragment, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Modal from 'react-modal';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import answerImg from '../assets/images/answer.svg';
import editImg from '../assets/images/edit.svg';
import modalImg from '../assets/images/modal-delete.svg';

import { useRoom } from '../hooks/useRoom';
import { useModal } from '../hooks/useModal';
import { database } from '../services/firebase';

import { Button } from '../components/Button';
import { Question } from '../components/Quenstion';
import { RoomCode } from '../components/RoomCode';

import '../styles/rooms.scss';
import '../styles/question.scss';
import '../styles/modal.scss';
import { AnswerBox } from '../components/AnswerBox';

type RoomParams = {
  id: string;
}

export function RoomAdmin() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);
  const { modalStyles, modalIsOpen, setIsOpen, openModal } = useModal();
  const [answerContent, setAnswerContent] = useState<string | undefined>('');

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    setIsOpen(false);
  }

  async function handleSendQuestionAnswer(questionId: string, answerContent: string | undefined) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      answerContent: answerContent,
      isAnswered: true
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    });
  }

  async function handleEditQuestion(questionId: string, isEditing: boolean | undefined) {
    if (isEditing) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isEditing: false
      });
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isEditing: true
      });
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="dev=>ask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Fragment key={question.id}>
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                  answerContent={question.answerContent}
                  page='admin'
                >
                  {
                    !question.isAnswered ? (
                      <button
                        className="answer-button"
                        type="button"
                        onClick={() => handleHighlightQuestion(question.id)}
                      >
                        <img src={answerImg} alt="Dar destaque a pergunta" />
                      </button>
                    ) : (
                      <button
                        className="see-answer-button"
                        type="button"
                        onClick={() => handleEditQuestion(question.id, question.isEditing)}
                      >
                        <img src={editImg} alt="Dar destaque a pergunta" />
                      </button>
                    )
                  }
                  <button
                    className="remove-button"
                    type="button"
                    onClick={openModal}
                  >
                    <img src={deleteImg} alt="Remover pergunta" />
                  </button>

                  {(question.isHighlighted && !question.isAnswered || question.isEditing) &&
                    <Fragment>
                      <AnswerBox
                        answerContent={question.answerContent}
                        setAnswerContent={setAnswerContent}
                      />
                      <button className="button answer-button" onClick={() => handleSendQuestionAnswer(question.id, answerContent)}>Responder</button>
                    </Fragment>
                  }
                </Question>
                <Modal
                  key={`modal-question.id`}
                  isOpen={modalIsOpen}
                  contentLabel="Encerrar sala"
                  style={modalStyles}
                >
                  <img src={modalImg} alt="" />
                  <h2>Encerrar sala</h2>
                  <p>Tem certeza que você deseja encerrar esta sala?</p>
                  <form>
                    <button className="cancel-button" onClick={() => setIsOpen(false)}>Cancelar</button>
                    <button className="delete-button" onClick={() => handleDeleteQuestion(question.id)}>Sim, encerrar</button>
                  </form>
                </Modal>
              </Fragment>
            )
          })}
        </div>
      </main>
    </div>
  )
}