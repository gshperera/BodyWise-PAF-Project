import { Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'

export const RoutineCard = ({routine}) => {
  return (
    <div>
        <Card className='my-5'>
                                <CardContent>
                                    <h3 className='text-xl font-semibold'>{routine.name}</h3>
                                    <List sx={{ width: '100%', bgcolor: 'background.paper' }} className=''>
                                        <div style={{ display: 'flex', flexWrap: 'wrap' }} className='border p-3 border-[#24a621]'>
                                            {routine.exercises.map((exercise, index) => (
                                                <div key={index} className='mb-3' style={{ width: '50%' }}>
                                                    <strong>{exercise.name}</strong>
                                                    <ListItem className='border ' sx={{ width:'300px'}}>
                                                        <ListItemIcon sx={{ fontSize: 20 }}>🎯sets : </ListItemIcon>
                                                        <ListItemText primary={
                                                            <Typography sx={{ marginTop: '5px', marginLeft: '5px'}}>{exercise.reps}</Typography>
                                                        }/>
                                                        <ListItemIcon sx={{ fontSize: 20 }}>🔥reps : </ListItemIcon>
                                                        <ListItemText primary={
                                                            <Typography sx={{ marginTop: '5px', marginLeft: '5px'}}>{exercise.sets}</Typography>
                                                        }/>
                                                    </ListItem>
          
                                                </div>
                                            ))}
                                        </div>
                                    </List>   
                                </CardContent>
                            </Card>
    </div>
  )
}
