(*
   Parse a source file or load its json representation.
*)

type t = {
  (* This is used to recover tokens from row/column locations. *)
  src: Src_file.t;

  (* The tree we get from tree-sitter. *)
  root: Tree_sitter_bindings.Tree_sitter_output_t.node
}

val src : t -> Src_file.t
val root : t -> Tree_sitter_bindings.Tree_sitter_output_t.node

(* Parse a source file with the provide parser, which is normally a C parser
   generated by tree-sitter. *)
val parse_source_file :
  Tree_sitter_bindings.Tree_sitter_API.ts_parser -> string -> t

(* Parse a string. The optional src_file argument is for error messages. *)
val parse_source_string :
  ?src_file:string ->
  Tree_sitter_bindings.Tree_sitter_API.ts_parser -> string -> t

(* Load a pre-parsed source file provided as a json file.
   The original source file is required to recover tokens from their location.
*)
val load_json_file : src_file:string -> json_file:string -> t

(*
   Pretty-print for debugging purposes.
*)
val print : t -> unit
