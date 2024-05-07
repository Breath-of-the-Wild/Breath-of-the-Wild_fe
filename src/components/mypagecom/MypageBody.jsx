import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import MypageNav from "./MypageNav";

const MypageBody = () => {
    return(
        <div className="container mx-auto">
            <div className="grid grid-cols-4 gap-4 text-center pt-6">
                <div className="col-1 my-auto">
                <MypageNav />
                </div>
                
{/* 본문 */}
                <div className="col-span-3 py-5">
                <div class="mx-auto max-w-sm rounded overflow-hidden shadow-lg py-5">
                <table className="mx-auto mt-5 mb-5">
                    <tbody >
                        <tr>
                            <td colSpan={2}><BsPersonCircle size={80} color="green" className="mx-auto mb-5"/></td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td>aaaaaaa</td>
                        </tr>
                        <tr>
                            <th>이름</th>
                            <td>aaa</td>
                        </tr>
                        <tr>
                            <th>비밀번호</th>
                            <td>*********</td>
                        </tr>
                    </tbody>
                </table>
                <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-5">
  수정하기
</button>
<hr />
<h4 className="mt-5">탈퇴하기</h4>
</div>
                </div>
            </div>
        </div>
    );


};
export default MypageBody;