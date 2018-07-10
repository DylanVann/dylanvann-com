class AssetPathTag < Liquid::Tag
  @markup = nil

  def initialize(tag_name, markup, tokens)
    #strip leading and trailing spaces
    @markup = markup.strip
    super
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
          if path["_posts/"]
            path['_posts/'] = ''
          end
          if path['_drafts/']
            path['_drafts/'] = ''
          end
          path['.md'] = ''
        end
      end
    else
      path = page["url"]
    end

    #strip filename
    path = File.dirname(path) if path =~ /\.\w+$/

    #fix double slashes
    "#{context.registers[:site].config['baseurl']}/assets/#{path}/#{filename}".gsub(/\/{2,}/, '/')
  end

  Liquid::Template.register_tag 'asset_path', self
end
