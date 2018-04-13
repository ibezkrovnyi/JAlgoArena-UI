// @flow
import React from "react";
import {NavDropdown} from "react-bootstrap";

import FontAwesome from './FontAwesome';
import MenuItem from './MenuItem';

const RankingMenuItem = () => (
    <NavDropdown title={<span><FontAwesome prefix="fas" name="trophy" lg={true}/> Ranking</span>} id="basic-nav-dropdown">
        <MenuItem path="/userRanking" title="Users" icon="" prefix=""/>
        <MenuItem path="/teamRanking" title="Teams" icon="" prefix=""/>
        <MenuItem path="/regionRanking" title="Regions" icon="" prefix=""/>
    </NavDropdown>
);

export default RankingMenuItem;