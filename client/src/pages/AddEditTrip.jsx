import React, { useState } from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBValidation,
    MDBBtn,
    MDBSpinner
} from 'mdb-react-ui-kit';
import ChipInput from 'material-ui-chip-input';
import FileBase from 'react-file-base64';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const initialState = {
    title: "",
    description: "",
    tags: [],
};

const AddEditTrip = () => {

    const [tripData, setTripData] = useState(initialState);

    const { title, description, tags } = tripData;

    const handleSubmit = e => {
        e.preventDefault();
    };

    const onInputChange = e => {
        const { name, value } = e.target;
        console.log(name, value)
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
                                onChange={onInputChange}
                                className='form-control'
                                required
                                invalid
                                validation='Please provide title'
                            />
                        </div>
                        <div className='col-md-12'>
                            <textarea
                                placeholder='Enter Description'
                                type='text'
                                value={description}
                                name='description'
                                onChange={onInputChange}
                                style={{ height: '100px' }}
                                className='form-control'
                                required
                                invalid
                                validation='Please provide description'
                            />
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