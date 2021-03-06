import React from "react";
import {Component} from "react";
import UserContext from "../../UserContext";
import {Link} from "react-router-dom";
import TokenService from "../../services/token-service";
import "./WorkoutName.css";

class WorkoutName extends Component {
  constructor(props) {
    super(props);

    this.state = {
      workoutname: "",
    };
  }

  static contextType = UserContext;

  //update workoutname state
  workoutnameChange = letter => {
    this.setState({workoutname: letter});
  };

  //post a workout
  handlePostToWorkout(e) {
    e.preventDefault();
    const url = `https://sheltered-mesa-92095.herokuapp.com/api/workouts`;
    const options = {
      method: "POST",
      body: JSON.stringify({
        workoutname: this.state.workoutname,
      }),
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
        return res.json();
      })
      .then(data => {
        this.context.handleCreateWorkout(data[0]);
      })
      .catch(err => {
        this.setState({
          error: err.message,
        });
      });
  }

  render() {
    return (
        <div>
            <form
                className="workout-form name"
                onSubmit={e => this.handlePostToWorkout(e)}
            >
                <label className="workout-form-label" htmlFor="username">
                    Workout Name
                </label>
                <input
                    type="text"
                    id="username"
                    className="workout-form-input name"
                    onChange={e => this.workoutnameChange(e.target.value)}
                    required
                />

                <section className="workout-btn-ctn">
                    <button type="submit" className="submit-btn btn">
                        Submit
                    </button>

                    <Link to={"/homepage"} id="btn">
                        <button className="cancel-btn btn">Cancel</button>
                    </Link>
                </section>
            </form>
        </div>
    );
  }
}

export default WorkoutName;
