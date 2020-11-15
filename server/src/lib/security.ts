export function checkHosts(host: string, allowedHosts: string[]): boolean {
  /**
   * @todo 需要处理通配符
   */
  return allowedHosts.includes(host)
}
