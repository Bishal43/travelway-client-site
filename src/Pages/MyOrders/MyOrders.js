import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import'./MyOrders.css'


const MyOrders = () => {
    const {user}=useAuth()
    const email=user.email;
    const [services,setServices] = useState([])
    const [control,setControl] = useState(false)
    useEffect(()=>{
        fetch(`https://warm-shelf-43613.herokuapp.com/myOrders/${email}`)
        .then(res=>res.json())
        .then(data=>setServices(data))
    },[email,control])

    const handleDelete=(id)=>{
        const proceed= window.confirm('Are you sure,you want to cancel the booking???');
        if(proceed){
            fetch(`https://warm-shelf-43613.herokuapp.com/cancelOrder/${id}`,{
                method:'DELETE',
             })
             .then(res=>res.json())
             .then(data=>{
                 if(data.deletedCount){
                    
                    setControl(!control)
                    
                 }
             })
        }
        
       }
    
    return (
        <div className='mb-5'>
            <h2 className='title pt-5'>!!!Booking Details!!!</h2>
            <h3 className='pb-5 pt-3 text-success fs-3'>~Here,you can see only your Bookings~</h3>
            <div className='row container-fluid  booking'>
            {
                services.map((service)=>(
                    <div className='container-fluid col-lg-4 col-md-6 col-12 booked'>
                    <div>
                    <img className='w-100' src={service?.image} alt="" />
                    </div>
                    <h5 className='text-info'>{service?.name}</h5>
                    <h5 className='text-secondary'>Total-Cost: {service?.price}$</h5>
                    <p className='text-primary'>Booking Date: {service?.date}</p>
                    <button className='btn btn-danger  border-0 rounded-pill mb-3' onClick={()=>handleDelete(service?._id)}>Booking Cancel</button>
                     
          </div>
                ))
            }
            </div>
        </div>
    );
};

export default MyOrders;