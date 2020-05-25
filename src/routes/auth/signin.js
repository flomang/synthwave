export async function post(req, res) {
  const body = req.body;

  // update session here on the server
  // this is needed for SSR sessions
  req.session.user = body.user;
  req.session.token = body.token;
  res.end(JSON.stringify({ ok: true }));
}