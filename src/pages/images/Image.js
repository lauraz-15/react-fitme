import React from 'react'
import { useCurrUser } from '../../contexts/CurrUserContext'

export const Image = (props) => {
    const {
        id, owner, account_id, account_image, comments_count, kudos_count,
        updated_on, description, picture
    } = props

    const currUser = useCurrUser();
    const is_owner = currUser?.username === owner
  return (
    <div>Image placeholder text</div>
  )
}


export default Image