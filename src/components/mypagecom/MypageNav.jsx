import React from "react";
import { BsCalendarCheckFill } from "react-icons/bs";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const MypageNav = () => {
    return (
        <div className="mx-auto my-auto">
            <ul>
                <li className="mb-5 text-center block border border-white rounded hover:border-gray-200 text-green-500 hover:bg-green-200 py-2 px-4">
                    <Link to={"/Mypage"} className="flex items-center">
                        <BsFillPersonFill size={30} color="green"/>
                        <span className="ml-2">내 정보</span>
                    </Link>
                </li>
                <li className="mb-5 text-center block border border-white rounded hover:border-gray-200 text-green-500 hover:bg-green-200 py-2 px-4">
                    <Link to={"/Favorite"} className="flex items-center">
                        <BsFillBookmarkHeartFill size={30} color="green"/>
                        <span className="ml-2">찜한 캠핑장</span>
                    </Link>
                </li>
                <li className="mb-5 text-center block border border-white rounded hover:border-gray-200 text-green-500 hover:bg-green-200 py-2 px-4">
                    <Link to={'/Schedule'} className="flex items-center">
                        <BsCalendarCheckFill size={30} color="green"/>
                        <span className="ml-2">일정 관리</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};
export default MypageNav;