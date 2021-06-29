import copyImg from '../../assets/images/copy.svg';

import './styles.scss';

type RoomCodeProps = {
  /** Código da sala, recebe o id da sala no firebase */
  code: string;
}

/**
 * ### Exibição do código da sala.
 * 
 * Recebe o ID da sala obtido através do firebase e exibe o componente com o ID obtido.
 */
export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #-McqE0WxM1_f0IQxnpUN</span>
    </button>
  )
}