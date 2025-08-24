import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const ShortUrlCardSkeleton = () => {
  return (
    <Card>
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center">
          {/* Globe Icon Placeholder */}
          <Skeleton className="w-8 h-8 rounded-full" />

          <div className="ml-3 flex flex-col gap-2">
            {/* Short URL + Copy Icon */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-4 rounded" />
            </div>

            {/* Destination + Date */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </div>

        {/* Clicks + Ellipsis */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-12 rounded-lg" />
          <Skeleton className="h-4 w-4 rounded" />
        </div>
      </div>
    </Card>
  );
};

export default ShortUrlCardSkeleton;
