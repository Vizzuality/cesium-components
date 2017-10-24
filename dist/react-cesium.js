'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var isEqual = _interopDefault(require('lodash/isEqual'));
var uuid = require('uuid');
var includes = _interopDefault(require('lodash/includes'));

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var layerId = function layerId(layer) {
  return layer.type.name + '-' + uuid.v1();
};

var CesiumMap = function (_Component) {
  inherits(CesiumMap, _Component);

  function CesiumMap() {
    classCallCheck(this, CesiumMap);
    return possibleConstructorReturn(this, (CesiumMap.__proto__ || Object.getPrototypeOf(CesiumMap)).apply(this, arguments));
  }

  createClass(CesiumMap, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          cLayers = _props.layers,
          mapId = _props.mapId,
          children = _props.children,
          viewer = _props.viewer,
          clickedPosition = _props.clickedPosition,
          hoverPosition = _props.hoverPosition;

      return React__default.createElement(
        'div',
        { className: className, id: mapId },
        React__default.Children.map(children, function (ch) {
          if (!ch) return null;
          var id = layerId(ch);

          return React.cloneElement(ch, {
            cLayers: cLayers,
            viewer: viewer,
            clickedPosition: clickedPosition,
            hoverPosition: hoverPosition,
            ref: function ref() {
              _this2[id] = Boolean(ch.props.url);
            }
          });
        })
      );
    }
  }]);
  return CesiumMap;
}(React.Component);

var assign = function assign(o) {
  for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  return Object.assign.apply(Object, [o, {}].concat(rest));
};
var _window = window;
var Cesium = _window.Cesium;


var mapId = 'map-' + new Date().getTime();

var bindFlyTo = function bindFlyTo(v) {
  return function (lat, long) {
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 15000.0;
    var rest = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    return v.camera.flyTo(assign({ destination: { x: lat, y: long, z: z } }, rest));
  };
};

var disablePanning = function disablePanning(v) {
  var scene = v.scene;

  scene.screenSpaceCameraController.enableRotate = false;
  scene.screenSpaceCameraController.enableTranslate = false;
  scene.screenSpaceCameraController.enableZoom = false;
  scene.screenSpaceCameraController.enableTilt = false;
  scene.screenSpaceCameraController.enableLook = false;
  return v;
};

