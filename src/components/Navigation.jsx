import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FiHome, FiUser } from "react-icons/fi";
import app from "../base";
import Button from "./Button";
import { Row } from "./Container";
import { Colors, Gutters, Type } from "../styles";

const navigationItems = {
  home: { url: "/", icon: FiHome },
  profile: { url: "/profile", icon: FiUser },
};

const Navigation = () => (
  <StyledRow align="center" justify="space-between">
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
`;

const StyledNavLink = styled(NavLink)`
  display: inline-block;
  color: ${Colors.PRIMARY};
  font-size: ${Type.TITLE};
  margin-right: ${Gutters.SMALL};
  padding: ${Gutters.SMALL};
  line-height: 1;

  &.active {
    background-color: ${Colors.PRIMARY_LIGHT};
  }

  &:hover {
    color: ${Colors.PRIMARY_HOVER};
  }
`;
