import GoogleMapReact from "google-map-react";
import locationImg from "../../assets/img/location.svg";
const Map = ({ location, zoomLevel }) => {
  const LocationPin = ({ text }) => (
    <div className="pin">
      <img style={{ height: "30px" }} src={locationImg} alt="" />
    </div>
  );
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: "AIzaSyD0WWiNlzh-2VqDHBcWY5HlHSVk7FOcfdk" }}
      defaultCenter={location}
      defaultZoom={zoomLevel}
    >
      <LocationPin
        lat={location.lat}
        lng={location.lng}
        text={location.address}
      />
    </GoogleMapReact>
  );
};
export default Map;
