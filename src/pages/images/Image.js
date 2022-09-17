
import React from 'react'
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosRes } from '../../api/axiosDefaults';
import { EditDropdown } from '../../components/Edit';
import Profile from '../../components/Profile';
import { useCurrUser } from '../../contexts/CurrUserContext'

const Image = (props) => {
    const {
        id, 
        owner,
        account_id,
        account_image,
        comments_count,
        kudos_id,
        kudos_count,
        updated_on, 
        description, 
        picture, 
        imagePage, 
        setImages,
    } = props

    const currUser = useCurrUser();
    const is_owner = currUser?.username === owner
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/images/${id}/edit`)
    }

    const handleKudos = async () => {
        try {
            const { data } = await axiosRes.post("/kudos/", { image:id });
            setImages((prevImages) => ({
                ...prevImages,
                results: prevImages.results.map((image) => {
                    return image.id === id
                    ? { ...image, kudos_count: image.kudos_count + 1, kudos_id: data.id }
                    : image;
                }),
            }));

        } catch(err) {
            console.log(err);
            console.log(err.response)
        }
    };

    const handleRemoveKudos = async () => {
        try {
            const { data } = await axiosRes.delete(`/kudos/${kudos_id}`);
            setImages((prevImages) => ({
                ...prevImages,
                results: prevImages.results.map((image) => {
                    return image.id === id
                    ? { ...image, kudos_count: image.kudos_count - 1, kudos_id: null }
                    : image;
                }),
            }));

        } catch(err) {
            console.log(err);
            console.log(err.response)
        }
    };
    

  return (
    <Card>
        <Card.Body> 
            <Media className="align-items-center justify-content-between">
                <Profile src={account_image} height={60}/>
                {owner}<br/>
                {description}
                <div className="d-flex align-items-center">
                {is_owner && imagePage && <EditDropdown handleEdit={handleEdit}/>}
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
                    overlay={<Tooltip>Users can't give kudos to their own image!</Tooltip>}>
                    <i className="fa-regular fa-thumbs-up" />
                    </OverlayTrigger>
                ) : kudos_id ? (<span onClick={handleRemoveKudos}><i className="fa-solid fa-thumbs-up" /></span>
                ) : currUser ? (<span onClick={handleKudos} ><i className="fa-regular fa-thumbs-up" /></span>
                ) : (<OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Log in to give kudos!</Tooltip>}>
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