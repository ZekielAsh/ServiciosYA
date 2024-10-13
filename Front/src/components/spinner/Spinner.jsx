import BackgroundSection from "../../components/backgroundSection/BackgroundSection.jsx";
import "./Spinner.css";

const Spinner = () => {
  return (
    <>
      <BackgroundSection />
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    </>
  );
};

export default Spinner;
