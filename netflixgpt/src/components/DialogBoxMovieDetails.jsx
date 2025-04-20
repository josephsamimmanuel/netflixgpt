// DialogBoxMovieDetails.jsx

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';


function DialogBoxMovieDetails({ movie, open, onClose }) {
    console.log(movie);
    return (
        <Dialog open={open} onClose={onClose}>

            <DialogTitle className='text-black font-bold text-2xl bg-red-200'>Title: {movie?.title}</DialogTitle>
            {/* <IconButton onClick={onClose} className='absolute top-0 right-0'>
                <CloseIcon />
            </IconButton> */}
            <DialogContent>
                <div className='flex flex-col gap-2 mt-2 p-2'>
                    <p className='text-black '><b>Overview:</b> {movie?.overview}</p>
                    <p className='text-black '><b>Release Date:</b> {movie?.release_date}</p>
                    <p className='text-black '><b>Vote Average:</b> {movie?.vote_average}</p>
                    <p className='text-black '><b>Vote Count:</b> {movie?.vote_count}</p>
                    <p className='text-black '><b>Popularity:</b> {movie?.popularity}</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DialogBoxMovieDetails;
