import PropTypes from 'prop-types';
import { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import s from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
    const [query, setQuery] = useState('');

    const handleChange = e => {
        const query = e.target.value.toLowerCase();

        setQuery(query);
    };

    const handleSubmit = e => {
        e.preventDefault();

        onSubmit(query.trim());

        reset();
    };

    const reset = () => {
        setQuery('');
    };

    return (
        <header className={s.SearchBar}>
            <form className={s.form} onSubmit={handleSubmit}>
                <button type="submit" className={s.button}>
                    <IoSearchSharp className={s.svg} />
                </button>

                <input
                    className={s.input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={query}
                    onChange={handleChange}
                />
            </form>
        </header>
    );
};

export default SearchBar;

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
