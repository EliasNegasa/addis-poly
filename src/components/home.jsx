import React, { Component } from "react";
import { StyledChart, StyledFlex } from "./styled-components/container";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import SpeakerNotesOutlinedIcon from "@material-ui/icons/SpeakerNotesOutlined";
import DashboardBox from "./dashboardBox";
import { getUsers } from "../services/userService";
import { getPatients } from "../services/patientService";
// import LineChart from "./chart/lineChart";
// import BarChart from "./chart/barChart";

class Home extends Component {
  state = {
    numberOfUsers: "",
    numberOfPatients: "",
    numberOfLabs: "",
    numberOfTodaysPatient: "",
  };

  async componentDidMount() {
    const { data: users } = await getUsers("isActive=true");
    const { data: patients } = await getPatients();
    // const { data: todaysPatients } = await filterPatients("createdAt=");

    this.setState({
      numberOfUsers: users.count,
      numberOfPatients: patients.count,
    });
  }

  render() {
    const data = this.state;
    return (
      <>
        <StyledFlex>
          <DashboardBox
            blue
            label="Patients"
            value={data.numberOfPatients}
            icon={<PeopleAltOutlinedIcon />}
          />
          <DashboardBox
            black
            label="Lab Reports"
            value={data.numberOfLabs ? data.numberOfLabs : 0}
            icon={<SpeakerNotesOutlinedIcon />}
          />
          <DashboardBox
            blue
            label="Today's Patients"
            value={data.numberOfTodaysPatient}
            icon={<PeopleAltOutlinedIcon />}
          />
          <DashboardBox
            black
            label="Active Users"
            value={data.numberOfUsers}
            icon={<SpeakerNotesOutlinedIcon />}
          />
        </StyledFlex>

        <StyledFlex>
          <StyledChart>{/* <LineChart /> */}</StyledChart>
          <StyledChart>{/* <BarChart /> */}</StyledChart>
        </StyledFlex>
      </>
    );
  }
}

export default Home;
