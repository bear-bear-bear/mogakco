module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-prettier"],
  plugins: ["stylelint-order"],
  rules: {
    indentation: 2,
    "max-nesting-depth": 3,
    "declaration-block-semicolon-newline-after": "always",
    "color-hex-length": "short",
    "color-hex-case": "lower",
    "selector-pseudo-element-colon-notation": "double",
    "comment-no-empty": true,
    "block-no-empty": true,
    "declaration-empty-line-before": "never",
    "block-opening-brace-newline-after": "always",
    "block-closing-brace-newline-before": "always",
    "block-closing-brace-empty-line-before": "never",
    "at-rule-empty-line-before": "always",
    "rule-empty-line-before": null,
    "no-empty-source": null
  }
};