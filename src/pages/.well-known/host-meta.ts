import { APIRoute } from "@/server/api-route";
import { okAsync } from "neverthrow";

export const prerender = false;

export const GET = APIRoute('/.well-known/host-meta', () => {
  return okAsync(new Response(`
  <?xml version="1.0" encoding="UTF-8"?>
<XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0">
  <Link rel="lrdd" template="https://beomjun.kr/.well-known/webfinger?resource={uri}"/>
</XRD>
  `.trim(), {
    headers: {
      'Content-Type': 'application/xrd+xml; charset=utf-8',
    }
  }))
})