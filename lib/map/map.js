import { Component, createElement } from 'react';
import isEqual from 'lodash/isEqual';

import CesiumMapComponent from './map-component';

const assign = (o, ...rest) => Object.assign(o, {}, ...rest);
const { Cesium } = window;

const mapId = `map-${new Date().getTime()}`;

const bindFlyTo = v => (lat, long, z = 15000.0, rest = {}) =>
  v.camera.flyTo(assign({ destination: { x: lat, y: long, z } }, rest));

const disablePanning = (v) => {
  const { scene } = v;
  scene.screenSpaceCameraController.enableRotate = false;
  scene.screenSpaceCameraController.enableTranslate = false;
  scene.screenSpaceCameraController.enableZoom = false;
  scene.screenSpaceCameraController.enableTilt = false;
  scene.screenSpaceCameraController.enableLook = false;
  return v;
};

class CesiumComponent extends Component {
  constructor(props) {
    super(props);
    this.rotatingEvent = false;
    this.state = {
      layers: {},
      viewer: null,
      clickedPosition: null,
      hoverPosition: { x: 0, y: 0 },
    };
  }

  componentDidMount() {
    const { props } = this;
    this.bindMap(Object.assign(props));
    if (props.zoomLevel) this.handleZoom(props.zoomLevel);
  }

  componentWillReceiveProps(props) {
    if (this.props.zoomLevel !== props.zoomLevel) {
      this.handleZoom(props.zoomLevel);
    }
  }

  componentDidUpdate() {
    this.state.clickedPosition = null;
  }

  onMouseClick = (click) => {
    const { onClick } = this.props;
    const { viewer } = this.state;
    if (onClick && viewer) onClick({ clickedPosition: click.position, viewer });
    this.setState({ clickedPosition: click.position });
  }

  onMouseMove = (mouse) => {
    const { onMouseMove } = this.props;
    const { viewer } = this.state;
    if (onMouseMove && viewer) onMouseMove({ hoverPosition: mouse.startPosition, viewer });
    this.setState({ hoverPosition: mouse.startPosition });
  }

  mountMap({ lockNavigation, zoomLevel, imageryProvider }) {
    const mapConfig = {
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      baseLayerPicker: false,
      navigationHelpButton: false,
      animation: false,
      timeline: false,
      creditsDisplay: false,
      fullscreenButton: false,
      skyAtmosphere: false,
      imageryProvider: imageryProvider || new Cesium.BingMapsImageryProvider({
        url: 'https://dev.virtualearth.net',
        key: Cesium.BingMapsApi.defaultKey,
        mapStyle: Cesium.BingMapsStyle.AERIAL,
      }),
    };

    const viewer = (this.state.viewer || new Cesium.Viewer(mapId, mapConfig));
    this.flyTo = bindFlyTo(viewer);

    if (zoomLevel) this.handleZoom(zoomLevel);
    if (lockNavigation) return disablePanning(viewer);
    this.handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    this.handler.setInputAction(
      this.onMouseClick,
      Cesium.ScreenSpaceEventType.LEFT_CLICK,
    );
    this.handler.setInputAction(
      this.onMouseMove,
      Cesium.ScreenSpaceEventType.MOUSE_MOVE,
    );

    this.state.viewer = viewer;
    return viewer;
  }

  bindMap(props) {
    const viewer = this.mountMap(props);
    const layers = Object.keys(this.state.layers).length
      ? this.state.layers
      : viewer.imageryLayers;

    this.setState({
      layers,
      viewer,
    });
  }

  removeRotation() {
    const { viewer } = this.state;
    viewer.clock.onTick.removeEventListener(this.rotate);
    this.rotatingEvent = false;
  }

  handleZoom(zoom) {
    const { state: { viewer } } = this;
    const [zLevel, opts, cameraProps] = zoom;
    if (zLevel && !isEqual(zoom, this.zLevel)) {
      this.flyTo(...zLevel, opts);
      this.zLevel = zoom;
    }

    if (viewer && cameraProps) {
      Object.keys(cameraProps).map((p) => {
        viewer.camera[p] = cameraProps[p];
      });
    }
  }

  rotate = (clock) => {
    const { startTime, currentTime } = clock;
    const { viewer } = this.state;
    const lastNow = startTime.secondsOfDay;
    const now = currentTime.secondsOfDay;
    const spinRate = 0.8;
    const delta = (now - lastNow) / 1000;
    viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, -spinRate * delta);
    clock.startTime.secondsOfDay = now - 1;
  }

  addRotation() {
    const { viewer } = this.state;
    if (this.rotatingEvent) return;
    viewer.clock.onTick.addEventListener(this.rotate);
    this.rotatingEvent = true;
  }

  render() {
    const { props, state } = this;
    const { rotate } = props;
    const {
      layers, viewer, clickedPosition, hoverPosition,
    } = state;
    if (viewer) this[rotate ? 'addRotation' : 'removeRotation']();

    return createElement(CesiumMapComponent, {
      mapId,
      layers,
      viewer,
      clickedPosition,
      hoverPosition,
      ...props,
    });
  }
}

export default CesiumComponent;
