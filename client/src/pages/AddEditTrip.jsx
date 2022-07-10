import React, { useState } from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBValidation,
    MDBBtn,
    MDBSpinner,
    MDBInput
} from 'mdb-react-ui-kit';
import ChipInput from 'material-ui-chip-input';
import FileBase from 'react-file-base64';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTrip } from '../redux/api';


const initialState = {
    title: "",
    description: "",
    tags: [],
};

const AddEditTrip = () => {

    const [tripData, setTripData] = useState(initialState);

    const { error, loading } = useSelector(state => ({ ...state.trip }));

    const { user } = useSelector(state => ({ ...state.auth }));

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { title, description, tags } = tripData;

    const [validTitle, setValidTitle] = useState(false);

    const [validDescription, setValidDescription] = useState(false);

    const [submit, setSubmit] = useState(false);

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    const handleSubmit = e => {
        e.preventDefault();
        setSubmit(true);
        if (title && description && tags) {
            const updatedTripData = {
                ...tripData,
                tags: [...tripData.tags],
                name: user?.result?.name,
            };
            dispatch(createTrip({ updatedTripData, navigate, toast }))
            handleClear();
            setSubmit(false);
        }
    };

    const onInputChange = e => {
        const { name, value } = e.target;
        setTripData({ ...tripData, [name]: value });
    };

    const handleAddTag = tag => {
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
                <h5>Add Trip</h5>
                <MDBCardBody>
                    <MDBValidation
                        onSubmit={handleSubmit}
                        className='row g-3'
                        noValidate
                    >
                        <div className='col-md-12'>
                            <input
                                placeholder='Enter Title'
                                type='text'
                                value={title}
                                name='title'
                                onChange={e => {
                                    onInputChange(e);
                                    e.target.value ? setValidTitle(true) : setValidTitle(false);
                                }
                                }
                                style={{
                                    marginBottom: (submit && !validTitle) ? '5px' : '0'
                                }}
                                className='form-control'
                                required
                            />
                            {
                                submit && !validTitle && <p
                                    style={{
                                        color: '#fb3b1e',
                                        textAlign: 'left',
                                        fontSize: '14px',
                                        marginTop: '0',
                                        marginBottom: '0',
                                        padding: '0'
                                    }}
                                >
                                    Please provide title
                                </p>
                            }
                        </div>
                        <div className='col-md-12'>
                            <textarea
                                placeholder='Enter Description'
                                className='form-control'
                                value={description}
                                name='description'
                                onChange={e => {
                                    onInputChange(e);
                                    e.target.value ? setValidDescription(true) : setValidDescription(false);
                                }
                                }
                                style={{
                                    height: '100px',
                                    marginBottom: (submit && !validDescription) ? '5px' : '0'
                                }}
                                required
                            // invalid
                            // validation='Please provide description'
                            />
                            {
                                submit && !validDescription && <p
                                    style={{
                                        color: '#fb3b1e',
                                        textAlign: 'left',
                                        fontSize: '14px',
                                        marginTop: '0',
                                        marginBottom: '0',
                                        padding: '0'
                                    }}
                                >
                                    Please provide description
                                </p>
                            }
                        </div>
                        <div className="col-md-12">
                            <ChipInput
                                name='tags'
                                variant='outlined'
                                placeholder='Enter Tag'
                                fullWidth
                                value={tags}
                                onAdd={tag => handleAddTag(tag)}
                                onDelete={tag => handleDeleteTag(tag)}
                            />
                        </div>
                        <div className="d-flex justify-content-start">
                            <FileBase
                                type='file'
                                multiple={false}
                                onDone={(({ base64 }) => setTripData({ ...tripData, imageFile: base64 }))}
                            />
                        </div>
                        <div className="col-12">
                            <MDBBtn style={{ width: '100%' }}>Submit</MDBBtn>
                            <MDBBtn
                                style={{ width: '100%' }}
                                className='mt-2'
                                color='danger'
                                onClick={handleClear}
                            >
                                Clear
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
};


export default AddEditTrip;