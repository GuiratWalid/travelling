import React, { useEffect } from 'react';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTypography,
} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { getTrips } from '../redux/features/tripSlice';
import CardTrip from '../components/CardTrip';
import Spinner from '../components/Spinner';


const Home = () => {

    const { trips, loading } = useSelector(state => ({ ...state.trip }));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTrips());
    }, [dispatch]);

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
            }}
        >
            <MDBRow className='mt-5'>
                {
                    trips.length === 0 && (
                        <MDBTypography
                            className='text-center mb-0'
                            style={{ marginTop: '200px' }}
                            tag="h2"
                        >
                            No Trips Found
                        </MDBTypography>
                    )
                }
            </MDBRow>
            <MDBCol>
                <MDBContainer>
                    <MDBRow className='row-cols-1 row-cols-md-3 g-2'>
                        {
                            trips?.map(({ imageFile, description, title, tags, _id, name }) =>
                                <CardTrip
                                    key={_id}
                                    title={title}
                                    imageFile={imageFile}
                                    description={description}
                                    tags={tags}
                                    _id={_id}
                                    name={name}
                                />
                            )
                        }
                    </MDBRow>
                </MDBContainer>
            </MDBCol>
        </div>
    );
};


export default Home;