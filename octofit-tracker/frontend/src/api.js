const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export async function fetchResource(path) {
  const response = await fetch(`${apiBaseUrl}${path}`)
  if (!response.ok) {
    throw new Error(`Unable to load ${path} (${response.status})`)
  }
  const payload = await response.json()
  if (Array.isArray(payload)) {
    return payload
  }

  const candidates = [
    payload?.data,
    payload?.items,
    payload?.results,
    payload?.data?.items,
    payload?.data?.results,
  ]
  return candidates.find((candidate) => Array.isArray(candidate)) || []
}
