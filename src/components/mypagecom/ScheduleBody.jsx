import React from "react";
import MypageNav from "./MypageNav";
import CustomCalendar from "@/calendarcom/Calendar";

const ScheduleBody = () => {
    return(
        <div className="container mx-auto">
            <div className="grid grid-cols-4 gap-4 text-center pt-6">
                <div className="col-1 my-auto">
                <MypageNav />
                </div>
                
{/* 본문 */}
                <div className="col-span-3 py-5 flex mx-auto">
                    <CustomCalendar />
                    <div className="ml-5">
                        <table className="border-separate border border-spacing-5">
                            <thead>
                                <th></th>
                                <th>일정 제목</th>
                                <th>날짜</th>
                                <th>내용</th>
                            </thead>
                            <tbody>
                                <td><input type="checkbox"></input></td>
                                <td>캠핑 계획 짜기</td>
                                <th>2024.05.01 ~ 2024.05.05</th>
                                <th> - </th>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );


};
export default ScheduleBody;
