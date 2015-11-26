class GFY < Liquid::Tag
  Syntax = /^\s*([^\s]+)(\s+(\d+)\s+(\d+)\s*)?/

  def initialize(tagName, markup, tokens)
    super

    if markup =~ Syntax then
      @id = $1

      if $2.nil? then
          @width = 560
          @height = 420
      else
          @width = $2.to_i
          @height = $3.to_i
      end
    else
      raise "No YouTube ID provided in the \"youtube\" tag"
    end
  end

  def render(context)
    <<-MARKUP.strip
<video class="gfyVid" autoplay="" loop="" muted="muted" poster="//thumbs.gfycat.com/#{@id}-poster.jpg">
<source id="webmsource" src="//fat.gfycat.com/#{@id}.webm" type="video/webm">
<source id="mp4source" src="//giant.gfycat.com/#{@id}.mp4" type="video/mp4">
Sorry, you don't have HTML5 video and we didn't catch this properly in javascript.
You can try to view the gif directly: <a href="http://zippy.gfycat.com/#{@id}.gif">http://zippy.gfycat.com/#{@id}.gif</a>.
</video>
    MARKUP
  end

  Liquid::Template.register_tag "gfy", self
end
