import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import React, { useState } from 'react'
import { green } from '@mui/material/colors';
import { formatDistanceToNow } from 'date-fns';
import { RoutineCard } from './RoutineCard';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../Redux/store';
import { createCommentAction, deleteWorkoutPlanAction, likeWorkoutPlanAction, updateWorkoutPlanAction } from '../../Redux/WorkoutPlan/workoutplan.action';
import { isLikedByReqUser, isPostOwner } from '../../Utils/idLikedByReqUser';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { UpdateWorkoutPlanModal } from '../updateWorkoutPlan/UpdateWorkoutPlanModal';

export const WorkoutPlanCard = ({workout}) => {
    if (!workout || workout.length === 0) {
        return <div>No workout plans available</div>;
      }

    const {auth} = useSelector(store => store)

    const [showComments, setShowComments] = useState(false)

    const handleShowComment = () => setShowComments(!showComments)

    const [openUpdateModal, setOpenUpdateModal] = useState(false);

    const handleUpdateModalOpen = () => {
        setOpenUpdateModal(true);
    };
    const handleUpdateModalClose = () => {
        setOpenUpdateModal(false);
    };

    const handleLike = ()=>{
        dispatch(likeWorkoutPlanAction(workout.id))
    }

    // Convert the provided timestamp to a Date object
    const createdTime = new Date(workout.createdTime);
    // Format the distance to now in a human-readable format
    const createdTimeAgo = formatDistanceToNow(createdTime, { addSuffix: true });

    const dispatch = useDispatch();
    const handleCreateComment = (message) =>{
        const reqData = {
            workoutId: workout.id,
            data: {
                message
            }
        }
        dispatch(createCommentAction(reqData))
    }
    
    const isOwner = isPostOwner(auth.user.id, workout);
    // console.log("IS OWNERE>>>>>>>", isOwner)
    // console.log("is like..........", isLikedByReqUser(auth.user.id, workout))
    // console.log("user id", auth.user.id)

    // console.log("is like..........", isLikedByReqUser(auth.user.id.id, workout));

    // Function to handle click on MoreVertIcon
    const handleMoreOptionsClick = (event) => {
        // Prevent the default behavior of the event (e.g., opening a context menu)
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDelete = () => {
        dispatch(deleteWorkoutPlanAction(workout.id));
    };
 
  return (

            <Card className='m-7 my-10'>
                <CardHeader
                    avatar={
                    <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
                        {workout.creator && workout.creator.fname ? workout.creator.fname.charAt(0).toUpperCase() : 'U'}
                    </Avatar>
                    }
                    action={
                        <>
                            <IconButton onClick={handleMoreOptionsClick}>
                                <MoreVertIcon />
                            </IconButton>
                            {isOwner && (
                                <>
                                    <IconButton onClick={handleDelete}>
                                        <DeleteIcon/>
                                    </IconButton>
                                    <IconButton onClick={handleUpdateModalOpen}>
                                        <UpdateIcon />
                                    </IconButton>
                                    <UpdateWorkoutPlanModal handleClose={handleUpdateModalClose} open={openUpdateModal} workout={workout} />
                                </>
                            )}
                        </>
                   
                    }
                    title={<p className='font-bold'>{workout.creator ? `${workout.creator.fname} ${workout.creator.lname}` : 'Unknown'}</p>}
                    subheader={createdTimeAgo}
                />
                
                {workout.image &&
                    <CardMedia
                    component="img"
                    height="194"
                    // image="https://cdn.pixabay.com/photo/2017/08/07/14/02/man-2604149_1280.jpg"
                    image={workout.image}
                    alt="Paella dish"
                />

                }


                <CardContent>
                    <h1 className='text-xl font-bold'>{workout.caption}</h1>
                  
                    <div className=''>
                        {workout.routines.map((routine, index) => (<RoutineCard key={index} routine={routine}/>))}
                    </div>
                </CardContent>
                <CardActions disableSpacing>
                    <div>
                        <IconButton color={true ? "error" : "default"} onClick={handleLike}>
                            {isLikedByReqUser(auth.user.id, workout) && auth.user.id !== workout.creator.id ?<FavoriteIcon />:<FavoriteBorderIcon/>}
                        </IconButton>
                        <IconButton onClick={handleShowComment}>
                            <CommentIcon/>
                        </IconButton>
                    </div>

                </CardActions>

                {showComments &&
                    <section style={{backgroundColor: '#272727', color: 'white'}}>
                    <div className='flex items-center space-x-5 mx-3 my-5 py-2'>
                        <Avatar sx={{ bgcolor: green[500] }}/>
                        <input type="text" name="" id="" className='w-full outline-none bg-transparent border border-[#24a621] rounded-full px-5 py-2' placeholder='Write your comment...' onKeyPress={(e)=>{ if(e.key == 'Enter'){
                            console.log("enter key pressed", e.target.value)
                            handleCreateComment(e.target.value)
                        }}}/>
                    </div>
                    <Divider/>
                    <div className='mx-3 space-y-2 my-2 text-xs'>
                        {workout.comments.map((comment) =>
                        
                            <div key={comment.id} className='flex justify-between items-center py-2'>
                                <div className='flex items-center space-x-5'>
                                    <Avatar sx={{height:"2rem", width:"2rem", fontSize:".8rem"}}>{comment.user.fname[0].toUpperCase()}</Avatar>
                                    <p>{comment.message}</p>
                                </div>
                            </div>)}
                    </div>
                </section>
                }
                        </Card>

  )
}
