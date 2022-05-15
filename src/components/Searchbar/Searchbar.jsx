import PropTypes from 'prop-types';
import { Component } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import s from './SearchBar.module.css';

class SearchBar extends Component {
    state = {
        query: '',
    };

    handleChange = e => {
        const query = e.target.value.toLowerCase();

        this.setState({ query });
    };

    handleSubmit = e => {
        e.preventDefault();

        this.props.onSubmit(this.state.query.trim());

        this.reset();
    };

    reset = () => {
        this.setState({ query: '' });
    };

    render() {
        return (
            <header className={s.searchbar}>
                <form className={s.form} onSubmit={this.handleSubmit}>
                    <button type="submit" className={s.button}>
                        <IoSearchSharp className={s.svg} />
                    </button>

                    <input
                        className={s.input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={this.state.query}
                        onChange={this.handleChange}
                    />
                </form>
            </header>
        );
    }
}

export default SearchBar;

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
