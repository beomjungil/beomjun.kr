export const json = <T>(
  data: T,
  { allowCors } = { allowCors: false },
): Response => {
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      ...(allowCors
        ? {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Max-Age': '86400',
          }
        : {}),
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
