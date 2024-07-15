
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse } from "react-icons/tb"

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toggleOpen } from "../redux/openReducer";
import { logoutSuccess } from "../redux/userRedux";
import { Link, useNavigate } from "react-router-dom";
import { FiSquare } from "react-icons/fi";
import { RiHome6Line } from "react-icons/ri";
import { LuTextSelect } from "react-icons/lu";
import Strings from "./Strings";
import { useState } from "react";
import { userRequest } from "../requestMethods";
import { MdLogout } from "react-icons/md";

const Header = () => {

  const profile = useSelector((state: RootState) => state.user.currentUser);

  const [thing, setThing] = useState('');
  const [description, setDescription] = useState('');
  const [type, ] = useState('private');
 
  const isOpen = useSelector((state: RootState) => state.open.isOpen);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  
  
 

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const requestData = {
        thing: thing,
        description: description,
        type: type
      };

      await userRequest.post('/thing/addThing', requestData);

      setThing('');
      setDescription('');
    } catch (error) {
      console.log(error);
    }
  };


  const handleToggle = () => {
    dispatch(toggleOpen());
  };
  const logout = () => {
    localStorage.removeItem("persist:root");
    dispatch(logoutSuccess());
    navigate("/login");
  };

  const openModal2 = () => {
    setShowModal2(true);
  };
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);

  };
  console.log(profile)
  return (
    
    <><div className="bg-white dark:bg-slate-950">
                

    {isOpen && (
      <>
      <div className="fixed  bottom-12 left-2 z-50">
          <Link
            to="/"
            type="button"
            className="px-2 py-1  w-full h-full flex rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
            aria-expanded="false"
          >
            <RiHome6Line className="text-2xl"/>
          </Link>
        </div>
        {profile ? (<>
        <div className="fixed bottom-[10.5rem] left-2 z-50">
          <button
            onClick={openModal}
            className="px-2 py-1  w-full h-full flex rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
        <div className="fixed bottom-[5.5rem] left-2 z-50">
          <Link
            to="/thing"
            type="button"
            className="px-2 py-1  w-full h-full flex rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
            aria-expanded="false"
          >
            <FiSquare className="text-2xl"/>
          </Link>
        </div>
        
        <div className="fixed  bottom-[8rem] left-2 z-50">
          <button
           onClick={openModal2}
            className="px-2 py-1 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
          >
            <LuTextSelect className="text-2xl"/>
          </button>
        </div>
   
           <div className="fixed bottom-9 right-2 z-50">
        <div className="drawer-content rounded-2xl">
                      <label
                        htmlFor="my-drawer"
                        className="btn bg-transparent hover:bg-transparent drawer-button border-none"
                      >
                        
                            <img
                              src={profile.avatar}
                              width={30}
                              height={30}
                              className="rounded-full border"
                              alt="User Avatar"
                            />
                            <div className="block badge-ghost bg-transparent border-none text-black dark:text-white">
                              {profile.username}
                            </div>
                       
                      </label>
                    </div></div>
                     <div className="fixed bottom-2 right-2 z-50">
            <button
              onClick={logout}
              className="px-6 py-1 flex  rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
            >
              Logout<MdLogout  className="ml-1 text-xl"/>
            </button> </div></>
          ) : (
            <div className="fixed bottom-2 right-2 z-50">
            <Link
              to="/login"
              className="px-2 py-1  text-xl font-bold w-full h-full flex rounded-md border border-black bg-white text-black  hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
              >
              Log in
            </Link>
          </div>
       )}
      </>
    )}

{showModal && (
        <div className="fixed   inset-0 z-10 ">
          <div className="flex  items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto  flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-12">
                    <svg
                      className="h-6 w-6 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="mt-3 h-72 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Your New things
                    </h3>
                    <div className="mt-2 h-40 w-full ">
                      <form onSubmit={handleClick}>
                        <label className="form-control w-full ">
                          <div className="label">
                            <span className="label-text">What is the thing?</span>
                          </div>
                          <input
                            value={thing}
                            onChange={(e) => setThing(e.target.value)}
                            placeholder="Type here"
                            className="input   input-ghost focus:bg-white focus:outline-none sm:w-96 w-full"
                          />
                        </label>{" "}
                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">the why</span>
                          </div>
                          <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="textarea textarea-ghost focus:bg-white focus:outline-none  h-24"
                            placeholder="Type here"
                          ></textarea>
                        </label>
                        <div className=" px-4 py-3 sm:px-3 sm:flex sm:flex-row">
                          <button
                            type="submit"
                            className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500  sm:w-auto sm:text-sm"
                          >
                            Click
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-3 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeModal}
                  type="button"
                  className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    <div className="fixed bottom-2 left-2 z-50">
      <button
        onClick={handleToggle}
        className="h-full w-full text-2xl animate-shimmer inline-flex items-center justify-center rounded-lg border border-slate-800 px-2 py-1 font-medium text-stone-50 transition-colors focus:outline-none focus:ring-2 bg-slate-900 focus:ring-offset-2 focus:ring-offset-slate-50"
      >
        {isOpen ? (
          <TbLayoutSidebarLeftCollapse />
        ) : (
          <TbLayoutSidebarRightCollapse />
        )}
      </button>
    </div>

    <Strings
        showModal2={showModal2}
        setShowModal2={setShowModal2}
        setShowModal={setShowModal}
        setThing={setThing}
 
      />
</div>
    </>

  


  )
}

export default Header
