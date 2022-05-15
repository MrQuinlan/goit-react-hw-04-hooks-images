import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ title, onIncrementPage }) => {
    return (
        <button
            className={s.btn}
            type="button"
            onClick={() => onIncrementPage()}
        >
            {title}
        </button>
    );
};

export default Button;

Button.propTypes = {
    title: PropTypes.string.isRequired,
    onIncrementPage: PropTypes.func.isRequired,
};
