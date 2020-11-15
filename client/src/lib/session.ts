const launchOptions = new URLSearchParams(window.location.search)

const storeKey = 'pass-callback-url'

export function init() {
  try {
    const url = localStorage.getItem(storeKey) || '/'
    localStorage.setItem(storeKey, launchOptions.get('next') || url)
  } catch {
    // ignore
  }
}

export function getCallbackURL(): URL {
  /**
   * @todo 需要使用真实的 session 处理
   */
  return new URL(localStorage.getItem(storeKey) || '/', location.origin)
}

export function redirect() {
  const url = getCallbackURL()
  // url.searchParams.set('token', res.token)
  location.replace(url.toString())
}
