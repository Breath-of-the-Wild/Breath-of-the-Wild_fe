import React, { useState } from 'react';
import axios from 'axios';

const ReviewWrite = () => {
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [formData, setFormData] = useState({
        subject: '',
        message: ''
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const data = new FormData(); // FormData 객체 생성
            data.append('image', image); // 이미지 파일 추가
            data.append('subject', formData.subject);
            data.append('message', formData.message);

            await axios.post('http://example.com/api/reviews', data);
            alert('리뷰 작성이 완료되었습니다.');
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('리뷰를 제출하지 못했습니다. 나중에 다시 시도해주세요.');
        }
    };


return (
    <div className="my-6" >
        <div className="grid sm:grid-cols-2 items-center gap-16 p-8 mx-auto max-w-4xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md text-[#333] font-[sans-serif]">
             <div className=" justify-self-end">
                
                {previewImage && (<img src={previewImage} alt="Preview" style={{ width: '200px', height: 'auto', marginRight: '75px'  }} />)}
                
            </div>
          
            <form className="ml-auo space-y-5">
            <div className="grid sm:grid-cols-2 items-center gap-16 p-8 mx-auto max-w-4xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md text-[#333] font-[sans-serif]">
            <div>
                <h1 className="text-3xl font-extrabold whitespace-nowrap" >Please write a review.</h1>
                <p className="text-sm text-gray-400 mt-3 whitespace-nowrap">리뷰를 작성해주세요.</p>
                
            </div>
            </div>
                {/* <input type='text' placeholder='Name'
                    className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]" /> */}
                <input type='text' placeholder='제목'
                    className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]" />
        <input type="file" onChange={handleImageChange} className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"/>
                
                <textarea placeholder='리뷰를 작성해주세요.' rows="6"
                    className="w-full rounded-md px-4 border text-sm pt-2.5 outline-[#007bff]"></textarea>
                <button onClick={handleSubmit}
                    className="text-white bg-[#171717] hover:bg-blue-600 font-semibold rounded-md text-sm px-4 py-2.5 w-full">Send</button>
            </form>
        </div>
    </div>
)
}
export default ReviewWrite;