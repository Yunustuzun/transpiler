import * as abaplint from "@abaplint/core";
import {IStatementTranspiler} from "./_statement_transpiler";
import {TranspileTypes} from "../types";
import {Traversal} from "../traversal";
import {ConstantTranspiler} from "../expressions/constant";

export class DataTranspiler implements IStatementTranspiler {

  public transpile(node: abaplint.Nodes.StatementNode, traversal: Traversal): string {
    const token = node.findFirstExpression(abaplint.Expressions.DefinitionName)?.getFirstToken();
    if (token === undefined) {
      throw new Error("DataTranspiler, token not found");
    }

    const scope = traversal.findCurrentScope(token);
    if (scope === undefined) {
      throw new Error("DataTranspiler, scope not found");
    }

    const found = scope.findVariable(token.getStr());
    if (found === undefined) {
      throw new Error("DataTranspiler, var not found, \"" + token.getStr() + "\"");
    }

// todo, refactor this part to use value from TypedIdentifier
    let value = "";
    const val = node.findFirstExpression(abaplint.Expressions.Value);
    if (val) {
      let int = val.findFirstExpression(abaplint.Expressions.Integer);
      if (int === undefined) {
        int = val.findFirstExpression(abaplint.Expressions.ConstantString);
      }
      if (int){
        const escaped = new ConstantTranspiler().escape(int.getFirstToken().getStr());
        value = "\n" + found.getName() + ".set(" + escaped + ");";
      }
    }

    return new TranspileTypes().declare(found) + value;
  }

}