// src/components/dashboard/Links.tsx
import { ClipboardList } from "lucide-react";
import CreateLink from "./CreateLink";
import ShortUrlCard from "./ShortUrlCard";
import { useAppSelector } from "@/store/hooks";
import type { ShortUrl } from "@/types";
import { useFetchLinks } from "@/hooks/useFetchLinks";
import ShortUrlCardSkeleton from "../skeletons/ShortUrlCardsSkeleton";

const Links = () => {
  const { links } = useAppSelector((state) => state.links);
  const { isPending, error } = useFetchLinks();

  return (
    <div className="h-full bg-white rounded-2xl flex-1 flex flex-col">
      <div className="flex items-center justify-between border-b px-4 py-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Links</h1>
          <ClipboardList className="w-4 h-4" />
        </div>
        <CreateLink />
      </div>

      <div className="flex-1 overflow-hidden">
        {isPending ? (
          <div className="h-full overflow-y-auto px-4 py-2">
            <ShortUrlCardSkeleton />
            <ShortUrlCardSkeleton />
            <ShortUrlCardSkeleton />
            <ShortUrlCardSkeleton />
          </div>
        ) : error ? (
          <div className="h-full p-4">
            <p>No links yet, click the button to create one</p>
          </div>
        ) : (
          <div className="h-full overflow-y-auto px-4 py-2">
            {links.length > 0 ? (
              <div className="space-y-4">
                {links.map((url: ShortUrl) => (
                  <ShortUrlCard key={url.id} url={url} />
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <ClipboardList className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No links yet
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Get started by creating your first short link
                  </p>
                  <CreateLink />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Links;
