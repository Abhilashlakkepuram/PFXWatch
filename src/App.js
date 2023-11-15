import {Routes, Route} from 'react-router-dom';
import './App.css';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home1'
// import VideoCard from './components/gameVideocard/gamevideocard';
import Videos from './components/videos/videos';
import NotFound from './components/NotFound/NotFound';
function App() {
  return (
    <div className="App">
    <Routes>
    <Route exact path = "/auth" element={<Auth />}/>
    <Route exact path = "/" element={<Home/> }/>
    <Route exact path = "/" element={<Videos/> }/>
    <Route path ="*" element={<NotFound />}/>
    </Routes>
      
    </div>
  );
}

export default App;
