import { mergeAttributes } from "@tiptap/core";
import HorizontalRule from "@tiptap/extension-horizontal-rule";

/**
 * Yatay çizgi yalnızca toolbar “Ayırıcı” ile eklenir; `---` vb. input rule yok.
 * `data-vf-divider="true"` kayıtta ve sanitize ile doğrulanır.
 */
export const FirmBlogHorizontalRule = HorizontalRule.extend({
  addInputRules() {
    return [];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "hr",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-vf-divider": "true",
        class: "vf-blog-divider",
      }),
    ];
  },
});
