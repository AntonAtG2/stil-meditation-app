import Link from "next/link";
import Image from "next/image";
import { Calendar, User, Share2, Download } from "lucide-react";

export default function ClipCard({ clip }) {
  if (!clip) {
    return <div>No clip data</div>;
  }

  return (
    <Link href={`/clip/${clip.slug}`} className="block">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
        <div className="flex">
          {clip.stilClipDetails?.image?.node?.sourceUrl && (
            <div className="w-48 h-32 flex-shrink-0 relative">
              <Image
                src={clip.stilClipDetails.image.node.sourceUrl}
                alt={clip.stilClipDetails.image.node.altText || clip.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                {clip.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 flex-shrink-0 ml-4">
                <Calendar size={14} />
                {new Date(clip.date).toLocaleDateString()}
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {clip.stilClipDetails?.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                {clip.stilClipDetails?.author && (
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    {clip.stilClipDetails.author}
                  </div>
                )}
                {clip.stilClipDetails?.meditationNarrator && (
                  <span>
                    Narrated by {clip.stilClipDetails.meditationNarrator}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle share functionality
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Share2 size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle download functionality
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Download size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
