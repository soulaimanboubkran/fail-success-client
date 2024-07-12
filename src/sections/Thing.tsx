import React, { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import FeaturesSectionDemo from "../components/ui/card";
import { FiRefreshCw } from "react-icons/fi";

interface Feature {
  _id: string;
  thing: string;
  description: string;
  state: string;
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

  const updateFeatureState = async (id: string, state: string) => {
    try {
      const requestData = { state };
      const response = await userRequest.put(`/thing/setState/${id}`, requestData);
      const updatedFeature = response.data;

      setThings((prevThings) =>
        prevThings.map((feature) =>
          feature._id === id ? { ...feature, state } : feature
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserThings();
  }, []); // Empty dependency array ensures it runs only once

 
  const deleteFeature = async (id: string) => {
    try {
      await userRequest.delete(`/thing/deleteThing/${id}`);
      // Update local state immediately after deletion
      setThings((prevThings) => prevThings.filter((feature) => feature._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
   
      {loading ? (
        <div className="flex items-center justify-center mt-24">
        <span className="loading loading-spinner loading-lg "></span></div>
      ) : error ? (
        <p>{error}</p>
      ) : ( <>
              <div className="fixed top-3 left-6 z-50">

      <button onClick={fetchUserThings}><FiRefreshCw /></button></div>
<FeaturesSectionDemo grid={things} updateFeatureState={updateFeatureState} deleteFeature={deleteFeature} /></>
      )}
    </>
  );
};

export default Thing;
