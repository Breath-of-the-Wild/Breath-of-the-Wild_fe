import React from "react";
import MypageNav from "./MypageNav";

const FavoriteBody = () => {
    return(
        <div className="container mx-auto">
            <div className="grid grid-cols-4 gap-4 text-center pt-6">
                <div className="col-1 my-auto">
                <MypageNav />
                </div>
                
{/* 본문 */}
                <div className="col-span-3 my-auto py-5">
                    <div className="grid grid-cols-4 gap-5">
                        <div class="rounded overflow-hidden shadow-lg" >
                            <img className="w-full" src="img/camp/camp1.jpg" />
                            <div class="px-6 py-4">
                                <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                            </div>
                        </div>
                        <div class="rounded overflow-hidden shadow-lg" >
                            <img className="w-full" src="img/camp/camp1.jpg" />
                            <div class="px-6 py-4">
                                <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                            </div>
                        </div>
                        <div class="rounded overflow-hidden shadow-lg" >
                            <img className="w-full" src="img/camp/camp1.jpg" />
                            <div class="px-6 py-4">
                                <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                            </div>
                        </div>
                        <div class="rounded overflow-hidden shadow-lg" >
                            <img className="w-full" src="img/camp/camp1.jpg" />
                            <div class="px-6 py-4">
                                <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                            </div>
                        </div>
                        <div class="rounded overflow-hidden shadow-lg" >
                            <img className="w-full" src="img/camp/camp1.jpg" />
                            <div class="px-6 py-4">
                                <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                            </div>
                        </div>
                        <div class="rounded overflow-hidden shadow-lg" >
                            <img className="w-full" src="img/camp/camp1.jpg" />
                            <div class="px-6 py-4">
                                <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                            </div>
                        </div>                    
                    </div>
                </div>
            </div>
        </div>
    );


};
export default FavoriteBody;