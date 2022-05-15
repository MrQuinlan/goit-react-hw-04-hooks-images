import s from './ImageGallery.module.css';

const ImageGallery = ({ children }) => {
    return <ul className={s.gallery}>{children}</ul>;
};

export default ImageGallery;
