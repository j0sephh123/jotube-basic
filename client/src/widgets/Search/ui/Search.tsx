import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Modal } from "@shared/ui";
import { Link } from "react-router-dom";
import { useQuickSearch, type SearchResult } from "@features/Search";
import type { SearchVideoResult } from "@features/Search";
import { ChannelLink } from "@shared/ui";
import { routes } from "@shared/routes";

const highlightText = (text: string, query: string) => {
  if (!query.trim()) return text;

  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="bg-yellow-400 text-black px-1 rounded">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

export default function QuickSearch() {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isModalOpen]);

  const { mutateAsync, data, isPending } = useQuickSearch();
  const results = (data ?? []) as SearchResult[];

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery) {
      try {
        await mutateAsync({ search: newQuery });
      } catch (error) {
        console.error("Search failed:", error);
      }
    }
  };

  return (
    <>
      <div className="relative w-64">
        <button
          onClick={() => setIsModalOpen(true)}
          className="input input-bordered w-full pl-10 text-left text-base-content/70 cursor-pointer hover:bg-base-200 transition-colors relative"
          type="button"
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-base-content/50" />
          </span>
          Search...
        </button>
      </div>

      <Modal
        isModalVisible={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setQuery("");
        }}
        maxWidth="600px"
      >
        <div className="p-4 h-[90vh] flex flex-col">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            className="input input-bordered w-full text-lg h-14 px-4"
            value={query}
            onChange={handleInputChange}
          />

          {query.length > 0 && (
            <div className="mt-4 flex-1 overflow-auto">
              {isPending ? (
                <div className="p-4 text-center text-base-content/70">
                  Loading...
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-2">
                  {results.map((item: SearchResult, idx: number) => (
                    <div
                      key={idx}
                      className="border border-base-300 rounded-lg overflow-hidden bg-base-100"
                    >
                      {item.type === "ytVideoId" ? (
                        <Link
                          to={routes.galleryVideo(
                            (item as SearchVideoResult).channelYtId,
                            item.ytId
                          )}
                          className="block p-4 hover:bg-base-200 transition-colors"
                          onClick={() => setIsModalOpen(false)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  VID
                                </span>
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-base-content truncate">
                                {highlightText(item.title, query)}
                              </div>
                              <div className="text-xs text-base-content/60">
                                Video •{" "}
                                {(item as SearchVideoResult).channelYtId}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <ChannelLink
                          ytId={item.ytId}
                          where="index"
                          className="block p-4 hover:bg-base-200 transition-colors"
                          onClick={() => setIsModalOpen(false)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  CH
                                </span>
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-base-content truncate">
                                {highlightText(item.title, query)}
                              </div>
                              <div className="text-xs text-base-content/60">
                                Channel •{" "}
                                {item.type === "ytChannelId"
                                  ? "ID Match"
                                  : "Title Match"}
                              </div>
                            </div>
                          </div>
                        </ChannelLink>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-base-content/70">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
