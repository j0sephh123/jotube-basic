import React from "react";
import { Outlet } from "react-router-dom";
import {
  ChannelsHeader,
  SelectSortDirection,
  VideosHeader,
  ViewTypeToggle,
} from "@widgets/Dashboard";
import { DashboardType } from "@features/Dashboard";
import { useTypedParams } from "@shared/hooks";
import { Grid } from "@widgets/Grid";
import { RangePicker } from "@widgets/RangePicker";

const header: Record<
  DashboardType,
  React.ComponentType<{ leftSlot: React.ReactNode }>
> = {
  channels: ChannelsHeader,
  videos: VideosHeader,
};

export default function DashboardWrapper() {
  const { type } = useTypedParams("DashboardParams");

  const Header = header[type];

  return (
    <div className="h-screen flex flex-col p-2 pb-14">
      <div className="bg-base-100 rounded-lg flex flex-col h-full">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Header
            leftSlot={
              <div className="flex items-center gap-4">
                <SelectSortDirection />
                {type === DashboardType.CHANNELS && <ViewTypeToggle />}
                {type === DashboardType.CHANNELS && (
                  <>
                    <RangePicker
                      minLabel="Min"
                      maxLabel="Max"
                      minKey="min"
                      maxKey="max"
                    />
                    <RangePicker
                      minLabel="Default Min"
                      maxLabel="Default Max"
                      minKey="defaultMin"
                      maxKey="defaultMax"
                    />
                  </>
                )}
              </div>
            }
          />
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto px-4">
          <Grid>
            <Outlet />
          </Grid>
        </div>
      </div>
    </div>
  );
}
