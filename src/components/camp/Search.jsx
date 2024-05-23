import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Search = () => {
  const [searchType, setSearchType] = useState('facltNm');
  const [searchValue, setSearchValue] = useState('');

  return (
<div className="col flex items-center justify-center">
  <select
    className="rounded-md w-40 h-10 pl-3"
    value={searchType}
    onChange={(e) => setSearchType(e.target.value)}
  >
    <option value="facltNm">캠핑장 이름</option>
    <option value="addr1">지역</option>
    {/* Add more options as needed */}
  </select>
  <input
    className="rounded-md w-80 h-10 pl-3 ml-2"
    type="text"
    placeholder="검색 값을 입력해주세요"
    value={searchValue}
    onChange={(e) => setSearchValue(e.target.value)}
  />
  <Link
    to={`/SearchPage/${searchType}/${searchValue}`}
    className="rounded-md w-10 h-10 bg-white ml-2 flex items-center justify-center"
  >
    검색
  </Link>
</div>
  );
};

export default Search;
