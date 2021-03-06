Related git repositories
==

In dependency order:

* [tree-sitter](https://github.com/tree-sitter/tree-sitter): the core
  tree-sitter project, provides commands such as
  `tree-sitter generate` that turn a grammar specification into a C
  parser.
* [tree-sitter-ruby](https://github.com/tree-sitter/tree-sitter-ruby),
  [tree-sitter-typescript](https://github.com/tree-sitter/tree-sitter-typescript),
  etc.: grammars for various programming languages. Some of these
  repositories provide support for several dialects of the same language.
* [semgrep-grammars](https://github.com/returntocorp/semgrep-grammars):
  extension of programming languages with syntax for semgrep
  patterns (`...`, `$X`).
* **ocaml-tree-sitter**: this repo. Generates OCaml-friendly interfaces from
  tree-sitter grammar specifications.
* [ocaml-tree-sitter-lang](https://github.com/returntocorp/ocaml-tree-sitter-lang):
  parsers for the languages in semgrep-grammars, generated by
  tree-sitter and ocaml-tree-sitter from the ocaml-tree-sitter repo.
* [semgrep](https://github.com/returntocorp/semgrep): uses the
  ocaml-tree-sitter-lang libraries for parsing programs and
  for parsing the patterns to be matched against those programs.
