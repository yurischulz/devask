import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../services/firebase';

export type RoomParams = {
  id: string;
}

type modalStylesProps = {
    content: {
      top: string,
      left: string,
      right: string,
      bottom: string,
      padding: string,
      borderRadius: string,
      border: number
    },
}
  
export const modalStyles: modalStylesProps = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    padding: '64px',
    borderRadius: '8px',
    border: 0
  },
};

export function useModal() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const params = useParams<RoomParams>();

  function openModal() {
    setIsOpen(true);
  }

  return {modalStyles, modalIsOpen, setIsOpen, openModal}
}