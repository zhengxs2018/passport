export async function doPost(url: string, body: BodyInit) {
  const response = await fetch(url, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  })
  const statusCode = response.status
  const data = await response.json()
  return validateStatus(statusCode) ? data : createError(data.message, { statusCode, response })
}

function validateStatus(status: number) {
  return status >= 200 && status < 300
}

function createError(msg: string, extra?: Record<string, any>): Promise<never> {
  const err = new Error(msg)
  Object.assign(err, extra)
  return Promise.reject(err)
}
