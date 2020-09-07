export const getName = (filename: string): string => {
  const name = filename.split('.').shift()
  if (!name) {
    throw new Error('Could not get name.')
  }
  return name
}

export const getExtension = (filename: string): string => {
  const ext = filename.split('.').pop()
  if (!ext) {
    throw new Error('Could not get extension.')
  }
  return ext
}
