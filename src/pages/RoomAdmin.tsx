import { Fragment } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Modal from 'react-modal';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
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

type RoomParams = {
  id: string;
}

export function RoomAdmin() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);
  const { modalStyles, modalIsOpen, setIsOpen, openModal } = useModal();

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

  async function handleCheckQuestionAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    });
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
                >
                  {
                    !question.isAnswered &&
                    <Fragment>
                      <button
                        className="check-button"
                        type="button"
                        onClick={() => handleCheckQuestionAnswered(question.id)}
                      >
                        <img src={checkImg} alt="Marcar pergunta como respondida" />
                      </button>
                      <button
                        className="answer-button"
                        type="button"
                        onClick={() => handleHighlightQuestion(question.id)}
                      >
                        <img src={answerImg} alt="Dar destaque a pergunta" />
                      </button>
                    </Fragment>
                  }
                  <button
                    className="remove-button"
                    type="button"
                    onClick={openModal}
                  >
                    <img src={deleteImg} alt="Remover pergunta" />
                  </button>
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