import react, { useState, useEffect } from 'react';
import Home from './Components/Home/Home';
import Background from './Assets/image/Background2.png';





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
    <>
        <Home backImage = {Background} />
    </>
  );
}

export default App;
