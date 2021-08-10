import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useHistory, withRouter } from 'react-router-dom';
import './Header.styles.scss';

import Logo from '../Logo/Logo.index';
import Button from '../Button/Button.index';
import DownCaret from '../../assets/down-arrow.png';
import { Toast } from '../Toast/Toast.index';
import {
  clearSessionStorage,
  getSessionStorage,
} from '../../helpers/sessionStorage';

function Header(props) {
  const [loginNav, setLoginNav] = useState(true);

  let { location } = props;

  let history = useHistory();
  const isLoggedIn = !!getSessionStorage('token') ? true : false;
  const currentClass =
    location.pathname === '/'
      ? 'homepage'
      : isLoggedIn && location.pathname.split('/')[2] !== 'postjob'
      ? 'loggedin'
      : '';

  useEffect(() => {
    if (
      props.location.pathname === '/login' ||
      props.location.pathname === '/signup'
    ) {
      setLoginNav(false);
    } else if (
      props.location.pathname === '/changepassword' ||
      props.location.pathname === '/'
    ) {
      setLoginNav(true);
    }
  }, [props]);

  return (
    <React.Fragment>
      <header className={`container ${currentClass}`}>
        <nav className='nav'>
          <Logo size='small' style={{ cursor: 'default' }} />
          <div className='nav_left'>
            {loginNav && !isLoggedIn ? (
              <Button onClick={() => history.push('/login')}>
                Login/Signup
              </Button>
            ) : isLoggedIn ? (
              <LeftHeaderNav name={props.name} {...props} />
            ) : null}
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
}

function LeftHeaderNav({ name, ...restProps }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { pathname } = useLocation();
  const toastRef = useRef();
  const history = useHistory();

  const handleLogout = () => {
    toastRef.current.openToast('Logout', 'You have successfully logged out.');
    setIsDropdownOpen((prevState) => !prevState);
    clearSessionStorage();
    setTimeout(() => history.push({
      pathname: '/',
      state: {
        isLoggedIn: !!getSessionStorage('token'),
        isRecruiter: getSessionStorage('userRole') === '0',
      },
    }), 3000)
  };

  const isLoggedIn = !!getSessionStorage('token') ? true : false;
  const isRecruiter = getSessionStorage('userRole') === '0' ? true : false;

  let activeClass =
    isLoggedIn && restProps.location.pathname.split('/')[2] === 'postjob'
      ? ' navLinkActive'
      : '';

  name = getSessionStorage('name') || name;

  return (
    <React.Fragment>
      <div className='leftMenu'>
        {isRecruiter ? (
          <NavLink
            className={`leftMenu_link${activeClass}`}
            to={`${pathname}/postjob`}
          >
            Post a Job
          </NavLink>
        ) : (
          <NavLink
            className={`leftMenu_link${activeClass}`}
            to={`${pathname}`}
          >
            Already applied Jobs
          </NavLink>
        )}
        <div className='leftMenu_avatar'>{name.charAt(0).toUpperCase()}</div>
        <img
          src={DownCaret}
          alt='menu'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />
        {isDropdownOpen ? (
          <div className='leftMenu_dropdown'>
            <div className='leftMenu_dropdown_logout' onClick={handleLogout}>
              Logout
            </div>
          </div>
        ) : null}
      </div>
      <Toast ref={toastRef} />
    </React.Fragment>
  );
}

export default withRouter(Header);
