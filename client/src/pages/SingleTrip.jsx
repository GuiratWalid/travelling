import React, { useEffect } from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardImage,
    MDBContainer,
    MDBIcon,
} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRelatedTrips, getTrip } from '../redux/features/tripSlice';
import moment from 'moment';
import Spinner from '../components/Spinner';
import RelatedTrips from '../components/RelatedTrips';


const SingleTrip = () => {

    const dispatch = useDispatch();

    const { trip, loading, relatedTrips } = useSelector(state => ({ ...state.trip }));

    const { id } = useParams();

    const tags = trip?.tags;

    useEffect(() => {
        tags && dispatch(getRelatedTrips(tags));
    }, [dispatch, tags]);

    useEffect(() => {
        dispatch(getTrip(id));
    }, [dispatch, id]);

    if (loading) {
        return (
            <div style={{ marginTop: '180px' }}>
                <Spinner />
            </div>
        );
    }

    return (
        <div style={{ marginTop: '85px' }}>
            < MDBContainer >
                <MDBCard
                    className='mb-3 lt-2'
                >
                    <MDBCardImage
                        position='top'
                        style={{
                            width: '100%',
                            maxHeight: '600px'
                        }}
                        src={trip?.imageFile}
                        alt={trip?.title}
                    />
                    <MDBCardBody>
                        <h3>{trip?.title}</h3>
                        <span>
                            <p className='text-start tripName'>Created By: {trip?.name}</p>
                        </span>
                        <div style={{ float: 'left' }}>
                            <span className="text-end">
                                {trip?.tags?.map(item => `#${item} `)}
                            </span>
                        </div>
                        <br />
                        <MDBCardText className='text-start mt-2'>
                            <MDBIcon
                                style={{
                                    float: 'left',
                                    margin: '5px',
                                }}
                                far
                                icon='calendar-alt'
                                size='lg'
                            />
                            <small className='text-muted'>
                                {moment(trip?.createdAt).fromNow()}
                            </small>
                        </MDBCardText>
                        <MDBCardText className='lead mb-0 text-start'>
                            {
                                trip?.description
                            }
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
                <RelatedTrips
                    relatedTrips={relatedTrips}
                    tripId={id}
                />
            </MDBContainer >
        </div >
    );
};


export default SingleTrip;