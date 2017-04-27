import imagesLoaded from 'imagesloaded'
import EXIF from 'exif-js'

/*
 * The orientation of the camera relative to the scene, 
 * when the image was captured. The relation of the '0th row' 
 * and '0th column' to visual position is shown as below.
 *
 * Value | 0th Row     | 0th Column
 * ------+-------------+-----------
 *   1   | top         | left side
 *   2   | top         | right side
 *   3   | bottom      | right side
 *   4   | bottom      | left side
 *   5   | left side   | top
 *   6   | right side  | top
 *   7   | right side  | bottom
 *   8   | left side   | bottom
 *
 * For convenience, here is what the letter F would look like 
 * if it were tagged correctly and displayed by a program 
 * that ignores the orientation tag (thus showing the stored image):
 * 
 * 1        2       3      4         5            6           7          8
 * 888888  888888      88  88      8888888888  88                  88  8888888888
 * 88          88      88  88      88  88      88  88          88  88      88  88
 * 8888      8888    8888  8888    88          8888888888  8888888888          88
 * 88          88      88  88
 * 88          88  888888  888888
 *
 * For more details, see http://sylvana.net/jpegcrop/exif_orientation.html
 */
// the rotation angles of orientations
const rotateAngles = [
  {},
  { y: 0, z: 0 },
  { y: 180, z: 0 },
  { y: 0, z: 180 },
  { y: 180, z: 180 },
  { y: 180, z: -90 },
  { y: 0, z: -90 },
  { y: 180, z: 90 },
  { y: 0, z: 90 }
]

export function getOrientation(el) {
  return new Promise(function (resolve, reject) {
    imagesLoaded(el, function () {
      EXIF.getData(el, function () {
        const orientation = EXIF.getTag(this, 'Orientation')
        resolve(orientation)
      })
    })
  })
}

export function getRotationAngle(newOrientation, oldOrientation) {
  const y = rotateAngles[newOrientation].y - rotateAngles[oldOrientation].y
  let z = rotateAngles[newOrientation].z - rotateAngles[oldOrientation].z
  if (y) {
    z = z * -1
  }
  return {
    y,
    z
  }
}
