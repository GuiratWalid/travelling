import React, { useEffect } from 'react';
import {
    MDBCard,
    MDBCardText,
    MDBCardTitle,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBCardGroup
} from 'mdb-react-ui-kit';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getTripsByTag } from '../redux/features/tripSlice';


const TagTrips = () => {

    const { tag } = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { tagTrips, loading } = useSelector(state => ({ ...state.trip }));

    useEffect(() => {
        if (tag)
            dispatch(getTripsByTag(tag));
    }, [tag]);

    if (loading) {
        return (
            <div style={{ marginTop: '180px' }}>
                <Spinner />
            </div>
        );
    }

    return (
        <div
            style={{
                margin: 'auto',
                padding: '15px',
                maxWidth: '1000px',
                alignContent: 'center',
                marginTop: '100px'
            }}
        >
            <h3 className="text-center">
                Trips wih tag: {tag}
            </h3>
            <hr style={{ maxWidth: '570px' }} />
            {tagTrips?.map(item => (
                <MDBCardGroup key={item._id}>
                    <MDBCard
                        style={{ maxWidth: '600px' }}
                        className='mt-2'
                    >
                        <MDBRow className='g-0'>
                            <MDBCol md='4'>
                                <MDBCardImage
                                    className='rounded'
                                    src={item.imageFile}
                                    alt={item.title}
                                />
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </MDBCardGroup>
            ))}
        </div>
    );
};


export default TagTrips;