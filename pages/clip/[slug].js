import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";
import AudioPlayer from "../../components/AudioPlayer";
import TranscriptSection from "../../components/TranscriptSection";
import { getStilClipBySlug, getStilClips } from "../../lib/wordpress";
import { Calendar, User, ArrowLeft } from "lucide-react";

export default function ClipPage({ clip }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading meditation clip...</p>
        </div>
      </Layout>
    );
  }

  if (!clip) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-500">Clip not found.</p>
          <Link
            href="/"
            className="text-blue-600 hover:underline mt-4 inline-block"
          >
            Return to home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${clip.title} - S.T.I.L`}>
      <div className="space-y-6">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to clips
        </Link>

        {/* Clip Header */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {clip.stilClipDetails?.image?.node?.sourceUrl && (
              <div className="w-full md:w-64 h-48 flex-shrink-0 relative">
                <Image
                  src={clip.stilClipDetails.image.node.sourceUrl}
                  alt={clip.stilClipDetails.image.node.altText || clip.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800 mb-3">
                {clip.title}
              </h1>

              <p className="text-gray-600 mb-4">
                {clip.stilClipDetails?.excerpt}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
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
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(clip.date).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Audio Player */}
        <AudioPlayer
          audioUrl={
            clip.stilClipDetails?.audioClip?.node?.sourceUrl ||
            clip.stilClipDetails?.audioClip?.node?.mediaItemUrl
          }
          audioUrlNoMusic={
            clip.stilClipDetails?.audioClipNoMusic?.node?.sourceUrl ||
            clip.stilClipDetails?.audioClipNoMusic?.node?.mediaItemUrl
          }
          title={clip.title}
        />

        {/* Transcript */}
        <TranscriptSection transcript={clip.stilClipDetails?.transcript} />
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const clips = await getStilClips(100);
    const paths = clips.nodes.map((clip) => ({
      params: { slug: clip.slug },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const clip = await getStilClipBySlug(params.slug);
    if (!clip) {
      return { notFound: true };
    }
    return {
      props: { clip },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        clip: null,
      },
    };
  }
}
