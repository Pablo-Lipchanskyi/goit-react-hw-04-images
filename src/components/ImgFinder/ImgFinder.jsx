import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import {Searchbar} from 'components/Searchbar/Searchbar';
import { useState, useEffect } from 'react';
import * as API from 'services/api';
import PropTypes from 'prop-types';

export const ImgFinder = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getImages = async () => {
      const { hits } = await API.searchImage(query, page);
      setImages(hits, ...images);
      setIsLoading(false)
    } 
    getImages()
  }, [query, page])
  
   const handleSubmit = (query,page) => {
     setQuery(query);
     setPage(page)
  };
   const loadMore = () => {
    setPage(page + 1)
  }
  const isShowLoadMore = totalPages > 0 && totalPages > page;
  return (
      <>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery images={images} />
        {isLoading && <Loader />}
        {isShowLoadMore && <Button onLoadMore={loadMore} />}
      </>
    );
}
export default ImgFinder;
ImgFinder.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
}


/*
  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.page !== page) {
      this.setState({ isLoading: true });
      const { hits } = await API.searchImage(query, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        isLoading: false,
      }));
    }
    if (prevState.query !== query) {
      this.setState({ isLoading: true });
      const { hits, totalHits } = await API.searchImage(query, page);
      this.setState({
        images: hits,
        totalPages: Math.floor(totalHits / API.PER_PAGE),
        isLoading: false,
      });
    }
  }

  handleSubmit = query => {
    this.setState(prevState => {
      return {
        query: query,
        page: 1,
      };
    });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isLoading, totalPages, page } = this.state;
    const isShowLoadMore = totalPages > 0 && totalPages > page;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} />
        {isLoading && <Loader />}
        {isShowLoadMore && <Button onLoadMore={this.loadMore} />}
      </>
    );
  }
}

export default ImgFinder;

ImgFinder.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};*/