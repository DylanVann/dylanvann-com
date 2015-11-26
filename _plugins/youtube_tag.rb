class YouTube < Liquid::Tag
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
    "<div class=\"video\"><iframe width=\"#{@width}\" height=\"#{@height}\" src=\"http://www.youtube.com/embed/#{@id}?color=white&theme=dark&wmode=opaque&rel=0&showinfo=0\" frameborder=\"0\" wmode=\"Opaque\" allowfullscreen></iframe></div>"
  end

  Liquid::Template.register_tag "youtube", self
end

class YouTubeGif < Liquid::Tag
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
    "<div class=\"video\"><iframe width=\"#{@width}\" height=\"#{@height}\" src=\"http://www.youtube.com/embed/#{@id}?color=white&theme=dark&rel=0&showinfo=0&autoplay=1&loop=1\" frameborder=\"0\" allowfullscreen></iframe></div>"
  end

  Liquid::Template.register_tag "youtube_gif", self
end
