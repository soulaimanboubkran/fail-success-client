import  { useEffect, useState, useCallback } from "react";
import { userRequest } from "../requestMethods";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import FeaturesSectionDemo from "../components/ui/card";
import { FiRefreshCw } from "react-icons/fi";
import { SiApplenews } from "react-icons/si";
import debounce from "lodash.debounce";

interface Feature {
  _id: string;
  thing: string;
  description: string;
  state: string;
  loadings:boolean
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
  const [loadings,setLoadings]=useState<boolean>(false);
  const fetchUserThings = useCallback(async (page: number, append = false) => {
    if (!id) return;
    append ? setLoadingMore(true) : setLoading(true);
    try {
      const response = await userRequest.post(`/thing/things/${id}?sortBy=${sortBy}&page=${page}&limit=20`);
      setThings(prev => append ? [...prev, ...response.data.things] : response.data.things);
      setTotal(response.data.total);
    } catch (error :any) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Error fetching things');
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [id, sortBy]);

  useEffect(() => {
    fetchUserThings(1, false); // Initial load, do not append
  }, [fetchUserThings]);

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

  useEffect(() => {
    if (page > 1) {
      fetchUserThings(page, true); // Append data on pagination
    }
  }, [page, fetchUserThings]);

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
    setLoadings(true)
    try {
      await userRequest.delete(`/thing/deleteThing/${id}`);
      setThings((prevThings) => prevThings.filter((feature) => feature._id !== id));
      setLoadings(false)
    } catch (error) {
      setLoadings(false)

      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center bg-white dark:bg-slate-950">
        <div className="max-w-[1800px]">
          {loading && !things.length ? (
            <div className="flex items-center justify-center mt-24">
              <span className="loading loading-spinner loading-lg "></span>
            </div>
          ): error ? (
            <p>{error === "No things found for this user" ? error : 'Reload the page'}</p>

          ) : (
            <>
              <div className="absolute top-3 left-6 z-50">
                <button
                  onClick={() => {
                    setPage(1);
                    setThings([]);
                    fetchUserThings(1);
                  }}
                  className="px-4 py-2 flex rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
                >
                  Refresh <FiRefreshCw className="text-xl ml-2" />
                </button>
              </div>

              <div className="absolute top-3 left-36 z-50">
                <button
                  onClick={handleNew}
                  className="px-4 py-2 flex rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
                >
                  {sortBy ? 'New' : 'Old'} <SiApplenews className="text-xl ml-2" />
                </button>
              </div>

              <FeaturesSectionDemo
                grid={things}
                updateFeatureState={updateFeatureState}
                deleteFeature={deleteFeature}
                loadings={loadings}
              />

              {loadingMore && (
                <div className="flex items-center justify-center mt-4">
                  <span className="loading loading-spinner loading-lg "></span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Thing;
