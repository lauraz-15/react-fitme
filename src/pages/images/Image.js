import React from 'react'
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Profile from '../../components/Profile';
import { useCurrUser } from '../../contexts/CurrUserContext'

const Image = (props) => {
    const {
        id, owner, account_id, account_image, comments_count, kudos_id, kudos_count,
        updated_on, description, picture, imagePage
    } = props

    const currUser = useCurrUser();
    const is_owner = currUser?.username === owner

  return (
    <Card>
        <Card.Body> 
            <Media className="align-items-center justify-content-between">
                <Profile src={account_image} height={60}/>
                {owner}<br/>
                {description}
                <div className="d-flex align-items-center">
                {is_owner && imagePage && "..."}
                </div>
            </Media>
        </Card.Body>
        
        <Link to={`/images/${id}`}>
        <Card.Img src={picture} alt={description} />
        </Link>
        <Card.Body className="align-items-center justify-content-between">
        
        <Media className="align-items-center justify-content-between">
                <div>
                {is_owner ? (<OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>You can't like your own post!</Tooltip>}>
                    <i className="fa-regular fa-thumbs-up" />
                    </OverlayTrigger>
                ) : kudos_id ? (<span><i className="fa-solid fa-thumbs-up" /></span>
                ) : currUser ? (<span><i className="fa-regular fa-thumbs-up" /></span>
                ) : (<OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Log in to like posts!</Tooltip>}>
                    <i className="fa-regular fa-thumbs-up" />
                    </OverlayTrigger>)}
                {kudos_count}
                <Link to={`/images/${id}`}><i className="fa-regular fa-comment" /></Link>
                {comments_count}
                </div>    
                <div className="d-flex align-items-center">
                {updated_on}
                </div>
            </Media>
        </Card.Body>
</Card>
  )
}


export default Image