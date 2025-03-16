import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '90%',
};

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
    };
    render() {
        const {google, location} = this.props;

        return (
            <Map
                google={this.props.google}
                zoom={5}
                style={mapStyles}
                initialCenter={{
                    lat: location.latitude,
                    lng: location.longitude
                }}
                center={{
                    lat: location.latitude,
                    lng: location.longitude
                }}
            >
                <Marker
                    name={'ISS'}
                    position={{
                        lat: location.latitude,
                        lng: location.longitude
                    }}
                    icon={{
                        url: 'https://icons.iconarchive.com/icons/goodstuff-no-nonsense/free-space/512/international-space-station-icon.png',
                        anchor: new google.maps.Point(32,32),
                        scaledSize: new google.maps.Size(80,80)
                    }} 
                />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey:process.env.REACT_APP_API_KEY
})(MapContainer);