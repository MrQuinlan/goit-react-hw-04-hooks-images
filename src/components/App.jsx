import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import { ImageApi } from './ImageApi';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import s from './App.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
    state = {
        gallery: [],
        query: '',
        page: 1,
        status: 'idle',
        bigImg: '',
        modal: false,
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.query === '') {
            return;
        }

        if (prevState.query !== this.state.query) {
            const { query, page } = this.state;

            ImageApi(query, page)
                .then(res => {
                    this.setState({ status: 'pending' });

                    return res.json();
                })
                .then(res => {
                    if (res.total > 0) {
                        return this.setState({
                            gallery: res.hits,
                            page: 1,
                            status: 'resolved',
                        });
                    }

                    this.setState({
                        status: 'error',
                    });

                    toast.error('Please enter a valid search query');
                });
        }

        if (prevState.page !== this.state.page && this.state.page !== 1) {
            const { query, page } = this.state;

            ImageApi(query, page)
                .then(res => {
                    this.setState({ status: 'pending' });

                    return res.json();
                })
                .then(res => {
                    this.setState({
                        gallery: [...prevState.gallery, ...res.hits],
                        status: 'resolved',
                    });
                });
        }
    }

    onSubmit = val => {
        if (this.state.query === val) {
            return;
        }

        this.setState({ query: val, page: 1, gallery: [], status: 'pending' });
    };

    onIncrementPage = () => {
        this.setState({ page: this.state.page + 1 });
    };

    getBigImage = img => {
        this.setState({ bigImg: img });
    };

    toggleModal = () => {
        this.setState({ modal: !this.state.modal });
    };

    render() {
        const { gallery, status, modal, bigImg } = this.state;

        return (
            <div className={s.Container}>
                <Searchbar onSubmit={this.onSubmit} />
                {(status === 'resolved' || gallery !== []) && (
                    <ImageGallery>
                        <ImageGalleryItem
                            gallery={gallery}
                            getBigImage={this.getBigImage}
                            toggleModal={this.toggleModal}
                        />
                    </ImageGallery>
                )}

                {status === 'resolved' && gallery.length >= 12 && (
                    <Button
                        title={'Load more'}
                        onIncrementPage={this.onIncrementPage}
                    />
                )}
                {status === 'pending' && <Loader />}
                {status === 'error' && (
                    <ToastContainer position="top-center" autoClose={3000} />
                )}
                {modal && <Modal img={bigImg} toggleModal={this.toggleModal} />}
            </div>
        );
    }
}

export { App };
