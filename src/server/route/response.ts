export const json = <T>(data: T): Response => {
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const activityJson = <T>(data: T): Response => {
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/activity+json',
    },
  });
};
