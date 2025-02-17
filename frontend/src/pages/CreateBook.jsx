import React, { useState } from 'react'
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBook = () => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title, author, publishedYear
    };
    axios.post('http://localhost:5555/books', data).then((response) => {
      setLoading(false);
      enqueueSnackbar("Book created successfully", { variant: 'success' });
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
      <h1 className='text-3xl my-4'>Create a Book</h1>
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
            (<button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>
              Save
            </button>)
        }

      </div>
    </div>
  )
}

export default CreateBook