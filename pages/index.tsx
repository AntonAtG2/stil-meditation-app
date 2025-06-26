import { useState } from "react";
import Layout from "../components/Layout";
import ClipCard from "../components/ClipCard";
import { getStilClips } from "../lib/wordpress";

export default function Home({ initialClips }) {
  const [clips] = useState(initialClips?.nodes || []);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Recent Meditations
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find peace and stillness in these guided meditation sessions. Each
            S.T.I.L meditation takes you through Scripture, reflection,
            intercession, and listening.
          </p>
        </div>

        {clips.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No meditation clips found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {clips.map((clip) => (
              <ClipCard key={clip.id} clip={clip} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    console.log("Fetching clips for static generation...");
    const clips = await getStilClips(10);

    return {
      props: {
        initialClips: clips,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("WordPress fetch error:", error);
    return {
      props: {
        initialClips: { nodes: [] },
      },
    };
  }
}
