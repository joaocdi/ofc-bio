// Captura a origem no domínio da página antes de voltar à URL pública limpa.
const SOURCES = new Set(['ig01', 'ig02', 'ig03', 'tt01']);

module.exports = function mayaOrigin(request, response) {
  const source = request.query && request.query.source;
  response.setHeader('Cache-Control', 'private, no-store');
  response.setHeader('Location', '/maya');
  if (typeof source === 'string' && SOURCES.has(source)) {
    response.setHeader('Set-Cookie', `traffic_source=${source}; Path=/maya; SameSite=Lax; Secure`);
  }
  response.statusCode = 302;
  response.end();
};
