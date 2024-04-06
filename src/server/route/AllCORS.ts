export const AllCORS =
  (methods: string[] = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']) =>
  () => {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': methods.join(', '),
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      },
    });
  };
