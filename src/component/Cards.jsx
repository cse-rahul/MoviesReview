import React, { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import ReactStars from 'react-stars'
import { getDocs } from 'firebase/firestore'
import { moviesRef } from '../firebase/firebase'
import { Link } from 'react-router-dom'

const Cards = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getData() {
      setLoading(true)
      const data = await getDocs(moviesRef);
      data.forEach((doc) => {
        setData((prv) => [...prv, { ...(doc.data()), id: doc.id }])
      })
      setLoading(false);
    }
    getData();
  }, [])

  return (

    <div className='flex flex-wrap justify-between p-3 mt-2'>
      {loading ? <div className='flex w-full justify-center items-center h-96'><ThreeDots height={40} color='white' /></div> :

        data.map((e, i) => {
          return (

            <Link to={`detail/${e.id}`}><div key={i} className='card font-medium shadow-lg p-2 maxWPhone md:max-w-fit hover:-translate-y-3 cursor-pointer mt-6 md:mt-9 transition-all duration-500'>
              <img className='h-40 md:h-72 w-48' src={e.image} alt="" />

              <h1>{e.title}</h1>

              <h1 className='flex items-center'><span className='text-gray-400'>Rating:</span> 
              <ReactStars size={20} half={true} value={e.rating/e.rated} edit={false} /></h1>

              <h1><span className='text-gray-400'>Year:</span> {e.year}</h1>
            </div>
            </Link>

          )
        })


      } 



    </div>
  )
}

export default Cards