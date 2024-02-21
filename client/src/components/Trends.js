import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { getPostTrends } from '../actions/post';
import env from "react-dotenv";
import { isEmpty } from './Utils';

const Trends = () => {
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const trendingList = useSelector((state) => state.trendingReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('useEffect Trends is called');
        dispatch(getPostTrends());
    }, [dispatch]);

    const getUsers = () => {
        return [...usersData.filter((user) => user._id !== userData._id), userData];
    }

    return Array.isArray(usersData) ? (
        <div className="trending-container">
            <h4>Trending</h4>
            <NavLink exact="true" to="/trending">
                <ul>
                    {trendingList.length && trendingList?.map((post) => {
                        return (
                            <li key={post._id}>
                                <div>
                                    {post.picture && <img src={env.API_BASE_URL + post.picture} alt="post-pic" />}
                                    {isEmpty(post.picture) && (
                                        <img alt="profil-pic" src={env.API_BASE_URL + getUsers().filter((user) => user._id === post.userId)[0]['picture']} />
                                    )}
                                </div>
                                <div className="trend-content">
                                    <p>{post.message}</p>
                                    <span>Lire</span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </NavLink>
        </div>
    ) : null;
};

export default Trends;