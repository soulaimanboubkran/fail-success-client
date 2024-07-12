import React, { useEffect, useState, useCallback } from "react";
import { userRequest } from "../requestMethods";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import FeaturesSectionDemo from "../components/ui/card";
import { FiRefreshCw } from "react-icons/fi";
import { SiApplenews } from "react-icons/si";
import debounce from 'lodash.debounce';
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
  const [sortBy, setSortBy] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const fetchUserThings = useCallback(async (page: number, append = false) => {
    if (!id) return;
    append ? setLoadingMore(true) : setLoading(true);
    try {
      const response = await userRequest.post(`/thing/things/${id}?sortBy=${sortBy}&page=${page}&limit=20`);
      setThings(prev => append ? [...prev, ...response.data.things] : response.data.things);
      setTotal(response.data.total);
      setLoading(false);
      setLoadingMore(false);
    } catch (error) {
      setError('Error fetching things');
      setLoading(false);
      setLoadingMore(false);
    }
  }, [id, sortBy]);

  useEffect(() => {
    fetchUserThings(page, true);
  }, [page, fetchUserThings]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1) {
        if (things.length < total && !loadingMore) {
          setPage(prev => prev + 1);
        }
      }
    }, 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [things.length, total, loadingMore]);

  const handleNew = () => {
    setPage(1);
    setThings([]);
    setSortBy(!sortBy);
  };

  const updateFeatureState = async (id: string, state: string) => {
    try {
      const requestData = { state };
      await userRequest.put(`/thing/setState/${id}`, requestData);
      setThings((prevThings) =>
        prevThings.map((feature) =>
          feature._id === id ? { ...feature, state } : feature
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFeature = async (id: string) => {
    try {
      await userRequest.delete(`/thing/deleteThing/${id}`);
      setThings((prevThings) => prevThings.filter((feature) => feature._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading && !things.length ? (
        <div className="flex items-center justify-center mt-24">
          <span className="loading loading-spinner loading-lg "></span>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className="absolute top-3 left-6 z-50">
            <button onClick={() => {  setPage(1);
    setThings([]); fetchUserThings(1); }} className="px-4 py-2 flex rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
              Refresh <FiRefreshCw className="text-xl ml-2" />
            </button>
          </div>

          <div className="absolute top-3 left-36 z-50">
            <button onClick={handleNew} className="px-4 py-2 flex rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
              {sortBy ? 'New' : 'Old'} <SiApplenews className="text-xl ml-2" />
            </button>
          </div>
<div className="">
          <FeaturesSectionDemo grid={things} updateFeatureState={updateFeatureState} deleteFeature={deleteFeature} />
</div>
          {loadingMore && (
            <div className="flex items-center justify-center mt-4">
              <span className="loading loading-spinner loading-lg "></span>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Thing;
