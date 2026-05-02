import type { APIRoute } from 'astro';

const KEY = "ee35bd410c8940c1a29f23f1c772c599";
const HOST = "www.techmeout.it";

const URLS = [
  `https://${HOST}/`,
  `https://${HOST}/lavori/`,
  `https://${HOST}/community/`,
  `https://${HOST}/lavori/ansible-pilot/`,
  `https://${HOST}/lavori/copypastelearn/`,
  `https://${HOST}/lavori/luca-berton/`,
  `https://${HOST}/lavori/open-empower/`,
  `https://${HOST}/lavori/terraform-pilot/`,
  `https://${HOST}/lavori/proteinlens/`,
  `https://${HOST}/lavori/tende-da-tetto/`,
  `https://${HOST}/lavori/t4-triveneto/`,
  `https://${HOST}/privacy/`,
  `https://${HOST}/cookie/`,
];

export const GET: APIRoute = async () => {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: URLS,
    submitEndpoint: "https://api.indexnow.org/IndexNow",
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
};
