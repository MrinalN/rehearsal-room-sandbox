import React, { Fragment } from "react";

import { Button } from '../Button/Button'
import AmenitiesList from './AmenitiesList'
import OpeningHoursTable from "./OpeningHoursTable";
import PopUp from './PopUp'
import MapSection from './DynamicMap'
import PhotoGrid from './PhotoGrid'


export default function Space_Show(props) {

  
  const popUpMsg = `Your request for ${props.spaceData.title} has been sent to ${props.spaceData.first_name} ${props.spaceData.organization_name ? `from ${props.spaceData.organization_name}` : ""}`

  return (  
    <Fragment>
      { props.popUp &&
        <PopUp 
          className="popup"
          header="Request Sent!"
          body={popUpMsg}
          yesButton="Check My Bookings"
          yesButtonFunc={props.yesButtonFunc}
          noButton="Go back to listing"
          noButtonFunc={props.noButtonFunc}
          >
        <p className="popup-content">Request Made!</p>
        </PopUp> 
      }

      <div className="space-container">

        <div className="space-banner">
          <div className="title">
            <h1 className="">{props.spaceData.title}</h1>
            <h3 className="">{props.spaceData.city}</h3>
          </div>
          <div className="price-wrapper">
            { props.user_email == props.spaceData.email ?
              <div className=""><Button size="large" label="Go to my Spaces" onClick={() => props.reroute('/dashboard')}/></div> 
              :
              <div className=""><Button size="large" label="Make a Request" onClick={() => props.setVisualMode("REQUEST_FORM")}/></div> 
            
            }
            { props.spaceData.price_per_day == 0 ?
              <div>
                <p className="free">Free</p>
              </div> 
              :
              <div>
                <p>Price per day: ${props.spaceData.price_per_day / 100}</p>
                <p>Price per hour: ${props.spaceData.price_per_hour / 100}</p>
              </div> 
            }
          </div>
        </div>

        <div className="space-body">
          <div className="map-img-cont">
            <div className="photos">
              <div className="space-photo-cont">
                <img className="space-photo" src={props.spaceData.cover_photo_url} alt="property"></img>
              </div>
              <PhotoGrid smallImgUrls={props.smallImgUrls}/> 
            </div>
            { props.spaceData.address && <MapSection location={{address: props.spaceData.address, lat: props.spaceData.latitude, lng: props.spaceData.longitude}} zoomLevel={13} /> }
          </div>
          <div className="contact-info">
            { props.spaceData.organization_name && <div>Affiliated organization: {props.spaceData.organization_name}</div> }
            <div>Contact: {props.spaceData.first_name} {props.spaceData.last_name}, {props.spaceData.email}</div>
          </div>

          <div className="space-info">
            <div className="space-desc">
              <p>{props.spaceData.description}</p>
            </div>
            <div className="space-features">
              <h3>Features:</h3>
              <AmenitiesList spaceData={props.spaceData}/>
            </div>
          </div>

          <OpeningHoursTable/>

          <div className="mrg-med"><Button size="large" label="Go Back to Listings" onClick={()=> props.reroute('/spaces/vancouver')}></Button></div>
        </div>

      </div>
      
    </Fragment>
  )
}
