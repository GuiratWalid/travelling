import React from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardGroup,
    MDBCardImage,
    MDBCardText,
    MDBCardTitle,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';


const CardTrip = ({ imageFile, description, title, tags, _id, name }) => {

    const exception = str => {
        if (str?.length > 45)
            str = str.substring(0, 45) + " ...";
        return str;
    };

    return (
        <MDBCardGroup>
            <MDBCard
                className="h-100 mt-2 d-sm-dlex"
                style={{ maxWidth: '20rem' }}
            >
                <MDBCardImage
                    src={imageFile}
                    alt={title}
                    position='top'
                    style={{
                        maxWidth: '100%',
                        height: '200px'
                    }}
                />
                <div className="top-left">
                    {name}
                </div>
                <span className="text-start tag-card">
                    {
                        tags.map(item => `#${item} `)
                    }
                </span>
                <MDBCardBody>
                    <MDBCardTitle
                        className='text-start'
                    >
                        {title}
                    </MDBCardTitle>
                    <MDBCardText
                        className='text-start'
                    >
                        {
                            exception(description)
                        }
                    </MDBCardText>
                    <Link to={`/trip/${_id}`}>
                        Read More
                    </Link>
                </MDBCardBody>
            </MDBCard>
        </MDBCardGroup>
    );
};


export default CardTrip;