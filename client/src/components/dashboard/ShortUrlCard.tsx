import { Copy, EllipsisVertical, Globe, User } from "lucide-react";
import { Card } from "../ui/card";
import type { ShortUrl } from "@/types";
import { useUrlClicks } from "@/hooks/useUrlClicks";
import { toast } from "sonner";

const ShortUrlCard = ({ url }: { url: ShortUrl }) => {
  const clickCount = useUrlClicks(url.id, url.clicks);
  return (
    <Card
      key={url.id}
      className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
    >
      <div className="flex justify-between items-center px-4">
        <div className="flex items-center">
          <Globe className="w-8 h-8 text-gray-700 dark:text-gray-300" />
          <div className="ml-3 flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {url.short_url}
              </h3>
              <Copy
                className="w-4 h-4 cursor-pointer hover:text-blue-500 text-gray-600 dark:text-gray-400"
                onClick={() => {
                  navigator.clipboard.writeText(url.short_url);
                  toast.success("Copied to clipboard");
                }}
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <p>{url.destination}</p>
              <span>{new Date(url.createdAt).toDateString()}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="border border-gray-300 dark:border-gray-600 px-3 py-1 rounded-lg text-sm bg-gray-100 dark:bg-gray-700 flex items-center">
            <User
              className={`w-4 h-4 mr-2 transition-colors text-gray-700 dark:text-gray-300`}
            />
            <span
              className={`font-semibold transition-colors text-gray-900 dark:text-white`}
            >
              {clickCount}
            </span>
          </div>
          <EllipsisVertical className="w-4 h-4 cursor-pointer text-gray-700 dark:text-gray-300" />
        </div>
      </div>
    </Card>
  );
};

export default ShortUrlCard;
