import React from 'react'
import { Card, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Profile from '../../components/Profile';
import { useCurrUser } from '../../contexts/CurrUserContext'

const Image = (props) => {
    const {
        id, owner, account_id, account_image, comments_count, kudos_count,
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
        <span>{updated_on}</span>
        </Link>
        <Card.Body>
    
        </Card.Body>
</Card>
  )
}


export default Image