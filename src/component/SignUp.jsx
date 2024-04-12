import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import app from '../firebase/firebase'
import swal from 'sweetalert'
import { usersRef } from '../firebase/firebase'
import { addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import bcrypt from 'bcryptjs'



const auth = getAuth(app);


const SignUp = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        mobile: "",
        password: "",


    })
    const [loading, setLoading] = useState(false)
    const [otpSent, setOtpSent] = useState(false)
    const [OTP, setOTP] = useState("")


    const generateRecaptha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
            }


        }, auth);
    }

    const requestOtp = () => {
        setLoading(true);
        generateRecaptha();
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                swal({
                    text: "OTP Sent",
                    icon: "success",
                    buttons: false,
                    timer: 3000
                });
                setOtpSent(true)
                setLoading(false)

            }).catch((error) => {
                console.log(error)
            })

    }

    const verifyOTP = () =>{
        try {
            setLoading(true)
            window.confirmationResult.confirm(OTP).then((result) =>{ 
                uploadData();

                swal({
                    text: "Successfully Registered",
                    icon: "success",
                    buttons: false,
                    timer: 3000
                })
                navigate('/login')
                setLoading(false)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const uploadData = async () =>{
        try {
            const salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(form.password, salt);
    
            await addDoc(usersRef , {
                name: form.name,
                password: hash,
                mobile: form.mobile
    
            })
            
        } catch (error) {
           console.log(error) 
        }
    }

    return (

        <div className='w-full flex flex-col items-center mt-8 justify-center'>
            <h1 className='text-xl font-bold'>Sign Up</h1>
            {otpSent ?
                <>
                    <div class="p-2 w-full md:w-1/3">
                        <div class="relative">
                            <label for="year" class="leading-7 text-sm text-gray-300">Enter OTP</label>
                            <input
                                id="year"
                                value={OTP} onChange={(e) => setOTP(e.target.value)}
                                name="year"
                                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                    <div class="p-2 w-full">
                        <button onClick={verifyOTP} class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">{loading ? <TailSpin height={25} color='white' /> : 'Confirm OTP'}</button>
                    </div>
                </>
                :
                <>
                    <div class="p-2 w-full md:w-1/3">
                        <div class="relative">
                            <label for="year" class="leading-7 text-sm text-gray-300">Name</label>
                            <input type="text"
                                id="year"
                                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                                name="year"
                                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>

                    <div class="p-2 w-full md:w-1/3">
                        <div class="relative">
                            <label for="year" class="leading-7 text-sm text-gray-300">Mobile No.</label>
                            <input type={"number"}
                                id="year"
                                value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                                name="year"
                                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>

                    <div class="p-2 w-full md:w-1/3">
                        <div class="relative">
                            <label for="year" class="leading-7 text-sm text-gray-300">Password</label>
                            <input type={'password'}
                                id="year"
                                value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                                name="year"
                                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>



                    <div class="p-2 w-full">
                        <button onClick={requestOtp} class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">{loading ?
                            <TailSpin height={25} color='white' /> : 'Sign Up'}</button>
                    </div>
                </>
            }
            <div>
                <p>If already have an Account ? <Link to={'/login'}><span className='text-blue-500'>Login</span></Link> </p>
            </div>

            <div id='recaptcha-container'>

            </div>


        </div>
    )
}

export default SignUp