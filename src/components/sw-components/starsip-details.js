import React from 'react';
import {Record} from '../item-details/item-details';
import ItemDetails from '../item-details';
import withSwapiService from '../hoc-helpers/with-swapi-service';

const StarshipDetails = (props) => {
  return (
    <ItemDetails {...props}>
      <Record field="model" label="Model" />
      <Record field="length" label="Length" />
      <Record field="costInCredits" label="Cost" />
    </ItemDetails>
  );
};

const mapMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getStarship,
    getImageUrl: swapiService.getStarshipImage,
  }
};

export default withSwapiService(mapMethodsToProps)(StarshipDetails);