var CesiumComponent = function (_Component) {
  inherits(CesiumComponent, _Component);

  function CesiumComponent(props) {
    classCallCheck(this, CesiumComponent);

    var _this = possibleConstructorReturn(this, (CesiumComponent.__proto__ || Object.getPrototypeOf(CesiumComponent)).call(this, props));

    Object.defineProperty(_this, 'onMouseClick', {
      enumerable: true,
      writable: true,
      value: function value(click) {
        _this.setState({ clickedPosition: click.position });
      }
    });
    Object.defineProperty(_this, 'onMouseMove', {
      enumerable: true,
      writable: true,
      value: function value(mouse) {
        _this.setState({ hoverPosition: mouse.startPosition });
      }
    });
    Object.defineProperty(_this, 'rotate', {
      enumerable: true,
      writable: true,
      value: function value(clock) {
        var startTime = clock.startTime,
            currentTime = clock.currentTime;
        var viewer = _this.state.viewer;

        var lastNow = startTime.secondsOfDay;
        var now = currentTime.secondsOfDay;
        var spinRate = 0.8;
        var delta = (now - lastNow) / 1000;
        viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, -spinRate * delta);
        clock.startTime.secondsOfDay = now - 1;
      }
    });

    _this.rotatingEvent = false;
    _this.state = {
      layers: {},
      viewer: null,
      clickedPosition: null,
      hoverPosition: { x: 0, y: 0 }
    };
    return _this;
  }

  createClass(CesiumComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var props = this.props;

      this.bindMap(Object.assign(props));
      if (props.zoomLevel) this.handleZoom(props.zoomLevel);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (this.props.zoomLevel !== props.zoomLevel) {
        this.handleZoom(props.zoomLevel);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.state.clickedPosition = null;
    }
  }, {
    key: 'mountMap',
    value: function mountMap(_ref) {
      var lockNavigation = _ref.lockNavigation,
          zoomLevel = _ref.zoomLevel,
          imageryProvider = _ref.imageryProvider;

      var mapConfig = {
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
          mapStyle: Cesium.BingMapsStyle.AERIAL
        })
      };

      var viewer = this.state.viewer || new Cesium.Viewer(mapId, mapConfig);
      this.flyTo = bindFlyTo(viewer);

      if (zoomLevel) this.handleZoom(zoomLevel);
      if (lockNavigation) return disablePanning(viewer);
      this.handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      this.handler.setInputAction(this.onMouseClick, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      this.handler.setInputAction(this.onMouseMove, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      this.state.viewer = viewer;
      return viewer;
    }
  }, {
    key: 'bindMap',
    value: function bindMap(props) {
      var viewer = this.mountMap(props);
      var layers = Object.keys(this.state.layers).length ? this.state.layers : viewer.imageryLayers;

      this.setState({
        layers: layers,
        viewer: viewer
      });
    }
  }, {
    key: 'removeRotation',
    value: function removeRotation() {
      var viewer = this.state.viewer;

      viewer.clock.onTick.removeEventListener(this.rotate);
      this.rotatingEvent = false;
    }
  }, {
    key: 'handleZoom',
    value: function handleZoom(zoom) {
      var viewer = this.state.viewer;

      var _zoom = slicedToArray(zoom, 3),
          zLevel = _zoom[0],
          opts = _zoom[1],
          cameraProps = _zoom[2];

      if (zLevel && !isEqual(zoom, this.zLevel)) {
        this.flyTo.apply(this, toConsumableArray(zLevel).concat([opts]));
        this.zLevel = zoom;
      }

      if (viewer && cameraProps) {
        Object.keys(cameraProps).map(function (p) {
          viewer.camera[p] = cameraProps[p];
        });
      }
    }
  }, {
    key: 'addRotation',
    value: function addRotation() {
      var viewer = this.state.viewer;

      if (this.rotatingEvent) return;
      viewer.clock.onTick.addEventListener(this.rotate);
      this.rotatingEvent = true;
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props,
          state = this.state;
      var rotate = props.rotate;
      var layers = state.layers,
          viewer = state.viewer,
          clickedPosition = state.clickedPosition,
          hoverPosition = state.hoverPosition;

      if (viewer) this[rotate ? 'addRotation' : 'removeRotation']();

      return React.createElement(CesiumMap, _extends({
        mapId: mapId,
        layers: layers,
        viewer: viewer,
        clickedPosition: clickedPosition,
        hoverPosition: hoverPosition
      }, props));
    }
  }]);
  return CesiumComponent;
}(React.Component);

var _window$1 = window;
var Cesium$1 = _window$1.Cesium;
// use Cesium.defined here?

var notEmpty = function notEmpty(o) {
  return o && o._layers && Boolean(o._layers.length);
};

var formatParams = function formatParams(type, props) {
  var url = props.url,
      layers = props.layers,
      parameters = objectWithoutProperties(props, ['url', 'layers']);


  switch (type) {
    case 'WebMapService':
      return { url: url, layers: layers, parameters: parameters };

    default:
      return props;
  }
};

