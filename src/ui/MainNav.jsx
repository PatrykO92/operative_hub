import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { MdHome } from "react-icons/md";
import {
  FaTruck,
  FaTruckLoading,
  FaUsers,
  FaTools,
  FaExclamationCircle,
} from "react-icons/fa";

import { IoMdSettings } from "react-icons/io";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

export default function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <MdHome />
            <span>Startseite</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/trucks_loading">
            <FaTruckLoading />
            <span>LKWs laden</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/trucks_management">
            <FaTruck />
            <span>LKWs-Verwaltung</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/problem_tracking">
            <FaExclamationCircle />
            <span>Problemverfolgung</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/maintenance">
            <FaTools />
            <span>Maschinenwartung</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/users">
            <FaUsers />
            <span>Benutzer</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/settings">
            <IoMdSettings />
            <span>Einstellungen</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}
