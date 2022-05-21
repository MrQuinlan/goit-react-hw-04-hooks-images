import PropTypes from 'prop-types';
import { useEffect } from 'react';
import s from './Modal.module.css';

const Modal = ({ img, toggleModal }) => {
    const { webformatURL, tags } = img;

    useEffect(() => {
        window.addEventListener('keydown', handleEscKey);

        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };
    });

    const handleClick = e => {
        if (e.target === e.currentTarget) {
            toggleModal();
        }
    };

    const handleEscKey = e => {
        if (e.code === 'Escape') {
            toggleModal();
        }
    };

    return (
        <div className={s.Overlay} onClick={handleClick}>
            <div className={s.Modal}>
                <img src={webformatURL} alt={tags} />
            </div>
        </div>
    );
};

export default Modal;

Modal.propTypes = {
    img: PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }),
};
