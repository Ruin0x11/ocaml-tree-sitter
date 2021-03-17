/*
 * semgrep-rust
 *
 * Extend the original tree-sitter Rust grammar with semgrep-specific constructs
 * used to represent semgrep patterns.
 */

const standard_grammar = require('tree-sitter-rust/grammar');

module.exports = grammar(standard_grammar, {
  name: 'rust',

  rules: {

    // Entry point
    source_file: ($, previous) => {
      return choice(
        previous,
        $.semgrep_expression
      );
    },

    // Alternate "entry point". Allows parsing a standalone expression.
    semgrep_expression: $ => seq('__SEMGREP_EXPRESSION',
                                 choice(
                                   seq(repeat($.inner_attribute_item), repeat(prec(10, $.item))),
                                   seq(repeat($._statement), optional($._expression)),
                                   $._expression
                                 )),

    // Metavariables
    identifier: ($, previous) => {
      return token(
        choice(
          previous,
          /\$[A-Z_][A-Z_0-9]*/,
        )
      );
    },

    item: ($, previous) => {
      return choice(
        previous,
        prec.right(10, $.ellipsis),
        prec.right(10, $.deep_ellipsis)
      );
    },

    _item_kind: ($, previous) => {
      return choice(
        ...previous.members,
        prec.right(10, $.ellipsis),
        prec.right(10, $.deep_ellipsis)
      );
    },

    _pattern: ($, previous) => {
      return choice(
        ...previous.members,
        $.ellipsis,
        $.deep_ellipsis
      );
    },

    match_block: $ => seq(
      '{',
      optional(seq(
        repeat(choice($.match_arm, $.ellipsis)),
        choice(alias($.last_match_arm, $.match_arm), $.ellipsis)
      )),
      '}'
    ),

    // Statement ellipsis: '...' not followed by ';'
    _expression_statement: ($, previous) => {
      return choice(
        previous,
        prec.right(100, seq($.ellipsis, ';')),  // expression ellipsis
        prec.right(100, $.ellipsis),  // statement ellipsis
      );
    },

    // Statement ellipsis
    _statement: ($, previous) => {
      return choice(
        ...previous.members,
        $.ellipsis,
        $.deep_ellipsis
      );
    },

    // Expression ellipsis
    _expression: ($, previous) => {
      return choice(
        ...previous.members,
        $.ellipsis,
        $.deep_ellipsis
      );
    },

    deep_ellipsis: $ => seq(
      '<...', $._expression, '...>'
    ),

    ellipsis: $ => prec(5, '...'),
  }
});
