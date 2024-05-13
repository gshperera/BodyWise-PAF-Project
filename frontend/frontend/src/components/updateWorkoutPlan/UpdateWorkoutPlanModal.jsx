import React, { useState, useEffect } from 'react';
import { Avatar, Backdrop, Box, Button, CircularProgress, IconButton, Modal, TextField } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { uploadToCloudinary } from '../../Utils/uploadToCloudinary';
import { useDispatch} from 'react-redux';
import { updateWorkoutPlanAction } from '../../Redux/WorkoutPlan/workoutplan.action';

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
    minWidth: 400,
};

const customTextField = {
    '& .MuiInputBase-input': { color: 'white' },
    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#24a621' },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#24a621' }
}

export const UpdateWorkoutPlanModal = ({ handleClose, open, workout }) => {
    const [selectedImage, setSelectedImage] = useState();
    const [selectedVideo, setSelectedVideo] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        caption: '',
        image: '',
        video: '',
        routines: []
    });

    const dispatch = useDispatch();

    // useEffect(() => {
    //     const storedWorkout = JSON.parse(localStorage.getItem('workout'));
    //     if (storedWorkout) {
    //         setFormValues({
    //             caption: storedWorkout.caption || '',
    //             image: storedWorkout.image || '',
    //             video: storedWorkout.video || '',
    //             routines: storedWorkout.routines || []
    //         });
    //     }
    // }, []);

    useEffect(() => {
        // Set initial form values from the workout prop
        if (workout) {
            setFormValues({
                caption: workout.caption || '',
                image: workout.image || '',
                video: workout.video || '',
                routines: workout.routines || []
            });
        }
    }, []);

    const handleSelectImage = async (event) => {
        setIsLoading(true);
        const imageUrl = await uploadToCloudinary(event.target.files[0], "image")
        setSelectedImage(imageUrl)
        setIsLoading(false)
        setFormValues({ ...formValues, image: imageUrl }); 
    }
    
    const handleSelectVideo = async (event) => {
        setIsLoading(true);
        const videoUrl = await uploadToCloudinary(event.target.files[0], "video")
        setSelectedVideo(videoUrl)
        setIsLoading(false)
        setFormValues({ ...formValues, video: videoUrl }); 
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    
    const handleSubmit = async () => {
        setIsLoading(true);
        localStorage.setItem('workout', JSON.stringify(formValues)); // Save form values to local storage
        dispatch(updateWorkoutPlanAction(workout.id, formValues)); // Pass both workoutId and formValues
        setIsLoading(false);
        handleClose();
    };
    
    

    const handleAddRoutine = () => {
        setFormValues({
            ...formValues,
            routines: [
                ...formValues.routines,
                { name: "", exercises: [{ name: "", reps: 0, sets: 0 }] }
            ]
        });
    };

    const handleAddExercise = (routineIndex) => {
        const updatedRoutines = [...formValues.routines];
        updatedRoutines[routineIndex].exercises.push({ name: "", reps: 0, sets: 0 });
        setFormValues({ ...formValues, routines: updatedRoutines });
    };

    const handleRemoveRoutine = (routineIndex) => {
        const updatedRoutines = formValues.routines.filter((_, index) => index !== routineIndex);
        setFormValues({ ...formValues, routines: updatedRoutines });
    };

    const handleRemoveExercise = (routineIndex, exerciseIndex) => {
        const updatedRoutines = [...formValues.routines];
        updatedRoutines[routineIndex].exercises = updatedRoutines[routineIndex].exercises.filter((_, index) => index !== exerciseIndex);
        setFormValues({ ...formValues, routines: updatedRoutines });
    };

    const handleRepsChange = (routineIndex, exerciseIndex, value) => {
        const updatedRoutines = [...formValues.routines];
        updatedRoutines[routineIndex].exercises[exerciseIndex].reps = value;
        setFormValues({ ...formValues, routines: updatedRoutines });
    };

    // const handleSubmit = async () => {
    //     setIsLoading(true);
    //     dispatch(updateWorkoutPlanAction(workout.id, formValues));
    //     setIsLoading(false);
    //     handleClose();
    // };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ overflowY: 'scroll' }}
        >
            <Box sx={style}>
                <form>
                    <div>
                        <div className='flex space-x-4 items-center py-2 px-2'>
                            <Avatar />
                            <h2>Want to update your workout plan?</h2>
                        </div>
                        <TextField
                            name="caption"
                            placeholder="Write Title..."
                            value={formValues.caption}
                            onChange={handleChange}
                            className='w-full'
                            sx={{ '& .MuiInputBase-input': { color: 'white' },
                             '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                             '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#24a621' },
                             '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#24a621' } }}
                        />
                        <div className='flex space-x-5 items-center mt-5'>
                            <div>
                                <input type="file" accept="image/*" onChange={handleSelectImage} style={{ display: "none" }} id='image-input' />
                                <label htmlFor='image-input'>
                                    <IconButton sx={{ color: "#24a621" }} component="span">
                                        <ImageIcon />
                                    </IconButton>
                                </label>
                                <span>Image</span>
                            </div>
                            <div>
                                <input type="file" accept="video/*" onChange={handleSelectVideo} style={{ display: "none" }} id='video-input' />
                                <label htmlFor='video-input'>
                                    <IconButton sx={{ color: "#24a621" }} component="span">
                                        <VideoCallIcon />
                                    </IconButton>
                                </label>
                                <span>Video</span>
                            </div>
                        </div>

                        {selectedImage &&
                            <div>
                                <img src={selectedImage} alt="" className='h-[10rem]' />
                            </div>
                        }

                        {/* Routines */}
                        {formValues.routines.map((routine, routineIndex) => (
                            <div key={routineIndex} className="my-3">
                                <div>
                                    Routine Name:
                                    <TextField
                                        name={`routineName${routineIndex}`}
                                        placeholder="Routine Name"
                                        value={routine.name}
                                        onChange={(e) => {
                                            const updatedRoutines = [...formValues.routines];
                                            updatedRoutines[routineIndex].name = e.target.value;
                                            setFormValues({ ...formValues, routines: updatedRoutines });
                                        }}
                                        className='w-full'
                                        sx={{   '& .MuiInputBase-input': { color: 'white' },
                                                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#24a621' },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#24a621' } }}
                                    />
                                </div>
                                
                                Exercise:
                                {routine.exercises.map((exercise, exerciseIndex) => (
                                    <div key={exerciseIndex} className='p-2 m-2 border border-slate-600'>
                                        <TextField
                                            name={`exerciseName${routineIndex}_${exerciseIndex}`}
                                            placeholder="Exercise Name"
                                            value={exercise.name}
                                            onChange={(e) => {
                                                const updatedRoutines = [...formValues.routines];
                                                updatedRoutines[routineIndex].exercises[exerciseIndex].name = e.target.value;
                                                setFormValues({ ...formValues, routines: updatedRoutines });
                                            }}
                                            className='w-[70%]'
                                            sx={{   '& .MuiInputBase-input': { color: 'white' },
                                                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#24a621' },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#24a621' } }}
                                        />
                                        <div className='flex p-4'>
                                        <div className='flex flex-col'>
                                        Reps:
                                        <TextField
                                            name={`reps${routineIndex}_${exerciseIndex}`}
                                            placeholder="Repetitions"
                                            type="number"
                                            value={exercise.reps}
                                            onChange={(e) => handleRepsChange(routineIndex, exerciseIndex, parseInt(e.target.value, 10))}
                                            sx={{   '& .MuiInputBase-input': { color: 'white' },
                                                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#24a621' },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#24a621' } }}
                                        />
                                        </div>
                                        <div className='flex flex-col'>
                                        Sets:
                                        <TextField
                                            name={`sets${routineIndex}_${exerciseIndex}`}
                                            placeholder="Sets"
                                            type="number"
                                            value={exercise.sets}
                                            onChange={(e) => {
                                                const updatedRoutines = [...formValues.routines];
                                                updatedRoutines[routineIndex].exercises[exerciseIndex].sets = parseInt(e.target.value);
                                                setFormValues({ ...formValues, routines: updatedRoutines });
                                            }}
                                            sx={{   '& .MuiInputBase-input': { color: 'white' },
                                                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#24a621' },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#24a621' } }}
                                        />
                                        </div>
                                        </div>
                                        <IconButton sx={{color:"red"}} onClick={() => handleRemoveExercise(routineIndex, exerciseIndex)}><RemoveCircleIcon/><p className='text-sm'>Remove Exercise</p></IconButton>
                                        {/* <Button onClick={() => handleRemoveExercise(routineIndex, exerciseIndex)}>Remove Exercise</Button> */}
                                    </div>
                                ))}
                                <div className='flex justify-between pl-4'>
                                <IconButton sx={{color: "#24a621"}} onClick={() => handleAddExercise(routineIndex)}>
                                    <AddCircleIcon/><p className='text-sm'>Add Exercise</p>
                                </IconButton>
                                {/* <Button onClick={() => handleAddExercise(routineIndex)}>Add Exercise</Button> */}
                                <IconButton sx={{color: "red"}} onClick={() => handleRemoveRoutine(routineIndex)} className='border'>
                                    <RemoveCircleIcon/><p className='text-sm'>Remove Routine</p>
                                </IconButton>
                                {/* <Button onClick={() => handleRemoveRoutine(routineIndex)}>Remove Routine</Button> */}
                                </div>
                            </div>
                        ))}
                        <div className='border w-[175px] border-[#24a621] px-4'>
                            <IconButton sx={{color: "#24a621"}} onClick={handleAddRoutine} className='border'><AddCircleIcon/><p className='text-sm'>Add Routine</p></IconButton>
                        </div>
                        {/* <Button onClick={handleAddRoutine}>Add Routine</Button> */}
                        <div className='flex w-full justify-end'>
                            <Button variant='error'sx={{backgroundColor:"red"}} onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="success" style={{ backgroundColor: '#24a621'}} className='fw-bold my-5 border' onClick={handleSubmit}>
                                Update
                            </Button>
                        </div>
                    </div>
                </form>
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading} onClick={handleClose}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Box>
        </Modal>
    );
};
