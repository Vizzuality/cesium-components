# Cesium components

A WIP attempt to wrap Cesium.js library APIs in React components

## Current State

At the moment we have a base component `<Map>` that will take inner children and feed them the `viewer` dependency as props.
From there on sky is the limit :).

## Services

There is a carto service that contains an async action to be called and reavted upon to hidrate carto related tiles upon data receival.

## Upcoming changes

Camera movement should be abstracted into an Component that receives the camera state as props and reacts to changes internally.

Some of the components still hold some of the specifics of the app they where coded on.
