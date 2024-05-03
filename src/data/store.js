import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API 호출을 위한 비동기 함수 생성
export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (pageNo = 1) => {
        const apiUrl = `https://apis.data.go.kr/B551011/KorService1/searchFestival1?numOfRows=12&pageNo=${pageNo}&MobileOS=win&MobileApp=win&_type=json&arrange=Q&eventStartDate=20240401&serviceKey=tkpuYMyOJPiESQhzLecE1EshwjeUNeXfOJY7y8Rku7L2kh5E%2FbSH7NC7CZ1vvthRi72%2FidxEOUL%2FULnq0WWkHw%3D%3D`;

        const response = await axios.get(apiUrl);
        return response.data.response.body.items.item;
    }
);

// 포스트 관리 슬라이스 설정
const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        allPosts: [],
        status: 'idle',
        error: null
    },
    reducers: {
        // 추가 액션을 원할 경우 여기에 추가할 수 있습니다.
    },
    extraReducers: (builder) => {
        // fetchPosts 비동기 액션에 대한 처리
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                const newPosts = action.payload;

                if (state.posts.length === 0) {
                    // 초기 데이터 설정
                    state.posts = newPosts;
                    state.allPosts = newPosts;
                } else {
                    // 중복된 포스트를 제외하고 추가
                    const uniqueNewPosts = newPosts.filter(
                        (post) => !state.allPosts.some((existingPost) => existingPost.contentid === post.contentid)
                    );
                    state.posts = [...state.posts, ...uniqueNewPosts];
                    state.allPosts = [...state.allPosts, ...uniqueNewPosts];
                }
                state.status = 'succeeded';
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

// 스토어 설정
export default configureStore({
    reducer: {
        posts: postsSlice.reducer
    }
});
