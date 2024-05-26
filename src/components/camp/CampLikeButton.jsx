import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Font Awesome icons for heart
import { API_URLS } from '@/api/apiConfig';
const CampLikeButton = ({ campId, memberemail }) => {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        // Check if the user has already liked this camp
        const checkIfLiked = async () => {
            try {
                const response = await axios.post(API_URLS.CAMP_LIKES_LIKED, {
                    contentId: campId,
                    email: memberemail
                });
                setLiked(response.data.liked);
            } catch (error) {
                console.error("Error checking like status", error);
            }
        };

        checkIfLiked();
    }, [campId, memberemail]);

    const handleLikeToggle = async () => {
        
        try {
            if (liked) {
                await axios.post(API_URLS.CAMP_LIKES_UNLIKE, {
                    contentId: campId,
                    email: memberemail
                });
            } else {
                await axios.post(API_URLS.CAMP_LIKES_LIKE, {
                    contentId: campId,
                    email: memberemail
                });
            }
            setLiked(!liked);
        } catch (error) {
            console.error("Error toggling like", error);
        }
    };

    return (
        <div onClick={ handleLikeToggle} >
            {liked ? <FaHeart color="red" size={24} /> : <FaRegHeart color="grey" size={24} />}
        </div>
    );
};

export default CampLikeButton;