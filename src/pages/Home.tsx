import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import { useModal } from '../hooks/useModal';

import { Button } from '../components/Button';

import '../styles/auth.scss';
import '../styles/modal.scss';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');
  const { modalStyles, modalIsOpen, setIsOpen, openModal } = useModal();

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (roomRef.val().endedAt) {
      // Sala fechada: -McqE0WxM1_f0IQxnpUN
      // Sala aberta: -Md9Yg41sbUyYdvLCq6F
      openModal();
      return;
    }

    if (!roomRef.exists()) {
      alert('Room does not exists.');
      return;
    }

    history.push(`rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="createRoom">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
            <Modal
              isOpen={modalIsOpen}
              contentLabel="Encerrar sala"
              style={modalStyles}
            >
              <h2>Esta sala já foi encerrada.</h2>
              <button className="delete-button" onClick={() => setIsOpen(false)}>
                Fechar
              </button>
            </Modal>
          </form>
        </div>
      </main>
    </div>
  )
}