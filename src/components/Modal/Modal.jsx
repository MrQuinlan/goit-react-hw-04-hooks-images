import PropTypes from 'prop-types';
import { Component } from 'react';
import s from './Modal.module.css';

class Modal extends Component {
    img = this.props.img.webformatURL;
    tags = this.props.img.tags;

    componentDidMount() {
        window.addEventListener('keydown', this.handleEscKey);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleEscKey);
    }

    handleClick = e => {
        if (e.target === e.currentTarget) {
            this.props.toggleModal();
        }
    };

    handleEscKey = e => {
        if (e.code === 'Escape') {
            this.props.toggleModal();
        }
    };

    render() {
        return (
            <div className={s.Overlay} onClick={this.handleClick}>
                <div className={s.Modal}>
                    <img src={this.img} alt={this.tags} />
                </div>
            </div>
        );
    }
}
export default Modal;

Modal.propTypes = {
    img: PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }),
};
