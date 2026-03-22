import { createPortal } from 'react-dom';
import styled from './Modal.module.css';
import { useEffect } from 'react';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  // Функція закриття модального вікна по кліку на Backdrop
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Еффект для перевірки натискання клавіші Esc
  useEffect(() => {
    // Обробник події - натискання клавіатури
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    // Додаємо слухач клавіатури на весь документ
    document.addEventListener('keydown', handleKeyDown);
    // Додаємо у useEffect код блокуання скролу при відкритті модалки
    document.body.style.overflow = 'hidden';

    //  При розмонтуванні компонента додаємо наступне :
    return () => {
      // Видалення слухача клавіатури
      document.removeEventListener('keydown', handleKeyDown);
      // Видаляємо з useEffect код блокування скролу
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Створення розмітки компонента в кінці елемента document.body за допомогою createPortal
  return createPortal(
    <div className={styled.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
      <div className={styled.modal}>
        <button className={styled.closeButton} aria-label="Close modal" onClick={() => onClose()}>
          &times;
        </button>
        {/* Тут рендериться переданий вміст із пропса children */}
        {children}
        {/* ================================================== */}
      </div>
    </div>,
    document.body
  );
}
