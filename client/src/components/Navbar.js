import React from 'react';
import styled from 'styled-components';
import {NavLink} from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as CaretIcon } from '../icons/settings.svg';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const NavbarContainer = styled.nav`
  font-family: 'Roboto', sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #232222; // Выберите цвет, который соответствует вашему дизайну
  color: white;
  padding: 1rem 6rem;

`;

const Logo = styled.h2`
  position: absolute;
  cursor: pointer;
  padding: 0;
  margin: 0;
  & > img{
    width: 70px;

    padding: 0;
    margin: 0;
  }
  & > a{
    text-decoration: none;
    color: white;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  & > a{
    text-decoration: none;
    color: white;
  }

`;

const MenuItem = styled.div`
  margin: 0 25px;
  cursor: pointer;
  padding: 1rem 1rem;
  border: none;
  background: none;
  color: white !important;
  font-size: 1.3rem;
  transition: all 0.3s ease;
  border-radius: 7px;
  
  

  &:hover {
    background-color: #555; // Цвет при наведении
    border-radius: 7px;
    transition: 0.3s all;
  }
`;

const MenuItem1 = styled.div`
  margin: 0 25px;
  cursor: pointer;
  padding: 1rem 1rem;
  border: none;
  background: none;
  color: white !important;
  font-size: 1.3rem;
  transition: all 0.3s ease;
  border-radius: 7px;
  

  &:hover {
    background-color: #555; // Цвет при наведении
    border-radius: 7px;
    transition: 0.3s all;
  }
`;

const UserProfile = styled.div`
  position: absolute;
  right: 4.5%;
  width: 50px;
  height: 50px;
  background-color: #777; // Выберите цвет для иконки
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  padding: 0;
  margin: 0;
`;

const Navbar = () => {
    return (
        <NavbarContainer>
            <Logo><NavLink to={'/'}>UniPortal</NavLink></Logo>

            <Menu>
                {/*<NavLink to={'/grades'}><MenuItem>Оцінки</MenuItem></NavLink>*/}
                <NavLink to={'/news'}><MenuItem>Новини</MenuItem></NavLink>
                <NavLink to={'/course'}><MenuItem>Обрати напрямок</MenuItem></NavLink>
                <NavLink to={'/faq'}><MenuItem>FAQ</MenuItem></NavLink>
                <NavLink to={'/spec'}><MenuItem>База спеціалізацій</MenuItem></NavLink>
            </Menu>
            <NavItem icon={<AccountCircleIcon />}>
                <DropdownMenu></DropdownMenu>
            </NavItem>
            {/*<UserProfile>P</UserProfile>*/}
        </NavbarContainer>
    );
};

function NavItem(props) {
    const [open, setOpen] = useState(false);

    return (
        <li className="nav-item">
            <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
                {props.icon}
            </a>

            {open && props.children}
        </li>
    );
}

function DropdownMenu() {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])

    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    function DropdownItem(props) {
        return (
            <NavLink to={"/settings"} className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
            </NavLink>
        );
    }

    return (
        <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>

            <CSSTransition
                in={activeMenu === 'main'}
                timeout={500}
                classNames="menu-primary"
                unmountOnExit
                onEnter={calcHeight}>
                <div className="menu"><DropdownItem
                        leftIcon={<CaretIcon />}
                        goToMenu="settings">
                        Профіль
                    </DropdownItem>
                </div>
            </CSSTransition>


        </div>
    );
}


export default Navbar;
