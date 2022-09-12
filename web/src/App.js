import React, { createContext, useContext, useState, useEffect } from 'react';
import TopBar from './components/TopBar';
import MainBody from './components/MainBody';
import SideNav from './components/SideNav';
import Footer from './components/Footer';
import Modal from './components/Modal';
import ConfirmDialog from './components/ConfirmDialog';
import MainLoader from './components/MainLoader';
import { ToastContainer } from 'react-toastify';
import { showMainLoader, hideMainLoader, callApi, tellUser, scrollToTop } from './Helpers';
import { useParams } from 'react-router-dom';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import ResetPasswordPage from './views/ResetPasswordPage';
import AccountVerification from './views/AccountVerification';

export const AppContext = createContext(null);

export default function App() {
  const [ config, setConfig ] = useState({
    supportMultiSellers: true,
  });
  const [ ready, setReady ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ showModal, setShowModal ] = useState(false);
  const [ modalView, setModalView ] = useState(<></>);
  const [ modalTitle, setModalTitle ] = useState("");
  const [ dialogMsg, setDialogMsg ] = useState("");
  const [ dialogOnConfirm, setDialogOnConfirm ] = useState(null);
  const [ showDialog, setShowDialog ] = useState(false);
  const { viewType, viewId } = useParams();
  const [ navType, setNavType ] = useState((viewType) ? viewType : "home");
  const [ navId, setNavId ] = useState(viewId);
  const [ authData, setAuthData ] = useState({ status:0, msg:"Not logged in" });


  const openSideNav = () => {
    document.getElementById('sideNav').dataset['navopen'] = "true";
    document.getElementById('topBar').dataset['navopen'] = "true";
    document.getElementById('mainBody').dataset['navopen'] = "true";
    try {
      document.getElementById('tabBar').dataset['navopen'] = "true";
    } catch (e) {

    }
  }

  const closeSideNav = () => {
    document.getElementById('sideNav').dataset['navopen'] = "false";
    document.getElementById('topBar').dataset['navopen'] = "false";
    document.getElementById('mainBody').dataset['navopen'] = "false";
    try {
      document.getElementById('tabBar').dataset['navopen'] = "false";
    } catch (e) {

    }
  }

  const toggleSideNav = () => {
    if(document.getElementById('sideNav').dataset['navopen'] === "false") {
      openSideNav();
    }
    else {
      closeSideNav();
    }
  }

  const auth = () => {
    return new Promise(async (resolve, reject) => {
      await callApi('auth.php', {}).then((response) => {
        setAuthData(response);
        resolve();
      })
    })
  }

  const isLoggedIn = () => {
    if(authData) {
      if(authData.status === 1) {
        return true;
      }
    }
    return false;
  }

  const isSeller = () => {
    if(authData.user) {
      if(authData.user.info.role === 'seller' && isLoggedIn()) {
        return true;
      }
    }
    return false;
  }

  const isMarketVerified = () => {
    if(authData.user.market) {
      if(authData.user.market.status === 1 && isLoggedIn() && isSeller()) {
        return true;
      }
    }
    return false;
  }

  const isMarketSuspended = () => {
    if(authData.user.market) {
      if(authData.user.market.status === 2 && isLoggedIn() && isSeller()) {
        return true;
      }
    }
    return false;
  }

  const isMarketUnverified = () => {
    if(authData.user.market) {
      if(authData.user.market.status === 0 && isLoggedIn() && isSeller()) {
        return true;
      }
    }
    return false;
  }

  const isUserVerified = () => {
    if(authData.user) {
      if(authData.user.info.status === 1 && isLoggedIn()) {
        return true;
      }
    }
    return false;
  }

  const logOut = () => {
    tellUser('Logging out please wait')
  }

  const init = async () => {
    //perform initializations in the required order
    return new Promise(async (resolve) => {
      showMainLoader();
      setReady(false);
      await auth().then(() => {
        hideMainLoader();
        setReady(true)
        resolve();
      })
    })
  }

  const setModal = (title, view) => {
    setModalView(view);
    setModalTitle(title);
    setShowModal(true);
  }

  const setDialog = ( msg, onConfirm ) => {
    setDialogMsg(msg);
    setShowDialog(true);
    setDialogOnConfirm(() => onConfirm);
  }

  const clearModal = () => {
    //this clears modal content
    setModalView(<></>);
    setModalTitle("");
    setShowModal(false);
  }

  const showLoginPage = (onSuccess = null) => {
    setModal("Login to your account", <LoginPage onSuccess={onSuccess}/>);
  }

  const showVerificationPage = (onSuccess = null) => {
    setModal("Verify your account", <AccountVerification onSuccess={onSuccess}/>);
  }


  const showRegisterPage = (onSuccess = null) => {
    setModal("Register an account", <RegisterPage onSuccess={onSuccess}/>);
  }

  const showResetPasswordPage = (onSuccess = null) => {
    setModal("Reset your account password", <ResetPasswordPage onSuccess={onSuccess}/>);
  }

  const refreshApp = async (afterRefresh = null) => {

    await init().then(() => {
      if(afterRefresh !== null) {
        afterRefresh();
      }
    });
  }



  useEffect(() => {
    init();
  }, [])

  useEffect(() => {
    if(ready){
      //other actions can be added here
      hideMainLoader();
    }
  }, [ ready ])

  useEffect(() => {
    if(loading){
      showMainLoader();
    }
  }, [ loading ])

  useEffect(() => {
    if(viewType) {
      setNavType(viewType);
    }

  }, [ viewType ])

  useEffect(() => {
    setNavId(viewId);
  }, [ viewId ])

  const appContext = {
    toggleSideNav,
    openSideNav,
    closeSideNav,
    ready,
    loading,
    setReady,
    setLoading,
    init,
    setDialog,
    showModal,
    showDialog,
    setModal,
    setShowModal,
    setShowDialog,
    clearModal,
    navType,
    navId,
    showLoginPage,
    showRegisterPage,
    showResetPasswordPage,
    refreshApp,
    auth,
    authData,
    isLoggedIn,
    logOut,
    config,
    isSeller,
    setNavType,
    setNavId,
    isUserVerified,
    showVerificationPage,
    isMarketVerified,
    isMarketSuspended,
    isMarketUnverified,
  }
  return (
    <>
    {
      (ready) ?
      <AppContext.Provider value={appContext}>
        <div className="App">
          <ToastContainer
                    theme="light"
                  />
          <Modal title={modalTitle} view={modalView}/>
          <ConfirmDialog msg={dialogMsg} onConfirm={dialogOnConfirm}/>
          <TopBar/>
          <SideNav/>
          <MainLoader/>
          <MainBody/>
        </div>
      </AppContext.Provider> :
      <AppContext.Provider value={appContext}>
        <div className="App">
          <ToastContainer
                    theme="light"
                  />
          <Modal title={modalTitle} view={modalView}/>
          <ConfirmDialog msg={dialogMsg} onConfirm={dialogOnConfirm}/>
          <MainLoader/>
        </div>
      </AppContext.Provider>
    }
    </>
  );
}