var ImageProvider = function (_Component) {
  inherits(ImageProvider, _Component);

  function ImageProvider(props) {
    classCallCheck(this, ImageProvider);

    var _this = possibleConstructorReturn(this, (ImageProvider.__proto__ || Object.getPrototypeOf(ImageProvider)).call(this, props));

    _this.layer = null;
    _this.keep = false;
    return _this;
  }

  createClass(ImageProvider, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var cLayers = _ref.cLayers,
          keep = _ref.keep,
          visible = _ref.visible,
          type = _ref.type,
          viewer = _ref.viewer,
          props = objectWithoutProperties(_ref, ['cLayers', 'keep', 'visible', 'type', 'viewer']);

      if (notEmpty(cLayers)) {
        if (!this.layer) {
          var provider = new Cesium$1[type + 'ImageryProvider'](formatParams(type, props));
          provider.errorEvent.addEventListener(function (e) {
            return false;
          });
          this.layer = cLayers.addImageryProvider(provider);
        }
        this.keep = keep;
        this.layer.show = Boolean(visible);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var viewer = this.props.viewer;

      if (!this.keep) viewer.imageryLayers.remove(this.layer);
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return ImageProvider;
}(React.Component);

var _window$2 = window;
var Cesium$2 = _window$2.Cesium;

var ModelProvider = function (_Component) {
  inherits(ModelProvider, _Component);

  function ModelProvider() {
    classCallCheck(this, ModelProvider);
    return possibleConstructorReturn(this, (ModelProvider.__proto__ || Object.getPrototypeOf(ModelProvider)).apply(this, arguments));
  }

  createClass(ModelProvider, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var viewer = this.props.viewer;

      viewer.scene.primitives.remove(this.model);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var _Cesium$Cartesian;

      var viewer = _ref.viewer,
          url = _ref.url,
          coordinates = _ref.coordinates,
          scale = _ref.scale,
          animate = _ref.animate,
          _ref$speed = _ref.speed,
          speed = _ref$speed === undefined ? 1 : _ref$speed;

      if (this.model) return;
      var modelMatrix = Cesium$2.Transforms.eastNorthUpToFixedFrame((_Cesium$Cartesian = Cesium$2.Cartesian3).fromDegrees.apply(_Cesium$Cartesian, toConsumableArray(coordinates)));
      var model = this.model = viewer.scene.primitives.add(Cesium$2.Model.fromGltf({
        url: url,
        modelMatrix: modelMatrix,
        scale: scale
      }));

      if (animate) {
        Cesium$2.when(model.readyPromise).then(function (model) {
          model.activeAnimations.addAll({
            loop: Cesium$2.ModelAnimationLoop.REPEAT,
            speedup: speed
          });
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return ModelProvider;
}(React.Component);

var _window$3 = window;
var Cesium$3 = _window$3.Cesium;

var Billboard = function (_Component) {
  inherits(Billboard, _Component);

  function Billboard() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Billboard);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Billboard.__proto__ || Object.getPrototypeOf(Billboard)).call.apply(_ref, [this].concat(args))), _this), Object.defineProperty(_this, 'handleHover', {
      enumerable: true,
      writable: true,
      value: function value(hoverPosition) {
        var viewer = _this.props.viewer;

        if (!viewer) return false;
        var scene = viewer.scene;

        var pickedObject = scene.pick(hoverPosition);

        viewer.entities.values.map(function (bill) {
          if (!bill.billboard) return bill;
          if (pickedObject) {
            if (pickedObject.id.id === bill.id) {
              bill.billboard.image = bill.imageHover;
            } else {
              bill.billboard.image = bill.image;
            }
          } else {
            bill.billboard.image = bill.image;
          }
        });
      }
    }), Object.defineProperty(_this, 'handleClick', {
      enumerable: true,
      writable: true,
      value: function value(clickedPosition) {
        var _this$props = _this.props,
            viewer = _this$props.viewer,
            onClick = _this$props.onClick,
            id = _this$props.id;

        if (!viewer) return false;
        var scene = viewer.scene;

        var pickedObject = scene.pick(clickedPosition);
        if (Cesium$3.defined(pickedObject) && pickedObject.id.id === id) {
          onClick(pickedObject.id.id);
        }
      }
    }), Object.defineProperty(_this, 'mountBillboard', {
      enumerable: true,
      writable: true,
      value: function value(viewer) {
        var _this$props2 = _this.props,
            id = _this$props2.id,
            image = _this$props2.url,
            imageHover = _this$props2.urlHover,
            width = _this$props2.width,
            height = _this$props2.height,
            _this$props2$position = slicedToArray(_this$props2.position, 2),
            lat = _this$props2$position[0],
            long = _this$props2$position[1];

        if (!viewer) return false;
        _this.entity = viewer.entities.add({
          position: Cesium$3.Cartesian3.fromDegrees(lat, long),
          id: id,
          image: image,
          imageHover: imageHover,
          billboard: {
            image: image,
            imageHover: imageHover,
            width: width,
            height: height
          }
        });
      }
    }), _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Billboard, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref2) {
      var viewer = _ref2.viewer,
          id = _ref2.id,
          clickedPosition = _ref2.clickedPosition,
          hoverPosition = _ref2.hoverPosition;

      if (!viewer) return false;
      var existing = viewer.entities.values.map(function (e) {
        return e.id;
      });
      if (!includes(existing, id)) this.mountBillboard(viewer);
      if (clickedPosition) this.handleClick(clickedPosition);
      if (hoverPosition) this.handleHover(hoverPosition);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var viewer = this.props.viewer;

      viewer.entities.remove(this.entity);
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return Billboard;
}(React.Component);

var index = {
  Map: CesiumComponent,
  ImageProvider: ImageProvider,
  ModelProvider: ModelProvider,
  BillboardProvider: Billboard
};

module.exports = index;
