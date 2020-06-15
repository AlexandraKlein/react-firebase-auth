import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FiHome, FiUser, FiUsers } from "react-icons/fi";
import app from "../base";
import Button from "./Button";
import { Row } from "./Container";
import { BreakPoint, Colors, Gutters, Type } from "../styles";

const navigationItems = {
  home: { url: "/", icon: FiHome },
  profile: { url: "/profile", icon: FiUser },
  users: { url: "/users", icon: FiUsers },
};

const Navigation = () => (
  <StyledRow justify="space-between" flex="0 0 auto">
    <div>
      {Object.values(navigationItems).map(item => (
        <StyledNavLink
          isActive={(match, location) => location.pathname === item.url}
          to={item.url}
          key={item.url}
        >
          <item.icon />
        </StyledNavLink>
      ))}
    </div>
    <Button
      marginTop="0"
      secondary={true}
      text="Sign out"
      onClick={() => app.auth().signOut()}
    />
  </StyledRow>
);

export default Navigation;

const StyledRow = styled(Row)`
  margin: ${Gutters.SMALL};
  position: relative;
`;

const StyledNavLink = styled(NavLink)`
  display: inline-block;
  color: ${Colors.PRIMARY};
  font-size: ${Type.HEADING};
  margin-right: ${Gutters.X_SMALL};
  padding: ${Gutters.SMALL};
  line-height: 0.7;
  flex: 1 1 0;

  ${BreakPoint.TABLET} {
    font-size: ${Type.TITLE};
  }

  &.active {
    background-color: ${Colors.PRIMARY_LIGHT};
  }

  &:hover {
    color: ${Colors.PRIMARY_HOVER};
  }
`;
