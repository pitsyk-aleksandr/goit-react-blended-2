import { createPortal } from 'react-dom';
import styled from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  return createPortal(
    <div className={styled.backdrop} role="dialog" aria-modal="true">
      <div className={styled.modal}>
        <button className={styled.closeButton} aria-label="Close modal" onClick={() => onClose()}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
