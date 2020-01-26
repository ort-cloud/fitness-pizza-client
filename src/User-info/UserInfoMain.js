import React from "react";
import {Component} from "react";
import Nav from "../Components/Nav/Nav";
import PastWorkouts from "../PastWorkouts/PastWorkouts";
import TotalPizzaEarned from "./TotalPizzaEarned";
import UserStats from './UserStats/UserStats'

export default class UserInfo extends Component {
  render() {
    return (
      <div>
        <Nav />
        <TotalPizzaEarned />
        <UserStats />
        <PastWorkouts />
      </div>
    );
  }
}
