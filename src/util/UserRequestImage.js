import trianglify from 'trianglify';

const AvailableColorSpace = [
  'YlGn',
  'YlGnBu',
  'GnBu',
  'BuGn',
  'PuBuGn',
  'PuBu',
  'BuPu',
  'RdPu',
  'PuRd',
  'OrRd',
  'YlOrRd',
  'YlOrBr',
  'Purples',
  'Blues',
  'Greens',
  'Oranges',
  'Reds',
  'Greys',
  'PuOr',
  'BrBG',
  'PRGn',
  'PiYG',
  'RdBu',
  'RdGy',
  'RdYlBu',
  'Spectral',
  'RdYlGn',
]

export const UserRequestImage = (userEmail, idToken) => {
  const convertToNumber = (userEmail) => {
    const emailArray = [...userEmail]
    const convertedNumber = emailArray
      .map(char => char.charCodeAt(0))
      .reduce((current, previous) => previous + current)
    return convertedNumber
  }
  const pattern = trianglify({
    height: 120,
    width: 120,
    cellSize: 25,
    seed: idToken,
    xColors: AvailableColorSpace[
        convertToNumber(userEmail) % AvailableColorSpace.length
    ],
  })
  return pattern.toCanvas().toDataURL();

}

