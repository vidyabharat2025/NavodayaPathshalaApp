import apiClient from '../api/apiClient';

export const fetchTestItemsPaginated = async (testId, page = 1, limit = 10) => {
  const url = `/v2/tests/${testId}/items/paginated?page=${page}&limit=${limit}`;
  const resp = await apiClient.get(url, { skipGlobalLoader: true });
  return resp.data;
};

export default { fetchTestItemsPaginated };
