import "../App.css";

import { FiCheckCircle, FiInfo  } from "react-icons/fi";
import { IoWarningOutline } from "react-icons/io5";
import { BiErrorCircle } from "react-icons/bi";
// import { IoClose } from "react-icons/io5";

import { useAlert } from "../context/AlertContext";

const severityArry = [ "success", "info", "warning", "error" ];

export const AlertMsg = _ => {

  const [ alertContent, setAlertContent ] = useAlert();

  const MainContent = _ => {

    const closeAlertHandler = _ => {
      document.querySelector(".alert-container.show").classList.add("hidden");
      setTimeout(_ => {
        setAlertContent({ trigger: false, flag: 0, type: "", content: "", action: "" });
      }, 500)
    };

    setTimeout(_ => {
      closeAlertHandler();
    }, 1000);

    /*
      severity flag
      0 : success
      1 : info
      2 : warning
      3 : error
    */

    const alertBoxStyle = `alert-box ${ severityArry[alertContent.flag] }`;

    return (
      <>
        <div className="alert-screen"></div>
        <div className="alert-container show">
          <div className={ alertBoxStyle }>
            <div className="alert-severity-box">
              { alertContent.flag === 0 && <FiCheckCircle  className="alert-severity-icon" /> }
              { alertContent.flag === 1 && <FiInfo  className="alert-severity-icon" /> }
              { alertContent.flag === 2 && <IoWarningOutline  className="alert-severity-icon" /> }
              { alertContent.flag === 3 && <BiErrorCircle  className="alert-severity-icon" /> }
            </div>
            <div className="alert-msg-box">
              {
                alertContent.flag === 3 ? (
                  <span>{ alertContent.action }</span>
                ) : (
                  <>
                    <span>{ alertContent.type }&nbsp;</span>
                    <div className="alert-msg-content">{ alertContent.content }</div>
                    <span>&nbsp;has been {alertContent.action }ed.</span>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </>
    )
  };

  return  <>{ alertContent.trigger && <MainContent /> }</>
  
};