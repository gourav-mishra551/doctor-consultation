import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Categories = () => {
    const [result, SetResult] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    const FetchData = async () => {
        try {
            const res = await axios.get("https://api.assetorix.com/ah/api/v1/dc/user/Category")
            SetResult(res.data.data)
        } catch (error) {
                if(error){
                    setError(error.message)
                }
        }
    }

    useEffect(() => {
        FetchData()
       
    }, [])
    return (
        <>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[30px]'>
                <div className='flex flex-col sm:flex-row gap-3 justify-between max-w-5xl mx-auto mb-8'>
                    <p className="sm:text-4xl text-2xl font-bold tracking-wider sm:text-start text-center capitalize text-[#1c8e81]">Top Specialties</p>
                    <div className='flex justify-center items-center'>
                        <NavLink to='/categories'>
                            <button className='sm:w-[250px] w-full sm:h-[60px] h-[50px] rounded-lg bg-[#1c8e81] text-white font-semibold hover:bg-green-400 transition ease-in-out duration-300'>View All Services</button>
                        </NavLink>
                    </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8'>
                    {result?.map((item) => (

                        <div key={item._id} className="categories mt-[50px] cursor-pointer"
                            onClick={() => navigate(`/CategoriesDetails/${item._id}`, { state: { title: item.title } })}>
                            <div className="cardio h-[300px] flex flex-col justify-center items-center bg-[#e4f8f6] rounded-3xl hover:bg-white hover:border-2 hover:border-[#1c8e81] transition-all ease-in-out duration-300 hover:-translate-y-2">
                                <div className='bg-white h-[110px] w-[110px] flex justify-center items-center rounded-full shadow translate-y-[-64px]'>
                                    <div className="cardio-logo h-[100px] w-[100px] rounded-full bg-gray-200 flex justify-center items-center ">
                                        <img src={item.image} className='w-[65px]' alt={item.specialtyName} />
                                    </div>
                                </div>
                                <div className='translate-y-[-24px]'>
                                    <p className='font-bold text-xl text-center'>{item.specialtyName}</p>
                                </div>
                                <div className='p-4'>
                                    <p className='px-2 sm:px-5 text-md text-center font-semibold'>{item.sortDescription}</p>

                                </div>
                            </div>
                        </div>

                    ))}
                </div>

            </div>

        </>
    )
}

export default Categories;
