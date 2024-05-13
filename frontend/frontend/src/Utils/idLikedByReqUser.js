export const isLikedByReqUser = (reqUserId, workout)=>{
    for(let user of workout.like){
        // if(reqUserId === user.id){
        //     return true
        // }
        // console.log(user.id.toString());
        // console.log("...",reqUserId.toString())
        // console.log("************************************")
        if(user.id.toString() == reqUserId.toString()){
            console.log(">>>>>>>>>same user");
            return true;
        }
    }
    return false
}

export const isPostOwner = (loggedInUserId, workout) => {
    // Check if the IDs match
    if (workout.creator && workout.creator.id && loggedInUserId) {
        const creatorId = typeof workout.creator.id === 'object' ? workout.creator.id.timestamp : workout.creator.id;
        const userId = typeof loggedInUserId === 'object' ? loggedInUserId.timestamp : loggedInUserId;
        return userId.toString() === creatorId.toString();
    }
    return false;
};


