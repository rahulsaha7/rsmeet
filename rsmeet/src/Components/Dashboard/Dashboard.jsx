


import MobileView from "./MobileView";



import "./Dashboard.css";


const Dashboard = ({ authTokenValues }) => {
  // const [Width, setWidth] = useState(window.screen.width);
  // const [historyChnaged, sethistoryChnaged] = useState(false);
  // const ChangeWidth = () => {
  //   setWidth(window.screen.width);
  // };


  // useEffect(() => {
  //   window.addEventListener("resize", ChangeWidth);
  //   return () => {
  //     window.removeEventListener("resize", ChangeWidth);
  //   };
  // });

 
return(
  <MobileView
      authTokenValues={authTokenValues}
    />
);
};

export default Dashboard;
