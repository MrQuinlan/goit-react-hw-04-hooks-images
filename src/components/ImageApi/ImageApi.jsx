const apiKey = '25737469-5e8bfc7bf6c680f39c339b92a';
const baseUrl = 'https://pixabay.com/api/';

const ImageApi = (query, page) => {
    const settings = `q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;
    return fetch(`${baseUrl}?${settings}`);
};

export { ImageApi };
