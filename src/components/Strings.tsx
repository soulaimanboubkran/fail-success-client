import React, { useEffect, useState } from 'react';
import { userRequest } from '../requestMethods';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';


interface StringsProps {
  showModal2: boolean;
  setThing: React.Dispatch<React.SetStateAction<string>>;
  setShowModal:(show: boolean) => void;
  setShowModal2: (show: boolean) => void;
 
}

const Strings: React.FC<StringsProps> = ({ showModal2, setShowModal2,setThing,setShowModal }) => {
  const [strings, setStrings] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const profile = useSelector((state: RootState) => state.user.currentUser);
  const id = profile?._id;

  const fetchUserStrings = async () => {
    try {
      const response = await userRequest.get(`/user/strings/${id}`);
      setStrings(response.data); // Assuming the response.data is an array of strings
    
      setLoading(false);
    } catch (error) {
      setError('Error fetching strings');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showModal2) {
      fetchUserStrings();
    }
  }, [showModal2]);

  const closeModal = () => {
   
    setShowModal2(false);
    
  };

  const handleAdd = (s :string) => {
    // Add your logic for handling string additions here
    setThing(s)
    setShowModal2(false);
    setShowModal(true);

  };

  return (
    <>
      {/* Sidebar button */}
      
    
  
      <div className="bg-white">
    
      {/* Modal content */}
      {showModal2 && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Your old things
                    </h3>
                    <div className="mt-2 h-40 overflow-y-scroll">
                      <ul className="sm:w-96">
                        {strings.map((string, index) => (
                          <li
                            key={index}
                            className="p-4 rounded-xl cursor-pointer hover:bg-gray-50"
                            onClick={()=> handleAdd(string)}
                          >
                            {string}
                          </li>
                        ))}
                      </ul>
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
      </div>
    </>
  );
};

export default Strings;
