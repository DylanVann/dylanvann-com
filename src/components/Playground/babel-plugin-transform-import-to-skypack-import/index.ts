// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getUnpkgUrl = (name: string) => `https://unpkg.com/${name}?module`
const getSkypackUrl = (name: string) =>
  `https://cdn.skypack.dev/${name}?min&dist=es2019`

function getCdnPathWithVersion(
  rawTarget: string,
  explicitVersion: string | void,
) {
  const [libraryName, ...libraryInternalPaths] = rawTarget.split('/')
  const libraryNameWithVersion = explicitVersion
    ? `${libraryName}@${explicitVersion}`
    : libraryName
  const finalPath = [libraryNameWithVersion, ...libraryInternalPaths].join('/')
  return getSkypackUrl(finalPath)
}

function isLibraryPath(rawTarget: string) {
  return !rawTarget.startsWith('.') && !rawTarget.startsWith('/')
}

function handleLibraryName(
  target: string,
  versions: { [libraryName: string]: string | void },
  onwarn?: any,
): string | void {
  // ignore http at first
  if (target.startsWith('http')) {
    return target
  }
  if (isLibraryPath(target)) {
    const [libraryName] = target.split('/')
    const explicitVersion = versions[libraryName]
    if (onwarn && explicitVersion == null) {
      onwarn(
        `[transform-import-path-to-skypack-cdn] ${target}'s version is not found in dependencies.`,
      )
    }
    return getCdnPathWithVersion(target, explicitVersion)
  }
}

export default function transformImportPathToSkypackCDN(
  versions: {
    [libraryName: string]: string | void
  },
  onwarn?: (message: string) => void,
) {
  return (_options: any) => {
    return {
      visitor: {
        CallExpression(path_: any) {
          if (path_.node.callee.name === 'require') {
            const target = path_.node.arguments[0].value
            const newPath = handleLibraryName(target, versions, onwarn)
            if (newPath) {
              path_.node.arguments[0].value = newPath
            }
          }
        },
        ImportDeclaration(path_: any) {
          const target = path_.node.source.value
          const newPath = handleLibraryName(target, versions, onwarn)
          if (newPath) {
            path_.node.source.value = newPath
          }
        },
      },
    }
  }
}
