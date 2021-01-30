import React, { Component } from "react";
import { StyledChart, StyledFlex } from "./styled-components/container";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";
import SpeakerNotesOutlinedIcon from "@material-ui/icons/SpeakerNotesOutlined";
import MapIcon from "@material-ui/icons/Map";
import DashboardBox from "./dashboardBox";
// import LineChart from "./chart/lineChart";
// import BarChart from "./chart/barChart";

class Home extends Component {
  state = {
    numberOfUsers: "",
    numberOfJobs: "",
    numberOfLowbeds: "",
    numberOfRequests: "",
  };

  async componentDidMount() {
    // const { data: users } = await filterUsers("deleted=false");
    // const { data: jobs } = await getJobs();
    // const { data: lowbeds } = await getLowbeds();
    // const { data: requests } = await getRequests();
    // this.setState({
    //   numberOfUsers: users.length,
    //   numberOfJobs: jobs.length,
    //   numberOfLowbeds: lowbeds.length,
    //   numberOfRequests: requests.length,
    // });
  }

  render() {
    const data = this.state;
    return (
      <>
        <StyledFlex>
          <DashboardBox
            blue
            label="Patients"
            value={data.numberOfUsers}
            icon={<PeopleAltOutlinedIcon />}
          />
          <DashboardBox
            black
            label="Lab Reports"
            value={data.numberOfJobs}
            icon={<SpeakerNotesOutlinedIcon />}
          />
          <DashboardBox
            blue
            label="Today's Patients"
            value={data.numberOfLowbeds}
            icon={<PeopleAltOutlinedIcon />}
          />
          <DashboardBox
            black
            label="Rate"
            value={data.numberOfRequests}
            icon={<SpeakerNotesOutlinedIcon />}
          />
        </StyledFlex>
        <StyledFlex>
          <StyledChart>
            {/* <LineChart /> */}
          </StyledChart>
          <StyledChart>
            {/* <BarChart /> */}
          </StyledChart>
        </StyledFlex>
      </>
    );
  }
}

export default Home;
