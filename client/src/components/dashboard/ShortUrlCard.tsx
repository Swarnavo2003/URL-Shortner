import { Copy, EllipsisVertical, Globe, User } from "lucide-react";
import { Card } from "../ui/card";
import type { ShortUrl } from "@/types";
import { useUrlClicks } from "@/hooks/useUrlClicks";

const ShortUrlCard = ({ url }: { url: ShortUrl }) => {
  const clickCount = useUrlClicks(url.id, url.clicks);
  return (
    <Card key={url.id}>
      <div className="flex justify-between items-center px-4">
        <div className="flex items-center">
          <Globe className="w-8 h-8" />
          <div className="ml-3 flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold">{url.short_url}</h3>
              <Copy
                className="w-4 h-4 cursor-pointer hover:text-blue-500"
                onClick={() => navigator.clipboard.writeText(url.short_url)}
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <p>{url.destination}</p>
              <span>{new Date(url.createdAt).toDateString()}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="border px-3 py-1 rounded-lg text-sm bg-gray-100 flex items-center">
            <User className={`w-4 h-4 mr-2 transition-colors`} />
            <span className={`font-semibold transition-colors `}>
              {clickCount}
            </span>
          </div>
          <EllipsisVertical className="w-4 h-4 cursor-pointer" />
        </div>
      </div>
    </Card>
  );
};

export default ShortUrlCard;
