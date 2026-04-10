import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const analyzeRepo = async (owner, repo) => {
  const res = await axios.get(`${BASE_URL}/analyze`, {
    params: { owner, repo },
  });
  return res.data;
};