import Modal from 'components/Modal/Modal';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const ImageGalleryItem = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [bigUrl, setBigUrl] = useState('1');
  const [tag, setTag] = useState('2');

  const getImage = e => {
    setBigUrl(e.target.dataset.largeimg)
    toggleModal()
  }
  const toggleModal = () => {
    setShowModal(!showModal)
  }
  return (
    <>
        {props.images.map(image => (
          <li className="ImageGalleryItem" key={image.id}>
            <img
              src={image.webformatURL}
              data-largeimg={image.largeImageURL}
              alt={image.tags}
              className="ImageGalleryItemImage"
              onClick={getImage}
              loading="lazy"
            />
          </li>
        ))}
        {showModal && (
          <Modal src={bigUrl} alt={tag} toggleModal={toggleModal} />
        )}
      </>
  )
}
ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
}

/*class ImageGalleryItem extends Component {
  state = {
    showModal: false,
    bigUrl: '1',
    tag: '2',
  };

  getImage = e => {
    this.setState(({ bigUrl }) => ({
      bigUrl: e.target.dataset.largeimg,
    }));
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal, bigUrl, tag } = this.state;

    return (
      <>
        {this.props.images.map(image => (
          <li className="ImageGalleryItem" key={image.id}>
            <img
              src={image.webformatURL}
              data-largeimg={image.largeImageURL}
              alt={image.tags}
              className="ImageGalleryItemImage"
              onClick={this.getImage}
              loading="lazy"
            />
          </li>
        ))}
        {showModal && (
          <Modal src={bigUrl} alt={tag} toggleModal={this.toggleModal} />
        )}
      </>
    );
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};*/