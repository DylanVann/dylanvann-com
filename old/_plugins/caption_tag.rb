class CaptionTag < Liquid::Tag
  @caption = nil

  def initialize(tag_name, caption, tokens)
    @caption = caption.strip
    super
  end

  def render(context)
    if @caption.empty?
      return "Error processing input, expected syntax: {% fig [filename] %}"
    end

     %|<p class="caption">#{ @caption }</p>|
  end

  Liquid::Template.register_tag 'caption', self
end
