import react, { useState, useEffect } from 'react';
import Home from './Components/Home/Home';
import Background from './Assets/image/Background2.png';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';




function App() {
  const [width, setwidth] = useState(null);

  const changeWidth = () => {

    setwidth(window.screen.width);
  }


  useEffect(() => {
    window.addEventListener('resize', changeWidth);
    return () => {
      window.removeEventListener('resize', changeWidth);
    }
  });

  return (
    <Router>
      <Switch>
          <Route export path ="/" render = {(props)=>(
            <Home backImage = {Background} />
          )} />
        </Switch>
        
    </Router>
  );
}

export default App;
