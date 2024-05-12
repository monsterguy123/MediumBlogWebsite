import Navbar from './HomeComponent/Navbar';
import CardComponent from './HomeComponent/CardComponent';

const Home = (): any => {
       return (
              <div className='h-screen justify-center'>
                     <Navbar />
                     <CardComponent />
              </div>
       );
};

export default Home;
