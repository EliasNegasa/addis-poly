import React, { Component } from "react";
import { StyledChart, StyledFlex } from "./styled-components/containers";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";
import SpeakerNotesOutlinedIcon from "@material-ui/icons/SpeakerNotesOutlined";
import MapIcon from "@material-ui/icons/Map";
import DashboardBox from "./dashboardBox";
import LineChart from "./chart/lineChart";
import BarChart from "./chart/barChart";
import { filterUsers } from "../services/userService";
import { getJobs } from "../services/jobService";
import { getLowbeds } from "../services/lowbedService";
import { getRequests } from "../services/requestService";

class Home extends Component {
  state = {
    numberOfUsers: "",
    numberOfJobs: "",
    numberOfLowbeds: "",
    numberOfRequests: "",
  };

  async componentDidMount() {
    const { data: users } = await filterUsers("deleted=false");
    const { data: jobs } = await getJobs();
    const { data: lowbeds } = await getLowbeds();
    const { data: requests } = await getRequests();
    this.setState({
      numberOfUsers: users.length,
      numberOfJobs: jobs.length,
      numberOfLowbeds: lowbeds.length,
      numberOfRequests: requests.length,
    });
  }

  render() {
    const data = this.state;
    return (
      <>
        <StyledFlex>
          <DashboardBox
            yellow
            label="Customers"
            value={data.numberOfUsers}
            icon={<PeopleAltOutlinedIcon />}
          />
          <DashboardBox
            black
            label="Jobs"
            value={data.numberOfJobs}
            icon={<MapIcon />}
          />
          <DashboardBox
            yellow
            label="Registered Lowbeds"
            value={data.numberOfLowbeds}
            icon={<LocalShippingOutlinedIcon />}
          />
          <DashboardBox
            black
            label="Requestss"
            value={data.numberOfRequests}
            icon={<SpeakerNotesOutlinedIcon />}
          />
        </StyledFlex>
        <StyledFlex>
          <StyledChart>
            <LineChart />
          </StyledChart>
          <StyledChart>
            <BarChart />
          </StyledChart>
        </StyledFlex>
        <a href="mailto:elias.negasa@mmcytech.com?subject=Testing out mailto!&body=This is only a test!">Second Example</a>
      </>
    );
  }
}

export default Home;
