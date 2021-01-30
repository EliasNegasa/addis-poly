import React from "react";
import { StyledFlex } from "./styled-components/container";
import { StyledDashboardCard } from "./styled-components/styledDashboard";

const DashboardBox = ({ label, value, icon, ...rest }) => {
  return (
    <StyledDashboardCard {...rest}>
      <div className="card-block">
        <StyledFlex>
          <div>
            <p>{label}</p>
            <h4>{value}</h4>
          </div>
          <div>{icon}</div>
        </StyledFlex>
      </div>
    </StyledDashboardCard>
  );
};

export default DashboardBox;
