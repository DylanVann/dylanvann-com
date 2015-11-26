class Quote < Liquid::Tag
  @quote = nil
  @cite = nil

  def initialize(tagName, markup, tokens)
    super
    markup = markup.split('"')
    @quote = markup[1]
    @cite = markup[3]
  end

  def render(context)
    if @markup.empty?
      return "Error processing input, expected syntax: {% quote \"Quote\" \"Cite\" %}"
    end

    <<-MARKUP.strip
      <blockquote>
        #{ @quote }
        <cite>#{ @cite }</cite>
      </blockquote>
    MARKUP
  end

  Liquid::Template.register_tag "quote", self
end
