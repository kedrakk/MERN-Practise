import React, { useState } from 'react'
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

const DeleteBook = () => {

  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = () => {
    axios.delete(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setLoading(false);
        enqueueSnackbar("Book deleted successfully", { variant: 'success' });
        navigate('/');
      }).catch((error) => {
        setLoading(false);
        console.log(error);
        enqueueSnackbar("Error", { variant: 'error' });
      });
  };


  return (
    <div className='p-4'> 
      <BackButton />
      <h1 className='text-3xl my-4'>Delete a Book</h1>

      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure to delete this book?</h3>
        {
          loading? (<Spinner />):
          (
            <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDelete}>Yes, Delete it</button>
          )
        }
      </div>
    </div>
  )
}

export default DeleteBook