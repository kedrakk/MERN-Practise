import React, { useState, useEffect } from 'react'
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const UpdateBook = () => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`).then((response) => {
      var responseData = response.data;
      setTitle(responseData.title);
      setAuthor(responseData.author);
      setPublishedYear(responseData.publishedYear);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }, []);

  const handleEditBook = () => {
    const data = {
      title, author, publishedYear
    };
    axios.put(`http://localhost:5555/books/${id}`, data).then((response) => {
      setLoading(false);
      enqueueSnackbar("Book updated successfully", { variant: 'success' });
      navigate('/');
    }).catch((error) => {
      setLoading(false);
      console.log(error);
      enqueueSnackbar("Error", { variant: 'error' });
    })
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Update a Book</h1>
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>

        <div className='my-4'>
          <label className='text-xl mr-4 text-grey-500'>Title</label>
          <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 border-grey-500 px-4 py-2 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-grey-500'>Author</label>
          <input type='text' value={author} onChange={(e) => setAuthor(e.target.value)} className='border-2 border-grey-500 px-4 py-2 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-grey-500'>Published Year</label>
          <input type='text' value={publishedYear} onChange={(e) => setPublishedYear(e.target.value)} className='border-2 border-grey-500 px-4 py-2 w-full' />
        </div>

        {
          loading ?
            (<Spinner />) :
            (<button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
              Save
            </button>)
        }

      </div>
    </div>
  )
}

export default UpdateBook