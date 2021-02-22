import React, { Component } from "react";
import { StyledChart, StyledFlex } from "./styled-components/container";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import SpeakerNotesOutlinedIcon from "@material-ui/icons/SpeakerNotesOutlined";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import DashboardBox from "./dashboardBox";
import { getUsers } from "../services/userService";
import { filterPatients, getPatients } from "../services/patientService";
import { formatDateY } from "../utils/formatDate";
import { getLabRequests } from "../services/labRequestService";
// import LineChart from "./chart/lineChart";
// import BarChart from "./chart/barChart";

class Home extends Component {
  state = {
    numberOfUsers: "",
    numberOfPatients: "",
    numberOfLabs: "",
    numberOfTodaysPatient: "",
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const { data: users } = await getUsers("isActive=true");
      const { data: patients } = await getPatients();
      const { data: todaysPatients } = await filterPatients(
        `createdAt=${formatDateY(new Date())}`
      );
      const { data: labs } = await getLabRequests();

      this.setState({
        numberOfUsers: users.count,
        numberOfPatients: patients.count,
        numberOfTodaysPatient: todaysPatients.count,
        numberOfLabs: labs.count,
        loading: false,
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        // console.log("TOKEN EXPIRED");
        // localStorage.removeItem("token");
      }
    }
  }

  render() {
    const {
      numberOfUsers,
      numberOfPatients,
      numberOfLabs,
      numberOfTodaysPatient,
      loading,
    } = this.state;
    return (
      <>
        <StyledFlex>
          <DashboardBox
            blue
            label="Patients"
            value={numberOfPatients ? numberOfPatients : ""}
            icon={<PeopleAltOutlinedIcon />}
            loading={loading}
          />
          <DashboardBox
            black
            label="Lab Reports"
            value={numberOfLabs ? numberOfLabs : ""}
            icon={<SpeakerNotesOutlinedIcon />}
            loading={loading}
          />
          <DashboardBox
            blue
            label="Today's Patients"
            value={numberOfTodaysPatient ? numberOfTodaysPatient : ""}
            icon={<PeopleAltOutlinedIcon />}
            loading={loading}
          />
          <DashboardBox
            black
            label="Active Users"
            value={numberOfUsers ? numberOfUsers : ""}
            icon={<SupervisedUserCircleIcon />}
            loading={loading}
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
