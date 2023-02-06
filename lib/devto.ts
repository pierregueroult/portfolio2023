import axios from "axios";

export async function getAllUnpublished() {
  const params = { username: "pierregueroult", per_page: 1000 };
  const headers = { api_key: process.env.DEVTO_API_KEY };

  const { data } = await axios.get(
    "https://dev.to/api/articles/me/unpublished",
    {
      params,
      headers,
    }
  );

  return data;
}
