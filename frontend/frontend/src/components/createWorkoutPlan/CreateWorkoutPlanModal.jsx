import { Avatar, Backdrop, Box, Button, Card, CardContent, CircularProgress, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Modal, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import ImageIcon from '@mui/icons-material/Image';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { uploadToCloudinary } from '../../Utils/uploadToCloudinary';
import { useDispatch } from 'react-redux';
import { createWorkoutPlanAction } from '../../Redux/WorkoutPlan/workoutplan.action';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#242424',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
    width: '50%',
    minWidth: 400
  };

export const CreateWorkoutPlanModal = ({handleClose, open}) => {
    const [selectedImage, setSelectedImage] = useState();
    const [selectedVideo, setSelectedVideo] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    
    const handleSelectImage = async(event)=>{
        
        setIsLoading(true);
        const imageUrl = await uploadToCloudinary(event.target.files[0], "image")
        setSelectedImage(imageUrl)
        console.log("image---------------", imageUrl)
        setIsLoading(false)
        formik.setFieldValue("image", imageUrl)
    }

    const handleSelectVideo = async(event)=>{
        setIsLoading(true);
        const videoUrl = await uploadToCloudinary(event.target.files[0], "video")
        setSelectedVideo(videoUrl)
        setIsLoading(false)
        formik.setFieldValue("video", videoUrl)
    }

    const formik = useFormik({
        initialValues: {
            caption: "",
            image: "",
            video: "",
            routines: [
                {
                    name: "", 
                    exercises: [
                        {
                            name: "", 
                            reps: 0, 
                            sets: 0, 
                        }
                    ]
                }
            ]
        },
        onSubmit: (values) => {
            console.log("formik values.....", values); // Check if values are correct here
            dispatch(createWorkoutPlanAction(values)); // Ensure the correct action is dispatched
        }
    });
    

    // -------------------------------------------------------
    // const [routineDetails, setRoutineDetails] = useState([{ id: 1, exercises: [{ id: 1 }] }]);

    const handleAddRoutine = () => {
        formik.setFieldValue("routines", [
            ...formik.values.routines,
            { name: "", exercises: [{ name: "", reps: 0, sets: 0 }] }
        ]);
    };
    
    
    //   const handleAddExercise = (routineIndex) => {
    //     const newExercise = { id: routineDetails[routineIndex].exercises.length + 1 };
    //     const updatedRoutineDetails = [...routineDetails];
    //     updatedRoutineDetails[routineIndex].exercises.push(newExercise);
    //     setRoutineDetails(updatedRoutineDetails);
    //   };
    const handleAddExercise = (routineIndex) => {
        const updatedRoutines = [...formik.values.routines];
        updatedRoutines[routineIndex].exercises.push({ name: "", reps: 0, sets: 0 });
        formik.setFieldValue("routines", updatedRoutines);
    };

    // const handleRemoveRoutine = (routineIndex) => {
    //     const updatedRoutines = [...formik.values.routines];
    //     updatedRoutines.splice(routineIndex, 1);
    //     formik.setFieldValue("routines", updatedRoutines);
    // };
      
    //   const handleRemoveExercise = (routineIndex, exerciseIndex) => {
    //     const updatedRoutines = [...formik.values.routines];
    //     updatedRoutines[routineIndex].exercises.splice(exerciseIndex, 1);
    //     formik.setFieldValue("routines", updatedRoutines);
    // };
    const handleRemoveRoutine = (routineIndex) => {
    const updatedRoutines = formik.values.routines.filter((_, index) => index !== routineIndex);
    formik.setFieldValue("routines", updatedRoutines);
};
    
const handleRemoveExercise = (routineIndex, exerciseIndex) => {
    const updatedRoutines = [...formik.values.routines];
    updatedRoutines[routineIndex].exercises = updatedRoutines[routineIndex].exercises.filter((_, index) => index !== exerciseIndex);
    formik.setFieldValue("routines", updatedRoutines);
};

const handleRepsChange = (routineIndex, exerciseIndex, value) => {
    const updatedRoutines = [...formik.values.routines];
    updatedRoutines[routineIndex].exercises[exerciseIndex].reps = value;
    formik.setFieldValue(`routines[${routineIndex}].exercises[${exerciseIndex}].reps`, value);
};


    
      

      //-------------------------------------------------

    // const [routineDetails, setRoutineDetails] = useState([{ id: 1, exercises: [{ id: 1 }] }]);

    // const handleAddRoutine = () => {
    //     const newRoutineDetails = [...routineDetails, { id: routineDetails.length + 1, exercises: [{ id: 1 }] }];
    //     setRoutineDetails(newRoutineDetails);
    //   };
    
    //   const handleAddExercise = (routineIndex) => {
    //     const newExercise = { id: routineDetails[routineIndex].exercises.length + 1 };
    //     const updatedRoutineDetails = [...routineDetails];
    //     updatedRoutineDetails[routineIndex].exercises.push(newExercise);
    //     setRoutineDetails(updatedRoutineDetails);
    //   };
  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflowY: 'scroll' }}
      >
        <Box sx={style}>
          <form action="" onSubmit={formik.handleSubmit}>
            <div>
                <div className='flex space-x-4 items-center p-2 '>
                    <Avatar />
                    <h2>Share your new workout plan with others...</h2>
                </div>

                <input type="text" name="caption" id="caption" placeholder='Write Title...' value={formik.values.caption} onChange={formik.handleChange} className='border w-full my-2 px-4 py-2' />

                {/* <Card className='my-5' sx={{backgroundColor:'black', color:'white'}}>
                    <CardContent>
                        <input type="text" name="routines" id="" placeholder='Enter your Routine' value={formik.values.routens} onChange={formik.handleChange}/>
                        <List sx={{ width: '100%' }} className=''>
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                <div className='mb-3' style={{ width: '50%' }}>
                                    <input type="text" name="exercises" id="" placeholder='Enter the Exercise' value={formik.values.exercises} onChange={formik.handleChange}/>
                                    <ListItem className='border ' sx={{ width:'300px', color:'white'}}>
                                        <ListItemIcon sx={{ fontSize: 20 , color:'white'}}>🎯sets : </ListItemIcon>
                                        <ListItemText primary={
                                            <input sx={{ marginTop: '5px', marginLeft: '5px'}} type='number'></input>
                                        }/>
                                        <ListItemIcon sx={{ fontSize: 20, color: 'white' }}>🔥reps : </ListItemIcon>
                                        <ListItemText primary={
                                            <input sx={{ marginTop: '5px', marginLeft: '5px'}} type='number'></input>
                                        }/>
                                    </ListItem>
                                </div>
                            </div>
                        </List>   
                    </CardContent>
                </Card> */}

                <div className='flex space-x-5 items-center mt-5'>
                    <div>
                        <input type="file" accept="image/*" onChange={handleSelectImage} style={{display: "none"}} id='image-input'/>
                        <label htmlFor='image-input'>
                            <IconButton sx={{color:"#24a621"}} component="span">
                                <ImageIcon/>
                            </IconButton>
                        </label>
                        <span>Image</span>
                    </div>
                    <div >
                        <input type="file" accept="video/*" onChange={handleSelectVideo} style={{display: "none"}} id='video-input'/>
                        <label htmlFor='video-input'>
                            <IconButton sx={{color: "#24a621"}} component="span">
                                <VideoCallIcon/>
                            </IconButton>
                        </label>
                        <span>Video</span>
                    </div>
                </div>

                {selectedImage &&
                    <div>
                        <img src={selectedImage} alt="" className='h-[10rem]'/>
                    </div>
                }

                {/* -------------------newlye addedd --------------------------------------*/}
                {formik.values.routines.map((routine, routineIndex) => (
              <div key={routineIndex} className="mb-3 border border-slate-500 p-4" style={{borderRadius:"10px"}}>
                <div className='mb-2'>
                    <label htmlFor={`routineName${routineIndex}`}>Routine Name : </label>
                    <input className='p-2 w-[70%] ml-4'
                        type="text" 
                        id={`routineName${routineIndex}`} 
                        placeholder="Enter your routine"
                        value={routine.name}
                        onChange={(e) => {
                            const updatedRoutines = [...formik.values.routines];
                            updatedRoutines[routineIndex].name = e.target.value;
                            formik.setFieldValue("routines", updatedRoutines);
                        }} />
                  </div>
                {/* <Form.Group controlId={`routineName${routine.id}`}>
                  <Form.Label>Routine Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your routine" />
                </Form.Group> */}
                {routine.exercises.map((exercise, exerciseIndex) => (
                  <div key={exerciseIndex}>
                    <div className='mb-2 '>
                        <label htmlFor={`exerciseName${routineIndex}_${exerciseIndex}`}>Exercise Name : </label>
                        <input 
                            className='p-2 w-[70%] ml-4'
                            type="text" 
                            id={`exerciseName${routineIndex}_${exerciseIndex}`}
                            placeholder="Enter your exercise"
                            value={exercise.name} 
                            onChange={(e) => {
                            const updatedRoutines = [...formik.values.routines];
                            updatedRoutines[routineIndex].exercises[exerciseIndex].name = e.target.value;
                            formik.setFieldValue("routines", updatedRoutines);
                        }}/>
                    </div>
                    <div >
                        <label htmlFor={`reps${routineIndex}_${exerciseIndex}`}>Reps: </label>
                        <input
                            className='border px-2 ml-5 w-12'
                            type="number"
                            id={`reps${routineIndex}_${exerciseIndex}`}
                            placeholder="Enter Number of Repetitions"
                            value={exercise.reps}
                            onChange={(e) => handleRepsChange(routineIndex, exerciseIndex, parseInt(e.target.value, 10))}
                        />
                    </div>
                    <div>
                        <label htmlFor={`sets${routineIndex}_${exerciseIndex}`}>Sets: </label>
                        <input
                            className='border px-2 ml-6 w-12'
                            type="number"
                            id={`sets${routineIndex}_${exerciseIndex}`}
                            placeholder="Enter Number of Sets"
                            value={exercise.sets}
                            onChange={(e)=>{
                            const updatedRoutines = [...formik.values.routines];
                            updatedRoutines[routineIndex].exercises[exerciseIndex].sets = parseInt(e.target.value)
                            formik.setFieldValue("routines", updatedRoutines);
                        }}
                        // onChange={(e) => handleSetsChange(routineIndex, exerciseIndex, parseInt(e.target.value, 10))}
                        />
                        <br/>
                    {/* Remove Exercise Button */}
                    {exerciseIndex > 0 && (
                        // <button onClick={() => handleRemoveExercise(routineIndex, exerciseIndex)}>Remove Exercise</button>
                        <IconButton sx={{color:"red"}} onClick={() => handleRemoveExercise(routineIndex, exerciseIndex)}><RemoveCircleIcon/><p className='text-sm'>Remove Exercise</p></IconButton>
                    )}
                </div>
            </div>
        ))}
       {/* Add Exercise Button */}
       {/* <button onClick={() => handleAddExercise(routineIndex)}>Add Exercise</button> */}
       <IconButton sx={{color: "#24a621"}} onClick={() => handleAddExercise(routineIndex)}>
            <AddCircleIcon/><p className='text-sm'>Add Exercise</p>
        </IconButton>

{/* Remove Routine Button */}
{routineIndex > 0 && (
    <IconButton sx={{color: "red"}} onClick={() => handleRemoveRoutine(routineIndex)} className='border'>
    <RemoveCircleIcon/><p className='text-sm'>Remove Routine</p>
</IconButton>
    // <button onClick={() => handleRemoveRoutine(routineIndex)}>Remove Routine</button>
)}
    </div>
))}
<div className='border w-[175px] border-[#24a621] px-4'>
                            <IconButton sx={{color: "#24a621"}} onClick={handleAddRoutine} className='border'><AddCircleIcon/><p className='text-sm'>Add Routine</p></IconButton>
                        </div>
{/* <Button onClick={handleAddRoutine}>
    Add Routine
</Button> */}
            {/* -------------------------------------------------------------------------------------------- */}

                <div className='flex w-full justify-end'>
                <Button
    variant='contained'
    onClick={() => {
        formik.handleSubmit();
        handleClose(); // Close the modal after submitting
    }}
    sx={{borderRadius:"10px", bgcolor:"#24a621"}}
>
    Create
</Button>
                </div>
            </div>
          </form>

          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading} onClick={handleClose}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
    </Modal>
  )
}
