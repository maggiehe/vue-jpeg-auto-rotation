<template>
  <div class="holder">
    <slot></slot>
  </div>
</template>

<script>
  import { getOrientation, getRotationAngle } from '../util'

  export default {
    mounted() {
      const slot = this.$slots.default[0]
      if (slot.tag !== 'img') {
        console.error('Warning: slot should be an img tag.')
        return
      }
      const holder = this.$el
      const img = holder.childNodes[0]
      getOrientation(img).then(function (currentOrientation) {
        const angle = getRotationAngle(1, currentOrientation)

        const transform = `rotateY(${angle.y}deg) rotateZ(${angle.z}deg)`

        let translate = ''
        if (angle.z % 180 !== 0) {
          const height = img.clientHeight
          const width = img.clientWidth
          translate = `translate(${(height - width) / 2}px, ${(width - height) / 2}px)`
          holder.style['width'] = `${height}px`
          holder.style['height'] = `${width}px`
        }
        img.style['vertical-align'] = 'bottom'
        img.style['transform'] = translate + ' ' + transform
      })
    }
  }
</script>

<style scoped>
  .holder {
    display: inline-block;
    overflow: hidden;
  }
</style>
