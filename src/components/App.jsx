import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import { ImageApi } from './ImageApi';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import s from './App.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const [gallery, setGallery] = useState([]);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState('idle');
    const [bigImg, setBigImg] = useState('');
    const [modal, setModal] = useState(false);

    useEffect(() => {
        if (query === '') {
            return;
        }

        ImageApi(query, page)
            .then(res => {
                setStatus('pending');

                return res.json();
            })
            .then(res => {
                if (res.total > 0) {
                    setGallery(res.hits);
                    // setPage(1);
                    setStatus('resolved');

                    return;
                }

                setStatus('error');

                toast.error('Please enter a valid search query');
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    useEffect(() => {
        if (page === 1) {
            return;
        }

        ImageApi(query, page)
            .then(res => {
                setStatus('pending');

                return res.json();
            })
            .then(res => {
                setGallery([...gallery, ...res.hits]);

                setStatus('resolved');
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    function onSubmit(val) {
        if (val === '') {
            return;
        }

        if (query === val) {
            return;
        }

        setQuery(val);
        setPage(1);
        setGallery([]);
        setStatus('pending');
    }

    const onIncrementPage = () => {
        setPage(page + 1);
    };

    const getBigImage = img => {
        setBigImg(img);
    };

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <div className={s.Container}>
            <SearchBar onSubmit={onSubmit} />
            {(status === 'resolved' || gallery !== []) && (
                <ImageGallery>
                    <ImageGalleryItem
                        gallery={gallery}
                        getBigImage={getBigImage}
                        toggleModal={toggleModal}
                    />
                </ImageGallery>
            )}

            {status === 'resolved' && gallery.length >= 12 && (
                <Button title={'Load more'} onIncrementPage={onIncrementPage} />
            )}
            {status === 'pending' && <Loader />}
            {status === 'error' && (
                <ToastContainer position="top-center" autoClose={3000} />
            )}
            {modal && <Modal img={bigImg} toggleModal={toggleModal} />}
        </div>
    );
};

export { App };
