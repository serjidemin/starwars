import React, { Component } from 'react';
import Spinner from '../spinner';

import './item-details.css';

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{ label }</span>
      <span>{ item[field] }</span>
    </li>
  );
};

export {
  Record
};

export default class ItemDetails extends Component {

  state = {
    item: null,
    image: null,
    loading: true,
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId ||
        this.props.getData !== prevProps.getData ||
        this.props.getImageUrl !== prevProps.getImageUrl) {
      this.updateItem();
    }
  }

  updateItem = () => {
    const {itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId)
      .then(item => {
        this.setState({
          item,
          image: getImageUrl(item),
          loading: false,
        });
      });
  }

  render() {

    const { loading, item, image } =this.state;

    if (!item) {
      return <span>Select a person from a list</span>
    }

    const spinner = loading ? <Spinner /> : null;
    const content = !loading ? (
        <React.Fragment>
          <img className="person-image" alt="Item"
               src={image} />

          <div className="card-body">
            <h4>{ item.name }</h4>
            <ul className="list-group list-group-flush">
              {
                React.Children.map(this.props.children, child => {
                  return React.cloneElement(child, {item});
                })
              }
            </ul>
          </div>
        </React.Fragment>) : null;

    return (
      <div className="person-details card">
        { spinner }
        { content }
      </div>
    )
  }
};
