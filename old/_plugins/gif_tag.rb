class GIF < Liquid::Tag
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
    if @markup.empty?
      return "Error processing input, expected syntax: {% asset_path [filename] %}"
    end

    #render the markup
    rawFilename = Liquid::Template.parse(@markup).render context

    #strip leading and trailing quotes
    filename = rawFilename.gsub(/^("|')|("|')$/, '')

    path = ""
    page = context.environments.first["page"]

    #if a post
    if page["id"]
      #loop through posts to find match and get slug
      context.registers[:site].posts.each do |post|
        if post.id == page["id"]
          # path = "posts/#{post.slug}"
          path = "posts/#{ post.path }"
          path['_posts/'] = ''
          path['.md'] = ''
        end
      end
    else
      path = page["url"]
    end

    #strip filename
    path = File.dirname(path) if path =~ /\.\w+$/

    #fix double slashes
    path ="#{context.registers[:site].config['baseurl']}/assets/#{path}/#{filename}".gsub(/\/{2,}/, '/')
    path[' '] = ''

    <<-MARKUP.strip
      <video autoplay loop muted poster="#{path}-750.jpg">
        <source src="#{path}-750.mp4" type="video/mp4">
        <source src="#{path}-750.webm" type="video/webm">
      </video>
    MARKUP
  end

  Liquid::Template.register_tag "gif", self
end
