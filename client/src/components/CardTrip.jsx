import React from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardGroup,
    MDBCardImage,
    MDBCardText,
    MDBCardTitle,
    MDBIcon,
    MDBTooltip,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import exception from '../utility/exception';
import { likeTrip } from '../redux/features/tripSlice';
import { useSelector } from 'react-redux';


const CardTrip = ({ dispatch, imageFile, description, title, tags, _id, name, likes }) => {

    const { user } = useSelector(state => ({ ...state.auth }));

    const userId = user?.result?._id || user?.result?.googleId;

    const handleLikeClick = () => {
        dispatch(likeTrip({ id: _id }));
    };

    const Likes = () => {
        if (likes.length > 0)
            return likes.find(like => like === userId) ? (
                <>
                    <MDBIcon
                        fas
                        size="lg"
                        icon='thumbs-up'
                    />
                    &nbsp;
                    {
                        Likes.length > 2 ? (
                            <MDBTooltip
                                tag='a'
                                title={`You and ${likes.length - 1} other likes`}
                            >
                                {likes.length} Likes
                            </MDBTooltip>
                        ) : (
                            `${likes.length} Like${likes.length > 1 ? 's' : ''}`
                        )
                    }
                </>
            ) : (
                <>
                    <MDBIcon
                        far
                        size="lg"
                        icon='thumbs-up'
                    />
                    &nbsp; {likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
                </>
            )
        return (
            <>
                <MDBIcon
                    far
                    size="lg"
                    icon='thumbs-up'
                />
                &nbsp;Like
            </>
        )
    }

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
                        tags.map(tag => (
                            <Link key={tag} to={`/trips/tag/${tag}`}>
                                {`#${tag} `}
                            </Link>
                        ))
                    }
                    <MDBBtn
                        style={{
                            float: 'right',
                            marginRight: '10px'
                        }}
                        tag='a'
                        color='none'
                        onClick={handleLikeClick}
                    >
                        <Likes />
                    </MDBBtn>
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