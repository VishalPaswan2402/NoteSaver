// import React, { useEffect, useState } from 'react'
// import { useForm } from "react-hook-form"
// import CodeBox from '../CodeBox/CodeBox';
// import { useDispatch } from 'react-redux';
// import { setDisplayCodeBox, setNoteIdToVerify, setShareEditCodeBox } from '../../ReduxSlice/SliceFunction';
// import EnterCode from '../../Pages/EnterCode/EnterCode';
// import { useParams } from 'react-router-dom';

// export default function ShareEdit(props) {
//     console.log("Code box ",props)
//     const verifyNoteId=useParams();
//     console.log("ver : ",verifyNoteId);
//     const dispatch = useDispatch();
//     const [codeBox, isCodeBox] = useState(true);

//     const {
//         register,
//         handleSubmit,
//         watch,
//         formState: { errors },
//     } = useForm()

//     const onSubmit = (data) => {
//         console.log(data);
//     }

//     useEffect(() => {
//         dispatch(setNoteIdToVerify(verifyNoteId.id));
//         dispatch(setShareEditCodeBox(true));
//     }, [])

//     return (
//         <>
//             {/* <div className='h-fit bg-red-400'>
//                 <CodeBox codeType={'editShare'}></CodeBox>
//             </div> */}
//             <div id='note-container' className={` align-middle text-center`}>
//                 <h1 className='font-extrabold text-4xl text-center pt-3 text-[#B03052] font-amarante'>Edit Shared Note</h1>
//                 <form onSubmit={handleSubmit(onSubmit)} id='input-container' className='grid max-w-2xl m-auto gap-4 mt-2'>
//                     <input {...register("title")} type='text' placeholder='Enter title' className='outline-2 outline-[#D76C82] focus:outline-[#3D0301] p-2 text-[#B03052] rounded-sm font-para text-2xl font-semibold'></input>
//                     <textarea {...register("description")} id='note-area' type='text' placeholder='Enter description' className={`outline-2 outline-[#D76C82] text-[#B03052] focus:outline-[#3D0301] p-2 rounded-sm h-98 resize-none overflow-y-auto font-para text-2xl`}></textarea>
//                     <button type='submit' className={`border-2 rounded-sm p-1 mb-1 cursor-pointer transition-all duration-200 bg-[#D76C82] text-[#EBE8DB] hover:bg-[#B03052] hover:border-[#3D0301] border-[#B03052]`}>Btn</button>
//                 </form>
//             </div>
//         </>
//     )
// }
