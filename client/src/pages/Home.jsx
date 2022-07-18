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
import Pagination from '../components/Pagination';
import { setCurrentPage } from '../redux/features/tripSlice';
import { useLocation } from 'react-router-dom';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {

    const { trips, loading, currentPage, numberOfPages } = useSelector(state => ({ ...state.trip }));

    const dispatch = useDispatch();

    const query = useQuery();

    const searchQuery = query.get('searchQuery');

    const location = useLocation();

    useEffect(() => {
        dispatch(getTrips(currentPage));
    }, [dispatch, currentPage]);

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
                    trips.length === 0 && location.pathname === '/' && (
                        <MDBTypography
                            className='text-center mb-0'
                            style={{ marginTop: '200px' }}
                            tag="h2"
                        >
                            No Trips Found
                        </MDBTypography>
                    )
                }
                {
                    trips.length === 0 && location.pathname !== '/' && (
                        <MDBTypography
                            className='text-center mb-0'
                            style={{ marginTop: '200px' }}
                            tag="h2"
                        >
                            We couldn't find any matches for '{searchQuery}'
                        </MDBTypography>
                    )
                }
                <MDBCol>
                    <MDBContainer>
                        <MDBRow className='row-cols-1 row-cols-md-3 g-2'>
                            {
                                trips?.map(({ imageFile, description, title, tags, _id, name, likes }) =>
                                    <CardTrip
                                        key={_id}
                                        title={title}
                                        imageFile={imageFile}
                                        description={description}
                                        tags={tags}
                                        _id={_id}
                                        name={name}
                                        likes={likes}
                                        dispatch={dispatch}
                                    />
                                )
                            }
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
            {
                trips?.length > 0 && (
                    <Pagination
                        setCurrecntPage={setCurrentPage}
                        currentPage={currentPage}
                        dispatch={dispatch}
                        numberOfPages={numberOfPages}
                    />
                )
            }
        </div>
    );
};


export default Home;