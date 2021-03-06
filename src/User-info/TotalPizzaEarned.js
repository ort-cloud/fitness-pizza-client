import React, {Component} from "react";
import UserContext from "../UserContext";
import TokenService from "../services/token-service";

class TotalPizzaEarned extends Component {
  constructor() {
    super();
    this.state = {
      pizzaslices: "",
    };
  }

  static contextType = UserContext;

  componentDidMount() {
    const url = `https://sheltered-mesa-92095.herokuapp.com/api/exercises/user/userslices`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    };
    fetch(url, options)
      .then(res => {
        if (!res.ok) {
          throw new Error("Oh, Mamma Mia! There seems to be a problem.");
        }
        return res;
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.length === 0) {
          this.setState({
            pizzaslices: `You haven't earned any slices better go to the gym and knead that dough!`,
          });
        } else {
          let pizzaSlices = Math.floor(
            data.map(item => item.caloriesburned).reduce((a, b) => a + b) / 250
          );
          this.setState({
            pizzaslices: pizzaSlices,
          });
        }
      })
      .catch(err => {
        this.setState({
          error: err.message,
        });
      });
  }

  render() {
    const slices = (
      <span role='img' aria-label='A slice of pizza'>
        🍕
      </span>
    );

    return (
      <div className='pizza_dudes_got_30_seconds'>
        <h3>Lifetime Slices Earned:</h3>
        <p id='grab_some'>
          {this.state.pizzaslices} {slices}'s
        </p>
      </div>
    );
  }
}

export default TotalPizzaEarned;
