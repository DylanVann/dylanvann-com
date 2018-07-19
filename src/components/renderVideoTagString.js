// React does not render the <video> element correctly.
// https://github.com/facebook/react/issues/6544
const renderVideoTagString = ({ srcVideo, srcVideoPoster }) => `
<video muted autoplay playsinline loop poster="${srcVideoPoster}" src="${srcVideo}">
</video>
`

export default renderVideoTagString
