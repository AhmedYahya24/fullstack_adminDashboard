import { Box } from "@mui/material";
import Header from "components/common/Header";
import BreakdownChart from "./BreakdownChart";

const Breakdown = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="BREAKDOWN"
        subTitle="Chart of breakdown sales bu category."
      />
      <Box height="75vh" mt="40px">
        <BreakdownChart />
      </Box>
    </Box>
  );
};

export default Breakdown;
