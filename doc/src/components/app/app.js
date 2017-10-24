import React, { Component } from 'react';
import find from 'lodash/find'
import AppComponent from './app-component'
import { cartoConfig, assign } from './utils'

class App extends Component {

  state = {
    layers: [
      {
        name: 'community-based-reserves',
        url: null,
        type: 'UrlTemplate',
        carto: cartoConfig(
          'simbiotica',
          `#layer {
          polygon-fill: #e95353;
          polygon-opacity: 1;
        }
        #layer::outline {
          line-width: 1;
          line-color: #e95353;
          line-opacity: 1;
        }`,
          'kba_poly_2016_id'
        ),
        visible: false
      }
    ]
  }

  constructor(props) {
    super(props)  
    this.fetchCartos(this.state.layers)
  }
  
  fetchCartos (layers) {
    const { reduceState, state } = this
    
    layers.map(({ carto, name }) => {
      if (!carto) return
      
      const { account, layergroupid, apiv, config, tileFormat = 'png' } = carto
      fetch(
        `https://${account}.carto.com/api/${apiv}/map?config=${encodeURIComponent(JSON.stringify(config))}`
      )
        .then(d => d.json())
        .then(({ layergroupid, cdn_url: { templates: { https: { url } } } }) => ({
          layergroupid,
          url
        }))
        .then(({ layergroupid, url }) => ({
          name,
          url: `${url}/${account}/api/${apiv}/map/${layergroupid}/{z}/{x}/{y}.${tileFormat}`
        }))
        .then(({ url, name }) =>
          this.setState(
            reduceState(state, { type: 'GOT_CARTO', payload: { name, url } })
          )
        )
    });
  }

  reduceState (state, action) {
    const { type, payload: { url, name } } = action

    switch (type) {
      case 'GOT_CARTO':
        return { layers: [assign(find(state.layers, { name }), { url, visible: true })]};
      default:
        return state
    }
    return state
  }

  render () {
    return <AppComponent layers={this.state.layers}/>
  }
}

export default App;
