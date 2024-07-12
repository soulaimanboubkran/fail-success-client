import React, { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import Strings from "../components/Strings";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toggleOpen } from "../redux/openReducer";
import { LuTextSelect } from "react-icons/lu";
import { logoutSuccess } from "../redux/userRedux";
import { FiSquare } from "react-icons/fi";
import { RiHome6Line } from "react-icons/ri";
import FeaturesSectionDemo from "../components/ui/card";


interface Feature {
  _id: string;
  thing: string;
  description: string;
}
const Thing = () => {

  const profile = useSelector((state: RootState) => state.user.currentUser);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const id = profile?._id;
  const [things, setThings] = useState<Feature[]>([]);

  const fetchUserThings = async () => {
    try {
      const response = await userRequest.post(`/thing/things/${id}`);
      setThings(response.data.things);
      setLoading(false);
    } catch (error) {
      setError('Error fetching strings');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserThings();
  }, []); // Empty dependency array ensures it runs only once




  return (
    <>
     

  

      {/* Integrate FeaturesSectionDemo component */}
      <FeaturesSectionDemo grid={things}/>
    </>
  );
};

export default Thing;
