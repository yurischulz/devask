import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  answerContent?: string | undefined;
  isAnswered: boolean;
  isHighlighted: boolean;
  isEditing: boolean | undefined;
  likes: Record<string, {
    authorId: string;
  }>
}>

type QuestionProps = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  answerContent?: string | undefined;
  isAnswered: boolean;
  isHighlighted: boolean;
  isEditing: boolean | undefined;
  likeCount: number;
  likeId: string | undefined;
}


export type RoomParams = {
  id: string;
}

export function useRoom(roomId: string) {
  const {user} = useAuth();
  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const FirebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
      const parsedQuestions = Object.entries(FirebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          answerContent: value.answerContent,
          isAnswered: value.isAnswered,
          isEditing: value.isEditing,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, value]) => value.authorId === user?.id)?.[0]
        }
      });

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });

    return () => {
      roomRef.off('value');
    }
   }, [roomId, user?.id]);
  
  return {questions, title}
}