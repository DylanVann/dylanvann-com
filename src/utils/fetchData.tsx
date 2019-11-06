/**
 * This gets data out of Gatsby's cache.
 * It's a hack and it relies on a fork of Gatsby.
 *
 * window.___getPageQueryData is not normally exposed.
 */
export async function fetchData(path: string) {
  const anyWindow = window as any
  const loader = anyWindow.___loader
  const getPageQueryData = anyWindow.___getPageQueryData
  const emitter = anyWindow.___emitter
  const data = await loader.loadPage(path)

  // If we already have the data.
  if (data.json) {
    return data.json
  }

  // Other steps are only needed during development.
  if (process.env.NODE_ENV === 'production') {
    return
  }

  const pageData = getPageQueryData()
  // If we have pageData for this path already.
  if (pageData[path]) {
    return pageData[path]
  }

  const handler = () => {
    const pageData = getPageQueryData()
    if (pageData[path]) {
      emitter.off(handler)
      return pageData[path]
    }
  }

  emitter.on('*', handler)
}
