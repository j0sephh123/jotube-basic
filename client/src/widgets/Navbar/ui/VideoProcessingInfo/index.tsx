import { useState } from "react";
import { useQueue } from "@shared/hooks";
import { Button } from "@shared/ui";
import useActions from "./useActions";
import VideoProcessingInfoWrapper from "./Wrapper";
import { useSettingsQuery } from "@features/Settings";
import { AutoDownload } from "@widgets/Settings";
import { useGetProcessingReadyUploadsQuery } from "@shared/api/generated/graphql";
import { AutoDlEnabledSection, AutoDLLabel, NoVideosFound } from "./static";
import { ChannelItem } from "./ChannelItem";
import useGroupByChannel from "./useGroupByChannel";

export default function VideoProcessingInfo() {
  const { data: queueData = [] } = useQueue();

  // Hardcoded queue items for testing UI

  const [isOpen, setIsOpen] = useState(false);
  const { data: { autoDownload = false } = {} } = useSettingsQuery();

  const hasItems = queueData.length > 0;
  const hasWaitingItems = queueData.some((item) => item.state === "waiting");

  const { handleCancelAll, handleRemoveJob, handleCancelChannel } =
    useActions();

  const groupedByChannel = useGroupByChannel();

  // Hardcoded grouped by channel items for testing UI
  // const groupedByChannel: [string, QueueItem[]][] = [
  //   [
  //     "UCp8S85oDVWCHLZZbaUD33mw",
  //     [
  //       {
  //         id: "1",
  //         ytChannelId: "UCp8S85oDVWCHLZZbaUD33mw",
  //         ytVideoId: "8sK7l0wjpsI",
  //         state: "active",
  //         videoTitle: "Phil Hellmuth Sparks Poker Controversy For The WSOP",
  //         channelTitle: "Poker Bounty",
  //       },
  //       {
  //         id: "2",
  //         ytChannelId: "UCp8S85oDVWCHLZZbaUD33mw",
  //         ytVideoId: "9tL8m1xqpsJ",
  //         state: "waiting",
  //         videoTitle: "Daniel Negreanu's Epic Comeback Story",
  //         channelTitle: "Poker Bounty",
  //       },
  //       {
  //         id: "3",
  //         ytChannelId: "UCp8S85oDVWCHLZZbaUD33mw",
  //         ytVideoId: "0uK9n2xrpsK",
  //         state: "waiting",
  //         videoTitle: "High Stakes Cash Game Action",
  //         channelTitle: "Poker Bounty",
  //       },
  //       {
  //         id: "9",
  //         ytChannelId: "UCp8S85oDVWCHLZZbaUD33mw",
  //         ytVideoId: "6aK0n3yrpsQ",
  //         state: "waiting",
  //         videoTitle: "World Series of Poker Main Event Highlights",
  //         channelTitle: "Poker Bounty",
  //       },
  //       {
  //         id: "10",
  //         ytChannelId: "UCp8S85oDVWCHLZZbaUD33mw",
  //         ytVideoId: "7bL1o4zspsR",
  //         state: "active",
  //         videoTitle: "Poker Strategy: When to Fold Premium Hands",
  //         channelTitle: "Poker Bounty",
  //       },
  //       {
  //         id: "11",
  //         ytChannelId: "UCp8S85oDVWCHLZZbaUD33mw",
  //         ytVideoId: "8cM2p5zupsS",
  //         state: "waiting",
  //         videoTitle: "Live Tournament Action from Las Vegas",
  //         channelTitle: "Poker Bounty",
  //       },
  //       {
  //         id: "12",
  //         ytChannelId: "UCp8S85oDVWCHLZZbaUD33mw",
  //         ytVideoId: "9dN3q6AupsT",
  //         state: "waiting",
  //         videoTitle: "Poker Psychology: Reading Your Opponents",
  //         channelTitle: "Poker Bounty",
  //       },
  //       {
  //         id: "13",
  //         ytChannelId: "UCp8S85oDVWCHLZZbaUD33mw",
  //         ytVideoId: "0eO4r7BupsU",
  //         state: "active",
  //         videoTitle: "Cash Game vs Tournament Strategy Differences",
  //         channelTitle: "Poker Bounty",
  //       },
  //     ],
  //   ],
  //   [
  //     "UC2t5bjwHdUX4vM2g8TRTq5w",
  //     [
  //       {
  //         id: "4",
  //         ytChannelId: "UC2t5bjwHdUX4vM2g8TRTq5w",
  //         ytVideoId: "1vL0o3yspsL",
  //         state: "active",
  //         videoTitle: "Amazing Magic Trick Revealed",
  //         channelTitle: "Magic Channel",
  //       },
  //       {
  //         id: "5",
  //         ytChannelId: "UC2t5bjwHdUX4vM2g8TRTq5w",
  //         ytVideoId: "2wM1p4zupsM",
  //         state: "waiting",
  //         videoTitle: "Cardistry Tutorial for Beginners",
  //         channelTitle: "Magic Channel",
  //       },
  //       {
  //         id: "14",
  //         ytChannelId: "UC2t5bjwHdUX4vM2g8TRTq5w",
  //         ytVideoId: "3xN2q5AupsV",
  //         state: "waiting",
  //         videoTitle: "Coin Magic: The Classic Palm Technique",
  //         channelTitle: "Magic Channel",
  //       },
  //       {
  //         id: "15",
  //         ytChannelId: "UC2t5bjwHdUX4vM2g8TRTq5w",
  //         ytVideoId: "4yO3r6BupsW",
  //         state: "active",
  //         videoTitle: "Mentalism: How to Read Minds",
  //         channelTitle: "Magic Channel",
  //       },
  //       {
  //         id: "16",
  //         ytChannelId: "UC2t5bjwHdUX4vM2g8TRTq5w",
  //         ytVideoId: "5zP4s7CupsX",
  //         state: "waiting",
  //         videoTitle: "Street Magic Performance Tips",
  //         channelTitle: "Magic Channel",
  //       },
  //       {
  //         id: "17",
  //         ytChannelId: "UC2t5bjwHdUX4vM2g8TRTq5w",
  //         ytVideoId: "6aQ5t8DupsY",
  //         state: "waiting",
  //         videoTitle: "Close-Up Magic for Restaurants",
  //         channelTitle: "Magic Channel",
  //       },
  //     ],
  //   ],
  //   [
  //     "UC3u6bjwHdUX4vM2g8TRTq6x",
  //     [
  //       {
  //         id: "6",
  //         ytChannelId: "UC3u6bjwHdUX4vM2g8TRTq6x",
  //         ytVideoId: "3xN2q5AupsN",
  //         state: "active",
  //         videoTitle: "Cooking Perfect Pasta Every Time",
  //         channelTitle: "Chef's Kitchen",
  //       },
  //       {
  //         id: "7",
  //         ytChannelId: "UC3u6bjwHdUX4vM2g8TRTq6x",
  //         ytVideoId: "4yO3r6BupsO",
  //         state: "active",
  //         videoTitle: "Italian Recipes You Must Try",
  //         channelTitle: "Chef's Kitchen",
  //       },
  //       {
  //         id: "8",
  //         ytChannelId: "UC3u6bjwHdUX4vM2g8TRTq6x",
  //         ytVideoId: "5zP4s7CupsP",
  //         state: "waiting",
  //         videoTitle: "Homemade Bread Baking Guide",
  //         channelTitle: "Chef's Kitchen",
  //       },
  //       {
  //         id: "18",
  //         ytChannelId: "UC3u6bjwHdUX4vM2g8TRTq6x",
  //         ytVideoId: "7bR6u9EupsZ",
  //         state: "waiting",
  //         videoTitle: "French Pastry Techniques",
  //         channelTitle: "Chef's Kitchen",
  //       },
  //       {
  //         id: "19",
  //         ytChannelId: "UC3u6bjwHdUX4vM2g8TRTq6x",
  //         ytVideoId: "8cS7v0FupsA",
  //         state: "active",
  //         videoTitle: "Asian Fusion Cooking Methods",
  //         channelTitle: "Chef's Kitchen",
  //       },
  //       {
  //         id: "20",
  //         ytChannelId: "UC3u6bjwHdUX4vM2g8TRTq6x",
  //         ytVideoId: "9dT8w1GupsB",
  //         state: "waiting",
  //         videoTitle: "Grilling Masterclass: Perfect Steaks",
  //         channelTitle: "Chef's Kitchen",
  //       },
  //       {
  //         id: "21",
  //         ytChannelId: "UC3u6bjwHdUX4vM2g8TRTq6x",
  //         ytVideoId: "0eU9x2HupsC",
  //         state: "waiting",
  //         videoTitle: "Vegetarian Gourmet Recipes",
  //         channelTitle: "Chef's Kitchen",
  //       },
  //       {
  //         id: "22",
  //         ytChannelId: "UC3u6bjwHdUX4vM2g8TRTq6x",
  //         ytVideoId: "1fV0y3IupsD",
  //         state: "active",
  //         videoTitle: "Dessert Making: Chocolate Techniques",
  //         channelTitle: "Chef's Kitchen",
  //       },
  //       {
  //         id: "23",
  //         ytChannelId: "UC3u6bjwHdUX4vM2g8TRTq6x",
  //         ytVideoId: "2gW1z4JupsE",
  //         state: "waiting",
  //         videoTitle: "Kitchen Knife Skills and Safety",
  //         channelTitle: "Chef's Kitchen",
  //       },
  //     ],
  //   ],
  // ];
  const { data: { getProcessingReadyUploads: { count = 0 } = {} } = {} } =
    useGetProcessingReadyUploadsQuery();

  console.log({ count, queueData });

  return (
    <VideoProcessingInfoWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      queueData={queueData}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-white">Video Processing</h3>
          {autoDownload && <AutoDLLabel />}
        </div>
        {hasWaitingItems && (
          <Button onClick={handleCancelAll} className="btn btn-sm btn-error">
            Cancel All Waiting
          </Button>
        )}
      </div>
      {autoDownload && <AutoDlEnabledSection />}
      <AutoDownload availableVideos={count} />
      <div className="space-y-3">
        {hasItems ? (
          groupedByChannel.map(([channelId, items]) => (
            <ChannelItem
              handleRemoveJob={handleRemoveJob}
              key={channelId}
              channelId={channelId}
              items={items}
              activeCount={items.filter((i) => i.state === "active").length}
              waitingCount={items.filter((i) => i.state === "waiting").length}
              handleCancelChannel={handleCancelChannel}
            />
          ))
        ) : (
          <NoVideosFound />
        )}
      </div>
    </VideoProcessingInfoWrapper>
  );
}
