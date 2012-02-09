(( $ ) ->
  $window = $ window
  r = $.respond =
   update:
    ->
   mediaQueriesSupported:
    Modernizr
     .mq( "only all" )

  return if r.mediaQueriesSupported

  $link = $ "head link"
  $last_link = $link
                .last()
  $base = $ "base"
  docElem = document
             .documentElement
  class Sheet
   parsed:
    {}
   queue:
    []
   @fetching:
    no

   constructor:
    ( @el ) ->
     { @href,
       @rel,
       @media } = @el
     return if @href of @parsed
     @href_dir = @href[ 0 .. @href
                              .lastIndexOf "/" ]

     @text = @el
              ?.styleSheet
              ?.rawCssText
     return @parse() if @text
     return unless @same_domain()
     @enqueue

   enqueue:
    ->
     @queue
      .push @
     @fetch unless @fetching

   fetch:
    ->
     Sheet
      .fetching = yes
     $.get @href,
           ( @text ) =>
            @parse()
            @queue
             .shift()
             ?.fetch() ?
             Sheet
              .fetching = no

   same_domain:
    ->
     ( not ///
            ^
            (
             [a-zA-Z:] *
             //
            )
           ///
            .test( @href ) and 
        not $base
             .length ) or
      @href
       .replace( RegExp.$1,
                 "" )
       .split( "/" )[ 0 ] is
       location.host

   rule_re:
    ///
     @media
     [^\{] +
     \{
     (
      [^\{\}] *
      \{
      [^\{\}] *
      \}
     ) +
    ///gi

   query_block_re:
    ///
     @media
     \ *
     (
      [^\{] +
     )
     \{
     (
      [\S\s] +?
     )
     $
    ///

   parse:
    ->
     @types = {}
     @rules =
      ( new MediaRule( RegExp.$1
                             .split( "," ),
                       RegExp.$2,
                       @ ) for rule in @text
                                        .match @rule_re when rule
                                                              .match @query_block_re )
     @rules = [ new MediaRule @media,
                              @text ] if not @rules
                                              .length and
                                          @media
     @parsed[ @href ] = @
     @apply()

   apply:
    ->
     for type, { tag, queries } of @types
       tag
        ?.detach()
       applicable_blocks = ( query
                              .rule
                              .block for query in queries when query.applies())
       @types[ type ]
             .tag = new StyleTag( type,
                                  applicable_blocks ) if applicable_blocks
     no

  class StyleTag
   constructor:
    ( @media, \
      @blocks ) ->
     @text = @blocks
              .join "\n"
     @$node = $( "<style type='text/css' media='#{ @media }'>" )
               .insertBefore( $last_link
                               .next())
     node = @$node.get 0
     ( node
        .styleSheet
        ?.cssText = @text ) ?
      node
       .appendChild document
                     .createTextNode @text
   detach:
    ->
     @$node
      .detach()

  class Query
   constructor:
    ( @text, \
      @rule ) ->
     @type = @text
              .split( "(" )[ 0 ]
              .match( @type_re ) and
              RegExp.$2 or
              "all"
     @has_expression = "(" in @text
     @min = new Length( RegExp.$1,
                        RegExp.$2 ) if @text
                                        .match @min_re
     @max = new Length( RegExp.$1,
                        RegExp.$2 ) if @text
                                        .match @max_re
     ( @rule
        .sheet
        .types[ @type ] ?= queries:
                            [] )
      .queries
      .push @

   applies:
    ->
     not @has_expression or
      ( @min? or
         @max? ) and
       ( @width() >= @min.px() if @min? ) and
       ( @width() <= @max.px() if @max? )

   type_re:
    ///
     (
      only
      \s +
     ) ?
     (
      [a-zA-Z] +
     )
    ///

   min_re:
    ///
     \(min\-width:
     \s *
     (
      [0-9\.] +
     )
     (
      px
       |
      em
     )
     \s *
     \)
    ///

   max_re:
    ///
     \(max\-width:
     \s *
     (
      [0-9\.] +
     )
     (
      px
       |
      em
     )
     \s *
     \)
    ///

  class Length
   constructor:
    ( val, \
      @unit ) ->
     @val = parseFloat val

   _em_value:
    ->
     div = $( "<div>" )
            .css position:
                  "absolute"
                 fontSize:
                  "1em"
                 width:
                  "1em"
     fake = no
     body = document
             .body ?
             ( fake = yes ) and
              $( "<body>" )
     body.appendChild div
     docElem
      .insertBefore body,
                    docElem
                     .firstChild
     Length
      .cached_em_value = parseFloat div.offsetWidth
     if fake
       docElem
        .removeChild body
     else
       body
        .removeChild div
     @cached_em_value

   em_value:
    ->
     @cached_em_value ?
      @_em_value()

   px:
    ->
     @val *
      ( if @unit is "em" then @em_value() else 1 )

  class MediaRule
   constructor:
    ( queries, \
      block, \
      @sheet ) ->
       @block = @replace_urls block
       @queries = ( new Query( query,
                               @ ) for query in queries )

   replace_urls_re:
    ///
     url\(
     ['"] ?
     (
      [^/\)'"]
      [^:\)'"] +
     )
     ['"] ?
     \)
    ///g

   replace_urls:
    ( text ) ->
     text.replace @replace_urls_re,
                  "url( #{ @sheet.href_dir }$1 )"

  ( r.update = ->
     $link
      .filter( ->
                !! @href and
                 @rel
                  ?.toLowerCase() is
                  "stylesheet" )
      .each ->
       new Sheet @ )()

  ( $window
     .smartresize ?
     $window
      .resize )( ->
                  sheet
                   .apply() for href, sheet of Sheet
                                                .parsed )
) jQuery
