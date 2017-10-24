import React from 'react';
import { Map, ImageProvider } from 'cesium-components';
import './app.css'

const AppComponent = ({ layers }) => (
  <Map className="cesium-map">
    {layers.map(({ type, url, visible }) => (
      <ImageProvider key={url} {...{ type, url, visible }} />
    ))}
  </Map>
)

export default AppComponent
