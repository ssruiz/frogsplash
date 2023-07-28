export const postServer = (url: string, data: any) =>
  fetch(`/api${url}`, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

export const deleteServer = (url: string, data: any) =>
  fetch(`/api${url}`, {
    method: 'DELETE',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
  });
