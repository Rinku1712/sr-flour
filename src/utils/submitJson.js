export default async function submitJson(endpoint, payload, serviceName) {
  if (!endpoint) {
    throw new Error(`${serviceName} is not configured yet. Please contact the site owner.`)
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`${serviceName} could not accept your request (HTTP ${response.status}). Please try again later.`)
  }
}
