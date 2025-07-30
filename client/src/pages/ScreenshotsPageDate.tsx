import { useParams, useNavigate, useLocation } from "react-router-dom";
import SimpleCardWithImage from "@/features/Screenshot/components/SimpleCardWithImage";
import { useScreenshotsByDate } from "@/features/Screenshot/hooks/useScreenshotsByDate";
import { useDeleteScreenshot } from "@/features/Screenshot/hooks/useDeleteScreenshot";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { routes } from "@/shared/utils/routes";

type Screenshot = {
  id: number;
  second: number;
  channelTitle: string;
  videoTitle: string;
  isFav: boolean;
  ytChannelId: string;
  ytVideoId: string;
}

type GroupedScreenshots = {
  [channelId: string]: {
    channelTitle: string;
    screenshots: Screenshot[];
  };
}

const formatDisplayDate = (dateString: string) => {
  const dateObj = new Date(dateString);
  return dateObj.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};

const getPreviousDate = (dateString: string) => {
  const date = new Date(dateString);
  date.setDate(date.getDate() - 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getNextDate = (dateString: string) => {
  const date = new Date(dateString);
  date.setDate(date.getDate() + 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const isTodayOrFuture = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date >= today;
};

const getDateOffset = (dateString: string, daysOffset: number) => {
  const date = new Date(dateString);
  date.setDate(date.getDate() + daysOffset);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function ScreenshotsPage(): JSX.Element {
  const { month, date } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: screenshots } = useScreenshotsByDate(month, date);
  const { mutate: deleteScreenshot } = useDeleteScreenshot(month, date);
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
  const [groupedScreenshots, setGroupedScreenshots] =
    useState<GroupedScreenshots>({});
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (screenshots) {
      const grouped = screenshots.reduce(
        (acc: GroupedScreenshots, screenshot) => {
          const channelId = screenshot.ytChannelId;
          if (!acc[channelId]) {
            acc[channelId] = {
              channelTitle: screenshot.channelTitle,
              screenshots: [],
            };
          }
          acc[channelId].screenshots.push(screenshot);
          return acc;
        },
        {}
      );
      setGroupedScreenshots(grouped);
      const channelIds = Object.keys(grouped);
      if (channelIds.length > 0) {
        const firstChannelId = channelIds[0];
        if (firstChannelId) {
          setActiveChannel(firstChannelId);
          if (!location.hash) {
            navigate(`#${firstChannelId}`, { replace: true });
          }
        }
      }
    }
  }, [screenshots, navigate, location.hash]);

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash && groupedScreenshots[hash]) {
      setActiveChannel(hash);
      const section = sectionRefs.current[hash];
      if (section) {
        section.scrollIntoView({ behavior: "auto", block: "start" });
      }
    }
  }, [location.hash, groupedScreenshots]);

  const scrollToChannel = (channelId: string) => {
    navigate(`#${channelId}`);
  };

  if (!screenshots) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        Loading...
      </div>
    );
  }

  const channelIds = Object.keys(groupedScreenshots);

  return (
    <div className="w-full h-full relative">
      <div className="fixed top-16 left-80 right-0 z-40 bg-base-100 border-b border-base-300 shadow-sm">
        <div className="px-4 py-4 flex items-center justify-center">
          <div className="flex items-center gap-2 p-2">
            <button
              onClick={() => {
                if (date) {
                  const targetDate = getDateOffset(date, -7);
                  const targetMonth = targetDate.substring(0, 7);
                  navigate(routes.screenshotsDate(targetMonth, targetDate));
                }
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white rounded-lg px-2 py-2 text-sm"
              aria-label="1 week back"
            >
              1W
            </button>
            <button
              onClick={() => {
                if (date) {
                  const targetDate = getDateOffset(date, -3);
                  const targetMonth = targetDate.substring(0, 7);
                  navigate(routes.screenshotsDate(targetMonth, targetDate));
                }
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white rounded-lg px-2 py-2 text-sm"
              aria-label="3 days back"
            >
              3D
            </button>
            <button
              onClick={() => {
                if (date) {
                  const prevDate = getPreviousDate(date);
                  const prevMonth = prevDate.substring(0, 7);
                  navigate(routes.screenshotsDate(prevMonth, prevDate));
                }
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 py-2 flex items-center justify-center"
              aria-label="Previous date"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold">
              {date ? formatDisplayDate(date) : `${month}/${date}`}
            </h1>
            {date && !isTodayOrFuture(date) && (
              <button
                onClick={() => {
                  const nextDate = getNextDate(date);
                  const nextMonth = nextDate.substring(0, 7);
                  navigate(routes.screenshotsDate(nextMonth, nextDate));
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 py-2 flex items-center justify-center"
                aria-label="Next date"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="pt-20 h-full flex">
        <div className="w-64 bg-base-200 border-r border-base-300 overflow-y-auto fixed left-16 top-32 bottom-0">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Channels</h2>
            <div className="space-y-2">
              {channelIds.map((channelId) => {
                const channel = groupedScreenshots[channelId];
                if (!channel) return null;
                return (
                  <button
                    key={channelId}
                    onClick={() => scrollToChannel(channelId)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      activeChannel === channelId
                        ? "bg-primary text-primary-content"
                        : "bg-base-100 hover:bg-base-300"
                    }`}
                  >
                    <div className="font-medium truncate">
                      {channel.channelTitle}
                    </div>
                    <div className="text-sm opacity-70">
                      {channel.screenshots.length} screenshot
                      {channel.screenshots.length !== 1 ? "s" : ""}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex-1 ml-64" style={{ height: "calc(100vh - 128px)" }}>
          <div className="h-full overflow-auto">
            <div className="p-4">
              {channelIds.map((channelId) => {
                const channel = groupedScreenshots[channelId];
                if (!channel) return null;
                return (
                  <div
                    key={channelId}
                    id={channelId}
                    ref={(el) => (sectionRefs.current[channelId] = el)}
                    className="mb-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4">
                      {channel.screenshots.map((screenshot) => (
                        <SimpleCardWithImage
                          key={screenshot.id}
                          id={screenshot.id}
                          second={screenshot.second}
                          channelTitle={screenshot.channelTitle}
                          videoTitle={screenshot.videoTitle}
                          isFav={screenshot.isFav}
                          ytChannelId={screenshot.ytChannelId}
                          ytVideoId={screenshot.ytVideoId}
                          onDelete={deleteScreenshot}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
