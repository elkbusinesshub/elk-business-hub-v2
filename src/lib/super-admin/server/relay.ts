/** Passes the API's JSON response through to the browser unchanged. */
export async function relay(res: Response): Promise<Response> {
  return new Response(await res.text(), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
