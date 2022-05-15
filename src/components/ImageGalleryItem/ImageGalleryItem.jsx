import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ gallery, getBigImage, toggleModal }) => {
    return gallery.map(el => {
        const { id, previewURL, tags, webformatURL } = el;
        return (
            <li
                className={s.item}
                key={id}
                onClick={() => {
                    getBigImage({ webformatURL, tags });
                    toggleModal();
                }}
            >
                <img className={s.img} src={previewURL} alt={tags} />
            </li>
        );
    });
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    gallery: PropTypes.arrayOf(PropTypes.object).isRequired,
    getBigImage: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
};
