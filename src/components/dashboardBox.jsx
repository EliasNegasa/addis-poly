import React from "react";
import Spinner from "./common/spinner";
import { StyledFlex } from "./styled-components/container";
import { StyledDashboardCard } from "./styled-components/styledDashboard";

const DashboardBox = ({ label, value, icon, loading, ...rest }) => {
  return (
    <StyledDashboardCard {...rest}>
      <div className="card-block">
        <StyledFlex>
          <div>
            <p>{label}</p>
            {loading && <Spinner size={30} />}
            <h4>{value}</h4>
          </div>
          <div>{icon}</div>
        </StyledFlex>
      </div>
    </StyledDashboardCard>
  );
};

export default DashboardBox;
