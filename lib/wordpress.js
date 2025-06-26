import { GraphQLClient } from "graphql-request";

const endpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT;

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getStilClips(first = 10, after = null) {
  const query = `
    query GetStilClips($first: Int!, $after: String) {
      stilClips(first: $first, after: $after) {
        nodes {
          id
          title
          slug
          date
          stilClipDetails {
            excerpt
            author
            meditationNarrator
            scriptureReader
            audioClip {
              node {
                sourceUrl
                mediaItemUrl
              }
            }
            audioClipNoMusic {
              node {
                sourceUrl
                mediaItemUrl
              }
            }
            image {
              node {
                sourceUrl
                altText
                caption
              }
            }
            transcript {
              stilIntroGroup {
                stilIntroHeader
                stilIntroContent
                todayssDateHeader
                stilTodaysDateContent
                stilExplanationHeader
                stilExplanationContent
              }
              sOfStil {
                sHeader
                sQuiteTimeHeader
                sQuiteTimeContent
                sPsalmHeading
                sPsalmIntro
                sPsalmValue
                sPsalmExtro
              }
              tOfStil {
                tHeader
                tVerseIntro
                tVerseContent
                tVerseEnd
                tBibleReadingHeader
                tBibleReadingVerse
                tBibleReadingRepeat
                tStoryTimeHeader
                tStoryTimeContent
                tHereAndNowHeader
                tHereAndNowContents
                tRecapAndTakeInHeader
                tRecapAndTakeInContent
              }
              iOfStil {
                iOfStilHeader
                iStandInForSelfHeading
                iStandInForSelfContent
                iStandInForOthersHeading
                iStandInForOthersContent
                iPrayerHeading
                iPrayerContent
              }
              lOfStil {
                lOfStilHeading
                lReadTextAgainHeading
                lReadTextAgainIntro
                lReadTextAgainVerse
                lReadTextAgainVerseRepeat
                lReadTextAgainIntrospection
              }
              stilExtroGroup {
                header
                xtroText
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;

  try {
    console.log(
      "Fetching from WordPress:",
      process.env.WORDPRESS_GRAPHQL_ENDPOINT
    );
    const data = await graphQLClient.request(query, { first, after });
    console.log("Raw GraphQL response:", JSON.stringify(data, null, 2));
    console.log("Number of clips found:", data?.stilClips?.nodes?.length || 0);
    return data.stilClips;
  } catch (error) {
    console.error("Error fetching STIL clips:", error);
    return { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } };
  }
}

export async function getStilClipBySlug(slug) {
  const query = `
    query GetStilClipBySlug($slug: ID!) {
      stilClip(id: $slug, idType: SLUG) {
        id
        title
        slug
        date
        stilClipDetails {
          excerpt
          author
          meditationNarrator
          scriptureReader
          audioClip {
            node {
              sourceUrl
              mediaItemUrl
            }
          }
          audioClipNoMusic {
            node {
              sourceUrl
              mediaItemUrl
            }
          }
          image {
            node {
              sourceUrl
              altText
              caption
            }
          }
          transcript {
            stilIntroGroup {
              stilIntroHeader
              stilIntroContent
              todayssDateHeader
              stilTodaysDateContent
              stilExplanationHeader
              stilExplanationContent
            }
            sOfStil {
              sHeader
              sQuiteTimeHeader
              sQuiteTimeContent
              sPsalmHeading
              sPsalmIntro
              sPsalmValue
              sPsalmExtro
            }
            tOfStil {
              tHeader
              tVerseIntro
              tVerseContent
              tVerseEnd
              tBibleReadingHeader
              tBibleReadingVerse
              tBibleReadingRepeat
              tStoryTimeHeader
              tStoryTimeContent
              tHereAndNowHeader
              tHereAndNowContents
              tRecapAndTakeInHeader
              tRecapAndTakeInContent
            }
            iOfStil {
              iOfStilHeader
              iStandInForSelfHeading
              iStandInForSelfContent
              iStandInForOthersHeading
              iStandInForOthersContent
              iPrayerHeading
              iPrayerContent
            }
            lOfStil {
              lOfStilHeading
              lReadTextAgainHeading
              lReadTextAgainIntro
              lReadTextAgainVerse
              lReadTextAgainVerseRepeat
              lReadTextAgainIntrospection
            }
            stilExtroGroup {
              header
              xtroText
            }
          }
        }
      }
    }
  `;

  try {
    const data = await graphQLClient.request(query, { slug });
    return data.stilClip;
  } catch (error) {
    console.error("Error fetching STIL clip:", error);
    return null;
  }
}
