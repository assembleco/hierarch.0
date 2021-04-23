import push_upgrades from "./push_upgrades"

const apply_changes_by_code = async (program, address, code, changes) => {
  var upgrades = []

  console.log(
    "HOLD UP!\n" +
    "Serious insecure code here; by passing a sneaky `code` param,\n" +
    "someone could hack our parser's query."
  )

  var original_matches = program.query([
  `
  (
    jsx_self_closing_element
    name: (_) @name
    attribute: (jsx_attribute (property_identifier) @_original "=" (jsx_expression (_) @original))
    attribute: (jsx_attribute (property_identifier) @_code "=" (string) @code)
    (#eq? @name "Box")
    (#eq? @_original "original")
    (#eq? @_code "code")
    (#match? @code "^.${code}.$")
  ) @element
  `,
  `
  (jsx_element
    open_tag: (
      jsx_opening_element
      name: (_) @opening-name
      attribute: (jsx_attribute (property_identifier) @_original "=" (jsx_expression (_) @original))
      attribute: (jsx_attribute (property_identifier) @_code "=" (string) @code)
      )

    [(jsx_text) (jsx_element) (jsx_self_closing_element)]* @children

    close_tag: (jsx_closing_element name: (_) @closing-name)

    (#eq? @opening-name "Box")
    (#eq? @closing-name "Box")
    (#eq? @_original "original")
    (#eq? @_code "code")
    (#match? @code "^.${code}.$")
  ) @element
  `
  ])

  // program.debug_query(original_matches)
  if(original_matches.length > 1) {
    program.debug_query(original_matches)
    throw `oh no! more than 1 match`
  }
  if(original_matches.length < 1) {
    program.debug_query(original_matches)
    throw `oh no! no match`
  }
  var original_name = program.display(original_matches[0].captures.filter(c => c.name === "original")[0].node)
  // console.log(original_name)

  var matches = program.query([
  `(
    variable_declarator
    (identifier) @name
    "="
    (call_expression
        function: (member_expression
            object: (identifier) @_styled
            property: (property_identifier) @property
            (#eq? @_styled "styled")
        )
        arguments: (template_string) @css
    )
    ${original_name && `(#eq? @name "${original_name}")` || ""}
  )`,
  `(
    variable_declarator
    (identifier) @name
    "="
    (call_expression
      function: (call_expression
        function: (member_expression
          object: (member_expression
            object: (identifier) @_styled
            property: (property_identifier) @property
            (#eq? @_styled "styled")
          )
          property: (property_identifier) @attrs
          (#eq? @attrs "attrs")
        )
        arguments: (arguments
          (object) @attributes
        )
      )
      arguments: (template_string) @css
    )
  )`,
  `(
    variable_declarator
    (identifier) @name
    "="
    (call_expression
      function: (call_expression
        function: (identifier) @_styled
        arguments: (arguments (_) @base)
      )
      arguments: (template_string) @css
      (#eq? @_styled "styled")
    ) @expr
    ${original_name && `(#eq? @name "${original_name}")` || ""}
  )`
  ])
  // program.debug_query(matches)

  const css_string = matches.slice(-1)[0].captures.slice(-1)[0].node

  var css = await program.load_language(`/tree-sitter-css.wasm`)
  var css_node = program.parse_range_as_language(
    css_string.startIndex + 1,
    css_string.endIndex - 1,
    css,
  ).rootNode

  Object.keys(changes).forEach(change => {
    var query = program.query(`
    (stylesheet
      (declaration (property_name) @prop (_) @value) @declare
      (#eq? @prop "${change}")
    )
    `, css_node, 'css')

    if(changes[change]) {
      if(query[0] && query[0].captures[1]) {
        upgrades = upgrades.concat({
          begin: query[0].captures[2].node.startIndex,
          end: query[0].captures[2].node.endIndex,
          grade: changes[change],
        })
      } else {
        upgrades = upgrades.concat({
          begin: css_string.startIndex + 1,
          end: css_string.startIndex + 1,
          grade: `\n${change}: ${changes[change]}px;`,
        })
      }
    } else {
      if(query[0] && query[0].captures[1]) {
        upgrades = upgrades.concat({
          begin: query[0].captures[0].node.startIndex,
          end: query[0].captures[0].node.endIndex,
          grade: '',
        })
      } else {
        /* No upgrades */
      }
    }
  })

  program.use_language(program.parsed.language)

  return push_upgrades(address, upgrades)
}

export default apply_changes_by_code
