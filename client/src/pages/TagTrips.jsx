import React, { useEffect } from 'react';
import {
    MDBCard,
    MDBCardText,
    MDBCardTitle,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBCardGroup,
    MDBCardBody,
    MDBBtn
} from 'mdb-react-ui-kit';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getTripsByTag } from '../redux/features/tripSlice';
import exception from '../utility/exception';


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
                padding: '120px',
                maxWidth: '900px',
                alignContent: 'center'
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
                                    fluid
                                    style={{
                                        maxHeight: '250px',
                                        margin: '5px',
                                    }}
                                />
                            </MDBCol>
                            <MDBCol md="8">
                                <MDBCardBody>
                                    <MDBCardTitle className='text-start'>
                                        {item.title}
                                    </MDBCardTitle>
                                    <MDBCardText className='text-start'>
                                        <small className='text-muted'>
                                            {exception(item.description)}
                                        </small>
                                    </MDBCardText>
                                    <div
                                        style={{
                                            float: 'right',
                                            marginTp: '-10px'
                                        }}
                                    >
                                        <MDBBtn
                                            size='sm'
                                            rounded
                                            color='info'
                                            onClick={() => navigate(`/trip/${item._id}`)}
                                        >
                                            Read More
                                        </MDBBtn>
                                    </div>
                                </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </MDBCardGroup>
            ))}
        </div>
    );
};


export default TagTrips;