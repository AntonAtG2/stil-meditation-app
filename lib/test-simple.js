const { GraphQLClient } = require("graphql-request");

const client = new GraphQLClient("https://stil.g2dev.co.za/graphql");

async function testSimple() {
  try {
    // Test basic posts first
    const basicQuery = `
      query {
        posts(first: 3) {
          nodes {
            id
            title
            slug
          }
        }
      }
    `;

    const basicData = await client.request(basicQuery);
    console.log("Basic posts work:", basicData);

    // Test if stil-clip post type exists
    const stilQuery = `
      query {
        stilClips(first: 3) {
          nodes {
            id
            title
            slug
          }
        }
      }
    `;

    const stilData = await client.request(stilQuery);
    console.log("STIL clips found:", stilData);
  } catch (error) {
    console.error("Test failed:", error.message);
  }
}

testSimple();
