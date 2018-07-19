// React does not render the <video> element correctly.
// https://github.com/facebook/react/issues/6544
const renderVideoTagString = ({ srcVideo, srcVideoPoster }) => `
<video muted autoplay playsinline loop poster="${srcVideoPoster}">
  <source src="${srcVideo}" type="video/mp4">
</video>
`

export default renderVideoTagString
