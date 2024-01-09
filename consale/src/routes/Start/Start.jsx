import { Outlet, Link } from "react-router-dom";
import { useUser, UserProvider } from "../../userContext";
import { useEffect, useState, useContext } from "react";
//import { LanguageContext } from '../../languages.json';
import { useTranslation, Trans } from 'react-i18next';

import './Start.css'

const Start = () => {
  // userContext
  const { user, setUser } = useUser();
  const { t,i18n } = useTranslation();
  // layout classname
  const [startClass, setStartClass] = useState(user.isLogged ? 'layout' : 'start');

  // handle log in / log out
  const handleClick = () => {
    setUser((prev) => ({
      ...prev,
      isLogged: !prev.isLogged
    }));
  };

  // Side bar routes
  const routesArr = ['Dashboard', 'Stock', 'Addbill'];

  // langs context:
  //const { language, setLanguage, languages } = useContext(LanguageContext);
  //<div>
  //<button onClick={() => setLanguage(language === 'ar' ? 'eng' : 'ar')}>
  //{languages[language].toggleButton}
  //</button>

  return (
    <UserProvider>
      <div className={startClass}>
        <div className={user.isLogged ? 'sidebar' : 'no-sidebar'}>
          <div className={user.isLogged ? 'sidebar-header' : 'start-header'}>
            <div>
              
              <h1> CONSALE </h1>
             
            
          </div>

          {user.isLogged ? (
            <div>
              <button className='logout-btn' onClick={handleClick}>log out</button>
              <ul className='sidebar-list'>
                {routesArr.map((x) => (
                  <li key={x}>
                    <Link className="sidebar-link" to={`/${x}`}>{x}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <button className='login-btn' onClick={handleClick}>log in</button>
          )}

          <Outlet />
        </div>
      </div>
      </div>
    </UserProvider>
  );
};

export default Start;
