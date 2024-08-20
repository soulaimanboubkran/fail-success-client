
import { Link } from 'react-router-dom';
import { Grid } from '../components/ui/Bg'
import { StickyScroll } from '../components/ui/sticky-scroll-reveal'
import i1 from '../assets/i1.svg'
import i2 from '../assets/things.png'
import i3 from '../assets/add.png'
import i4 from '../assets/mobile.png'
import img from '../../public/Fs.png'

import FeaturesSectionDemo2 from '../components/ui/card2';

const content = [
  {
    title: "Storing your messions and it state",
    description: "Efficiently manage and track the status of all your missions in one place. Easily update and monitor the progress of each task with our intuitive interface.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        <img src={i2} className="h-full w-auto max-w-full" alt="Storing your missions" />
      </div>
    ),
  },
  {
    title: "easy way adding your messions",
    description: "Quickly and effortlessly add new missions to your list with our user-friendly interface. Stay organized and keep track of your goals with ease.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <img src={i3} className="h-full w-auto max-w-full" alt="Adding your missions" />
      </div>
    ),
  },
  {
    title: "Mobile friendly",
    description: "Experience seamless access and management of your missions on any mobile device. Our platform is designed to provide a responsive and intuitive interface, ensuring you can stay productive on the go.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        <img src={i4} className="object-contain max-h-full max-w-full" alt="Mobile friendly" />
      </div>
    ),
  }
];
const Home = () => {
  
  return (<>
  <div className='dark:bg-slate-950  bg-white'>
  <div className="overflow-hidden">
        <div className="fixed top-2 left-2 z-50">
          <Link to="/" type="button" aria-expanded="false" className="text-2xl font-Syne">
          <img src={img} height={50} width={50}/>

          </Link>
        </div>
      </div>
      <div className="relative overflow-hidden">
        <Grid />
        <div className="relative z-10 flex flex-col items-center justify-start p-4">
          <h1 className="mb-12 md:text-[46px] md:leading-[52px] font-bold text-4xl richtext">Fail - Success</h1>
          <p className="mb-12 md:text-[23px] md:leading-[26px] font-bold text-2xl richtext">Commit your missions and succeed.</p>
        </div>
        
        <section className="w-full max-w-3xl flex flex-col md:flex-row items-center justify-between text-center md:text-left mb-12 mx-auto">
          <img src={i1} className="w-full md:w-1/2 h-auto mb-8 md:mb-0 md:mr-8" alt="Illustration" />
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-semibold mb-4">What is Fail - Success?</h2>
            <p className="text-lg mb-8">
              Fail - Success is an app that helps you set your missions, track their progress, and ultimately decide if you've succeeded or failed. Stay motivated and achieve your goals with our simple and intuitive interface.
            </p>
          </div>
        </section>
        
        <section className="w-full max-w-3xl text-center mb-12 mx-auto">
          <h2 className="text-3xl font-semibold mb-4">How It Works</h2>
          <p className="text-lg mb-8">
            1. Create a new mission by setting a clear objective.<br />
            2. Track your progress regularly.<br />
            3. At the end of the mission, decide if you've succeeded or failed.
          </p>
        </section>
       
        <section className="w-full  flex flex-col items-center  mb-12">
          <h2 className="text-3xl font-semibold mb-4">Example Mission</h2>
            <FeaturesSectionDemo2
            grid={[
              {
                _id: "6691332c8002ae4fa3c9e3e5",
                thing: "Audience Targeting",
                description: "Reach the right audience with advanced targeting options, including demographics, interests, and behaviors.",
                state: null,
              },
              {
                _id: "6691332c8002ae4fa3c9e3e5",
                thing: "Audience Targeting",
                description: "Reach the right audience with advanced targeting options, including demographics, interests, and behaviors.",
                state: 'fail',
              },
              {
                _id: "6691332c8002ae4fa3c9e3e5",
                thing: "Audience Targeting",
                description: "Reach the right audience with advanced targeting options, including demographics, interests, and behaviors.",
                state: "success",
              },
              {
                _id: "6691332c8002ae4fa3c9e3e5",
                thing: "Audience Targeting",
                description: "Reach the right audience with advanced targeting options, including demographics, interests, and behaviors.",
                state: "success",
              },
            ]} updateFeatureState={function (): Promise<void> {
              throw new Error('Function not implemented.');
            } } deleteFeature={function (): Promise<void> {
              throw new Error('Function not implemented.');
            } }              
            />
        </section>

      
      </div>

      <StickyScroll content={content} /> 
  
     
       </div> <footer className="w-full max-w-3xl text-center mt-auto   mx-auto">
          <p className="text-lg ">© 2024 Fail - Success. All rights reserved.</p>
        </footer>
    </>
  )
}

export default Home
