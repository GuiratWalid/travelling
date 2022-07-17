import React from 'react';
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import exception from '../utility/exception';


const RelatedTrips = ({ relatedTrips, tripId }) => {



    return (
        <>
            {
                relatedTrips?.length > 0 &&
                (
                    <>
                        {relatedTrips.length > 1 && <h4>Related Trips</h4>}
                        <MDBRow className="row-cols-1 row-cols-md-3 g-4 mb-1">
                            {
                                relatedTrips
                                    .filter(item => item._id !== tripId)
                                    .splice(0, 3)
                                    .map(item =>
                                    (
                                        <MDBCol key={item._id}>
                                            <MDBCard>
                                                <Link to={`/trip/${item._id}`}>
                                                    <MDBCardImage
                                                        src={item.imageFile}
                                                        alt={item.title}
                                                        position='top'
                                                        style={{
                                                            maxHeight: '250px'
                                                        }}
                                                    />
                                                </Link>
                                                <span className='text-start tag-card'>
                                                    {
                                                        item.tags.map(tag =>
                                                        (
                                                            <Link key={tag} to={`/trips/tag/${tag}`}>
                                                                #{tag}
                                                            </Link>
                                                        )
                                                        )
                                                    }
                                                </span>
                                                <Link to={`/trip/${item._id}`}>
                                                    <MDBCardBody>
                                                        <MDBCardTitle
                                                            className='text-start'
                                                        >
                                                            {item.title}
                                                        </MDBCardTitle>
                                                        <MDBCardText
                                                            className='text-start'
                                                        >
                                                            {exception(item.description)}
                                                        </MDBCardText>
                                                    </MDBCardBody>
                                                </Link>
                                            </MDBCard>
                                        </MDBCol>
                                    )
                                    )
                            }
                        </MDBRow>
                    </>
                )
            }
        </>
    );
};


export default RelatedTrips;