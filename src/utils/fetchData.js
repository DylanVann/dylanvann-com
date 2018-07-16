/**
 * This gets data out of Gatsby's cache.
 * It's a hack and it relies on a fork of Gatsby.
 *
 * window.___getPageQueryData is not normally exposed.
 */
export const fetchData = path =>
  new Promise(resolve => {
    const loader = window.___loader
    const getPageQueryData = window.___getPageQueryData
    const emitter = window.___emitter
    loader.getResourcesForPathname(path, data => {
      if (data.json) {
        resolve(data.json)
      }
      const pageData = getPageQueryData()
      if (pageData[path]) resolve(pageData[path])
      const handler = () => {
        const pageData = getPageQueryData()
        if (pageData[path]) {
          emitter.off(handler)
          resolve(pageData[path])
        }
      }
      emitter.on('*', handler)
    })
  })
