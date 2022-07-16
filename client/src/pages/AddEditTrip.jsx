import React, { useState } from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBValidation,
    MDBBtn,
    MDBSpinner,
    MDBInput,
} from 'mdb-react-ui-kit';
import ChipInput from 'material-ui-chip-input';
import FileBase from 'react-file-base64';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTrip, updateTrip } from '../redux/features/tripSlice';


const initialState = {
    title: "",
    description: "",
    tags: [],
};

const AddEditTrip = () => {

    const [tripData, setTripData] = useState(initialState);

    const [tagErrMsg, setTagErrMsg] = useState(null);

    const { error, loading, userTrips } = useSelector(state => ({ ...state.trip }));

    const { user } = useSelector(state => ({ ...state.auth }));

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { title, description, tags } = tripData;

    const { id } = useParams();

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    useEffect(() => {
        if (id) {
            const singleTrip = userTrips.find(trip => trip._id === id);
            setTripData({ ...singleTrip });
        }
    }, [id, userTrips]);

    const handleSubmit = e => {
        e.preventDefault();
        if (!tags.length) {
            setTagErrMsg('Please provide some tags');
        }
        if (title && description && tags) {
            const updatedTripData = {
                ...tripData,
                tags: [...tripData.tags],
                name: user?.result?.name,
            };
            if (!id)
                dispatch(createTrip({ updatedTripData, navigate, toast }))
            else
                dispatch(updateTrip({ id, updatedTripData, toast, navigate }))
            handleClear();
        }
    };

    const onInputChange = e => {
        const { name, value } = e.target;
        setTripData({ ...tripData, [name]: value });
    };

    const handleAddTag = tag => {
        setTagErrMsg(null);
        setTripData({ ...tripData, tags: [...tripData.tags, tag] })
    };

    const handleDeleteTag = tag => {
        setTripData({ ...tripData, tags: tripData.tags.filter(item => item !== tag) });
    };

    const handleClear = () => {
        setTripData(initialState);
    };

    return (
        <div
            style={{
                margin: 'auto',
                padding: '15px',
                maxWidth: '450px',
                alignContent: 'center',
                marginTop: '120px'
            }}
            className='container'
        >
            <MDBCard alignment='center'>
                <h5>{id ? 'Update Trip' : 'Add Trip'}</h5>
                <MDBCardBody>
                    <MDBValidation
                        onSubmit={handleSubmit}
                        className='row g-3'
                        noValidate
                    >
                        <div className='col-md-12'>
                            <MDBInput
                                label='Title'
                                placeholder='Enter Title'
                                type='text'
                                value={title}
                                name='title'
                                onChange={onInputChange}
                                className='form-control'
                                required
                                invalid
                                validation="Please tap description"
                            />
                        </div>
                        <div className='col-md-12'>
                            <MDBInput
                                label='Description'
                                placeholder='Enter Description'
                                className='form-control'
                                value={description}
                                name='description'
                                onChange={onInputChange}
                                style={{
                                    height: '100px'
                                }}
                                textarea
                                required
                                invalid
                                rows={4}
                                validation="Please tap description"
                            />
                        </div>
                        <div className="col-md-12">
                            <ChipInput
                                label='Tags'
                                variant='outlined'
                                placeholder='Enter Tag'
                                fullWidth
                                value={tags}
                                onAdd={tag => handleAddTag(tag)}
                                onDelete={tag => handleDeleteTag(tag)}
                            />
                            {tagErrMsg && (
                                <div className="tagErrMsg">
                                    {tagErrMsg}
                                </div>
                            )}
                        </div>
                        <div className="d-flex justify-content-start">
                            <FileBase
                                type='file'
                                multiple={false}
                                onDone={(({ base64 }) => setTripData({ ...tripData, imageFile: base64 }))}
                            />
                        </div>
                        <div className="col-12">
                            <MDBBtn style={{ width: '100%' }}>
                                {
                                    loading && (
                                        <MDBSpinner
                                            size='sm'
                                            role='status'
                                            tag='span'
                                            className='me-2'
                                        />
                                    )
                                }
                                {id ? 'Update' : 'Submit'}
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                    <div className="col-12">
                        <MDBBtn
                            style={{ width: '100%' }}
                            className='mt-2'
                            color='danger'
                            onClick={handleClear}
                        >
                            Clear
                        </MDBBtn>
                    </div>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
};


export default AddEditTrip;