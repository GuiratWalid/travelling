import React, { useEffect } from 'react';
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBCol,
    MDBRow,
    MDBIcon,
    MDBCardGroup,
} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteTrip, getTripsByUser } from '../redux/features/tripSlice';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import exception from '../utility/exception';


const Dashboard = () => {

    const dispatch = useDispatch();

    const { user } = useSelector(state => ({ ...state.auth }));

    const { userTrips, loading } = useSelector(state => ({ ...state.trip }));

    const userId = user?.result?._id;

    useEffect(() => {
        user && dispatch(getTripsByUser(userId));
    }, [userId, user, dispatch]);

    if (loading) {
        return (
            <div style={{ marginTop: '180px' }}>
                <Spinner />
            </div>
        );
    }

    const handleDelete = id => {
        if (window.confirm('Are you sure you want to delete this trip ?')) {
            dispatch(deleteTrip({ id, toast }));
        }
    };

    return (
        <div
            style={{
                margin: 'auto',
                padding: '120px',
                maxWidth: '900px',
                alignContent: 'center',
            }}
        >
            <h4 className='text-center'>
                Dashboard: {user?.result?.name}
            </h4>
            <hr style={{ maxWidth: '570px' }} />
            {userTrips?.map(item => (
                <MDBCardGroup
                    key={item._id}>
                    <MDBCard
                        style={{ maxWidth: '600px' }}
                        className='mt-2'
                    >
                        <MDBRow className='g-0'>
                            <MDBCol md="4">
                                <MDBCardImage
                                    className="rounded"
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
                                            marginLeft: '5px',
                                            float: 'right',
                                            marginTop: '-60px',
                                        }}
                                    >
                                        <MDBBtn
                                            className='mt-1'
                                            tag='div'
                                            color='none'
                                        >
                                            <MDBIcon
                                                fas
                                                icon='trash'
                                                style={{ color: '#dd4b39' }}
                                                size='lg'
                                                onClick={() => handleDelete(item._id)}
                                            />
                                            <Link to={`/editTrip/${item._id}`}>
                                                <MDBIcon
                                                    fas
                                                    icon='edit'
                                                    style={{
                                                        color: '#55acee',
                                                        marginLeft: '10px',
                                                    }}
                                                    size='lg'
                                                />
                                            </Link>
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


export default Dashboard;