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
import { getTrip } from '../redux/features/tripSlice';
import moment from 'moment';


const SingleTrip = () => {

    const dispatch = useDispatch();

    const { trip } = useSelector(state => ({ ...state.trip }));

    const { id } = useParams();

    useEffect(() => {
        dispatch(getTrip(id));
    }, []);

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
                            maxHeight: '600px',
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
            </MDBContainer >
        </div >
    );
};


export default SingleTrip;