import React, { Component } from 'react'
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import MapContainer from "../MapContainer"

class LocationContainer extends Component {
  constructor(){
    super();

    this.state = {
      location: ""

    }
  }
  // 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBpS9m_h_obP2J-O-x3-P2HaEZP1yo7CPU&callback=initMap'


  render() {
    return (
        <div className="locationContainer">
          <MapContainer
            freelancerResults={this.props.freelancerResults}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
    );
  }
}




export default LocationContainer;
