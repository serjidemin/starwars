import React, {Component} from 'react';

import Header from '../header';
import ErrorBoundry from '../error-boundry';
import { SwapiServiceProvider } from '../swapi-service-context';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import RandomPlanet from '../random-planet';
import {PeoplePage, PlanetPage, StarshipPage} from '../pages';

import './app.css';

export default class App extends Component {

  state = {
    swapiService: new SwapiService(),
  }

  onServiceChange = () => {
    this.setState(({swapiService}) => {
      const Service = swapiService instanceof SwapiService ?
                        DummySwapiService : SwapiService;
      return {
        swapiService: new Service(),
      };
    })
  }

  render() {

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <div className="container">
            <Header onServiceChange={this.onServiceChange} />
            <RandomPlanet />
            <PeoplePage  />
            <StarshipPage />
            <PlanetPage />
          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
};
