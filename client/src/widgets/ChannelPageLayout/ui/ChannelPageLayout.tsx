import { Outlet } from "react-router-dom";
import { ChannelHeader } from "@widgets/ChannelHeader";
import { Grid } from "@widgets/Grid";

export default function ChannelPageLayout() {
  return (
    <div className="container mx-auto px-4 py-2">
      <ChannelHeader />
      <Grid cols={3}>
        <Outlet />
      </Grid>
    </div>
  );
}
