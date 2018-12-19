import React from 'react';
import styles from './style.scss';
import PropTypes from 'prop-types';

class Banner extends React.Component {
  state = {
    modalIsOpen: false,
  }

  clickHandle = () => {
    this.setState((state) => {
      return { modalIsOpen: !state.modalIsOpen };
    })
  }

  getItems = () => {
    if (this.state.modalIsOpen) {
      const retailers = this.props.retailers.map((element, index) => {
        return <span key={index}>{element}</span>
      });
      return retailers;
    }
    return 'empty';
  }

  render() {
    return (
      <div onClick={this.clickHandle} className={styles.content}>
        {this.getItems()}
      </div>
    )
  }
}

Banner.propTypes = {
  retailers: PropTypes.array,
};

Banner.defaultProps = {
  retailers: []
};

export default Banner;